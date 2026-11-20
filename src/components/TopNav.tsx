import { profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from "./Icons";
import { accent, letterColors, sectionColor } from "./colors";
import { ThemeToggle } from "./ThemeToggle";

// Each link takes its section's colour.
const navLinks = [
  { label: "about", href: "/#about", color: sectionColor.about },
  { label: "experience", href: "/#experience", color: sectionColor.experience },
  { label: "projects", href: "/#projects", color: sectionColor.automations },
  { label: "why me", href: "/#why-me", color: sectionColor.whyMe },
  { label: "contact", href: "/#contact", color: sectionColor.contact },
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
          <span className="h-6 w-px bg-line" aria-hidden />
          <div className="flex items-center gap-4">
            <a href={profile.linkedin} aria-label="LinkedIn" className={iconLink}>
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a href={profile.github} aria-label="GitHub" className={iconLink}>
              <GitHubIcon className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label={`Email ${profile.email}`}
              title={profile.email}
              className={iconLink}
            >
              <MailIcon className="h-5 w-5" />
            </a>
            {profile.whatsapp && (
              <a href={`https://wa.me/${profile.whatsapp}`} aria-label="WhatsApp" className={iconLink}>
                <WhatsAppIcon className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        <nav aria-label="Main" className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`text-lg font-semibold text-ink transition-colors ${accent(link.color).hoverText}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
