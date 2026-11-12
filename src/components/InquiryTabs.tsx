"use client";

import { useState, type FormEvent } from "react";
import { inquiryForms, inquiryTypes, type InquiryType } from "@/content/forms";

type Status = { state: "idle" | "sending" | "sent" | "error"; message?: string };

export function InquiryTabs({ initial }: { initial: InquiryType }) {
  const [active, setActive] = useState<InquiryType>(initial);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const form = inquiryForms[active];

  function select(type: InquiryType) {
    setActive(type);
    setStatus({ state: "idle" });
    const url = new URL(window.location.href);
    url.searchParams.set("type", type);
    window.history.replaceState(null, "", url);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const el = e.currentTarget;
    const data = Object.fromEntries(new FormData(el).entries());
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: active, ...data }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      el.reset();
      setStatus({ state: "sent" });
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  return (
    <div>
      <div role="tablist" aria-label="Inquiry type" className="flex flex-col gap-2 rounded-2xl border border-line bg-ink-3/60 p-1.5 sm:flex-row">
        {inquiryTypes.map((t) => {
          const on = t === active;
          return (
            <button
              key={t}
              role="tab"
              id={`tab-${t}`}
              aria-selected={on}
              aria-controls={`panel-${t}`}
              onClick={() => select(t)}
              className={`flex-1 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                on ? "bg-btn text-btn-fg shadow-[0_6px_20px_-10px_rgba(22,23,27,0.6)]" : "text-muted hover:text-text"
              }`}
            >
              {inquiryForms[t].tab}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`} className="card mt-6 p-6 sm:p-10">
        <h2 className="font-serif text-3xl text-text">{form.title}</h2>
        <p className="mt-3 max-w-2xl text-muted">{form.blurb}</p>

        {status.state === "sent" ? (
          <div className="mt-10 rounded-xl border border-gold/40 bg-gold/[0.06] p-6">
            <p className="font-serif text-2xl text-gold-soft">Thank you — it&apos;s in.</p>
            <p className="mt-2 text-muted">I read every message personally and will get back to you soon.</p>
            <button onClick={() => setStatus({ state: "idle" })} className="mt-5 text-sm text-gold-soft underline-offset-4 hover:underline">
              Send another
            </button>
          </div>
        ) : (
          <form key={active} onSubmit={onSubmit} className="mt-10 grid gap-5 sm:grid-cols-2" noValidate={false}>
            {/* Honeypot: hidden from people, catches bots */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            {form.fields.map((f) => {
              const id = `${active}-${f.name}`;
              const common = { id, name: f.name, required: f.required, placeholder: f.placeholder, className: "field" };
              return (
                <div key={f.name} className={f.full ? "sm:col-span-2" : ""}>
                  <label htmlFor={id} className="mb-2 block text-sm text-text/85">
                    {f.label}
                    {f.required && <span className="ml-1 text-gold">*</span>}
                  </label>
                  {f.type === "textarea" ? (
                    <textarea {...common} rows={5} />
                  ) : f.type === "select" ? (
                    <select {...common} defaultValue="">
                      <option value="" disabled>
                        Select…
                      </option>
                      {f.options?.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  ) : (
                    <input {...common} type={f.type} min={f.type === "number" ? 1 : undefined} />
                  )}
                </div>
              );
            })}
            <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-faint">Your details are only used to reply to this inquiry.</p>
              <button
                type="submit"
                disabled={status.state === "sending"}
                className="rounded-full bg-btn px-7 py-3 text-sm font-medium text-btn-fg transition-colors hover:bg-btn-hover disabled:opacity-60"
              >
                {status.state === "sending" ? "Sending…" : form.submit}
              </button>
            </div>
            {status.state === "error" && (
              <p role="alert" className="text-sm text-red-700 sm:col-span-2">
                {status.message}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
