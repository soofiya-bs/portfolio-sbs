"use client";

import { useEffect, useState } from "react";

type Mode = "system" | "light" | "dark";
const ORDER: Mode[] = ["system", "light", "dark"];
const LABEL: Record<Mode, string> = { system: "System", light: "Light", dark: "Dark" };
const STORAGE_KEY = "theme";

/** Runs in <head> before the page paints, so the chosen theme never flashes. */
export const themeInitScript = `try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

function apply(mode: Mode) {
  const root = document.documentElement;
  if (mode === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", mode);
  try {
    if (mode === "system") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    /* storage can be unavailable (private mode); the theme still applies for this visit */
  }
}

function Icon({ mode }: { mode: Mode }) {
  const common = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (mode === "light")
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    );
  if (mode === "dark")
    return (
      <svg {...common}>
        <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
      </svg>
    );
  return (
    <svg {...common}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  );
}

/** One button that cycles System → Light → Dark. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [mode, setMode] = useState<Mode>("system");

  // read the current theme, and stay in sync if another toggle (desktop / mobile) changes it
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      const t = root.getAttribute("data-theme");
      setMode(t === "light" || t === "dark" ? t : "system");
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const next = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length];

  return (
    <button
      type="button"
      onClick={() => {
        apply(next);
        setMode(next);
      }}
      className={`group relative grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-gold/60 hover:text-gold ${className}`}
      aria-label={`Theme: ${LABEL[mode]}. Switch to ${LABEL[next]}`}
      title={`Theme: ${LABEL[mode]} (click for ${LABEL[next]})`}
    >
      <Icon mode={mode} />
    </button>
  );
}
