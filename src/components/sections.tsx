import Link from "next/link";
import { program, projects, services, education, experience } from "@/content/site";
import { accent, Arrow, ButtonLink, Container, Tag } from "./ui";
import { WhatsAppButton } from "./Contact";

export function ServiceCards() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {services.map((s, i) => {
        const a = accent(i);
        return (
        <article key={s.id} id={s.id} data-reveal style={{ "--d": `${i * 110}ms` } as React.CSSProperties} className="card group flex scroll-mt-24 flex-col overflow-hidden p-7">
          <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 ${a.bg}`} />
          <div className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 ${a.glow}`} />
          <p className={`relative font-mono text-[11px] uppercase tracking-[0.2em] ${a.text}`}>{s.eyebrow}</p>
          <h3 className="mt-3 font-serif text-2xl text-text">{s.title}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
          <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
            {s.points.map((p) => (
              <li key={p} className="flex gap-3 text-sm text-text/85">
                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${a.bg}`} />
                {p}
              </li>
            ))}
          </ul>
          <Link
            href={s.cta.href}
            className={`mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium transition-opacity hover:opacity-75 ${a.text}`}
          >
            {s.cta.label} <Arrow />
          </Link>
        </article>
        );
      })}
    </div>
  );
}

export function ProgramSteps() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line md:grid-cols-4">
      {program.steps.map((step, i) => (
        <li key={step.title} data-reveal style={{ "--d": `${i * 100}ms` } as React.CSSProperties} className="relative bg-surface/90 p-7">
          <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-0.5 ${accent(i).bg}`} />
          <span className={`inline-grid h-8 w-8 place-items-center rounded-full font-mono text-xs ${accent(i).soft} ${accent(i).text}`}>0{i + 1}</span>
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
        <article key={p.slug} data-reveal style={{ "--d": `${(i % 2) * 110}ms` } as React.CSSProperties} className="card group relative overflow-hidden p-7">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full glow-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <p className="font-mono text-xs text-faint">
            /{String(i + 1).padStart(2, "0")}
            {p.meta && <span className="ml-3 text-muted">{p.meta}</span>}
          </p>
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

function kindStyle(kind: string) {
  if (kind === "Training") return { dot: "bg-gold", text: "text-gold" };
  if (kind === "Development") return { dot: "bg-royal", text: "text-royal" };
  return { dot: "bg-emerald", text: "text-emerald" };
}

export function Credentials() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
      <div data-reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Education</p>
        {education.map((e, i) => (
          <div key={e.school} className={`card mt-4 ${i === 0 ? "p-7" : "p-6"}`}>
            <div className="flex items-center gap-3">
              {i === 0 && (
                <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/50 font-serif text-sm text-gold">IIT</span>
              )}
              <span className="font-mono text-xs text-faint">{e.period}</span>
            </div>
            <h3 className={`font-serif leading-snug text-text ${i === 0 ? "mt-5 text-2xl" : "mt-3 text-lg"}`}>{e.school}</h3>
            <p className="mt-2 text-[15px] text-gold-soft">{e.degree}</p>
            {e.note && <p className="mt-3 text-sm leading-relaxed text-muted">{e.note}</p>}
          </div>
        ))}
      </div>
      <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Experience</p>
        <div className="glass mt-4 px-6 py-7 sm:px-8 sm:py-8">
        <ol className="border-l border-line">
          {experience.map((x) => (
            <li key={x.title + x.org} className="relative pb-8 pl-7 last:pb-0">
              <span className={`absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full ${kindStyle(x.kind).dot}`} />
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className={`font-mono text-[11px] uppercase tracking-[0.18em] ${kindStyle(x.kind).text}`}>
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
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div data-reveal className="relative overflow-hidden rounded-[1.75rem] border border-line bg-ink-2/80 px-7 py-14 sm:px-14 sm:py-20">
          <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 glow-gold" />
          <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 glow-royal" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-80 w-80 glow-plum" />
          <div className="pointer-events-none absolute -right-10 -top-20 h-72 w-72 glow-emerald" />
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
              <WhatsAppButton />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
