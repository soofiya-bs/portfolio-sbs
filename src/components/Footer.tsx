import Link from "next/link";
import { footerNav, nav, site, whatsappLink } from "@/content/site";
import { Container } from "./ui";

const socialLabels: Record<string, string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  linkedin: "LinkedIn",
  github: "GitHub",
};

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-2/50">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-serif text-2xl text-text">{site.name}</p>
            <p className="mt-2 text-sm text-muted">{site.role}</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-faint">{site.tagline}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {[...nav, ...footerNav, { label: "Work with me", href: "/work-with-me" }].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted transition-colors hover:text-gold-soft">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Connect</p>
            <ul className="mt-4 space-y-2.5">
              {Object.entries(site.socials).filter(([, href]) => href).map(([key, href]) => (
                <li key={key}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted transition-colors hover:text-gold-soft">
                    {socialLabels[key] ?? key}
                  </a>
                </li>
              ))}
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-sm text-muted transition-colors hover:text-gold-soft">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="text-sm text-muted transition-colors hover:text-gold-soft">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-faint sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>{site.location}</p>
        </div>
      </Container>
    </footer>
  );
}
