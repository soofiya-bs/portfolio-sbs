import Link from "next/link";
import { program, projects, services, education, experience, packages, type Project } from "@/content/site";
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

export const isLive = (status?: string) => !!status && status.toLowerCase().includes("live");

function ExternalIcon() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M9 3h4v4M13 3L7 9M11.5 9.5V13H3V4.5h3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** One project card (used on Home, Projects and Hire me). */
export function ProjectCard({ p, index }: { p: Project; index: number }) {
  const live = isLive(p.status);
  return (
    <article
      data-reveal
      style={{ "--d": `${(index % 2) * 110}ms` } as React.CSSProperties}
      className="card group relative flex flex-col overflow-hidden p-7"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full glow-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-faint">
        <span>/{String(index + 1).padStart(2, "0")}</span>
        {p.status && (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] ${
              live ? "border-emerald/40 bg-emerald/10 text-emerald" : "border-line-strong text-muted"
            }`}
          >
            {live && <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald" />}
            {p.status}
          </span>
        )}
        {p.meta && <span className="text-muted">{p.meta}</span>}
      </div>
      <h3 className="mt-3 font-serif text-2xl leading-snug text-text">{p.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.summary}</p>
      {p.highlights && p.highlights.length > 0 && (
        <ul className="mt-5 space-y-2 border-t border-line pt-5">
          {p.highlights.map((h) => (
            <li key={h} className="flex gap-2.5 text-sm text-text/90">
              <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0 text-emerald" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {h}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      {(p.link || p.repo) && (
        <div className="mt-auto flex flex-wrap gap-3 pt-7">
          {p.link && (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.status === "Live" ? "Visit live app" : "View preview"}: ${p.title} (opens in a new tab)`}
              className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-4 py-2 text-sm font-medium text-gold-soft transition-colors hover:bg-gold hover:text-ink"
            >
              {p.status === "Live" ? "Visit live app" : "View preview"} <ExternalIcon />
            </a>
          )}
          {p.repo && (
            <a
              href={p.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm text-muted transition-colors hover:text-text"
            >
              Code <ExternalIcon />
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export function ProjectCards({ limit }: { limit?: number }) {
  const list = limit ? projects.slice(0, limit) : projects;
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {list.map((p, i) => (
        <ProjectCard key={p.slug} p={p} index={i} />
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

/** Productized AI development offers for companies (no prices — each gets a written quote). */
export function ServicePackages() {
  return (
    <div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {packages.map((p, i) => (
          <article
            key={p.name}
            data-reveal
            style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
            className={`card relative flex flex-col p-7 ${p.featured ? "border-gold/50" : ""}`}
          >
            {p.featured && (
              <span className="absolute -top-3 left-7 rounded-full bg-btn px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-btn-fg">
                Most requested
              </span>
            )}
            <p className={`font-mono text-[11px] uppercase tracking-[0.18em] ${accent(i).text}`}>{p.timeline}</p>
            <h3 className="mt-3 font-serif text-2xl leading-snug text-text">{p.name}</h3>
            <p className="mt-2 text-sm text-faint">For: {p.for}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{p.outcome}</p>
            <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
              {p.includes.map((x) => (
                <li key={x} className="flex gap-2.5 text-sm text-text/90">
                  <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0 text-emerald" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {x}
                </li>
              ))}
            </ul>
            <Link
              href={`/work-with-me?type=project`}
              className={`mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium transition-opacity hover:opacity-75 ${accent(i).text}`}
            >
              Discuss this <Arrow />
            </Link>
          </article>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-muted">
        Every project starts with a discovery call and a written proposal — fixed scope, timeline and cost before any work begins.
      </p>
    </div>
  );
}
