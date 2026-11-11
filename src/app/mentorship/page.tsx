import type { Metadata } from "next";
import { program, site } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { Arrow, ButtonLink, Section, SectionHeading } from "@/components/ui";
import { CtaBand, ProgramSteps } from "@/components/sections";

export const metadata: Metadata = {
  title: "Applied AI Engineering Mentorship",
  description:
    "A guided self-learning program on industry-approved applied AI engineering roadmaps, with weekly and daily modules and a live expert review every week.",
  alternates: { canonical: "/mentorship" },
};

export default function MentorshipPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: program.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${program.name} — Applied AI Engineering Mentorship`,
    description: program.summary,
    provider: { "@type": "Person", name: site.name, url: site.url },
  };

  return (
    <>
      <PageHero
        eyebrow="The mentorship"
        title={
          <>
            Learn applied AI on a roadmap — <span className="italic text-gold-gradient">not on your own.</span>
          </>
        }
        lead={program.summary}
      />

      <Section>
        <SectionHeading eyebrow="How it works" title="A clear path, every day of every week." />
        <div className="mt-14">
          <ProgramSteps />
        </div>
      </Section>

      <Section className="border-t border-line">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="What you'll learn"
            title="The skills AI teams hire for."
            lead="Each track maps to weekly modules. You leave with projects you can show, not just certificates."
          />
          <ul className="grid gap-3 self-end">
            {program.tracks.map((t, i) => (
              <li key={t} className="card flex items-center gap-5 px-6 py-4">
                <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-text">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="border-t border-line">
        <SectionHeading eyebrow="Questions" title="Before you apply." />
        <div className="mt-12 divide-y divide-line border-y border-line">
          {program.faqs.map((f) => (
            <details key={f.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg text-text">
                {f.q}
                <span className="font-mono text-gold transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 max-w-3xl leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-12">
          <ButtonLink href="/work-with-me?type=student">
            Apply for the mentorship <Arrow />
          </ButtonLink>
        </div>
      </Section>

      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([courseJsonLd, faqJsonLd]) }} />
    </>
  );
}
