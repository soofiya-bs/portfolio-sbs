import type { Metadata } from "next";
import Image from "next/image";
import { bio, certifications, site, skills, writing } from "@/content/site";
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
          <div className="relative self-start">
            <div className="pointer-events-none absolute -left-5 -top-5 h-full w-full rounded-[1.5rem] border border-gold/30" />
            <div className="card relative overflow-hidden !rounded-[1.5rem] p-0">
              <Image
                src="/portrait.jpg"
                alt={`Portrait of ${site.name}`}
                width={1280}
                height={1280}
                sizes="(min-width: 1024px) 420px, 90vw"
                className="aspect-[4/5] w-full origin-[52%_75%] scale-[1.3] object-cover"
              />
            </div>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-muted">
            {bio.map((para, i) => (
              <p key={i} className={i === 0 ? "text-text" : ""}>
                {para}
              </p>
            ))}
            <p className="text-base">
              Open to Applied AI Engineer / AI Developer roles in Hyderabad, selected AI automation and LLM application
              projects, and collaborations on useful, deployed AI products.
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

      <Section className="border-t border-line">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Writing</p>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {writing.map((w) => (
                <li key={w.title} className="py-4">
                  {w.href ? (
                    <a href={w.href} target="_blank" rel="noopener noreferrer" className="font-serif text-xl text-text hover:text-gold-soft">
                      {w.title}
                    </a>
                  ) : (
                    <span className="font-serif text-xl text-text">{w.title}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Certifications & workshops</p>
            <ul className="mt-4 space-y-3">
              {certifications.map((c) => (
                <li key={c} className="flex gap-3 text-[15px] text-muted">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
