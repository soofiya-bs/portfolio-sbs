"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { nav, navCta, site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    // the menu button stays mounted, so focus can move back to it straight away
    if (returnFocus) menuButton.current?.focus();
  }, []);

  // close the menu after navigating
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // mobile menu: Escape closes, Tab stays inside (focus trap), first link gets focus
  useEffect(() => {
    if (!open) return;
    const focusables = () =>
      Array.from(panel.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []).concat(
        menuButton.current ? [menuButton.current] : []
      );
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-line bg-ink/85 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="flex h-16 w-full items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name} — home`}>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/50 font-serif text-sm text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
            {site.shortName}
          </span>
          <span className="hidden whitespace-nowrap text-sm font-medium tracking-wide text-text sm:block">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm transition-colors ${active ? "text-gold-soft" : "text-muted hover:text-text"}`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={navCta.href}
            aria-current={isActive(navCta.href) ? "page" : undefined}
            className="whitespace-nowrap rounded-full bg-btn px-5 py-2 text-sm font-medium text-btn-fg transition-colors hover:bg-btn-hover"
          >
            {navCta.label}
          </Link>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            ref={menuButton}
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-line"
            onClick={() => (open ? close() : setOpen(true))}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="relative block h-3 w-4" aria-hidden="true">
              <span className={`absolute left-0 h-px w-4 bg-text transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-px w-4 bg-text transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-px w-4 bg-text transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div ref={panel} id="mobile-nav" className="border-t border-line px-5 pb-6 pt-2 sm:px-8 md:hidden">
          <nav aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => close(false)}
                className="block border-b border-line py-4 text-base text-text"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href={navCta.href}
            onClick={() => close(false)}
            className="mt-5 flex w-full items-center justify-center rounded-full bg-btn px-6 py-3 text-sm font-medium text-btn-fg"
          >
            {navCta.label}
          </Link>
        </div>
      )}
    </header>
  );
}
