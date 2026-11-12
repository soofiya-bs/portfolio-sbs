import Image from "next/image";
import Link from "next/link";
import { formatDate, kindLabel, type Post, type PostMeta } from "@/lib/post-utils";
import { site } from "@/content/site";
import { Arrow, ButtonLink, Container, Section, Tag } from "./ui";

function hrefFor(p: PostMeta) {
  return `/${p.kind}/${p.slug}`;
}

function MetaLine({ p }: { p: PostMeta }) {
  const bits = [formatDate(p.date), p.duration ?? `${p.readingMinutes} min read`];
  if (p.part) bits.unshift(`Part ${p.part}`);
  if (p.level) bits.push(p.level);
  return <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">{bits.join("  ·  ")}</p>;
}

export function PostCard({ p, showKind = false, index = 0 }: { p: PostMeta; showKind?: boolean; index?: number }) {
  return (
    <article
      data-reveal
      style={{ "--d": `${(index % 3) * 100}ms` } as React.CSSProperties}
      className="card group flex flex-col p-7"
    >
      <div className="flex flex-wrap items-center gap-2">
        {showKind && (
          <span className="rounded-full bg-btn px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-btn-fg">
            {kindLabel[p.kind]}
          </span>
        )}
        {p.draft && (
          <span className="rounded-full border border-dashed border-gold/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
            Draft
          </span>
        )}
        <MetaLine p={p} />
      </div>
      <h3 className="mt-4 font-serif text-2xl leading-snug text-text">
        <Link href={hrefFor(p)} className="after:absolute after:inset-0">
          {p.title}
        </Link>
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-medium text-gold-soft transition-colors group-hover:text-gold">
        {p.kind === "tutorials" ? "Start tutorial" : "Read article"} <Arrow />
      </span>
    </article>
  );
}

export function PostGrid({ posts, showKind = false }: { posts: PostMeta[]; showKind?: boolean }) {
  if (!posts.length) {
    return (
      <div className="card p-10 text-center">
        <p className="font-serif text-2xl text-text">New posts are on the way.</p>
        <p className="mt-2 text-muted">Follow along on Instagram for the latest in the meantime.</p>
      </div>
    );
  }
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((p, i) => (
        <PostCard key={`${p.kind}-${p.slug}`} p={p} showKind={showKind} index={i} />
      ))}
    </div>
  );
}

export function Article({ post, more }: { post: Post; more: PostMeta[] }) {
  const listHref = `/${post.kind}`;
  const isTutorial = post.kind === "tutorials";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": isTutorial ? "TechArticle" : "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(", "),
    ...(isTutorial && post.level ? { proficiencyLevel: post.level } : {}),
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: { "@type": "Person", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}${listHref}/${post.slug}`,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: isTutorial ? "Tutorials" : "Blog", item: `${site.url}${listHref}` },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 grid-bg" />
        <div className="pointer-events-none absolute -top-48 left-1/4 h-[420px] w-[640px] glow-gold" />
        <div className="pointer-events-none absolute -bottom-40 right-0 h-[380px] w-[520px] glow-plum" />
        <Container className="relative pb-14 pt-12 sm:pb-16 sm:pt-16">
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-faint">
            <Link href="/" className="hover:text-gold-soft">
              home
            </Link>
            <span className="mx-2">/</span>
            <Link href={listHref} className="hover:text-gold-soft">
              {post.kind}
            </Link>
          </nav>
          <div className="glass mt-6 max-w-3xl px-6 py-8 sm:px-10 sm:py-10">
            <div data-reveal className="flex flex-wrap items-center gap-2">
              {post.draft && (
                <span className="rounded-full border border-dashed border-gold/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                  Draft — not visible on the live site
                </span>
              )}
              {post.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <h1
              data-reveal
              style={{ "--d": "80ms" } as React.CSSProperties}
              className="mt-6 font-serif text-4xl leading-[1.08] tracking-tight text-text sm:text-5xl lg:text-[3.4rem]"
            >
              {post.title}
            </h1>
            <p data-reveal style={{ "--d": "160ms" } as React.CSSProperties} className="mt-5 text-lg leading-relaxed text-muted">
              {post.description}
            </p>
            <div data-reveal style={{ "--d": "220ms" } as React.CSSProperties} className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3">
                <Image src="/portrait.jpg" alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover object-[50%_35%]" />
                <div>
                  <p className="text-sm font-medium text-text">{site.name}</p>
                  <MetaLine p={post} />
                </div>
              </div>
            </div>
            {isTutorial && (post.level || post.duration) && (
              <dl className="mt-8 grid max-w-md grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
                {post.level && (
                  <div className="bg-surface px-4 py-3">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Level</dt>
                    <dd className="mt-1 text-sm text-text">{post.level}</dd>
                  </div>
                )}
                {post.duration && (
                  <div className="bg-surface px-4 py-3">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Time</dt>
                    <dd className="mt-1 text-sm text-text">{post.duration}</dd>
                  </div>
                )}
              </dl>
            )}
          </div>
        </Container>
      </section>

      {/* Body */}
      <Section className="!pt-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div className="card px-6 py-8 sm:px-10 sm:py-12">
            <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
          {post.toc.length > 1 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">On this page</p>
                <ol className="mt-4 space-y-2.5 border-l border-line">
                  {post.toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} className="-ml-px block border-l border-transparent pl-4 text-sm text-muted transition-colors hover:border-gold hover:text-text">
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          )}
        </div>

        {/* Author / CTA */}
        <div data-reveal className="card mt-12 flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:p-9">
          <Image src="/portrait.jpg" alt={site.name} width={88} height={88} className="h-20 w-20 shrink-0 rounded-2xl object-cover object-[50%_35%]" />
          <div className="flex-1">
            <p className="font-serif text-2xl text-text">Written by {site.name}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{site.tagline}</p>
          </div>
          <ButtonLink href="/work-with-me?type=student" className="shrink-0">
            Learn with me <Arrow />
          </ButtonLink>
        </div>
      </Section>

      {more.length > 0 && (
        <Section className="border-t border-line">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-serif text-3xl text-text sm:text-4xl">Keep reading</h2>
            <Link href={listHref} className="inline-flex items-center gap-2 text-sm text-gold-soft hover:text-gold">
              All {post.kind === "tutorials" ? "tutorials" : "posts"} <Arrow />
            </Link>
          </div>
          <div className="mt-10">
            <PostGrid posts={more} />
          </div>
        </Section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumb]) }} />
    </>
  );
}
