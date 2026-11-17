"use client";

import Image from "next/image";
import { useCallback, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import type { Testimonial } from "@/content/site";
import { accentFor } from "./ui";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function Person({ t, large = false }: { t: Testimonial; large?: boolean }) {
  const size = large ? 48 : 40;
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
      <span className="min-w-0">
        <span className={`block font-serif text-text ${large ? "text-lg" : "text-base"}`}>{t.name}</span>
        <span className="block text-xs text-muted">{t.role}</span>
      </span>
    </figcaption>
  );
}

function QuoteMark({ large = false }: { large?: boolean }) {
  return (
    <svg
      viewBox="0 0 32 24"
      width={large ? 30 : 20}
      height={large ? 23 : 15}
      aria-hidden="true"
      className="text-gold"
    >
      <path
        fill="currentColor"
        d="M0 24V14.4C0 6.6 4.3 1.8 12.4 0l1.4 3.3C9.5 4.8 7.4 7.6 7.2 11.2H13V24H0zm18.2 0V14.4C18.2 6.6 22.5 1.8 30.6 0L32 3.3c-4.3 1.5-6.4 4.3-6.6 7.9h5.8V24H18.2z"
      />
    </svg>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d={dir === "left" ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Side card: smaller, dimmed preview of the previous / next quote. Clicking it brings it to the centre. */
function SideCard({ t, onSelect }: { t: Testimonial; onSelect: () => void }) {
  return (
    <div
      aria-hidden="true"
      onClick={onSelect}
      className="card hidden w-[15rem] shrink-0 cursor-pointer flex-col p-6 opacity-55 transition-opacity duration-300 hover:opacity-90 xl:flex"
    >
      <QuoteMark />
      <p className="mt-4 line-clamp-5 text-[13px] leading-relaxed text-muted">{t.quote}</p>
      <div className="mt-5">
        <Person t={t} />
      </div>
    </div>
  );
}

/**
 * Testimonial carousel: the active quote in a raised centre card, the previous and next quotes
 * dimmed on either side (desktop), arrow buttons, dots, arrow-key and swipe support. No autoplay.
 */
export function TestimonialCarousel({ list }: { list: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const n = list.length;
  const wrap = useCallback((i: number) => ((i % n) + n) % n, [n]);
  const go = useCallback((i: number) => setIndex(wrap(i)), [wrap]);

  const active = list[index];
  const prev = n >= 3 ? list[wrap(index - 1)] : null;
  const next = n >= 2 ? list[wrap(index + 1)] : null;

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(index - 1);
    if (e.key === "ArrowRight") go(index + 1);
  };
  const onTouchStart = (e: TouchEvent) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? index + 1 : index - 1);
    touchX.current = null;
  };

  const arrowBase =
    "z-10 h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-surface text-text shadow-lg transition-colors hover:border-gold/60 hover:text-gold-soft";
  // beside the cards from tablet up; under the card (next to the dots) on phones, so the quote gets the full width
  const arrow = `${arrowBase} hidden sm:grid`;
  const arrowMobile = `${arrowBase} grid sm:hidden`;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      onKeyDown={onKey}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex items-center justify-center gap-3 sm:gap-5">
        {n > 1 && (
          <button type="button" onClick={() => go(index - 1)} aria-label="Previous testimonial" className={arrow}>
            <Chevron dir="left" />
          </button>
        )}

        {prev && <SideCard t={prev} onSelect={() => go(index - 1)} />}

        <figure
          key={index}
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${n}`}
          aria-live="polite"
          className="card tm-in relative z-[1] flex min-w-0 max-w-xl flex-1 flex-col p-6 shadow-[0_24px_60px_-24px_rgba(var(--shadow),0.45)] sm:p-9 xl:w-[32rem] xl:flex-none"
        >
          {active.sample && (
            <span className="absolute right-5 top-5 rounded-full border border-dashed border-gold/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
              Sample
            </span>
          )}
          <QuoteMark large />
          <blockquote className="mt-5 text-[15px] leading-relaxed text-text/90 sm:text-base">
            <p>{active.quote}</p>
          </blockquote>
          <div className="mt-7 border-t border-line pt-5">
            <Person t={active} large />
          </div>
        </figure>

        {next && <SideCard t={next} onSelect={() => go(index + 1)} />}

        {n > 1 && (
          <button type="button" onClick={() => go(index + 1)} aria-label="Next testimonial" className={arrow}>
            <Chevron dir="right" />
          </button>
        )}
      </div>

      {n > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2 sm:mt-10">
          <button type="button" onClick={() => go(index - 1)} aria-label="Previous testimonial" className={`${arrowMobile} mr-2`}>
            <Chevron dir="left" />
          </button>
          {list.map((t, i) => (
            <button
              key={`${t.name}-${i}`}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show testimonial ${i + 1}: ${t.name}`}
              aria-current={i === index ? "true" : undefined}
              className="grid h-6 w-6 place-items-center"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  i === index ? "h-2 w-6 bg-gold" : "h-2 w-2 bg-text/20 hover:bg-text/40"
                }`}
              />
            </button>
          ))}
          <button type="button" onClick={() => go(index + 1)} aria-label="Next testimonial" className={`${arrowMobile} ml-2`}>
            <Chevron dir="right" />
          </button>
        </div>
      )}
    </div>
  );
}
