import Image from "next/image";
import Link from "next/link";
import { program, site, skills, stats, workedWith } from "@/content/site";
import { accent, Arrow, ButtonLink, Container, Section, SectionHeading } from "@/components/ui";
import { CtaBand, Credentials, ProgramSteps, ProjectCards, ServiceCards } from "@/components/sections";
import { CountUp, Marquee, RotatingWord } from "@/components/motion";
import { PostGrid } from "@/components/posts";
import { getAllPosts } from "@/lib/posts";
import { Testimonials } from "@/components/Testimonials";
import { GalleryPreview } from "@/components/GalleryPreview";

const roles = [
  {
    k: "Engineer",
    d: "I design and ship applied AI systems — LLM apps, RAG, agents — for real users and real constraints.",
  },
  {
    k: "Mentor",
    d: "I turn industry roadmaps into daily, doable steps and review every learner's work, every week.",
  },
  {
    k: "Founder",
    d: "I run a mentoring program and a development practice, so I think in outcomes, not just code.",
  },
];

/** Sample week from the roadmap: the "engineer + teacher" visual. */
function RoadmapCard() {
  return (
<div className="relative">
  <div className="card overflow-hidden">
    <div className="flex items-center gap-2 border-b border-line px-5 py-3">
      <span className="h-2.5 w-2.5 rounded-full bg-text/15" />
      <span className="h-2.5 w-2.5 rounded-full bg-text/15" />
      <span className="h-2.5 w-2.5 rounded-full bg-text/15" />
      <span className="ml-3 font-mono text-[11px] text-faint">roadmap / week-05.md</span>
    </div>
    <div className="p-6 font-mono text-[13px] leading-relaxed">
      <p className="text-faint"># Week 05 — AI in your MERN app</p>
      <p className="mt-3 text-text">
        <span className="text-gold">goal</span>: add an AI assistant to a React + Node app
      </p>
      <div className="mt-5 space-y-2.5">
        {[
          ["Day 1", "Calling an LLM from Node.js", true],
          ["Day 2", "Prompts & structured output", true],
          ["Day 3", "Chat UI in React", true],
          ["Day 4", "Storing history in MongoDB", true],
          ["Day 5", "Adding your own data", false],
          ["Day 6", "Deploy + explain it aloud", false],
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
            <span className={done ? "text-muted line-through decoration-text/30" : "text-text"}>{t}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between rounded-lg border border-gold/30 bg-gold/[0.06] px-4 py-3">
        <span className="text-gold-soft">Day 7 · Review on Google Meet</span>
        <span className="text-[11px] text-faint">4/6</span>
      </div>
    </div>
  </div>
  <div className="pointer-events-none absolute -bottom-10 -right-10 -z-10 h-64 w-64 glow-gold" />
</div>
  );
}

export default function Home() {
  const latest = getAllPosts().slice(0, 3);
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <Container className="relative grid gap-14 pb-20 pt-16 sm:pt-24 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:pb-28">
          <div>
            <p data-reveal className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 font-mono text-[11px] text-muted">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="cursor">~ iitm · applied-ai · mentoring</span>
            </p>
            <h1 data-reveal style={{ "--d": "80ms" } as React.CSSProperties} className="mt-7 font-serif text-[2.75rem] leading-[1.02] tracking-tight text-text sm:text-6xl lg:text-[4.4rem]">
              Build real <RotatingWord words={["AI.", "LLM apps.", "AI agents.", "automations."]} />
              <br />
              <span className="italic text-gold-gradient">Learn it the right way.</span>
            </h1>
            <p data-reveal style={{ "--d": "160ms" } as React.CSSProperties} className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              I&apos;m {site.name} — an applied AI engineer helping self-learners through guided self-learning. I
              also build AI products and automations for companies.
            </p>
            <div data-reveal style={{ "--d": "240ms" } as React.CSSProperties} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/work-with-me?type=student">
                Join the mentorship <Arrow />
              </ButtonLink>
              <ButtonLink href="/work-with-me?type=project" variant="ghost">
                Hire me for a project
              </ButtonLink>
            </div>
            <p data-reveal style={{ "--d": "320ms" } as React.CSSProperties} className="glass glass-neutral mt-7 inline-flex flex-wrap items-center gap-x-4 gap-y-2 !rounded-2xl px-4 py-3 text-sm text-muted">
              <span className="inline-flex items-center gap-2">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald" />
                Open to AI engineer roles · remote &amp; on-site · Kerala, Hyderabad
              </span>
              <Link href="/hire" className="font-medium text-gold-soft underline-offset-4 hover:underline">
                For recruiters →
              </Link>
            </p>
          </div>

          {/* Portrait with floating credibility chips */}
          <div data-reveal style={{ "--d": "200ms" } as React.CSSProperties} className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="pointer-events-none absolute -bottom-12 -right-12 -z-10 h-72 w-72 glow-signal" />
            <div className="pointer-events-none absolute -left-6 -top-6 h-full w-full rounded-[2rem] border border-gold/30" />
            <div className="card relative overflow-hidden !rounded-[2rem] p-0">
              <Image
                src="/portrait.jpg"
                alt={`${site.name}, applied AI engineer and mentor`}
                width={1280}
                height={1280}
                priority
                sizes="(min-width: 1024px) 440px, 90vw"
                className="aspect-[4/5] w-full origin-[52%_75%] scale-[1.3] object-cover"
              />
            </div>
            <div className="float-slow absolute -left-4 bottom-8 rounded-2xl border border-line bg-surface/90 px-4 py-3 shadow-lg sm:-left-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">Studying at</p>
              <p className="mt-0.5 font-serif text-lg text-text">IIT Madras</p>
            </div>
            <div className="float-slower absolute -right-3 top-8 rounded-2xl border border-line bg-surface/90 px-4 py-3 shadow-lg sm:-right-6">
              <p className="font-serif text-2xl text-text">6,900+</p>
              <p className="text-xs text-muted">self-learners on Instagram</p>
            </div>
          </div>
        </Container>
      </section>

      {/* TICKER */}
      <Marquee items={skills} />

      {/* STATS */}
      <section className="border-b border-line bg-surface/40">
        <Container className="flex flex-wrap justify-center gap-y-8 py-10">
          {stats.map((s, i) => (
            <div key={s.label} data-reveal style={{ "--d": `${i * 90}ms` } as React.CSSProperties} className="basis-1/2 px-2 text-center md:basis-1/4 xl:basis-[14.285%]">
              <p className={`font-serif text-4xl ${accent(i).text}`}>
                <CountUp value={s.value} />
              </p>
              <p className="mt-1 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* WORKED WITH */}
      <section className="border-b border-line">
        <Container className="flex flex-col gap-4 py-8 md:flex-row md:items-center md:gap-10">
          <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Built for &amp; taught with</p>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {workedWith.map((w) => (
              <li key={w} className="text-sm font-medium text-muted">
                {w}
              </li>
            ))}
          </ul>
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
          lead="Mentoring makes me a sharper engineer. Building makes me a more honest mentor. Running both makes me accountable for results."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {roles.map((r, i) => (
            <div key={r.k} data-reveal style={{ "--d": `${i * 110}ms` } as React.CSSProperties} className="card overflow-hidden p-7">
              <div className={`pointer-events-none absolute -right-14 -top-14 h-44 w-44 ${accent(i + 1).glow}`} />
              <span className={`relative inline-grid h-9 w-9 place-items-center rounded-full font-mono text-xs ${accent(i + 1).soft} ${accent(i + 1).text}`}>0{i + 1}</span>
              <h3 className="relative mt-4 font-serif text-3xl text-text">{r.k}</h3>
              <p className="relative mt-3 text-[15px] leading-relaxed text-muted">{r.d}</p>
            </div>
          ))}
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
      </Section>

      {/* PROGRAM */}
      <Section className="border-t border-line">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow={program.name}
              title="Guided self-learning, reviewed every week."
              lead={program.summary}
            />
            <ButtonLink href="/mentorship" variant="ghost" className="mt-8">
              How it works <Arrow />
            </ButtonLink>
          </div>
          <RoadmapCard />
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

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* CREDENTIALS */}
      <Section className="border-t border-line">
        <SectionHeading eyebrow="Background" title="Trained at IIT Madras. Tested in industry." />
        <div className="mt-14">
          <Credentials />
        </div>
      </Section>

      {/* GALLERY */}
      <GalleryPreview />

      {/* LATEST WRITING */}
      {latest.length > 0 && (
        <Section className="border-t border-line">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Blog & tutorials"
              title="Learn something today."
              lead="Plain-language articles and hands-on tutorials for self-learners in applied AI."
            />
            <div className="flex shrink-0 gap-3">
              <ButtonLink href="/blog" variant="ghost">
                Blog <Arrow />
              </ButtonLink>
              <ButtonLink href="/tutorials" variant="ghost">
                Tutorials <Arrow />
              </ButtonLink>
            </div>
          </div>
          <div className="mt-14">
            <PostGrid posts={latest} showKind />
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
