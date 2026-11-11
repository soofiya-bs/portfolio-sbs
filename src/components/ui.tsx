import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
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
    <div className="max-w-2xl">
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
      ? "bg-gold text-ink hover:bg-gold-soft shadow-[0_8px_30px_-10px_rgba(214,177,106,0.6)]"
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
  return (
    <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">{children}</span>
  );
}
