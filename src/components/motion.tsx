"use client";

import { useEffect, useRef, useState } from "react";

/** Mount once in the layout: reveals every `[data-reveal]` element as it scrolls into view. */
export function RevealObserver() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    const scan = () => document.querySelectorAll("[data-reveal]:not(.in)").forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}

/** Animates "6,800+" style values from 0 when scrolled into view. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const m = value.match(/^([^\d]*)([\d,]+)(.*)$/);
    if (!m || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, pre, num, post] = m;
    const target = parseInt(num.replace(/,/g, ""), 10);
    const useComma = num.includes(",");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1400;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          const n = Math.round(target * eased);
          setText(`${pre}${useComma ? n.toLocaleString("en-IN") : n}${post}`);
          if (t < 1) requestAnimationFrame(tick);
        };
        setText(`${pre}0${post}`);
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}

/** Cycles through words with a slide/fade, keeping the widest word's space. */
export function RotatingWord({ words, className = "" }: { words: string[]; className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % words.length), 2400);
    return () => clearInterval(id);
  }, [words.length]);
  return (
    <span className={`relative inline-grid align-baseline ${className}`}>
      {words.map((w, idx) => (
        <span
          key={w}
          aria-hidden={idx !== i}
          className={`col-start-1 row-start-1 whitespace-nowrap transition-all ${
            idx === i
              ? "translate-y-0 opacity-100 delay-200 duration-500"
              : "pointer-events-none -translate-y-3 opacity-0 duration-200"
          }`}
        >
          {w}
        </span>
      ))}
    </span>
  );
}

/** Infinite horizontal ticker. */
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="marquee relative overflow-hidden border-y border-line bg-surface/50 py-4">
      <div className="marquee-track flex w-max gap-10">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            {t}
            <span className={`h-1.5 w-1.5 rounded-full ${["bg-gold", "bg-emerald", "bg-royal", "bg-plum"][i % 4]}`} />
          </span>
        ))}
      </div>
    </div>
  );
}
