import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { WA_MESSAGES, WhatsAppButton } from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Soofiya Binth Shajahan about AI mentorship, expert talks for institutions, AI development projects or Applied AI Engineer roles.",
  alternates: { canonical: "/contact" },
};

const ROLE_PARAM: Record<string, string> = {
  student: "Student",
  company: "Company",
  project: "Company",
  institution: "Institution",
  recruiter: "Recruiter",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const defaultRole = (type && ROLE_PARAM[type.toLowerCase()]) || "";

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s <span className="italic text-gold-gradient">talk.</span>
          </>
        }
        lead="Mentorship, an expert talk, an AI project or a role: tell me a little about it and I'll reply personally, usually within 1–2 working days."
      />

      <Section className="!pt-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div data-reveal className="card p-6 sm:p-10">
            <h2 className="font-serif text-3xl text-text">Send a message</h2>
            <div className="mt-8">
              <ContactForm defaultRole={defaultRole} />
            </div>
          </div>

          <aside data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className="space-y-5" aria-labelledby="contact-direct">
            <div className="glass p-7">
              <h2 id="contact-direct" className="font-serif text-2xl text-text">
                Prefer to reach me directly?
              </h2>
              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Email</dt>
                  <dd className="mt-1.5">
                    <a href={`mailto:${site.email}`} className="break-all text-gold-soft underline-offset-4 hover:underline">
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">WhatsApp</dt>
                  <dd className="mt-3">
                    <WhatsAppButton message={WA_MESSAGES.general} />
                  </dd>
                </div>
              </dl>
            </div>
            <div className="card p-7 text-sm leading-relaxed text-muted">
              <p>
                <span className="font-medium text-text">Joining the mentorship?</span> The application form asks a few
                more questions about your background and goals, so the orientation call is useful from minute one.
              </p>
              <Link href="/work-with-me?type=student" className="mt-4 inline-block font-medium text-gold-soft underline-offset-4 hover:underline">
                Apply for mentorship →
              </Link>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
