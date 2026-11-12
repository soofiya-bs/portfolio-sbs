/** Browser-safe post types and helpers (no filesystem access). */

export type PostKind = "blog" | "tutorials";

export type PostMeta = {
  kind: PostKind;
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  draft: boolean;
  level?: string;
  duration?: string;
  /** position in a tutorial series (1, 2, 3…) */
  part?: number;
  readingMinutes: number;
};

export type Post = PostMeta & { html: string; toc: { id: string; text: string }[] };

export function formatDate(d: string) {
  const date = new Date(`${d}T00:00:00`);
  return isNaN(date.getTime())
    ? d
    : date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export const kindLabel: Record<PostKind, string> = { blog: "Blog", tutorials: "Tutorial" };
