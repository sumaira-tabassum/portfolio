import type { Metadata } from "next";
import Link from "next/link";
import { TopNav } from "@/components/TopNav";
import { HeadingText } from "@/components/HeadingText";
import { ProjectCard } from "@/components/ProjectCard";
import { accent, projectColor } from "@/components/colors";
import { extraProjects, projects } from "@/data/profile";

export const metadata: Metadata = {
  title: "All projects · Sumaira Tabassum",
  description: "Every automation and app project, in one place.",
};

// Home page projects plus the extra ones, split into the two groups.
const all = [...projects, ...extraProjects];
const groups = [
  { title: "Automations", kind: "Automation" as const, items: all.filter((p) => p.kind === "Automation") },
  { title: "Apps", kind: "App" as const, items: all.filter((p) => p.kind === "App") },
];

export default function AllProjects() {
  return (
    <>
      <TopNav />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-12">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-body transition-colors hover:text-accent">
          <span aria-hidden>←</span> Back to home
        </Link>

        <div className="mb-14 mt-10 text-center">
          <h1 className={`text-5xl font-extrabold tracking-tight sm:text-6xl ${accent(projectColor("Automation")).text}`}>
            <HeadingText text="all projects" />
          </h1>
          <p className="mt-3 text-lg text-body">Automations and apps I&apos;ve built for real businesses.</p>
        </div>

        {groups.map((group) => (
          <section key={group.title} className="mb-16">
            <h2 className={`mb-6 text-3xl font-extrabold tracking-tight ${accent(projectColor(group.kind)).text}`}>
              <HeadingText text={group.title} />
            </h2>
            <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* The first project in each group (AI Lead Intake, Health Tracking) takes the full row. */}
              {group.items.map((project, i) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  colorIndex={projectColor(group.kind)}
                  wide={i === 0}
                />
              ))}
            </ul>
          </section>
        ))}
      </main>
    </>
  );
}
