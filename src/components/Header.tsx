"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          <span className="hidden whitespace-nowrap text-sm font-medium tracking-wide text-text sm:block lg:hidden xl:block">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-7" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${active ? "text-gold-soft" : "text-muted hover:text-text"}`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/work-with-me"
            className="whitespace-nowrap rounded-full border border-gold/50 px-4 py-2 text-sm text-gold-soft transition-colors hover:bg-gold hover:text-ink"
          >
            Work with me
          </Link>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
        <ThemeToggle />
        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-line"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
        >
          <span className="relative block h-3 w-4">
            <span className={`absolute left-0 h-px w-4 bg-text transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-px w-4 bg-text transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-px w-4 bg-text transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-line px-5 pb-6 pt-2 sm:px-8 lg:hidden" aria-label="Mobile">
          {[...nav, { label: "Work with me", href: "/work-with-me" }].map((item) => (
            <Link key={item.href} href={item.href} className="block border-b border-line py-4 text-base text-text">
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
