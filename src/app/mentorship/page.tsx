import type { Metadata } from "next";
import { program, site } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { accent, Arrow, ButtonLink, Section, SectionHeading } from "@/components/ui";
import { CtaBand, ProgramSteps } from "@/components/sections";
import { Testimonials } from "@/components/Testimonials";
import { BookCallButton, WA_MESSAGES, WhatsAppButton } from "@/components/Contact";

export const metadata: Metadata = {
  title: "SBS Personal Mentoring — One-to-One Full Stack AI Mentorship",
  description:
    "One-to-one, self-paced mentoring in Full Stack AI (MERN + AI) with a weekly roadmap, day-by-day plan and a review every seventh day on Google Meet. Contact to join.",
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
    name: `${program.name} — Full Stack AI Mentorship`,
    description: program.summary,
    provider: { "@type": "Person", name: site.name, url: site.url },
  };

  return (
    <>
      <PageHero
        eyebrow={program.name}
        title={
          <>
            Learn Full Stack AI on a roadmap — <span className="italic text-gold-gradient">not on your own.</span>
          </>
        }
        lead={program.summary}
      />

      {/* At a glance */}
      <Section className="!pb-0">
        <dl className="grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {program.glance.map((g) => (
            <div key={g.k} className="bg-surface p-6">
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">{g.k}</dt>
              <dd className="mt-2 text-[15px] text-text">{g.v}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section>
        <SectionHeading eyebrow="How it works" title="Six days of learning. One day of review." />
        <div className="mt-14">
          <ProgramSteps />
        </div>
      </Section>

      <Section className="border-t border-line">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Focus areas"
            title="Full Stack AI, with a MERN + AI direction."
            lead="Your exact roadmap and pace are set with you during orientation, based on where you are starting from."
          />
          <ul className="grid gap-3 self-end">
            {program.tracks.map((t, i) => (
              <li key={t} className="card flex items-center gap-5 px-6 py-4">
                <span className={`inline-grid h-8 w-8 shrink-0 place-items-center rounded-full font-mono text-xs ${accent(i).soft} ${accent(i).text}`}>{String(i + 1).padStart(2, "0")}</span>
                <span className="text-text">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Join — contact instead of pricing */}
      <Section className="border-t border-line" id="join">
        <div data-reveal className="card relative overflow-hidden p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 glow-gold" />
          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">Join the program</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.08] tracking-tight text-text sm:text-5xl">{program.join.title}</h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{program.join.body}</p>
            </div>
            <div className="flex flex-col gap-3">
              <ButtonLink href="/work-with-me?type=student">
                Send an inquiry <Arrow />
              </ButtonLink>
              <WhatsAppButton message={WA_MESSAGES.student} label="Ask on WhatsApp" />
              <BookCallButton />
              <ButtonLink href={`mailto:${site.email}?subject=${encodeURIComponent(program.name + " inquiry")}`} variant="ghost">
                Email me
              </ButtonLink>
              {site.socials.instagram && (
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-sm text-muted underline-offset-4 transition-colors hover:text-gold-soft hover:underline"
                >
                  or DM me on Instagram
                </a>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* Included / not included */}
      <Section className="border-t border-line">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="card p-8">
            <h2 className="font-serif text-2xl text-text">What you get</h2>
            <ul className="mt-6 space-y-3">
              {program.included.map((x) => (
                <li key={x} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                  <span className="mt-0.5 text-emerald">✓</span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-8">
            <h2 className="font-serif text-2xl text-text">What&apos;s not included</h2>
            <ul className="mt-6 space-y-3">
              {program.notIncluded.map((x) => (
                <li key={x} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                  <span className="mt-0.5 text-faint">—</span>
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-faint">
              Expect independent study, consistent daily effort, progress reporting and active participation in reviews.
            </p>
          </div>
        </div>
      </Section>

      <Testimonials category="student" eyebrow="Learner stories" title="What learners say." />

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
            Apply for {program.name} <Arrow />
          </ButtonLink>
        </div>
      </Section>

      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([courseJsonLd, faqJsonLd]) }} />
    </>
  );
}
