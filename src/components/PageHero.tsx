import type { ReactNode } from "react";
import { Container, SectionHeading } from "./ui";

export function PageHero({
  eyebrow,
  title,
  lead,
  glass = true,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  /** show the heading on a frosted-glass panel */
  glass?: boolean;
  /** extra content under the heading (e.g. a facts row) */
  children?: ReactNode;
}) {
  const heading = <SectionHeading as="h1" eyebrow={eyebrow} title={title} lead={lead} />;
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="pointer-events-none absolute -top-48 left-1/4 h-[420px] w-[640px] glow-gold" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[380px] w-[520px] glow-plum" />
      <Container className="relative pb-16 pt-16 sm:pb-20 sm:pt-24">
        {glass ? (
          <div data-reveal className="glass max-w-3xl px-6 py-8 sm:px-10 sm:py-11">
            {heading}
            {children}
          </div>
        ) : (
          <>
            {heading}
            {children}
          </>
        )}
      </Container>
    </section>
  );
}
