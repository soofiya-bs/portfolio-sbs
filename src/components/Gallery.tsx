"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import type { GalleryItem } from "@/content/site";

const CATEGORY_EVENT = "gallery:category";

/**
 * A link that filters the gallery from anywhere on the page (e.g. the chips in the heading).
 * Without JavaScript it still works as a normal link (?category=…#photos).
 */
export function GalleryCategoryLink({
  category,
  className,
  children,
}: {
  category: string | null;
  className?: string;
  children: React.ReactNode;
}) {
  const href = category ? `?category=${encodeURIComponent(category)}#photos` : "?#photos";
  return (
    <a
      href={href}
      className={className}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent(CATEGORY_EVENT, { detail: category }));
        document.getElementById("photos")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      {children}
    </a>
  );
}

/** Photo with a shimmering placeholder until it has loaded, then a soft fade-in. */
function Photo({
  item,
  sizes,
  priority,
  fill = false,
  className = "",
}: {
  item: GalleryItem;
  sizes: string;
  priority?: boolean;
  fill?: boolean;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  // images served from cache may finish before React attaches onLoad
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true);
  }, []);
  return (
    <span
      className={`relative block overflow-hidden ${loaded ? "" : "shimmer"} ${fill ? "h-full w-full" : ""}`}
      style={fill ? undefined : { aspectRatio: `${item.width} / ${item.height}` }}
    >
      <Image
        ref={ref}
        src={item.src!}
        alt={item.alt}
        fill
        sizes={sizes}
        priority={priority}
        onLoad={() => setLoaded(true)}
        className={`object-cover transition-[opacity,transform] duration-700 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
      />
    </span>
  );
}

/** Placeholder tile for sample entries that have no photo yet. */
function SampleTile({ item }: { item: GalleryItem }) {
  return (
    <div
      className="relative grid w-full place-items-center overflow-hidden rounded-2xl border border-dashed border-gold/40 bg-ink-2"
      style={{ aspectRatio: `${item.width} / ${item.height}` }}
    >
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="relative px-6 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">Sample</p>
        <p className="mt-1 text-sm text-muted">{item.caption}</p>
      </div>
    </div>
  );
}

export function Gallery({ items }: { items: GalleryItem[] }) {
  const categories = useMemo(() => {
    const seen: string[] = [];
    for (const i of items) if (!seen.includes(i.category)) seen.push(i.category);
    return seen;
  }, [items]);

  const [cat, setCatState] = useState<string | null>(null);

  // the URL is the source of truth for the filter, so filtered views can be shared
  const setCat = useCallback(
    (c: string | null) => {
      const valid = c && categories.includes(c) ? c : null;
      setCatState(valid);
      const url = new URL(window.location.href);
      if (valid) url.searchParams.set("category", valid);
      else url.searchParams.delete("category");
      window.history.replaceState(null, "", url);
    },
    [categories]
  );

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("category");
    if (fromUrl && categories.includes(fromUrl)) setCatState(fromUrl);
    const onPick = (e: Event) => setCat((e as CustomEvent<string | null>).detail);
    window.addEventListener(CATEGORY_EVENT, onPick);
    return () => window.removeEventListener(CATEGORY_EVENT, onPick);
  }, [categories, setCat]);

  const shown = useMemo(() => (cat ? items.filter((i) => i.category === cat) : items), [items, cat]);
  const photos = useMemo(() => shown.filter((i) => i.src), [shown]);

  // ---------- lightbox ----------
  const [open, setOpen] = useState<number | null>(null); // index into `photos`
  const lastFocus = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    requestAnimationFrame(() => lastFocus.current?.focus());
  }, []);
  const step = useCallback(
    (d: number) => setOpen((o) => (o === null ? o : (o + d + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        // keep keyboard focus inside the viewer
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>("button");
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  // focus the close button when the viewer opens
  const isOpen = open !== null;
  useEffect(() => {
    if (isOpen) closeBtn.current?.focus();
  }, [isOpen]);

  // preload the neighbouring photos so next / previous feel instant
  useEffect(() => {
    if (open === null || photos.length < 2) return;
    for (const d of [1, -1]) {
      const p = photos[(open + d + photos.length) % photos.length];
      const img = new window.Image();
      img.src = p.src!;
    }
  }, [open, photos]);

  const current = open !== null ? photos[open] : null;

  return (
    <div>
      {/* Sticky filter bar */}
      {categories.length > 1 && (
        <div className="sticky top-16 z-30 -mx-2 mb-8 px-2 py-3">
          <div className="glass-bar flex items-center gap-3 overflow-x-auto rounded-full px-2 py-2 [scrollbar-width:none]">
            <div role="group" aria-label="Filter photos" className="flex shrink-0 gap-1.5">
              {[null, ...categories].map((c) => {
                const active = cat === c;
                const count = c ? items.filter((i) => i.category === c).length : items.length;
                return (
                  <button
                    key={c ?? "all"}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setCat(c)}
                    className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-1.5 font-mono text-xs transition-all duration-200 ${
                      active ? "bg-btn text-btn-fg shadow-sm" : "text-muted hover:bg-text/5 hover:text-text"
                    }`}
                  >
                    {c ?? "All"}
                    <span className={`text-[10px] ${active ? "text-btn-fg/70" : "text-faint"}`}>{count}</span>
                  </button>
                );
              })}
            </div>
            <span className="ml-auto hidden shrink-0 pr-3 font-mono text-[11px] text-faint md:block" aria-live="polite">
              {shown.length} {shown.length === 1 ? "photo" : "photos"}
              {cat ? ` · ${cat}` : ""}
            </span>
          </div>
        </div>
      )}

      {/* Masonry grid */}
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {shown.map((item, i) => {
          const photoIndex = item.src ? photos.indexOf(item) : -1;
          return (
            <figure
              key={`${item.caption}-${i}`}
              data-reveal
              style={{ "--d": `${(i % 3) * 90}ms` } as React.CSSProperties}
              className="mb-5 break-inside-avoid"
            >
              {item.src ? (
                <button
                  type="button"
                  onClick={(e) => {
                    lastFocus.current = e.currentTarget;
                    setOpen(photoIndex);
                  }}
                  className="group relative block w-full overflow-hidden rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  aria-label={`View photo: ${item.caption}`}
                >
                  <Photo
                    item={item}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    priority={i < 3}
                    className="group-hover:scale-[1.04]"
                  />
                  {/* expand icon */}
                  <span className="pointer-events-none absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/35 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {/* caption: on hover with a mouse, always visible on touch screens */}
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-4 pb-3.5 pt-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-[#e9cf98]">{item.category}</span>
                    <span className="mt-0.5 block text-sm font-medium text-white">{item.caption}</span>
                  </span>
                </button>
              ) : (
                <SampleTile item={item} />
              )}
            </figure>
          );
        })}
      </div>

      <p className="mt-4 text-center font-mono text-[11px] text-faint">
        <span className="hidden [@media(hover:hover)]:inline">Click any photo to view it full screen.</span>
        <span className="[@media(hover:hover)]:hidden">Tap any photo to view it full screen.</span>
      </p>

      {/* Lightbox */}
      {current && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${current.caption} — photo ${open! + 1} of ${photos.length}`}
          className="fixed inset-0 z-[100] flex flex-col bg-[#0b0c0f]/95 backdrop-blur-sm"
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          }}
        >
          <div className="flex items-center justify-between px-5 py-4 text-white/70 sm:px-8" onClick={(e) => e.stopPropagation()}>
            <span className="font-mono text-xs" aria-live="polite">
              {open! + 1} / {photos.length}
            </span>
            <span className="hidden font-mono text-[11px] text-white/40 md:block">← → to browse · Esc to close</span>
            <button
              ref={closeBtn}
              type="button"
              onClick={close}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
              aria-label="Close viewer"
            >
              ✕
            </button>
          </div>

          <div className="relative min-h-0 flex-1" onClick={(e) => e.stopPropagation()}>
            <Image
              key={current.src}
              src={current.src!}
              alt={current.alt}
              fill
              sizes="100vw"
              className="animate-[fadeIn_0.35s_ease] object-contain px-3 sm:px-20"
            />
            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/40 text-white transition-colors hover:bg-white/15 sm:left-6"
                  aria-label="Previous photo"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/40 text-white transition-colors hover:bg-white/15 sm:right-6"
                  aria-label="Next photo"
                >
                  →
                </button>
              </>
            )}
          </div>

          <div className="px-5 pb-4 pt-4 text-center sm:px-8" onClick={(e) => e.stopPropagation()}>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#d6b16a]">{current.category}</p>
            <p className="mt-1 font-serif text-xl text-white">{current.caption}</p>

            {photos.length > 1 && (
              <div className="mx-auto mt-4 flex max-w-full justify-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
                {photos.map((p, idx) => (
                  <button
                    key={p.src}
                    type="button"
                    onClick={() => setOpen(idx)}
                    aria-label={`Show photo ${idx + 1}: ${p.caption}`}
                    aria-current={idx === open}
                    className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                      idx === open ? "border-[#d6b16a] opacity-100" : "border-transparent opacity-50 hover:opacity-90"
                    }`}
                  >
                    <Image src={p.src!} alt="" fill sizes="64px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
