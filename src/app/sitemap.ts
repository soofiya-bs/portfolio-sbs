import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/mentorship", "/services", "/projects", "/blog", "/tutorials", "/gallery", "/hire", "/work-with-me"];
  const now = new Date();
  const pages: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${site.url}${r}`,
    lastModified: now,
    changeFrequency: r === "" || r === "/blog" || r === "/tutorials" ? "weekly" : "monthly",
    priority: r === "" ? 1 : r === "/mentorship" || r === "/work-with-me" || r === "/hire" ? 0.9 : 0.7,
  }));
  const posts: MetadataRoute.Sitemap = getAllPosts()
    .filter((p) => !p.draft)
    .map((p) => ({
      url: `${site.url}/${p.kind}/${p.slug}`,
      lastModified: new Date(`${p.date}T00:00:00`),
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  return [...pages, ...posts];
}
