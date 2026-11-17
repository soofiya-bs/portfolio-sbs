import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { PageHero } from "@/components/PageHero";
import { Arrow, ButtonLink, Section, SectionHeading } from "@/components/ui";
import { PostGrid } from "@/components/posts";

export const metadata: Metadata = {
  title: "Writing — Applied AI Tutorials & Articles",
  description:
    "A hands-on tutorial series that builds an AI app step by step from Part 1, plus plain-language articles on applied AI, LLMs and learning to code.",
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  const series = getPosts("tutorials"); // ordered Part 1, Part 2, …
  const articles = getPosts("blog"); // newest first
  const first = series[0];

  return (
    <>
      <PageHero
        eyebrow="Writing"
        title={
          <>
            Tutorials &amp; <span className="italic text-gold-gradient">articles.</span>
          </>
        }
        lead="A step-by-step tutorial series you can follow from Part 1, and short articles on applied AI for self-learners."
      >
        {first && (
          <div className="mt-8">
            <ButtonLink href={`/tutorials/${first.slug}`}>
              Start the series at Part 1 <Arrow />
            </ButtonLink>
          </div>
        )}
      </PageHero>

      {series.length > 0 && (
        <Section className="!pt-14" id="series">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow={`Tutorial series · ${series.length} parts`}
              title="Build it step by step."
              lead="Each part builds on the one before, so read them in order."
            />
            <Link href="/tutorials" className="shrink-0 text-sm font-medium text-gold-soft underline-offset-4 hover:underline">
              Filter tutorials →
            </Link>
          </div>
          <div className="mt-12">
            <PostGrid posts={series} />
          </div>
        </Section>
      )}

      <Section className="border-t border-line" id="articles">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Articles" title="Short reads on applied AI." />
          <Link href="/blog" className="shrink-0 text-sm font-medium text-gold-soft underline-offset-4 hover:underline">
            Filter articles →
          </Link>
        </div>
        <div className="mt-12">
          <PostGrid posts={articles} />
        </div>
      </Section>
    </>
  );
}
