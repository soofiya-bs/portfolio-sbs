"use client";

import { useEffect, useMemo, useState } from "react";
import type { PostMeta } from "@/lib/post-utils";
import { PostGrid } from "./posts";

/**
 * Search box + topic chips over a list of posts.
 * The active filter is kept in the URL (?tag=RAG&q=docker) so it can be shared.
 * Only topics used by 2+ posts become chips, so the row stays short as the blog grows.
 */
export function PostFilter({ posts, minForChips = 2 }: { posts: PostMeta[]; minForChips?: number }) {
  const [tag, setTag] = useState<string | null>(null);
  const [q, setQ] = useState("");

  // read initial filter from the URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("tag");
    if (t) setTag(t);
    const query = params.get("q");
    if (query) setQ(query);
  }, []);

  // keep the URL in sync
  useEffect(() => {
    const url = new URL(window.location.href);
    if (tag) url.searchParams.set("tag", tag);
    else url.searchParams.delete("tag");
    if (q.trim()) url.searchParams.set("q", q.trim());
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
  }, [tag, q]);

  const topics = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of posts) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    return [...counts.entries()]
      .filter(([, n]) => n >= minForChips)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [posts, minForChips]);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return posts.filter((p) => {
      if (tag && !p.tags.includes(tag)) return false;
      if (!needle) return true;
      return `${p.title} ${p.description} ${p.tags.join(" ")}`.toLowerCase().includes(needle);
    });
  }, [posts, tag, q]);

  const filtering = Boolean(tag || q.trim());
  const clear = () => {
    setTag(null);
    setQ("");
  };

  return (
    <div>
      <div className="card p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <label className="relative block lg:w-72 lg:shrink-0">
            <span className="sr-only">Search posts</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <circle cx="9" cy="9" r="5.5" />
              <path d="m13.5 13.5 3.5 3.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search posts…"
              className="field !py-2.5 !pl-10 font-mono !text-sm"
            />
          </label>

          <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
            <Chip active={!tag} onClick={() => setTag(null)} label="All" count={posts.length} />
            {topics.map(([t, n]) => (
              <Chip key={t} active={tag === t} onClick={() => setTag(tag === t ? null : t)} label={t} count={n} />
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6 mt-6 flex items-center justify-between gap-4 font-mono text-xs text-faint" aria-live="polite">
        <span>
          {shown.length} {shown.length === 1 ? "post" : "posts"}
          {tag && (
            <>
              {" "}
              in <span className="text-gold-soft">{tag}</span>
            </>
          )}
          {q.trim() && (
            <>
              {" "}
              matching <span className="text-gold-soft">&ldquo;{q.trim()}&rdquo;</span>
            </>
          )}
        </span>
        {filtering && (
          <button onClick={clear} className="text-muted underline-offset-4 transition-colors hover:text-gold-soft hover:underline">
            Clear filters
          </button>
        )}
      </div>

      {shown.length ? (
        <PostGrid posts={shown} />
      ) : (
        <div className="card p-10 text-center">
          <p className="font-serif text-2xl text-text">Nothing matches that yet.</p>
          <p className="mt-2 text-muted">Try another topic or search term.</p>
          <button onClick={clear} className="mt-5 text-sm text-gold-soft underline-offset-4 hover:underline">
            Show all posts
          </button>
        </div>
      )}
    </div>
  );
}

function Chip({ active, onClick, label, count }: { active: boolean; onClick: () => void; label: string; count: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all duration-200 ${
        active
          ? "border-btn bg-btn text-btn-fg shadow-[0_6px_18px_-10px_rgba(22,23,27,0.7)]"
          : "border-line bg-surface text-muted hover:border-gold/60 hover:text-text"
      }`}
    >
      {label}
      <span className={`text-[10px] ${active ? "text-btn-fg/70" : "text-faint"}`}>{count}</span>
    </button>
  );
}
