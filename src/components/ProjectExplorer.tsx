"use client";

import { useEffect, useMemo, useState } from "react";
import type { Project } from "@/content/site";
import { isLive, ProjectCard } from "./sections";

const AI_TAGS = ["AI", "LLM", "Voice AI", "RAG", "Agents", "Document analysis"];

const FILTERS = [
  { key: "all", label: "All", test: () => true },
  { key: "live", label: "Live", test: (p: Project) => isLive(p.status) },
  { key: "ai", label: "AI products", test: (p: Project) => p.tags.some((t) => AI_TAGS.includes(t)) },
  { key: "web", label: "Web platforms", test: (p: Project) => !p.tags.some((t) => AI_TAGS.includes(t)) },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

/** Projects grid with quick filters; the filter is kept in the URL (?filter=ai) so it can be shared. */
export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<FilterKey>("all");

  useEffect(() => {
    const f = new URLSearchParams(window.location.search).get("filter");
    if (f && FILTERS.some((x) => x.key === f)) setFilter(f as FilterKey);
  }, []);

  const choose = (key: FilterKey) => {
    setFilter(key);
    const url = new URL(window.location.href);
    if (key === "all") url.searchParams.delete("filter");
    else url.searchParams.set("filter", key);
    window.history.replaceState(null, "", url);
  };

  const active = FILTERS.find((f) => f.key === filter)!;
  const shown = useMemo(() => projects.filter((p) => active.test(p)), [projects, active]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const count = projects.filter((p) => f.test(p)).length;
            const on = f.key === filter;
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={on}
                onClick={() => choose(f.key)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs transition-all duration-200 ${
                  on ? "border-btn bg-btn text-btn-fg" : "border-line bg-surface text-muted hover:border-gold/60 hover:text-text"
                }`}
              >
                {f.key === "live" && <span className={`h-1.5 w-1.5 rounded-full ${on ? "bg-btn-fg" : "bg-emerald"}`} />}
                {f.label}
                <span className={`text-[10px] ${on ? "text-btn-fg/70" : "text-faint"}`}>{count}</span>
              </button>
            );
          })}
        </div>
        <p className="font-mono text-xs text-faint" aria-live="polite">
          Showing {shown.length} of {projects.length}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {shown.map((p, i) => (
          <ProjectCard key={p.slug} p={p} index={i} />
        ))}
      </div>
    </div>
  );
}
