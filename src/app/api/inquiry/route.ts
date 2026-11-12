import { NextResponse } from "next/server";
import { inquiryForms, inquiryTypes, type InquiryType } from "@/content/forms";

/**
 * Receives inquiries from /work-with-me.
 *
 * Email delivery uses Resend (https://resend.com) when these env vars are set:
 *   RESEND_API_KEY      — your Resend API key
 *   INQUIRY_TO_EMAIL    — where inquiries should land (your inbox)
 *   INQUIRY_FROM_EMAIL  — a sender on your verified domain, e.g. "Website <hello@yourdomain.com>"
 * Without them, inquiries are logged to the server console (fine for local dev).
 */

const MAX_LEN = 5000;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill the hidden field; pretend success.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const type = body.type as InquiryType;
  if (!inquiryTypes.includes(type)) {
    return NextResponse.json({ error: "Unknown inquiry type." }, { status: 400 });
  }

  const form = inquiryForms[type];
  const values: Record<string, string> = {};
  for (const f of form.fields) {
    const raw = body[f.name];
    const v = typeof raw === "string" ? raw.trim().slice(0, MAX_LEN) : "";
    if (f.required && !v) {
      return NextResponse.json({ error: `Please fill in “${f.label}”.` }, { status: 400 });
    }
    if (f.type === "email" && v && !emailRe.test(v)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (f.type === "select" && v && f.options && !f.options.includes(v)) {
      return NextResponse.json({ error: `Invalid choice for “${f.label}”.` }, { status: 400 });
    }
    values[f.name] = v;
  }

  const subject = `[${form.tab}] ${values.name || "New inquiry"}${values.institution ? ` — ${values.institution}` : values.company ? ` — ${values.company}` : ""}`;
  const rows = form.fields
    .filter((f) => values[f.name])
    .map((f) => `<tr><td style="padding:6px 12px;color:#666;vertical-align:top">${escapeHtml(f.label)}</td><td style="padding:6px 12px;white-space:pre-wrap">${escapeHtml(values[f.name])}</td></tr>`)
    .join("");
  const html = `<h2 style="font-family:Georgia,serif">${escapeHtml(form.title)}</h2><table style="font-family:system-ui;font-size:14px;border-collapse:collapse">${rows}</table>`;

  const { RESEND_API_KEY, INQUIRY_TO_EMAIL, INQUIRY_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !INQUIRY_TO_EMAIL) {
    console.log("[inquiry] email not configured — logging instead:\n", subject, values);
    return NextResponse.json({ ok: true });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: INQUIRY_FROM_EMAIL ?? "Website <onboarding@resend.dev>",
      to: [INQUIRY_TO_EMAIL],
      reply_to: values.email,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    console.error("[inquiry] Resend error", res.status, await res.text());
    return NextResponse.json({ error: "Couldn't send right now. Please email me directly." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
