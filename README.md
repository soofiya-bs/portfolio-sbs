# Personal website — Applied AI Engineer · Mentor · Founder

Next.js 15 (App Router) + Tailwind CSS v4. Every page is statically pre-rendered for SEO.

## Edit your content
- **`src/content/site.ts`** — name, bio, socials, stats, education, experience, program, services, projects, skills. Replace every `[bracketed]` placeholder.
- **`src/content/forms.ts`** — fields and options for the three inquiry forms (student / institution / project).
- Portrait: add `public/portrait.jpg` and swap the placeholder block in `src/app/about/page.tsx`.

## Add testimonials and gallery photos
Both live at the bottom of `src/content/site.ts`.

- **Testimonial:** add an entry to `testimonials` with the real `quote`, `name`, `role` and `category` (`student` shows on Mentorship, all show on Home and Services). Optional photo: put a square image in `public/testimonials/` and set `photo: "/testimonials/name.jpg"`. Always get the person's permission first.
- **Photo:** put the image in `public/gallery/` and add an entry to `gallery` with `src: "/gallery/file.jpg"`, an `alt` description, a `caption`, a `category`, and the image's real `width` and `height` in pixels.
- Entries marked `sample: true` are placeholders: they show in `npm run dev` with a "Sample" badge and are hidden on the live site. Delete them once you have real ones. Sections with nothing real to show hide themselves.

## Write a blog post or tutorial
Add a Markdown file to `content/posts/blog/` or `content/posts/tutorials/`. The file name becomes the URL (`my-post.md` → `/blog/my-post`).

```md
---
title: "Your title"
description: "One or two sentences — shown on cards and in Google."
date: 2026-11-12
tags: [AI Agents, Python]
level: Beginner        # tutorials only
duration: "30 min"     # tutorials only
draft: true            # remove (or set false) to publish
---

Your content in Markdown. Use ## for section headings — they build the
"On this page" menu. Code blocks with ``` get the dark terminal style.
```

Drafts show while running `npm run dev` (with a "Draft" badge) but are hidden from the live site and the sitemap.

## Pages
`/` · `/about` · `/mentorship` · `/services` · `/projects` · `/work-with-me?type=student|institution|project`

## SEO included
Per-page titles, descriptions and canonicals; Open Graph and Twitter cards; generated OG image; `sitemap.xml`; `robots.txt`; web manifest; JSON-LD (Person, Course, FAQPage).

## Inquiry emails
Copy `.env.example` to `.env.local` and fill in `RESEND_API_KEY`, `INQUIRY_TO_EMAIL` and `INQUIRY_FROM_EMAIL` (from [resend.com](https://resend.com), free tier). Without them, inquiries are only printed to the server console.

## Run
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

Deploy: push to GitHub and import on Vercel, set `NEXT_PUBLIC_SITE_URL` to your domain, plus the Resend vars.
