"use client";

import { useRef, useState, type FormEvent } from "react";
import { WA_MESSAGES, WhatsAppButton } from "./Contact";

export const CONTACT_ROLES = ["Student", "Company", "Institution", "Recruiter"] as const;

type Field = "name" | "email" | "role" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = { state: "idle" | "sending" | "sent" } | { state: "error"; message: string };

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v: Record<Field, string>): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email.";
  else if (!emailRe.test(v.email.trim())) e.email = "That email doesn't look right. Please check it.";
  if (!CONTACT_ROLES.includes(v.role as (typeof CONTACT_ROLES)[number])) e.role = "Please choose one.";
  if (v.message.trim().length < 10) e.message = "Please write a short message (at least 10 characters).";
  return e;
}

/** Contact form: name, email, "I'm a…", message. Client-side validation, then POST /api/contact. */
export function ContactForm({ defaultRole = "" }: { defaultRole?: string }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const values = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      role: String(fd.get("role") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const found = validate(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: String(fd.get("website") ?? "") }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Couldn't send right now.");
      setStatus({ state: "sent" });
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "Couldn't send right now." });
    }
  }

  if (status.state === "sent") {
    return (
      <div role="status" className="rounded-xl border border-gold/40 bg-gold/[0.06] p-6 sm:p-8">
        <p className="font-serif text-2xl text-gold-soft">Thank you, your message is in.</p>
        <p className="mt-2 text-muted">I read every message myself and usually reply within 1–2 working days.</p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="mt-5 text-sm text-gold-soft underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const describedBy = (f: Field) => (errors[f] ? `contact-${f}-error` : undefined);
  const fieldError = (f: Field) =>
    errors[f] ? (
      <p id={`contact-${f}-error`} className="mt-2 text-sm text-red-500">
        {errors[f]}
      </p>
    ) : null;
  const label = (f: Field, text: string) => (
    <label htmlFor={`contact-${f}`} className="mb-2 block text-sm text-text/85">
      {text}
      <span className="ml-1 text-gold" aria-hidden="true">
        *
      </span>
    </label>
  );

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2" aria-describedby="contact-required-note">
      {/* honeypot: hidden from people, bots fill it */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div>
        {label("name", "Name")}
        <input
          id="contact-name"
          name="name"
          autoComplete="name"
          required
          aria-invalid={!!errors.name}
          aria-describedby={describedBy("name")}
          className="field"
        />
        {fieldError("name")}
      </div>

      <div>
        {label("email", "Email")}
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={!!errors.email}
          aria-describedby={describedBy("email")}
          className="field"
        />
        {fieldError("email")}
      </div>

      <div className="sm:col-span-2">
        {label("role", "I'm a…")}
        <select
          id="contact-role"
          name="role"
          required
          defaultValue={CONTACT_ROLES.includes(defaultRole as (typeof CONTACT_ROLES)[number]) ? defaultRole : ""}
          aria-invalid={!!errors.role}
          aria-describedby={describedBy("role")}
          className="field"
        >
          <option value="" disabled>
            Choose one…
          </option>
          {CONTACT_ROLES.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
        {fieldError("role")}
      </div>

      <div className="sm:col-span-2">
        {label("message", "Message")}
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          placeholder="What would you like to learn or build? Any timeline?"
          aria-invalid={!!errors.message}
          aria-describedby={describedBy("message")}
          className="field"
        />
        {fieldError("message")}
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p id="contact-required-note" className="text-xs text-faint">
          All fields are required. Your details are only used to reply to you.
        </p>
        <button
          type="submit"
          disabled={status.state === "sending"}
          className="rounded-full bg-btn px-7 py-3 text-sm font-medium text-btn-fg transition-colors hover:bg-btn-hover disabled:opacity-60"
        >
          {status.state === "sending" ? "Sending…" : "Send message"}
        </button>
      </div>

      {status.state === "error" && (
        <div role="alert" className="flex flex-col gap-3 rounded-xl border border-red-500/40 bg-red-500/[0.06] p-4 text-sm sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-red-500">{status.message}</span>
          <WhatsAppButton message={WA_MESSAGES.general} label="Send on WhatsApp instead" className="!py-2" />
        </div>
      )}
    </form>
  );
}
