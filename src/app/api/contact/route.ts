import { NextResponse } from "next/server";

/**
 * Receives messages from the /contact form and emails them via Resend.
 * Uses the same env vars as /api/inquiry: RESEND_API_KEY, INQUIRY_TO_EMAIL, INQUIRY_FROM_EMAIL (optional).
 * Without them, messages are logged to the server console (fine for local dev).
 */

const ROLES = ["Student", "Company", "Institution", "Recruiter"];
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill the hidden field; pretend success.
  if (str(body.website, 200)) return NextResponse.json({ ok: true });

  const name = str(body.name, 200);
  const email = str(body.email, 200);
  const role = str(body.role, 40);
  const message = str(body.message, 5000);

  if (!name) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!emailRe.test(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (!ROLES.includes(role)) return NextResponse.json({ error: "Please choose who you are." }, { status: 400 });
  if (message.length < 10) return NextResponse.json({ error: "Please write a short message." }, { status: 400 });

  const subject = `[Contact · ${role}] ${name}`;
  const rows = [
    ["Name", name],
    ["Email", email],
    ["I'm a", role],
    ["Message", message],
  ]
    .map(([k, v]) => `<tr><td style="padding:6px 12px;color:#666;vertical-align:top">${k}</td><td style="padding:6px 12px;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`)
    .join("");
  const html = `<h2 style="font-family:Georgia,serif">New message from the website</h2><table style="font-family:system-ui;font-size:14px;border-collapse:collapse">${rows}</table>`;

  const { RESEND_API_KEY, INQUIRY_TO_EMAIL, INQUIRY_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !INQUIRY_TO_EMAIL) {
    console.log("[contact] email not configured, logging instead:\n", subject, { name, email, role, message });
    return NextResponse.json({ ok: true });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: INQUIRY_FROM_EMAIL ?? "Website <onboarding@resend.dev>",
      to: [INQUIRY_TO_EMAIL],
      reply_to: email,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text());
    return NextResponse.json({ error: "Couldn't send right now. Please email me or use WhatsApp." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
