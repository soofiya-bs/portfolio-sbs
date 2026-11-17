import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { Arrow, ButtonLink, Container, Section } from "@/components/ui";
import { ProjectExplorer } from "@/components/ProjectExplorer";
import { isLive } from "@/components/sections";

export const metadata: Metadata = {
  title: "Projects — Applied AI Work",
  description:
    "Applied AI projects in production: an assessment platform with ~600 users, an AI resume evaluator used in hiring, a voice-AI e-commerce platform, and more.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const liveCount = projects.filter((p) => isLive(p.status)).length;
  const summary = [
    { k: String(projects.length), v: "featured projects" },
    { k: String(liveCount), v: "live now, with links" },
    { k: "~600", v: "active users on one platform" },
    { k: "4", v: "industries: EdTech, hiring, e-commerce, healthcare" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title={
          <>
            Work that <span className="italic text-gold-gradient">shipped.</span>
          </>
        }
        lead="Applied AI systems I've designed and built — most of them live and used by real teams every day."
      >
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-7 sm:grid-cols-4">
          {summary.map((s) => (
            <div key={s.v}>
              <dt className="font-serif text-3xl text-text">{s.k}</dt>
              <dd className="mt-1 text-xs leading-snug text-muted">{s.v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <Section className="!pt-14">
        <ProjectExplorer projects={projects} />
      </Section>

      {/* What to do next, depending on who's reading */}
      <section className="pb-24">
        <Container>
          <div data-reveal className="glass grid gap-8 px-6 py-10 sm:px-12 sm:py-14 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">Next step</p>
              <h2 className="mt-4 font-serif text-3xl leading-[1.1] tracking-tight text-text sm:text-4xl">
                Have a project like these? <span className="italic text-gold-gradient">Let&apos;s build it.</span>
              </h2>
              <p className="mt-4 max-w-lg text-muted">
                Tell me what you&apos;re building — I&apos;ll come back with a clear scope, timeline and proposal.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <ButtonLink href="/work-with-me?type=project">
                Start a project <Arrow />
              </ButtonLink>
              <ButtonLink href="/services#packages" variant="ghost">
                See AI development packages
              </ButtonLink>
              <Link href="/hire" className="text-center text-sm text-muted underline-offset-4 transition-colors hover:text-gold-soft hover:underline">
                Hiring? See my profile for recruiters →
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
