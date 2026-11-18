"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { CaseStudy } from "@/data/caseStudies";
import { PlaceholderBox, PlaceholderText } from "./PlaceholderText";

type Shot = CaseStudy["screenshots"][number];

// Screenshots stacked at full width. Clicking one opens it in a viewer:
// click the image (or press Z) to zoom to its real size and scroll around,
// "Open in new tab" shows the original file, Esc or a click outside closes it,
// and the arrow keys move between screenshots.
export function ScreenshotGallery({ shots }: { shots: Shot[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const total = shots.length;

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      setZoomed(false);
      setOpen((current) => (current === null ? null : (current + dir + total) % total));
    },
    [total],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "z" || e.key === "Z") setZoomed((z) => !z);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  const current = open !== null ? shots[open] : null;
  const pill = "flex h-10 items-center rounded-full border border-white/20 px-4 text-sm hover:bg-white/10";

  return (
    <>
      <div className="flex flex-col gap-12">
        {shots.map((shot, i) => (
          <figure key={shot.caption}>
            {shot.image ? (
              <button
                type="button"
                onClick={() => {
                  setZoomed(false);
                  setOpen(i);
                }}
                className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-line bg-white text-left transition-colors hover:border-accent"
                aria-label={`Open screenshot ${i + 1} full size`}
              >
                <Image
                  src={shot.image}
                  alt={shot.caption}
                  sizes="(min-width: 896px) 816px, 100vw"
                  className="h-auto w-full"
                />
                <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  Click to enlarge
                </span>
              </button>
            ) : (
              <PlaceholderBox className="aspect-video" label="[Screenshot]" />
            )}
            <figcaption className="mt-3 flex gap-3 leading-relaxed">
              <span className="font-mono text-xs font-semibold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <PlaceholderText text={shot.caption} />
                {shot.note && <span className="mt-2 block text-sm text-muted">{shot.note}</span>}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      {current?.image && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Screenshot ${open! + 1} of ${total}`}
          className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-mono text-xs uppercase tracking-wider text-neutral-300">
              {String(open! + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={() => step(-1)} className={pill} aria-label="Previous screenshot">
                ←
              </button>
              <button type="button" onClick={() => step(1)} className={pill} aria-label="Next screenshot">
                →
              </button>
              <button type="button" onClick={() => setZoomed((z) => !z)} className={pill}>
                {zoomed ? "Fit to screen" : "Zoom in"}
              </button>
              <a href={current.image.src} target="_blank" rel="noopener noreferrer" className={pill}>
                Open in new tab ↗
              </a>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="h-10 rounded-full bg-white px-4 text-sm font-semibold text-black hover:bg-neutral-200"
              >
                Close
              </button>
            </div>
          </div>

          {/* Fitted: whole image on screen. Zoomed: real size, scroll to move around. */}
          <div
            className={`min-h-0 flex-1 px-4 pb-4 ${
              zoomed ? "overflow-auto" : "flex items-center justify-center"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- full-size original, not resized */}
            <img
              src={current.image.src}
              alt={current.caption}
              onClick={(e) => {
                e.stopPropagation();
                setZoomed((z) => !z);
              }}
              className={`rounded-lg bg-white ${
                zoomed
                  ? "max-w-none cursor-zoom-out"
                  : "max-h-full max-w-full cursor-zoom-in object-contain"
              }`}
              style={zoomed ? { width: current.image.width } : undefined}
            />
          </div>
          <p className="px-5 pb-5 text-center text-sm leading-relaxed text-neutral-300">
            {current.caption}
          </p>
        </div>
      )}
    </>
  );
}
