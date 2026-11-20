import Link from "next/link";
import { ArrowUpRightIcon, GitHubIcon } from "./Icons";
import { accent } from "./colors";
import { ProjectImage } from "./ProjectImage";
import { ZoomImage } from "./ZoomImage";
import type { Project } from "@/data/profile";

// Pieces of a project card, shared by the home page and the /projects page.

export function Tags({ tags, colorIndex }: { tags: string[]; colorIndex: number }) {
  const c = accent(colorIndex);
  return (
    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tools used">
      {tags.map((tag) => (
        <li
          key={tag}
          className={`rounded-full border px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-ink ${c.border}`}
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

// The button on the picture's corner: live site, case study, or (if neither) the status pill.
function CornerButton({ project, colorIndex }: { project: Project; colorIndex: number }) {
  const c = accent(colorIndex);
  const button = `inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-bold text-page transition-colors hover:bg-ink ${c.bg}`;
  if (project.live)
    return (
      <a href={project.live} className={button}>
        Live <ArrowUpRightIcon className="h-4 w-4" />
      </a>
    );
  if (project.caseStudy)
    return (
      <Link href={`/projects/${project.caseStudy}`} className={button}>
        Case study <span aria-hidden>→</span>
      </Link>
    );
  return (
    <span className="rounded-full bg-page/80 backdrop-blur-sm">
      <StatusPill project={project} colorIndex={colorIndex} />
    </span>
  );
}

// Project card: picture (zooms on hover) with a button on its corner, then the name, GitHub icon, text and tags.
// `wide` cards take the full row, with the text on the left and the picture on the right.
export function ProjectCard({
  project,
  colorIndex,
  wide = false,
}: {
  project: Project;
  colorIndex: number;
  wide?: boolean;
}) {
  const c = accent(colorIndex);
  const icon = project.icon ?? (project.kind === "Automation" ? "gear" : "laptop");
  return (
    <li
      className={`flex flex-col gap-2 rounded-3xl border border-line bg-card p-4 backdrop-blur-sm transition-colors ${c.hover} ${
        wide ? "md:col-span-2 md:flex-row-reverse md:gap-4" : ""
      }`}
    >
      {/* Pictures keep a 16:9 shape (same as a desktop screenshot), so the whole screenshot shows, uncropped. */}
      <div className={`relative ${wide ? "md:w-1/2 md:shrink-0 md:self-center" : ""}`}>
        <ZoomImage className="aspect-video rounded-2xl bg-page">
          <ProjectImage src={project.image} alt={`${project.title} screenshot`} icon={icon} iconSize={wide ? 150 : 120} />
        </ZoomImage>
        <div className="absolute right-3 top-3">
          <CornerButton project={project} colorIndex={colorIndex} />
        </div>
      </div>

      <div className={`flex flex-1 flex-col ${wide ? "p-2 md:p-4" : "p-2"}`}>
        <div className="flex items-start justify-between gap-3">
          <h3 className={`font-bold text-ink ${wide ? "text-2xl md:text-3xl" : "text-xl"}`}>{project.title}</h3>
          {project.code && (
            <a
              href={project.code}
              aria-label={`${project.title} code on GitHub`}
              title="Code on GitHub"
              className={`mt-1 shrink-0 text-body transition-colors ${c.hoverText}`}
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
          )}
        </div>
        <p className="mt-2 leading-relaxed">{project.description}</p>
        <Tags tags={project.tags} colorIndex={colorIndex} />
      </div>
    </li>
  );
}
