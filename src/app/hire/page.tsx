import type { Metadata } from "next";
import { hire, site, workedWith, whatsappLink } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { accent, Arrow, ButtonLink, Section, SectionHeading } from "@/components/ui";
import { ProjectCards } from "@/components/sections";
import { WhatsAppIcon } from "@/components/Contact";

export const metadata: Metadata = {
  title: "Hire Soofiya — Applied AI Engineer (Remote · Kerala · Hyderabad)",
  description:
    "Applied AI engineer open to remote and on-site roles in Kerala and Hyderabad: LLM applications, RAG, voice AI and automation in production. IIT Madras, Head of AI at Made For Easy, 15+ live projects.",
  alternates: { canonical: "/hire" },
};

const OPPORTUNITY_SUBJECT = encodeURIComponent("Opportunity for Soofiya — Applied AI Engineer");
const WA_RECRUITER = "Hi Soofiya, I'm reaching out about an AI engineering role. Are you open to a quick chat?";

function ContactButtons({ center = false }: { center?: boolean }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${center ? "sm:justify-center" : ""}`}>
      <ButtonLink href={`mailto:${site.email}?subject=${OPPORTUNITY_SUBJECT}`}>
        Email me about a role <Arrow />
      </ButtonLink>
      {site.resumeUrl && (
        <a
          href={site.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-text transition-colors hover:border-gold/60 hover:text-gold-soft"
        >
          Download resume (PDF)
        </a>
      )}
      {site.socials.linkedin && (
        <a
          href={site.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-text transition-colors hover:border-gold/60 hover:text-gold-soft"
        >
          View LinkedIn
        </a>
      )}
      <a
        href={whatsappLink(WA_RECRUITER)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366]/50 px-6 py-3 text-sm font-medium text-text transition-colors hover:border-[#25D366] hover:bg-[#25D366]/10"
      >
        <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
        WhatsApp
      </a>
    </div>
  );
}

export default function HirePage() {
  return (
    <>
      <PageHero
        eyebrow="For recruiters & hiring managers"
        title={
          <>
            Applied AI engineer who ships — <span className="italic text-gold-gradient">and explains it clearly.</span>
          </>
        }
        lead={hire.lead}
      >
        <div className="mt-7 flex flex-wrap gap-2">
          {hire.roles.map((r) => (
            <span key={r} className="rounded-full border border-line-strong bg-ink/40 px-3 py-1 font-mono text-[11px] text-text">
              {r}
            </span>
          ))}
        </div>
        <div className="mt-8 border-t border-line pt-7">
          <ContactButtons />
        </div>
      </PageHero>

      {/* Quick facts */}
      <Section className="!pb-0 !pt-14">
        <dl className="grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {hire.facts.map((f) => (
            <div key={f.k} data-reveal className="bg-surface/90 p-6">
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">{f.k}</dt>
              <dd className="mt-2 text-[15px] leading-snug text-text">{f.v}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Proof of impact */}
      <Section>
        <SectionHeading
          eyebrow="Impact"
          title="Real products, real users."
          lead="Not tutorials or toy demos — systems that organisations depend on."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {hire.impact.map((m, i) => (
            <div key={m.label} data-reveal style={{ "--d": `${i * 90}ms` } as React.CSSProperties} className="card p-6">
              <p className={`font-serif text-4xl ${accent(i).text}`}>{m.metric}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{m.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Built for & taught with</span>
          {workedWith.map((w) => (
            <span key={w} className="text-sm font-medium text-muted">
              {w}
            </span>
          ))}
        </div>
      </Section>

      {/* Featured work */}
      <Section className="border-t border-line">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Selected work" title="Shipped and in use." />
          <ButtonLink href="/projects" variant="ghost" className="shrink-0">
            All projects <Arrow />
          </ButtonLink>
        </div>
        <div className="mt-12">
          <ProjectCards limit={3} />
        </div>
      </Section>

      {/* Skills */}
      <Section className="border-t border-line">
        <SectionHeading eyebrow="Toolkit" title="What I work with." />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {hire.skills.map((g, i) => (
            <div key={g.group} data-reveal style={{ "--d": `${i * 100}ms` } as React.CSSProperties} className="card p-7">
              <h3 className={`font-mono text-xs uppercase tracking-[0.18em] ${accent(i).text}`}>{g.group}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li key={s} className="rounded-lg border border-line bg-ink/40 px-3 py-1.5 text-sm text-text">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* What I bring */}
      <Section className="border-t border-line">
        <SectionHeading eyebrow="What I bring" title="Why teams work well with me." />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {hire.strengths.map((s, i) => (
            <div key={s.t} data-reveal style={{ "--d": `${(i % 2) * 100}ms` } as React.CSSProperties} className="card flex gap-5 p-7">
              <span className={`font-mono text-sm ${accent(i).text}`}>0{i + 1}</span>
              <div>
                <h3 className="text-lg font-medium text-text">{s.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <section className="pb-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <div data-reveal className="glass px-6 py-12 text-center sm:px-12 sm:py-16">
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-text sm:text-5xl">
              Hiring for an AI role? <span className="italic text-gold-gradient">Let&apos;s talk.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Tell me about the role, the team and what you&apos;re building — I read every message personally.
            </p>
            <div className="mt-8">
              <ContactButtons center />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
