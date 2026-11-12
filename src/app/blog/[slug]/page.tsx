import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/posts";
import { Article } from "@/components/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts("blog").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("blog", slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.description, publishedTime: post.date, tags: post.tags },
    robots: post.draft ? { index: false, follow: false } : undefined,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost("blog", slug);
  if (!post) notFound();
  const more = getPosts("blog").filter((p) => p.slug !== slug).slice(0, 3);
  return <Article post={post} more={more} />;
}
