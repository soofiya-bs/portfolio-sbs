import { program, site, skills, stats } from "@/content/site";
import { Arrow, ButtonLink, Container, Section, SectionHeading } from "@/components/ui";
import { CtaBand, Credentials, ProgramSteps, ProjectCards, ServiceCards } from "@/components/sections";

const roles = [
  {
    k: "Engineer",
    d: "I design and ship applied AI systems — LLM apps, RAG, agents — for real users and real constraints.",
  },
  {
    k: "Teacher",
    d: "I turn industry roadmaps into daily, doable steps and review every learner's work, every week.",
  },
  {
    k: "Founder",
    d: "I run a mentoring program and a development practice, so I think in outcomes, not just code.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 glow-gold" />
        <Container className="relative grid gap-14 pb-20 pt-16 sm:pt-24 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:pb-28">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-2/70 px-3.5 py-1.5 text-xs text-muted backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              IIT Madras · Applied AI Engineering
            </p>
            <h1 className="mt-7 font-serif text-[2.75rem] leading-[1.02] tracking-tight text-text sm:text-6xl lg:text-[4.4rem]">
              Build real AI.
              <br />
              <span className="italic text-gold-gradient">Learn it the right way.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              I&apos;m {site.name} — an applied AI engineer and mentor. I help learners master AI engineering through
              guided, roadmap-based programs, and I help companies ship AI products that work.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/work-with-me?type=student">
                Join the mentorship <Arrow />
              </ButtonLink>
              <ButtonLink href="/work-with-me?type=project" variant="ghost">
                Hire me for a project
              </ButtonLink>
            </div>
          </div>

          {/* Roadmap module card: the "engineer + teacher" visual */}
          <div className="relative">
            <div className="card overflow-hidden bg-ink-2/80 backdrop-blur">
              <div className="flex items-center gap-2 border-b border-line px-5 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="ml-3 font-mono text-[11px] text-faint">roadmap / week-05.md</span>
              </div>
              <div className="p-6 font-mono text-[13px] leading-relaxed">
                <p className="text-faint"># Week 05 — RAG systems</p>
                <p className="mt-3 text-text">
                  <span className="text-gold">goal</span>: ship a document Q&amp;A with evals
                </p>
                <div className="mt-5 space-y-2.5">
                  {[
                    ["Day 1", "Embeddings & chunking", true],
                    ["Day 2", "Vector search + reranking", true],
                    ["Day 3", "Prompting with context", true],
                    ["Day 4", "Evaluation harness", false],
                    ["Day 5", "Deploy & write-up", false],
                  ].map(([d, t, done]) => (
                    <div key={d as string} className="flex items-center gap-3">
                      <span
                        className={`grid h-4 w-4 place-items-center rounded border ${
                          done ? "border-gold bg-gold/15 text-gold" : "border-line-strong"
                        }`}
                      >
                        {done ? "✓" : ""}
                      </span>
                      <span className="w-12 text-faint">{d}</span>
                      <span className={done ? "text-muted line-through decoration-white/20" : "text-text"}>{t}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between rounded-lg border border-gold/30 bg-gold/[0.06] px-4 py-3">
                  <span className="text-gold-soft">Expert review · Saturday</span>
                  <span className="text-[11px] text-faint">60%</span>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -bottom-10 -right-10 -z-10 h-64 w-64 glow-signal" />
          </div>
        </Container>
      </section>

      {/* STATS */}
      <section className="border-y border-line bg-ink-2/40">
        <Container className="grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:border-l md:border-line md:first:border-l-0">
              <p className="font-serif text-4xl text-text">{s.value}</p>
              <p className="mt-1 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* THREE ROLES */}
      <Section>
        <SectionHeading
          eyebrow="Who I am"
          title={
            <>
              One person, <span className="italic text-gold-gradient">three crafts.</span>
            </>
          }
          lead="Teaching makes me a sharper engineer. Building makes me a more honest teacher. Running both makes me accountable for results."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {roles.map((r, i) => (
            <div key={r.k} className="card p-7">
              <p className="font-mono text-xs text-gold">0{i + 1}</p>
              <h3 className="mt-4 font-serif text-3xl text-text">{r.k}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{r.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PROGRAM */}
      <Section className="border-t border-line">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="The mentorship"
            title="Guided self-learning, reviewed every week."
            lead={program.summary}
          />
          <ButtonLink href="/mentorship" variant="ghost" className="shrink-0">
            How it works <Arrow />
          </ButtonLink>
        </div>
        <div className="mt-14">
          <ProgramSteps />
        </div>
      </Section>

      {/* SERVICES */}
      <Section className="border-t border-line">
        <SectionHeading
          eyebrow="Services"
          title="Three ways to work together."
          lead="For learners who want structure, institutions that want an expert in the room, and companies that want AI shipped."
        />
        <div className="mt-14">
          <ServiceCards />
        </div>
      </Section>

      {/* PROJECTS */}
      <Section className="border-t border-line">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Selected work" title="Things I have built." />
          <ButtonLink href="/projects" variant="ghost" className="shrink-0">
            All projects <Arrow />
          </ButtonLink>
        </div>
        <div className="mt-14">
          <ProjectCards limit={4} />
        </div>
        <div className="mt-10 flex flex-wrap gap-2">
          {skills.map((s) => (
            <span key={s} className="rounded-full border border-line px-3 py-1.5 font-mono text-xs text-muted">
              {s}
            </span>
          ))}
        </div>
      </Section>

      {/* CREDENTIALS */}
      <Section className="border-t border-line">
        <SectionHeading eyebrow="Background" title="Trained at IIT Madras. Tested in industry." />
        <div className="mt-14">
          <Credentials />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
