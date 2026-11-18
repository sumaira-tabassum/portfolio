import Link from "next/link";
import { TopNav } from "@/components/TopNav";
import { HeroName } from "@/components/HeroName";
import { TypingText } from "@/components/TypingText";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ContactChat } from "@/components/ContactChat";
import { HeroRole } from "@/components/HeroRole";
import { RichText } from "@/components/RichText";
import { HeadingText } from "@/components/HeadingText";
import { StatsRow } from "@/components/StatsRow";
import { Icon3D } from "@/components/Icon3D";
import { ArrowUpRightIcon, GitHubIcon } from "@/components/Icons";
import { accent } from "@/components/colors";
import { about, experience, profile, projects, reasons, type Project } from "@/data/profile";

function SectionTitle({
  id,
  title,
  subtitle,
  colorIndex,
}: {
  id: string;
  title: string;
  subtitle: string;
  colorIndex: number;
}) {
  return (
    <div className="mb-10 text-center">
      {/* Letters animate in (React Bits Split Text) once the heading scrolls into view. */}
      <h2 id={id} className={`text-5xl font-extrabold tracking-tight sm:text-6xl ${accent(colorIndex).text}`}>
        <HeadingText text={title} />
      </h2>
      <p className="mt-3 text-lg text-body">{subtitle}</p>
    </div>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tools used">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-line px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-body"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function StatusPill({ project, colorIndex }: { project: Project; colorIndex: number }) {
  const label = project.status ?? (project.live ? "Live" : project.caseStudy ? "Case study" : "Client work");
  const c = accent(colorIndex);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider ${c.border} ${c.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${c.bg}`} />
      {label}
    </span>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-auto flex flex-wrap items-center gap-5 pt-6 text-sm font-semibold">
      {project.caseStudy && (
        <Link href={`/projects/${project.caseStudy}`} className="text-ink transition-colors hover:text-accent">
          Read case study <span aria-hidden>→</span>
        </Link>
      )}
      {project.live && (
        <a href={project.live} className="flex items-center gap-1 text-ink transition-colors hover:text-accent">
          Live site <ArrowUpRightIcon className="h-4 w-4" />
        </a>
      )}
      {project.code && (
        <a href={project.code} className="flex items-center gap-1.5 text-body transition-colors hover:text-ink">
          <GitHubIcon className="h-4 w-4" /> Code
        </a>
      )}
      {!project.live && !project.code && !project.caseStudy && (
        <span className="font-normal text-muted">Case study coming soon</span>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <TopNav />

      <main className="mx-auto max-w-6xl px-6">
        {/* Hero */}
        {/* Fills the first screen (minus the 4rem top bar) so everything in it is visible on load. */}
        <section className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center py-10 text-center">
          <HeroName />
          {/* Starts typing once the name has finished dropping in. */}
          <TypingText
            text={profile.tagline}
            startDelay={1700}
            className="mx-auto mt-6 max-w-xl text-xl leading-relaxed text-ink sm:text-2xl"
          />
          <p className="mt-4 font-mono text-base font-bold uppercase tracking-wider">
            <span className="sr-only">{profile.role}</span>
            <span aria-hidden>
              {/* Waits until the tagline has finished typing (1700ms delay + 35ms per letter), then starts right away. */}
              <HeroRole texts={profile.roles} startAfter={1700 + profile.tagline.length * 35} />
            </span>
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-xs uppercase tracking-wider text-body">
              <span className="h-2 w-2 rounded-full bg-green" />
              Open to full-time roles and freelance
            </span>
          </div>
          {/* Phones and tablets: the top bar hides its links there, so show them here. */}
          <nav aria-label="Sections" className="mt-6 flex flex-wrap justify-center gap-2 md:hidden">
            {["about", "experience", "projects", "contact"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-full border border-line px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink"
              >
                {id}
              </a>
            ))}
          </nav>
        </section>

        {/* About */}
        <section className="py-20">
          <SectionTitle id="about" title="about me" subtitle="Automation first, developer always." colorIndex={0} />
          <StatsRow />
          <div className="mx-auto flex max-w-2xl flex-col gap-5 text-lg leading-relaxed">
            {about.map((paragraph) => (
              <p key={paragraph}>
                <RichText text={paragraph} />
              </p>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href={profile.resume}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-page transition-colors hover:bg-accent"
            >
              View resume <ArrowUpRightIcon className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* Experience */}
        <section className="py-20">
          <SectionTitle id="experience" title="experience" subtitle="Where I've built things so far." colorIndex={1} />
          <ExperienceTimeline jobs={experience} />
        </section>

        {/* Projects */}
        <section className="py-20">
          <SectionTitle id="projects" title="selected work" subtitle="Automations and apps I've built for real businesses." colorIndex={2} />
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {projects.map((project, i) =>
              project.featured ? (
                <li
                  key={project.title}
                  className={`grid gap-8 rounded-3xl border border-line bg-card p-8 backdrop-blur-sm transition-colors md:col-span-2 md:grid-cols-[1.2fr_1fr] ${accent(i).hover}`}
                >
                  <div className="flex flex-col">
                    <div className="flex flex-wrap items-center gap-3">
                      <StatusPill project={project} colorIndex={i} />
                      <span className="font-mono text-[11px] uppercase tracking-wider text-muted">{project.kind}</span>
                    </div>
                    <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-ink">{project.title}</h3>
                    <p className="mt-3 text-lg leading-relaxed">{project.description}</p>
                    <Tags tags={project.tags} />
                    <ProjectLinks project={project} />
                  </div>
                  <div className="flex min-h-56 items-center justify-center rounded-2xl border border-line bg-[radial-gradient(circle_at_center,var(--bg-glow),transparent_70%)]">
                    {project.icon && <Icon3D name={project.icon} size={150} />}
                  </div>
                </li>
              ) : (
                <li
                  key={project.title}
                  className={`flex flex-col rounded-3xl border border-line bg-card p-7 backdrop-blur-sm transition-colors ${accent(i).hover}`}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusPill project={project} colorIndex={i} />
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted">{project.kind}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-ink">{project.title}</h3>
                  <p className="mt-2 leading-relaxed">{project.description}</p>
                  <Tags tags={project.tags} />
                  <ProjectLinks project={project} />
                </li>
              ),
            )}
          </ul>
        </section>

        {/* Why me: after the proof (experience, projects), right before Contact. */}
        <section className="py-20">
          <SectionTitle id="why-me" title="why me" subtitle="What working with me looks like." colorIndex={3} />
          <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
            {reasons.map((reason, i) => (
              <li
                key={reason.title}
                className={`rounded-3xl border border-line bg-card p-7 backdrop-blur-sm transition-colors ${accent(i).hover}`}
              >
                <p className={`font-mono text-sm font-bold ${accent(i).text}`}>{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-xl font-bold text-ink">{reason.title}</h3>
                <p className="mt-3 leading-relaxed">{reason.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact */}
        <section className="py-20">
          <SectionTitle id="contact" title="say hello" subtitle="Tell me what you're working on." colorIndex={4} />
          <ContactChat />
        </section>

        <footer className="border-t border-line py-10 text-center font-mono text-xs uppercase tracking-wider text-muted">
          Built with Next.js and Tailwind CSS · Set in Parkinsans and Geist Mono · {profile.location}
        </footer>
      </main>
    </>
  );
}
