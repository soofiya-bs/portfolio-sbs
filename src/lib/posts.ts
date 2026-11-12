import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * Blog posts and tutorials are Markdown files:
 *   content/posts/blog/<slug>.md
 *   content/posts/tutorials/<slug>.md
 *
 * Frontmatter:
 *   title:       string   (required)
 *   description: string   (required — used for SEO and cards)
 *   date:        YYYY-MM-DD (required)
 *   tags:        [a, b]
 *   draft:       true      (shown only in `npm run dev`, hidden on the live site)
 *   level:       Beginner | Intermediate | Advanced   (tutorials)
 *   duration:    "45 min"                             (tutorials)
 *   part:        1                                    (tutorials in a series: sorted by part)
 */

import type { Post, PostKind, PostMeta } from "./post-utils";
export { formatDate, kindLabel } from "./post-utils";
export type { Post, PostKind, PostMeta } from "./post-utils";

const ROOT = path.join(process.cwd(), "content", "posts");
const showDrafts = process.env.NODE_ENV !== "production";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z#0-9]+;/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function readFile(kind: PostKind, file: string) {
  const raw = fs.readFileSync(path.join(ROOT, kind, file), "utf8");
  const { data, content } = matter(raw);
  const words = content.trim().split(/\s+/).length;
  const meta: PostMeta = {
    kind,
    slug: file.replace(/\.md$/, ""),
    title: String(data.title ?? file),
    description: String(data.description ?? ""),
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: Boolean(data.draft),
    level: data.level ? String(data.level) : undefined,
    duration: data.duration ? String(data.duration) : undefined,
    part: typeof data.part === "number" ? data.part : undefined,
    readingMinutes: Math.max(1, Math.round(words / 220)),
  };
  return { meta, content };
}

export function getPosts(kind: PostKind): PostMeta[] {
  const dir = path.join(ROOT, kind);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readFile(kind, f).meta)
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => {
      // series parts read in order (Part 1 first); everything else newest first
      if (a.part && b.part) return a.part - b.part;
      if (a.part) return -1;
      if (b.part) return 1;
      return b.date.localeCompare(a.date);
    });
}

export function getAllPosts(): PostMeta[] {
  return [...getPosts("blog"), ...getPosts("tutorials")].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(kind: PostKind, slug: string): Post | null {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(ROOT, kind, file))) return null;
  const { meta, content } = readFile(kind, file);
  if (meta.draft && !showDrafts) return null;

  let html = marked.parse(content, { async: false, gfm: true }) as string;
  const toc: { id: string; text: string }[] = [];
  const seen = new Map<string, number>();
  html = html.replace(/<h2>(.*?)<\/h2>/g, (_m, inner: string) => {
    let id = slugify(inner) || "section";
    const n = seen.get(id) ?? 0;
    seen.set(id, n + 1);
    if (n) id = `${id}-${n}`;
    toc.push({ id, text: inner.replace(/<[^>]+>/g, "") });
    return `<h2 id="${id}"><a href="#${id}" class="anchor" aria-hidden="true">#</a>${inner}</h2>`;
  });
  // open external links in a new tab
  html = html.replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"');
  return { ...meta, html, toc };
}
