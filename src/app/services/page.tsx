import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui";
import { CtaBand, ServiceCards } from "@/components/sections";

export const metadata: Metadata = {
  title: "Services — Mentorship, Expert Talks & AI Development",
  description:
    "Applied AI mentorship for learners, expert talks and workshops for colleges and academies, and AI product development (LLM apps, RAG, agents) for companies.",
  alternates: { canonical: "/services" },
};

const process = [
  { t: "Discovery call", d: "We understand the goal, audience or problem — and decide if I'm the right fit." },
  { t: "Clear proposal", d: "Scope, timeline, deliverables and cost in writing. No surprises." },
  { t: "Delivery", d: "Talks delivered, modules run or software shipped, with regular check-ins." },
  { t: "Follow-through", d: "Recordings, resources, handover docs or support — whatever makes it last." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Teach. Speak. <span className="italic text-gold-gradient">Build.</span>
          </>
        }
        lead="Mentorship for learners, expert sessions for institutions, and AI development for companies — all grounded in hands-on engineering."
      />
      <Section>
        <ServiceCards />
      </Section>
      <Section className="border-t border-line">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">How engagements run</p>
        <ol className="mt-6 grid gap-5 md:grid-cols-4">
          {process.map((p, i) => (
            <li key={p.t} className="card p-6">
              <span className="font-mono text-xs text-gold">0{i + 1}</span>
              <h2 className="mt-3 text-lg font-medium text-text">{p.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p>
            </li>
          ))}
        </ol>
      </Section>
      <CtaBand />
    </>
  );
}
