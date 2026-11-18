"use client";

import { useEffect, useRef, useState } from "react";
import type { CaseStudy, FlowNode } from "@/data/caseStudies";
import { FlowIconSvg } from "./FlowIcons";

// n8n-style diagram. Each "part" is PART_WIDTH px wide; the + button slides to the next one.
const PART_WIDTH = 680;
const VIEW_WIDTH = 720;
const NODE = 56;

const width = (node: FlowNode) => (node.end ? 44 : (node.w ?? NODE));

// The step that's "running" right now gets a glowing ring.
const RUNNING = "ring-2 ring-accent shadow-[0_0_22px_rgb(191_159_241/0.6)]";
const STEP_MS = 650;

function Node({ node, active }: { node: FlowNode; active: boolean }) {
  const w = width(node);
  const glow = `transition-shadow duration-300 ${active ? RUNNING : ""}`;

  if (node.end) {
    return (
      <div
        className={`absolute flex items-center justify-center rounded-full border border-white/10 bg-[#1b1b1e] font-mono text-[10px] font-semibold text-neutral-400 ${glow}`}
        style={{ left: node.x - w / 2, top: node.y - 11, width: w, height: 22 }}
      >
        END
      </div>
    );
  }

  const border = node.highlight ? "border-accent text-accent" : "border-white/10 text-neutral-100";

  // Wide card that lists what the step covers.
  if (node.items) {
    return (
      <div
        className={`absolute rounded-xl border bg-[#1b1b1e] ${border} ${glow}`}
        style={{ left: node.x - w / 2, top: node.y - NODE / 2, width: w }}
      >
        <div className="flex h-14 items-center gap-2 border-b border-white/10 px-3">
          <FlowIconSvg name={node.icon} className="h-5 w-5 shrink-0" />
          <span className="text-xs font-semibold leading-tight text-neutral-100">{node.label}</span>
        </div>
        <ul className="flex flex-col gap-1 px-3 py-2.5">
          {node.items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-[11px] leading-tight text-neutral-300">
              <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
        {node.note && (
          <p className="border-t border-white/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wide text-neutral-500">
            {node.note}
          </p>
        )}
        <span className="absolute -left-1 top-[23px] h-2 w-2 rounded-full bg-neutral-500" />
        <span className="absolute -right-1 top-[23px] h-2 w-2 rounded-full bg-neutral-500" />
      </div>
    );
  }

  return (
    <div
      className="absolute flex flex-col items-center"
      style={{ left: node.x - w / 2, top: node.y - NODE / 2, width: w }}
    >
      <div className={`relative flex h-14 w-14 items-center justify-center rounded-xl border bg-[#1b1b1e] ${border} ${glow}`}>
        <FlowIconSvg name={node.icon} className="h-6 w-6" />
        <span className="absolute -left-1 top-[23px] h-2 w-2 rounded-full bg-neutral-500" />
        <span className="absolute -right-1 top-[23px] h-2 w-2 rounded-full bg-neutral-500" />
      </div>
      <p
        className={`mt-1.5 w-28 text-center text-xs leading-tight ${
          node.highlight ? "font-semibold text-neutral-100" : "text-neutral-400"
        }`}
      >
        {node.label}
      </p>
    </div>
  );
}

export function WorkflowDiagram({ flow }: { flow: CaseStudy["flow"] }) {
  const [part, setPart] = useState(0);
  const [scale, setScale] = useState(1);
  const frameRef = useRef<HTMLDivElement>(null);
  const last = flow.parts.length - 1;

  // Shrink the whole diagram to fit narrow screens instead of cutting it off.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    setScale(Math.min(1, frame.clientWidth / VIEW_WIDTH));
    const observer = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / VIEW_WIDTH));
    });
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);
  // "Running" effect: the steps on the current slide light up column by column, left to right, on a loop.
  const columns = Array.from(
    new Set(flow.nodes.filter((n) => Math.floor(n.x / PART_WIDTH) === part).map((n) => n.x)),
  ).sort((a, b) => a - b);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    setTick(0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setTick((t) => t + 1), STEP_MS);
    return () => window.clearInterval(id);
  }, [part]);
  // One extra beat after the last column, so the loop has a short pause.
  const activeX = columns[tick % (columns.length + 1)];

  const height = flow.height;
  const byId = new Map(flow.nodes.map((n) => [n.id, n]));
  const trackWidth = flow.parts.length * PART_WIDTH + (VIEW_WIDTH - PART_WIDTH);

  const edges = flow.edges.flatMap(([fromId, toId, label]) => {
    const a = byId.get(fromId);
    const b = byId.get(toId);
    if (!a || !b) return [];
    const x1 = a.x + width(a) / 2;
    const x2 = b.x - width(b) / 2;
    const mid = (x1 + x2) / 2;
    const d =
      a.y === b.y
        ? `M${x1} ${a.y} L${x2} ${b.y}`
        : `M${x1} ${a.y} C${mid} ${a.y} ${mid} ${b.y} ${x2} ${b.y}`;
    // Branch labels end just before the step they lead to, like n8n,
    // and only show on the slide that step belongs to.
    const labelPart = Math.floor(b.x / PART_WIDTH);
    return [{ key: `${fromId}-${toId}`, d, label, lx: x2 - 8, ly: b.y, labelPart, toX: b.x }];
  });

  return (
    <div ref={frameRef} className="w-full overflow-hidden" style={{ height: height * scale }}>
      <div
        className="relative origin-top-left overflow-hidden rounded-2xl border border-white/10 bg-[#111113] [background-image:radial-gradient(rgb(255_255_255/0.08)_1px,transparent_1.3px)] [background-size:18px_18px]"
        style={{ width: VIEW_WIDTH, height, transform: `scale(${scale})` }}
      >
        <div
          className="absolute inset-y-0 left-0 transition-transform duration-700 ease-in-out"
          style={{ width: trackWidth, transform: `translateX(-${part * PART_WIDTH}px)` }}
        >
          <svg width={trackWidth} height={height} className="absolute inset-0" fill="none" aria-hidden>
            {edges.map((edge) => (
              <path
                key={edge.key}
                d={edge.d}
                stroke={edge.toX === activeX ? "var(--color-accent)" : "rgb(255 255 255 / 0.22)"}
                strokeWidth={2}
                style={{ transition: "stroke 300ms" }}
                strokeDasharray="6 6"
                className="animate-[flow_1.2s_linear_infinite]"
              />
            ))}
          </svg>

          {edges.map(
            (edge) =>
              edge.label && (
                <span
                  key={`${edge.key}-label`}
                  className={`absolute -translate-x-full -translate-y-1/2 whitespace-nowrap rounded-full border border-white/15 bg-[#26262a] px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide text-neutral-200 transition-opacity duration-500 ${
                    edge.labelPart === part ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ left: edge.lx, top: edge.ly }}
                >
                  {edge.label}
                </span>
              ),
          )}

          {flow.nodes.map((node) => (
            <Node key={node.id} node={node} active={node.x === activeX} />
          ))}
        </div>

        <p className="absolute left-4 top-3 rounded-full border border-white/10 bg-[#1b1b1e] px-3 py-1 text-xs font-medium text-neutral-100">
          Part {part + 1} of {flow.parts.length} · {flow.parts[part]}
        </p>

        {part > 0 && (
          <button
            type="button"
            onClick={() => setPart(part - 1)}
            className="absolute right-3 top-3 flex h-8 items-center gap-1.5 rounded-lg border border-white/10 bg-[#1b1b1e] px-3 text-xs font-medium text-neutral-100 transition-colors hover:border-accent"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
            Back
          </button>
        )}

        {part < last && (
          <>
            <span
              className="absolute right-2 animate-[bob_1.8s_ease-in-out_infinite] rounded-md border border-accent bg-accent-soft px-2 py-1 font-mono text-[11px] font-semibold tracking-wide text-accent"
              style={{ top: height / 2 - 67 }}
            >
              CLICK HERE
            </span>
            <button
              type="button"
              onClick={() => setPart(part + 1)}
              aria-label="Show the next part of the workflow"
              className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-on-accent transition-colors hover:bg-accent-hover"
              style={{ top: height / 2 - 22 }}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" aria-hidden>
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
