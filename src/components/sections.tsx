import Link from "next/link";
import { program, projects, services, education, experience } from "@/content/site";
import { Arrow, ButtonLink, Container, Tag } from "./ui";

export function ServiceCards() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {services.map((s) => (
        <article key={s.id} id={s.id} className="card group flex scroll-mt-24 flex-col p-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">{s.eyebrow}</p>
          <h3 className="mt-3 font-serif text-2xl text-text">{s.title}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
          <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
            {s.points.map((p) => (
              <li key={p} className="flex gap-3 text-sm text-text/85">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                {p}
              </li>
            ))}
          </ul>
          <Link
            href={s.cta.href}
            className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium text-gold-soft transition-colors hover:text-gold"
          >
            {s.cta.label} <Arrow />
          </Link>
        </article>
      ))}
    </div>
  );
}

export function ProgramSteps() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line md:grid-cols-4">
      {program.steps.map((step, i) => (
        <li key={step.title} className="relative bg-ink p-7">
          <span className="font-mono text-xs text-gold">0{i + 1}</span>
          <h3 className="mt-4 text-lg font-medium text-text">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function ProjectCards({ limit }: { limit?: number }) {
  const list = limit ? projects.slice(0, limit) : projects;
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {list.map((p, i) => (
        <article key={p.slug} className="card group relative overflow-hidden p-7">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full glow-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <p className="font-mono text-xs text-faint">/{String(i + 1).padStart(2, "0")}</p>
          <h3 className="mt-3 font-serif text-2xl leading-snug text-text">{p.title}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          {(p.link || p.repo) && (
            <div className="mt-6 flex gap-5 text-sm">
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gold-soft hover:text-gold">
                  Live <Arrow />
                </a>
              )}
              {p.repo && (
                <a href={p.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted hover:text-text">
                  Code <Arrow />
                </a>
              )}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

export function Credentials() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Education</p>
        {education.map((e) => (
          <div key={e.school} className="card mt-4 p-7">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/50 font-serif text-sm text-gold">IIT</span>
              <span className="font-mono text-xs text-faint">{e.period}</span>
            </div>
            <h3 className="mt-5 font-serif text-2xl leading-snug text-text">{e.school}</h3>
            <p className="mt-2 text-[15px] text-gold-soft">{e.degree}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{e.note}</p>
          </div>
        ))}
      </div>
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Experience</p>
        <ol className="mt-4 border-l border-line">
          {experience.map((x) => (
            <li key={x.title + x.org} className="relative pb-8 pl-7 last:pb-0">
              <span className={`absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full ${x.kind === "Training" ? "bg-gold" : "bg-signal"}`} />
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className={`font-mono text-[11px] uppercase tracking-[0.18em] ${x.kind === "Training" ? "text-gold" : "text-signal"}`}>
                  {x.kind}
                </span>
                <span className="font-mono text-xs text-faint">{x.period}</span>
              </div>
              <h3 className="mt-2 text-lg font-medium text-text">
                {x.title} <span className="text-muted">· {x.org}</span>
              </h3>
              <ul className="mt-2 space-y-1.5">
                {x.points.map((pt) => (
                  <li key={pt} className="text-sm leading-relaxed text-muted">
                    {pt}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-ink-2 px-7 py-14 sm:px-14 sm:py-20">
          <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 glow-gold" />
          <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 glow-signal" />
          <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <h2 className="font-serif text-4xl leading-[1.08] tracking-tight text-text sm:text-5xl">
                Learn with me, <span className="italic text-gold-gradient">or build with me.</span>
              </h2>
              <p className="mt-5 max-w-lg text-lg text-muted">
                Whether you are a learner, an institution or a company with an AI problem — there is a clear way in.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <ButtonLink href="/work-with-me?type=student">
                Join the mentorship <Arrow />
              </ButtonLink>
              <ButtonLink href="/work-with-me?type=project" variant="ghost">
                Hire me for a project <Arrow />
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
