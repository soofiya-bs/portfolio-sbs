import Image from "next/image";
import { visibleTestimonials, type Testimonial } from "@/content/site";
import { accentFor, Section, SectionHeading } from "./ui";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function Person({ t, large = false }: { t: Testimonial; large?: boolean }) {
  const size = large ? 60 : 42;
  return (
    <figcaption className="flex items-center gap-3.5">
      {t.photo ? (
        <span className="relative shrink-0 overflow-hidden rounded-full ring-2 ring-gold/30" style={{ width: size, height: size }}>
          <Image
            src={t.photo}
            alt={`Photo of ${t.name}`}
            width={size * 3}
            height={size * 3}
            className="h-full w-full object-cover"
            style={{
              objectPosition: t.photoFocus ?? "50% 34%",
              transformOrigin: t.photoFocus ?? "50% 34%",
              transform: `scale(${t.photoZoom ?? 1.7})`,
            }}
          />
        </span>
      ) : (
        <span
          aria-hidden="true"
          className={`grid shrink-0 place-items-center rounded-full border font-serif text-sm ${accentFor(t.role).border} ${accentFor(t.role).soft} ${accentFor(t.role).text}`}
          style={{ width: size, height: size }}
        >
          {initials(t.name)}
        </span>
      )}
      <span>
        <span className={`block font-medium text-text ${large ? "text-base" : "text-sm"}`}>{t.name}</span>
        <span className="block text-xs text-muted">{t.role}</span>
      </span>
    </figcaption>
  );
}

function SampleBadge() {
  return (
    <span className="absolute right-5 top-5 rounded-full border border-dashed border-gold/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
      Sample
    </span>
  );
}

/**
 * Testimonials block. Renders nothing when there are no (visible) testimonials,
 * so a page never shows an empty section on the live site.
 */
export function Testimonials({
  category,
  eyebrow = "Testimonials",
  title = "Words from people I've worked with.",
  className = "border-t border-line",
}: {
  category?: Testimonial["category"];
  eyebrow?: string;
  title?: string;
  className?: string;
}) {
  const list = visibleTestimonials(category);
  if (!list.length) return null;
  const [featured, ...rest] = list;

  /** Large quote card — used for the featured quote, and for every quote when there are only one or two. */
  const BigQuote = ({ t, delay = 0, solo = false }: { t: Testimonial; delay?: number; solo?: boolean }) => (
    <figure
      data-reveal
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
      className={`card relative flex flex-col justify-between overflow-hidden p-8 sm:p-10 ${solo ? "lg:p-14" : ""}`}
    >
      {t.sample && <SampleBadge />}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 glow-gold" />
      <div className="relative">
        <span aria-hidden="true" className="block font-serif text-7xl leading-none text-gold/40">
          &ldquo;
        </span>
        <blockquote className={`-mt-4 font-serif leading-snug text-text ${solo ? "text-2xl sm:text-[1.7rem]" : "text-xl sm:text-[1.45rem]"}`}>
          {t.quote}
        </blockquote>
      </div>
      <div className="relative mt-10">
        <Person t={t} large />
      </div>
    </figure>
  );

  // one, two or four quotes: give each the full, large treatment (1 centred, 2 side by side, 4 in a 2×2 grid)
  if (list.length <= 2 || list.length === 4) {
    return (
      <Section className={className} id="testimonials">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className={`mt-14 grid gap-5 ${list.length > 1 ? "lg:grid-cols-2" : "mx-auto max-w-4xl"}`}>
          {list.map((t, i) => (
            <BigQuote key={`${t.name}-${i}`} t={t} delay={i * 110} solo={list.length === 1} />
          ))}
        </div>
      </Section>
    );
  }

  // three or more: one featured quote with two beside it, then the rest in balanced rows
  const side = rest.slice(0, 2);
  const more = rest.slice(2);
  const moreCols = more.length === 1 ? "" : more.length % 2 === 0 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";

  const SmallQuote = ({ t, delay }: { t: Testimonial; delay: number }) => (
    <figure
      data-reveal
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
      className="card relative flex flex-col justify-between p-7"
    >
      {t.sample && <SampleBadge />}
      <blockquote className="pr-4 text-[15px] leading-relaxed text-muted">&ldquo;{t.quote}&rdquo;</blockquote>
      <div className="mt-6">
        <Person t={t} />
      </div>
    </figure>
  );

  return (
    <Section className={className} id="testimonials">
      <SectionHeading eyebrow={eyebrow} title={title} />

      <div className="mt-14 grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <BigQuote t={featured} />
        <div className="grid gap-5">
          {side.map((t, i) => (
            <SmallQuote key={`${t.name}-${i}`} t={t} delay={(i + 1) * 100} />
          ))}
        </div>
      </div>

      {more.length > 0 && (
        <div className={`mt-5 grid gap-5 ${moreCols}`}>
          {more.map((t, i) => (
            <SmallQuote key={`${t.name}-more-${i}`} t={t} delay={(i % 3) * 100} />
          ))}
        </div>
      )}
    </Section>
  );
}
