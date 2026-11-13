import type { Metadata } from "next";
import { site } from "@/content/site";
import { inquiryTypes, type InquiryType } from "@/content/forms";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui";
import { InquiryTabs } from "@/components/InquiryTabs";
import { BookCallButton, WhatsAppButton } from "@/components/Contact";

export const metadata: Metadata = {
  title: "Work With Me",
  description:
    "Apply for the applied AI mentorship, book an expert talk or workshop for your institution, or hire me for an AI development project.",
  alternates: { canonical: "/work-with-me" },
};

export default async function WorkWithMePage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const initial: InquiryType = inquiryTypes.includes(type as InquiryType) ? (type as InquiryType) : "student";

  return (
    <>
      <PageHero
        eyebrow="Work with me"
        title={
          <>
            Pick your path. <span className="italic text-gold-gradient">I&apos;ll take it from there.</span>
          </>
        }
        lead={
          <>
            Learner, institution or company — choose the form that fits, or message me directly on WhatsApp. Prefer
            email? Write to{" "}
            <a href={`mailto:${site.email}`} className="text-gold-soft underline-offset-4 hover:underline">
              {site.email}
            </a>
            .
          </>
        }
      >
        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row">
          <WhatsAppButton label="Chat on WhatsApp" />
          <BookCallButton />
        </div>
      </PageHero>
      <Section className="!pt-14">
        <InquiryTabs initial={initial} />
      </Section>
    </>
  );
}
