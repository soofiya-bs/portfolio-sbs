import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui";
import { CtaBand, ProjectCards } from "@/components/sections";

export const metadata: Metadata = {
  title: "Projects — Applied AI Work",
  description: "Selected applied AI projects: LLM applications, RAG systems, AI agents and full-stack AI products.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title={
          <>
            Work that <span className="italic text-gold-gradient">shipped.</span>
          </>
        }
        lead="A selection of applied AI systems I've designed and built. Need something similar? Let's talk."
      />
      <Section>
        <ProjectCards />
      </Section>
      <CtaBand />
    </>
  );
}
