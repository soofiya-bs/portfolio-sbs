import Image from "next/image";
import Link from "next/link";
import { visibleGallery } from "@/content/site";
import { Arrow, ButtonLink, Section, SectionHeading } from "./ui";

/** Home-page teaser: a bento of the first few photos. Hidden until there are at least 3 to show. */
export function GalleryPreview() {
  const items = visibleGallery().slice(0, 5);
  if (items.length < 3) return null;

  return (
    <Section className="border-t border-line">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading eyebrow="Gallery" title="Moments from the classroom and beyond." />
        <ButtonLink href="/gallery" variant="ghost" className="shrink-0">
          View gallery <Arrow />
        </ButtonLink>
      </div>

      <div className="mt-14 grid auto-rows-[160px] grid-cols-2 gap-4 sm:auto-rows-[200px] md:grid-cols-4">
        {items.map((item, i) => (
          <Link
            key={`${item.caption}-${i}`}
            href="/gallery"
            data-reveal
            style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
            className={`group relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 row-span-2" : ""}`}
            aria-label={item.src ? item.caption : "Open the gallery"}
          >
            {item.src ? (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                className="object-cover object-[50%_35%] transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center border border-dashed border-gold/40 bg-ink-2">
                <div className="absolute inset-0 grid-bg opacity-60" />
                <div className="relative px-4 text-center">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">Sample</p>
                  <p className="mt-1 text-xs text-muted">{item.caption}</p>
                </div>
              </div>
            )}
          </Link>
        ))}
      </div>
    </Section>
  );
}
