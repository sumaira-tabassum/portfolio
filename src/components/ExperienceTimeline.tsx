"use client";

import { useEffect, useRef, useState } from "react";
import type { Experience } from "@/data/profile";
import { accent, sectionColor } from "./colors";

// Jobs on a vertical line that draws itself as you scroll down.
// Each job's dot lights up once the line reaches it.
export function ExperienceTimeline({ jobs }: { jobs: Experience[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [lit, setLit] = useState<boolean[]>([]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      setLit(jobs.map(() => true));
      return;
    }

    const update = () => {
      const box = list.getBoundingClientRect();
      // The line's tip follows a point 60% of the way down the screen.
      const tip = window.innerHeight * 0.6 - box.top;
      setProgress(Math.min(1, Math.max(0, tip / box.height)));
      setLit(
        dotRefs.current.map((dot) => {
          if (!dot) return false;
          return dot.getBoundingClientRect().top - box.top <= tip;
        }),
      );
    };
    // Only a couple of measurements, so it's cheap enough to run on every scroll event.
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [jobs]);

  return (
    <ol ref={listRef} className="relative mx-auto flex max-w-3xl flex-col gap-10 pl-10 sm:pl-14">
      {/* Faint full-length track, then the coloured line drawn over it. */}
      <span aria-hidden className="absolute bottom-0 left-[11px] top-2 w-0.5 rounded-full bg-line sm:left-[19px]" />
      <span
        aria-hidden
        className="absolute left-[11px] top-2 w-0.5 origin-top rounded-full bg-pink sm:left-[19px]"
        style={{ height: "calc(100% - 0.5rem)", transform: `scaleY(${progress})` }}
      />

      {jobs.map((job, i) => {
        const c = accent(sectionColor.experience);
        const on = lit[i];
        return (
          <li key={job.title} className="relative">
            <span
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              aria-hidden
              className={`absolute -left-10 top-7 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-page transition-all duration-500 sm:-left-14 sm:h-10 sm:w-10 ${
                on ? `${c.border} scale-100` : "scale-75 border-line"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full transition-colors duration-500 sm:h-3 sm:w-3 ${on ? c.bg : "bg-line"}`}
              />
            </span>
            <div
              className={`rounded-3xl border border-line bg-card p-7 backdrop-blur-sm transition-all duration-700 ${
                on ? "translate-y-0 opacity-100" : "translate-y-4 opacity-40"
              }`}
            >
              <p className={`font-mono text-xs font-semibold uppercase tracking-wider ${c.text}`}>{job.period}</p>
              <h3 className="mt-2 text-2xl font-bold text-ink">{job.title}</h3>
              <p className="mt-1 text-body">{job.company}</p>
              <p className="mt-4 leading-relaxed">{job.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tools used">
                {job.tags.map((tag) => (
                  <li
                    key={tag}
                    className={`rounded-full border px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-ink ${c.border}`}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
