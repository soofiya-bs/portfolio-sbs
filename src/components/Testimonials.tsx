import { visibleTestimonials, type Testimonial } from "@/content/site";
import { Section } from "./ui";
import { TestimonialCarousel } from "./TestimonialCarousel";

/**
 * Testimonials block: a centred heading and a carousel (active quote in the middle,
 * previous and next beside it). Renders nothing when there are no visible testimonials,
 * so the live site never shows an empty section.
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

  return (
    <Section className={className} id="testimonials">
      <div data-reveal className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">{eyebrow}</p>
        <h2 className="mt-4 font-serif text-4xl leading-[1.08] tracking-tight text-text sm:text-5xl">{title}</h2>
      </div>
      <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className="mt-14">
        <TestimonialCarousel list={list} />
      </div>
    </Section>
  );
}
