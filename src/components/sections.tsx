import Link from "next/link";
import { program, projects, services, education, experience, packages, skillGroups, type Project } from "@/content/site";
import { accent, Arrow, ButtonLink, Container, showsText, Tag, TodoText } from "./ui";

export function ServiceCards({ exclude = [] }: { exclude?: string[] }) {
  const list = services.filter((s) => !exclude.includes(s.id));
  return (
    <div className={`grid gap-5 ${list.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
      {list.map((s, i) => {
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

/** Static, grouped skills list (replaces the old scrolling ticker). */
export function SkillGroups({ heading = "Toolkit" }: { heading?: string }) {
  return (
    <div>
      <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">{heading}</h3>
      <dl className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
        {skillGroups.map((g, i) => (
          <div key={g.group}>
            <dt className={`font-mono text-[11px] uppercase tracking-[0.16em] ${i === skillGroups.length - 1 ? "text-faint" : accent(i).text}`}>{g.group}</dt>
            <dd className="mt-3">
              <ul className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li key={s} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                    {s}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
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

function statusStyle(status: string) {
  const s = status.toLowerCase();
  if (s.includes("live")) return "border-emerald/40 bg-emerald/10 text-emerald";
  if (s.includes("mvp") || s.includes("production")) return "border-royal/40 bg-royal/10 text-royal";
  return "border-line-strong text-muted";
}

/** One row of a project card: a small label and its text (hidden on the live site if it is only a [TODO]). */
function ProjectFact({ label, text, strong = false }: { label: string; text: string; strong?: boolean }) {
  if (!showsText(text)) return null;
  return (
    <div className="grid gap-1 sm:grid-cols-[5.5rem_1fr] sm:gap-4">
      <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint sm:pt-0.5">{label}</dt>
      <dd className={`text-sm leading-relaxed ${strong ? "text-text" : "text-muted"}`}>
        <TodoText text={text} />
      </dd>
    </div>
  );
}

/**
 * One project card (Home, Projects, Hire me). Every card has the same structure:
 * status + meta, title, problem, my role, result, tags, then a link or a private note.
 */
export function ProjectCard({ p, index }: { p: Project; index: number }) {
  const live = isLive(p.status);
  const linkLabel = live ? "Visit live app" : "View preview";
  return (
    <article
      data-reveal
      style={{ "--d": `${(index % 2) * 110}ms` } as React.CSSProperties}
      className="card group relative flex flex-col overflow-hidden p-7"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full glow-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs">
        {showsText(p.status) && (
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] ${statusStyle(p.status)}`}>
            {live && <span aria-hidden="true" className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald" />}
            <span className="sr-only">Status: </span>
            <TodoText text={p.status} />
          </span>
        )}
        {p.meta && <span className="text-muted">{p.meta}</span>}
      </div>
      <h3 className="relative mt-4 font-serif text-2xl leading-snug text-text">{p.title}</h3>
      <dl className="relative mt-5 space-y-3 border-t border-line pt-5">
        <ProjectFact label="Problem" text={p.problem} />
        <ProjectFact label="My role" text={p.role} />
        <ProjectFact label="Result" text={p.result} strong />
      </dl>
      <ul className="relative mt-6 flex flex-wrap gap-2" aria-label="Tech and topics">
        {p.tags.map((t) => (
          <li key={t}>
            <Tag>{t}</Tag>
          </li>
        ))}
      </ul>
      <div className="relative mt-auto flex flex-wrap items-center gap-3 pt-7">
        {p.link ? (
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${linkLabel}: ${p.title} (opens in a new tab)`}
            className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-4 py-2 text-sm font-medium text-gold-soft transition-colors hover:bg-gold hover:text-ink"
          >
            {linkLabel} <ExternalIcon />
          </a>
        ) : (
          <p className="inline-flex items-center gap-2 text-sm text-muted">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <rect x="3" y="7" width="10" height="7" rx="1.5" />
              <path d="M5.5 7V5a2.5 2.5 0 015 0v2" />
            </svg>
            {p.privateNote ?? "Private client project, details on request"}
          </p>
        )}
        {p.repo && (
          <a
            href={p.repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Source code: ${p.title} (opens in a new tab)`}
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm text-muted transition-colors hover:text-text"
          >
            Code <ExternalIcon />
          </a>
        )}
      </div>
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

