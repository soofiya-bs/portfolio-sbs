import type { Metadata } from "next";
import { site, visibleGallery } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { accent, Arrow, ButtonLink, Container, Section } from "@/components/ui";
import { Gallery, GalleryCategoryLink } from "@/components/Gallery";

export const metadata: Metadata = {
  title: "Gallery — Workshops, Mentoring & Talks",
  description: `Photos from ${site.name}'s workshops, mentoring sessions, expert talks and events in applied AI engineering.`,
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  const items = visibleGallery();
  const categories = [...new Set(items.map((i) => i.category))];
  const countOf = (c: string) => items.filter((i) => i.category === c).length;

  const galleryJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${site.name} — Gallery`,
    description: "Workshops, mentoring sessions, expert talks and events.",
    image: items
      .filter((i) => i.src)
      .map((i) => ({
        "@type": "ImageObject",
        contentUrl: `${site.url}${i.src}`,
        caption: i.caption,
        description: i.alt,
        width: i.width,
        height: i.height,
      })),
  };

  return (
    <>
      <PageHero
        glass
        eyebrow="Gallery"
        title={
          <>
            Moments from <span className="italic text-gold-gradient">the classroom and beyond.</span>
          </>
        }
        lead="Workshops, mentoring sessions, expert talks and the work behind them."
      >
        <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-line pt-6">
          <span className="mr-1 font-mono text-xs text-faint">Jump to</span>
          {categories.map((c, i) => {
            const a = accent(i);
            return (
              <GalleryCategoryLink
                key={c}
                category={c}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] transition-transform hover:-translate-y-0.5 ${a.border} ${a.soft} ${a.text}`}
              >
                {c}
                <span className="opacity-70">{countOf(c)}</span>
              </GalleryCategoryLink>
            );
          })}
        </div>
      </PageHero>

      <Section className="scroll-mt-14 !pb-16 !pt-6" id="photos">
        <Gallery items={items} />
      </Section>

      {/* The natural next step after seeing the sessions */}
      <section className="pb-24">
        <Container>
          <div data-reveal className="glass grid gap-8 px-6 py-10 sm:px-12 sm:py-14 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">For colleges & academies</p>
              <h2 className="mt-4 font-serif text-3xl leading-[1.1] tracking-tight text-text sm:text-4xl">
                Want a session like this <span className="italic text-gold-gradient">at your institution?</span>
              </h2>
              <p className="mt-4 max-w-lg text-muted">
                Expert talks, hands-on GenAI workshops, bootcamps and faculty programs — online or on campus.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <ButtonLink href="/work-with-me?type=institution">
                Book an expert talk <Arrow />
              </ButtonLink>
              <ButtonLink href="/work-with-me?type=student" variant="ghost">
                Learn with me one-to-one
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryJsonLd) }} />
    </>
  );
}
