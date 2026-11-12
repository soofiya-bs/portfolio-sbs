import type { Metadata } from "next";
import { getPosts } from "@/lib/posts";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui";
import { PostGrid } from "@/components/posts";
import { PostFilter } from "@/components/PostFilter";
import { CtaBand } from "@/components/sections";

export const metadata: Metadata = {
  title: "Tutorials — Hands-on Full Stack AI",
  description:
    "Step-by-step, hands-on tutorials for self-learners: build LLM-powered APIs, add AI features to MERN apps, and ship real projects.",
  alternates: { canonical: "/tutorials" },
};

export default function TutorialsPage() {
  const posts = getPosts("tutorials");
  return (
    <>
      <PageHero
        eyebrow="Tutorials"
        title={
          <>
            Learn by <span className="italic text-gold-gradient">building.</span>
          </>
        }
        lead="Hands-on, step-by-step tutorials in Full Stack AI. Every one ends with something that works."
      />
      <Section>
        {/* filters appear once there are enough tutorials to need them */}
        {posts.length >= 4 ? <PostFilter posts={posts} /> : <PostGrid posts={posts} />}
      </Section>
      <CtaBand />
    </>
  );
}