type Role = (typeof experience)[number];
const isFeatured = (x: Role) => "featured" in x && !!x.featured;

function ExperienceItem({ x }: { x: Role }) {
  const points = x.points.filter((pt) => showsText(pt));
  return (
    <li className="relative pb-8 pl-7 last:pb-0">
      <span aria-hidden="true" className={`absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full ${kindStyle(x.kind).dot}`} />
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className={`font-mono text-[11px] uppercase tracking-[0.18em] ${kindStyle(x.kind).text}`}>{x.kind}</span>
        <span className="font-mono text-xs text-faint">{x.period}</span>
      </div>
      <h4 className="mt-2 text-lg font-medium text-text">
        {x.title} <span className="text-muted">· {x.org}</span>
      </h4>
      {points.length > 0 && (
        <ul className="mt-3 space-y-2">
          {points.map((pt) => (
            <li key={pt} className="flex gap-2.5 text-sm leading-relaxed text-muted">
              <span aria-hidden="true" className={`mt-2 h-1 w-1 shrink-0 rounded-full ${kindStyle(x.kind).dot}`} />
              <TodoText text={pt} />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function Credentials() {
  const featured = experience.filter(isFeatured);
  const earlier = experience.filter((x) => !isFeatured(x));
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
      <div data-reveal>
        <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Education</h3>
        {education.map((e, i) => (
          <div key={e.school} className={`card mt-4 ${i === 0 ? "p-7" : "p-6"}`}>
            <div className="flex items-center gap-3">
              {i === 0 && (
                <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full border border-gold/50 font-serif text-sm text-gold">IIT</span>
              )}
              <span className="font-mono text-xs text-faint">{e.period}</span>
            </div>
            <h4 className={`font-serif leading-snug text-text ${i === 0 ? "mt-5 text-2xl" : "mt-3 text-lg"}`}>{e.school}</h4>
            <p className="mt-2 text-[15px] text-gold-soft">{e.degree}</p>
            {e.note && showsText(e.note) && (
              <p className="mt-3 text-sm leading-relaxed text-muted">
                <TodoText text={e.note} />
              </p>
            )}
          </div>
        ))}
      </div>
      <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
        <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Experience</h3>
        <div className="glass mt-4 px-6 py-7 sm:px-8 sm:py-8">
          <ol className="border-l border-line">
            {featured.map((x) => (
              <ExperienceItem key={x.title + x.org} x={x} />
            ))}
          </ol>
          {earlier.length > 0 && (
            <details className="group mt-8 border-t border-line pt-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md text-sm font-medium text-text [&::-webkit-details-marker]:hidden">
                <span>
                  Earlier experience <span className="text-muted">· teaching, tutoring &amp; business ({earlier.length})</span>
                </span>
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="shrink-0 transition-transform group-open:rotate-180">
                  <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <ul className="mt-5 space-y-3">
                {earlier.map((x) => (
                  <li key={x.title + x.org} className="grid gap-1 text-sm sm:grid-cols-[1fr_auto] sm:gap-4">
                    <span className="text-text">
                      {x.title} <span className="text-muted">· {x.org}</span>
                    </span>
                    <span className="font-mono text-xs text-faint sm:pt-0.5">{x.period}</span>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}

/** Closing band for the audiences the hero doesn't address (companies, institutions, recruiters). */
export function CtaBand() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div data-reveal className="relative overflow-hidden rounded-[1.75rem] border border-line bg-ink-2/80 px-7 py-14 sm:px-14 sm:py-20">
          <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 glow-gold" />
          <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 glow-royal" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-80 w-80 glow-plum" />
          <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <h2 className="font-serif text-4xl leading-[1.08] tracking-tight text-text sm:text-5xl">
                Not a student? <span className="italic text-gold-gradient">Let&apos;s still talk.</span>
              </h2>
              <p className="mt-5 max-w-lg text-lg text-muted">
                Companies hire me to build and ship AI products. Institutions book expert talks and workshops.
                Recruiters: I&apos;m open to Applied AI Engineer roles.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <ButtonLink href="/contact">
                Get in touch <Arrow />
              </ButtonLink>
              <ButtonLink href="/hire" variant="ghost">
                For recruiters <Arrow />
              </ButtonLink>
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
