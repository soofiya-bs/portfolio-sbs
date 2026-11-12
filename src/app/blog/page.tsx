import type { Metadata } from "next";
import { getPosts } from "@/lib/posts";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui";
import { PostFilter } from "@/components/PostFilter";
import { CtaBand } from "@/components/sections";

export const metadata: Metadata = {
  title: "Blog — Applied AI Engineering, Explained",
  description:
    "Plain-language articles on applied AI engineering: AI agents, LLM applications, Docker, deployment and building a career as a self-learner.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getPosts("blog");
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Applied AI, <span className="italic text-gold-gradient">explained simply.</span>
          </>
        }
        lead="Clear, practical writing on AI engineering — the ideas behind the tools, without the hype."
      />
      <Section className="!pt-14">
        <PostFilter posts={posts} />
      </Section>
      <CtaBand />
    </>
  );
}
