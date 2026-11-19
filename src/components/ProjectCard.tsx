import Link from "next/link";
import { ArrowUpRightIcon, GitHubIcon } from "./Icons";
import { accent } from "./colors";
import type { Project } from "@/data/profile";

// Pieces of a project card, shared by the home page and the /projects page.

export function Tags({ tags }: { tags: string[] }) {
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

export function StatusPill({ project, colorIndex }: { project: Project; colorIndex: number }) {
  if (project.badge === false) return null;
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

export function ProjectLinks({ project }: { project: Project }) {
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

// The small project card (the home page shows featured projects as bigger cards).
export function SmallProjectCard({
  project,
  colorIndex,
  className = "",
}: {
  project: Project;
  colorIndex: number;
  className?: string;
}) {
  return (
    <li
      className={`flex flex-col rounded-3xl border border-line bg-card p-7 backdrop-blur-sm transition-colors ${accent(colorIndex).hover} ${className}`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <StatusPill project={project} colorIndex={colorIndex} />
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted">{project.kind}</span>
      </div>
      <h3 className="mt-4 text-xl font-bold text-ink">{project.title}</h3>
      <p className="mt-2 leading-relaxed">{project.description}</p>
      <Tags tags={project.tags} />
      <ProjectLinks project={project} />
    </li>
  );
}
