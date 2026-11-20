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
import { ArrowUpRightIcon } from "@/components/Icons";
import { ProjectCard } from "@/components/ProjectCard";
import { accent, projectColor, sectionColor } from "@/components/colors";
import { about, experience, profile, projects, reasons } from "@/data/profile";

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
            {["about", "experience", "projects", "why-me", "contact"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-full border border-line px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink"
              >
                {id.replace("-", " ")}
              </a>
            ))}
          </nav>
        </section>

        {/* About */}
        <section className="py-20">
          <SectionTitle id="about" title="about me" subtitle="Automation first, developer always." colorIndex={sectionColor.about} />
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
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-page transition-colors hover:bg-purple"
            >
              View resume <ArrowUpRightIcon className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* Experience */}
        <section className="py-20">
          <SectionTitle id="experience" title="experience" subtitle="Where I've built things so far." colorIndex={sectionColor.experience} />
          <ExperienceTimeline jobs={experience} />
        </section>

        {/* Projects */}
        <section className="py-20">
          <SectionTitle id="projects" title="selected work" subtitle="Automations and apps I've built for real businesses." colorIndex={sectionColor.automations} />
          {/* Featured projects take a full row; the rest sit two per row. */}
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                colorIndex={projectColor(project.kind)}
                wide={project.featured}
              />
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-page transition-colors hover:bg-orange"
            >
              View all projects <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        {/* Why me: after the proof (experience, projects), right before Contact. */}
        <section className="py-20">
          <SectionTitle id="why-me" title="why me" subtitle="What working with me looks like." colorIndex={sectionColor.whyMe} />
          <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
            {reasons.map((reason, i) => (
              <li
                key={reason.title}
                className={`rounded-3xl border border-line bg-card p-7 backdrop-blur-sm transition-colors ${accent(sectionColor.whyMe).hover}`}
              >
                <p className={`font-mono text-sm font-bold ${accent(sectionColor.whyMe).text}`}>{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-xl font-bold text-ink">{reason.title}</h3>
                <p className="mt-3 leading-relaxed">{reason.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact */}
        <section className="py-20">
          <SectionTitle id="contact" title="say hello" subtitle="Tell me what you're working on." colorIndex={sectionColor.contact} />
          <ContactChat />
        </section>

        <footer className="border-t border-line py-10 text-center font-mono text-xs uppercase tracking-wider text-muted">
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </footer>
      </main>
    </>
  );
}
