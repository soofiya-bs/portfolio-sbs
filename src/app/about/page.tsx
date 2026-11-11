import type { Metadata } from "next";
import { site, skills } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui";
import { CtaBand, Credentials } from "@/components/sections";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is an applied AI engineer, mentor and founder studying at IIT Madras, with experience in both AI training and AI product development.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            Engineer by craft. <span className="italic text-gold-gradient">Teacher by choice.</span>
          </>
        }
        lead={site.tagline}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          {/* Replace with <Image src="/portrait.jpg" ... /> once you add a photo to /public */}
          <div className="card relative aspect-[4/5] overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-60" />
            <div className="absolute inset-0 grid place-items-center">
              <span className="font-serif text-7xl text-gold/70">{site.shortName}</span>
            </div>
            <p className="absolute bottom-5 left-5 font-mono text-[11px] text-faint">[ your portrait here ]</p>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-muted">
            <p>
              <span className="text-text">[Write 2–3 sentences about your story.]</span> I&apos;m {site.name}, currently
              studying at IIT Madras and working as an applied AI engineer. I care about one thing: turning AI from
              something people watch videos about into something they can actually build.
            </p>
            <p>
              On the teaching side, I run a guided self-learning program built on industry-approved roadmaps — weekly
              and daily modules with an expert review every single week. I also speak at colleges, academies and
              companies about applied AI.
            </p>
            <p>
              On the engineering side, I design and ship LLM applications, RAG systems and AI agents for teams that need
              them to work in production, not just in a demo.
            </p>
            <div className="flex flex-wrap gap-2 pt-4">
              {skills.map((s) => (
                <span key={s} className="rounded-full border border-line px-3 py-1.5 font-mono text-xs text-muted">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t border-line">
        <Credentials />
      </Section>

      <CtaBand />
    </>
  );
}
