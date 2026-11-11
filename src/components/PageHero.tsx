import type { ReactNode } from "react";
import { Container, SectionHeading } from "./ui";

export function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="pointer-events-none absolute -top-48 left-1/4 h-[420px] w-[640px] glow-gold" />
      <Container className="relative pb-16 pt-16 sm:pb-20 sm:pt-24">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} lead={lead} />
      </Container>
    </section>
  );
}
