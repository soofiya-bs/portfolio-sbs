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
  const size = large ? 52 : 42;
  return (
    <figcaption className="flex items-center gap-3.5">
      {t.photo ? (
        <Image src={t.photo} alt="" width={size} height={size} className="rounded-full object-cover" style={{ width: size, height: size }} />
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

  return (
    <Section className={className} id="testimonials">
      <SectionHeading eyebrow={eyebrow} title={title} />

      <div className="mt-14 grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <figure data-reveal className="card relative flex flex-col justify-between overflow-hidden p-8 sm:p-10">
          {featured.sample && <SampleBadge />}
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 glow-gold" />
          <div className="relative">
            <span aria-hidden="true" className="block font-serif text-7xl leading-none text-gold/40">
              &ldquo;
            </span>
            <blockquote className="-mt-4 font-serif text-2xl leading-snug text-text sm:text-[1.7rem]">{featured.quote}</blockquote>
          </div>
          <div className="relative mt-10">
            <Person t={featured} large />
          </div>
        </figure>

        {rest.length > 0 && (
          <div className="grid gap-5">
            {rest.slice(0, 3).map((t, i) => (
              <figure
                key={`${t.name}-${i}`}
                data-reveal
                style={{ "--d": `${(i + 1) * 100}ms` } as React.CSSProperties}
                className="card relative flex flex-col justify-between p-7"
              >
                {t.sample && <SampleBadge />}
                <blockquote className="pr-14 text-[15px] leading-relaxed text-muted">&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="mt-6">
                  <Person t={t} />
                </div>
              </figure>
            ))}
          </div>
        )}
      </div>

      {rest.length > 3 && (
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.slice(3).map((t, i) => (
            <figure
              key={`${t.name}-more-${i}`}
              data-reveal
              style={{ "--d": `${(i % 3) * 100}ms` } as React.CSSProperties}
              className="card relative flex flex-col justify-between p-7"
            >
              {t.sample && <SampleBadge />}
              <blockquote className="pr-14 text-[15px] leading-relaxed text-muted">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="mt-6">
                <Person t={t} />
              </div>
            </figure>
          ))}
        </div>
      )}
    </Section>
  );
}
