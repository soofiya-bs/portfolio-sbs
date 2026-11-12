import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Jewel accent palette — gold, emerald, royal blue, plum.
 * Full class names are spelled out so Tailwind can see them.
 */
export const accents = [
  { text: "text-gold", bg: "bg-gold", soft: "bg-gold/10", border: "border-gold/30", glow: "glow-gold" },
  { text: "text-emerald", bg: "bg-emerald", soft: "bg-emerald/10", border: "border-emerald/30", glow: "glow-emerald" },
  { text: "text-royal", bg: "bg-royal", soft: "bg-royal/10", border: "border-royal/30", glow: "glow-royal" },
  { text: "text-plum", bg: "bg-plum", soft: "bg-plum/10", border: "border-plum/30", glow: "glow-plum" },
] as const;

export const accent = (i: number) => accents[((i % accents.length) + accents.length) % accents.length];

/** Stable colour for a word (e.g. a tag), so "RAG" is always the same colour everywhere. */
export function accentFor(word: string) {
  let h = 0;
  for (const c of word) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return accent(h);
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}

export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
      <span className="mr-2 inline-block h-px w-6 translate-y-[-3px] bg-gold/60 align-middle" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <div data-reveal className="max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <Tag className="mt-4 font-serif text-4xl leading-[1.08] tracking-tight text-text sm:text-5xl">{title}</Tag>
      {lead && <p className="mt-5 text-lg leading-relaxed text-muted">{lead}</p>}
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className = "" }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200";
  const styles =
    variant === "primary"
      ? "btn-shine bg-btn text-btn-fg hover:bg-btn-hover shadow-[0_10px_30px_-12px_rgba(22,23,27,0.55)]"
      : "border border-line-strong text-text hover:border-gold/60 hover:text-gold-soft";
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}

export function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  const a = typeof children === "string" ? accentFor(children) : null;
  return (
    <span
      className={`rounded-full border px-2.5 py-1 font-mono text-[11px] ${
        a ? `${a.border} ${a.soft} ${a.text}` : "border-line text-muted"
      }`}
    >
      {children}
    </span>
  );
}
