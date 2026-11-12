import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/posts";
import { Article } from "@/components/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts("tutorials").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("tutorials", slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `/tutorials/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.description, publishedTime: post.date, tags: post.tags },
    robots: post.draft ? { index: false, follow: false } : undefined,
  };
}

export default async function TutorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost("tutorials", slug);
  if (!post) notFound();
  const more = getPosts("tutorials").filter((p) => p.slug !== slug).slice(0, 3);
  return <Article post={post} more={more} />;
}
