import { profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from "./Icons";
import { letterColors } from "./colors";

const navLinks = [
  { label: "about", href: "/#about" },
  { label: "experience", href: "/#experience" },
  { label: "projects", href: "/#projects" },
  { label: "contact", href: "/#contact" },
];

const iconLink = "text-body transition-colors hover:text-ink";

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-page/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
        <div className="flex items-center gap-6">
          {/* A plain link (not Next Link) so clicking it always reloads the page and replays the intro. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- the full reload is intended */}
          <a href="/" className="text-2xl font-bold tracking-tight" aria-label="Home">
            {profile.handle.split("").map((letter, i) => (
              <span key={i} style={{ color: letterColors[i % letterColors.length] }}>
                {letter}
              </span>
            ))}
          </a>
          <p className="hidden font-mono text-xs uppercase tracking-wider text-muted lg:block">
            {profile.stats.join(" · ")}
          </p>
        </div>

        <nav aria-label="Main" className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-lg font-semibold text-ink transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <span className="hidden h-6 w-px bg-line md:block" aria-hidden />
          <div className="flex items-center gap-4">
            <a href={profile.github} aria-label="GitHub" className={iconLink}>
              <GitHubIcon className="h-5 w-5" />
            </a>
            <a href={profile.linkedin} aria-label="LinkedIn" className={iconLink}>
              <LinkedInIcon className="h-5 w-5" />
            </a>
            {profile.whatsapp && (
              <a href={`https://wa.me/${profile.whatsapp}`} aria-label="WhatsApp" className={iconLink}>
                <WhatsAppIcon className="h-5 w-5" />
              </a>
            )}
            <a
              href={`mailto:${profile.email}`}
              aria-label={`Email ${profile.email}`}
              title={profile.email}
              className={iconLink}
            >
              <MailIcon className="h-5 w-5" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
