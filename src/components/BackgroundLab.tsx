"use client";

import { useEffect, useRef, useState } from "react";
import Particles from "./Particles";

// The 5 site backgrounds and the switcher that picks between them.

const CELL = 48; // same grid size as the site background
const FALLBACK = ["#b28ab5", "#f59087", "#e0605c", "#fcc09d", "#45b5a8", "#8cfb86", "#b066b2"];
// The same 7 colours in light mode (keep in sync with html[data-theme="light"] in theme.css).
const FALLBACK_LIGHT = ["#8a5e8e", "#cf6559", "#c23c38", "#c9773f", "#1f8a7e", "#2f9e3b", "#8f3f92"];

// Grid and line colour (as "r,g,b"): white on the dark page, black on the light one.
// Set by BackgroundLab on every render, before the backgrounds below draw.
let inkRgb = "255,255,255";
const ink = () => inkRgb;

function siteColors() {
  const css = getComputedStyle(document.documentElement);
  const names = ["purple", "pink", "coral", "orange", "blue", "green", "plum"];
  const found = names.map((n) => css.getPropertyValue(`--color-${n}`).trim()).filter(Boolean);
  return found.length ? found : FALLBACK;
}

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// A full-screen canvas that redraws every frame.
function useCanvasLoop(draw: (ctx: CanvasRenderingContext2D, w: number, h: number, dt: number) => void) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let w = 0;
    let h = 0;
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    window.addEventListener("resize", size);
    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      ctx.clearRect(0, 0, w, h);
      draw(ctx, w, h, reduced() ? 0 : dt);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
    };
  }, [draw]);
  return ref;
}

/* 1. Data pulses: glowing dots travel along the grid lines. */
type Pulse = { x: number; y: number; dx: number; dy: number; cells: number; t: number; wait: number; color: string };

function DataPulses({ gridLines = true }: { gridLines?: boolean }) {
  const pulses = useRef<Pulse[]>([]);
  const colors = useRef<string[]>(FALLBACK);
  useEffect(() => {
    colors.current = siteColors();
  }, []);
  const spawn = (w: number, h: number): Pulse => {
    const horizontal = Math.random() < 0.5;
    const dir = Math.random() < 0.5 ? 1 : -1;
    return {
      x: Math.floor(Math.random() * (w / CELL)) * CELL,
      y: Math.floor(Math.random() * (h / CELL)) * CELL,
      dx: horizontal ? dir : 0,
      dy: horizontal ? 0 : dir,
      cells: 3 + Math.floor(Math.random() * 5),
      t: 0,
      wait: Math.random() * 1500,
      color: colors.current[Math.floor(Math.random() * colors.current.length)],
    };
  };
  const ref = useCanvasLoop((ctx, w, h, dt) => {
    if (gridLines) drawGridLines(ctx, w, h, 0.045);
    while (pulses.current.length < 6) pulses.current.push(spawn(w, h));
    pulses.current = pulses.current.map((p) => {
      if (p.wait > 0) return { ...p, wait: p.wait - dt };
      const t = p.t + dt / (p.cells * 320);
      if (t >= 1) return spawn(w, h);
      const len = p.cells * CELL;
      const head = t * len;
      const tail = Math.max(0, head - CELL * 1.6);
      const hx = p.x + p.dx * head;
      const hy = p.y + p.dy * head;
      const grad = ctx.createLinearGradient(p.x + p.dx * tail, p.y + p.dy * tail, hx, hy);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(1, p.color);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(p.x + p.dx * tail, p.y + p.dy * tail);
      ctx.lineTo(hx, hy);
      ctx.stroke();
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(hx, hy, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      return { ...p, t };
    });
  });
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}

function drawGridLines(ctx: CanvasRenderingContext2D, w: number, h: number, alpha: number) {
  ctx.strokeStyle = `rgba(${ink()},${alpha})`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 0.5; x < w; x += CELL) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
  }
  for (let y = 0.5; y < h; y += CELL) {
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }
  ctx.stroke();
}

// Plus-sign pattern (a small + at every grid crossing), at a given brightness.
const plusPattern = (alpha: number) => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${CELL}' height='${CELL}'><path d='M24 19v10M19 24h10' stroke='rgba(${ink()},${alpha})' stroke-width='1.2' stroke-linecap='round'/></svg>`;
  return {
    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
    backgroundSize: `${CELL}px ${CELL}px`,
    backgroundPosition: `-${CELL / 2}px -${CELL / 2}px`,
  };
};

/* 2. Cursor spotlight: the grid is almost invisible except around the mouse. */
function Spotlight({ pattern = "lines" }: { pattern?: "lines" | "plus" }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: PointerEvent) => {
      ref.current?.style.setProperty("--mx", `${e.clientX}px`);
      ref.current?.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  const lines = (a: number) => ({
    backgroundImage: `linear-gradient(rgba(${ink()},${a}) 1px, transparent 1px), linear-gradient(90deg, rgba(${ink()},${a}) 1px, transparent 1px)`,
    backgroundSize: `${CELL}px ${CELL}px`,
  });
  // Plus marks stay visible everywhere (dim), and light up near the mouse.
  const base = pattern === "plus" ? plusPattern(0.1) : lines(0.02);
  const bright = pattern === "plus" ? plusPattern(0.55) : lines(0.16);
  return (
    <div ref={ref} className="absolute inset-0" style={{ ["--mx" as string]: "50%", ["--my" as string]: "40%" }}>
      <div className="absolute inset-0" style={base} />
      <div
        className="absolute inset-0"
        style={{
          ...bright,
          maskImage: "radial-gradient(260px circle at var(--mx) var(--my), black, transparent)",
          WebkitMaskImage: "radial-gradient(260px circle at var(--mx) var(--my), black, transparent)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(420px circle at var(--mx) var(--my), rgb(178 138 181 / 0.08), transparent)" }}
      />
    </div>
  );
}

/* 4. Faint workflow lines with dots flowing along them. */
const flowPaths = [
  "M -50 180 C 300 180, 360 420, 720 420 S 1150 260, 1500 300",
  "M -50 640 C 260 640, 420 520, 700 560 S 1100 780, 1500 700",
  "M 220 -40 C 220 200, 520 260, 560 520 S 420 820, 480 960",
  "M 1180 -40 C 1160 220, 940 300, 980 540 S 1240 760, 1200 960",
];
const flowNodes: [number, number][] = [
  [720, 420],
  [700, 560],
  [560, 520],
  [980, 540],
  [300, 210],
  [1180, 280],
];

function WorkflowLines() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <filter id="flow-glow">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      {flowPaths.map((d, i) => (
        <path key={i} id={`flow-${i}`} d={d} fill="none" stroke={`rgba(${ink()},0.08)`} strokeWidth="1.5" strokeDasharray="6 8" />
      ))}
      {flowNodes.map(([x, y], i) => (
        <rect key={i} x={x - 9} y={y - 9} width="18" height="18" rx="5" style={{ fill: "var(--color-page)" }} stroke={`rgba(${ink()},0.14)`} />
      ))}
      {flowPaths.map((_, i) => (
        <g key={i}>
          <circle r="5" style={{ fill: `var(--color-${['purple','pink','coral','orange'][i]})` }} filter="url(#flow-glow)">
            <animateMotion dur={`${7 + i * 1.5}s`} repeatCount="indefinite" begin={`${i * 0.8}s`}>
              <mpath href={`#flow-${i}`} />
            </animateMotion>
          </circle>
          <circle r="2.5" style={{ fill: `var(--color-${['purple','pink','coral','orange'][i]})` }}>
            <animateMotion dur={`${7 + i * 1.5}s`} repeatCount="indefinite" begin={`${i * 0.8}s`}>
              <mpath href={`#flow-${i}`} />
            </animateMotion>
          </circle>
        </g>
      ))}
    </svg>
  );
}

/* Particles (React Bits), with the exact settings of its demo page but in the site colours. Remounts when the colour changes. */
function ParticlesBg() {
  const [colors] = useState(siteColors);
  return (
    <Particles
      particleColors={colors}
      particleCount={200}
      particleSpread={10}
      speed={0.1}
      particleBaseSize={100}
      glow={0.5}
      twinkle={0.3}
      moveParticlesOnHover
      hoverEffect="parallax"
      sizeRandomness={1}
      shape="circle"
      depthOfField={0}
      connections={false}
      particleHoverFactor={1}
      drift="none"
      alphaParticles={false}
      cameraDistance={20}
      variation={0}
      opacity={1}
    />
  );
}

const options = [
  { name: "Data pulses", el: <DataPulses /> },
  { name: "Cursor spotlight", el: <Spotlight /> },
  { name: "Workflow lines", el: <WorkflowLines /> },
  { name: "Particles", el: <ParticlesBg /> },
  { name: "Plus + spotlight", el: <Spotlight pattern="plus" /> },
];

const BG_KEY = "background";
const COLOR_KEY = "site-color";
const COLOR_VARS = ["purple", "pink", "coral", "orange", "blue", "green", "plum"];

// colour = -1 keeps the multicolour look; 0-6 paints the whole site in that one colour.
function applyColor(index: number, light: boolean) {
  const root = document.documentElement.style;
  const one = (light ? FALLBACK_LIGHT : FALLBACK)[index];
  for (const name of COLOR_VARS) {
    if (one) root.setProperty(`--color-${name}`, one);
    else root.removeProperty(`--color-${name}`);
  }
  if (one) {
    root.setProperty("--color-accent", one);
    root.setProperty("--color-accent-hover", `color-mix(in srgb, ${one} 80%, white)`);
    root.setProperty("--color-accent-soft", `color-mix(in srgb, ${one} 16%, transparent)`);
  } else {
    for (const name of ["accent", "accent-hover", "accent-soft"]) root.removeProperty(`--color-${name}`);
  }
}

// Site-wide background, plus a small button (bottom right) that opens a panel
// to switch the background and the site colour. Choices are remembered in the browser.
export function BackgroundLab() {
  const [pick, setPick] = useState(0);
  const [color, setColor] = useState(-1);
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  inkRgb = light ? "0,0,0" : "255,255,255";

  useEffect(() => {
    try {
      const bg = Number(localStorage.getItem(BG_KEY));
      if (bg > 0 && bg < options.length) setPick(bg);
      const saved = localStorage.getItem(COLOR_KEY);
      const c = saved === null ? -1 : Number(saved);
      if (c >= 0 && c < FALLBACK.length) setColor(c);
    } catch {
      // storage blocked: keep the defaults
    }
  }, []);

  // Follow the light/dark switch in the top bar.
  useEffect(() => {
    const html = document.documentElement;
    const read = () => setLight(html.dataset.theme === "light");
    read();
    const watch = new MutationObserver(read);
    watch.observe(html, { attributes: true, attributeFilter: ["data-theme"] });
    return () => watch.disconnect();
  }, []);

  // Paint the chosen single colour (its light or dark version). Done during render, not in an effect,
  // so the remounted backgrounds below already read the new colours when they start.
  const applied = useRef("");
  const look = `${color}-${light}`;
  if (typeof document !== "undefined" && applied.current !== look) {
    applyColor(color, light);
    applied.current = look;
  }

  // Close on Esc or a click outside the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const save = (key: string, value: number) => {
    try {
      localStorage.setItem(key, String(value));
    } catch {
      // storage blocked: the choice just won't be remembered
    }
  };
  const chooseBg = (i: number) => {
    setPick(i);
    save(BG_KEY, i);
  };
  const chooseColor = (i: number) => {
    setColor(i);
    save(COLOR_KEY, i);
  };

  const swatch = "h-7 w-7 rounded-full border-2 transition-transform hover:scale-110";

  return (
    <>
      {/* Sits behind all content and covers the plain grid from globals.css.
          The key remounts it when the colour or light/dark changes, so the animations pick up the new colours. */}
      <div key={`${color}-${light}`} aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-page">
        {options[pick].el}
      </div>

      <div ref={panelRef} className="fixed bottom-4 right-4 z-40 flex flex-col items-end">
        {open && (
          <div className="mb-3 w-60 rounded-2xl border border-line bg-page/95 p-4 backdrop-blur-md">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted">Background</p>
            <div className="mt-2 flex gap-2">
              {options.map((o, i) => (
                <button
                  key={o.name}
                  type="button"
                  onClick={() => chooseBg(i)}
                  aria-pressed={pick === i}
                  aria-label={`Background ${i + 1}: ${o.name}`}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border font-mono text-xs transition-colors ${
                    pick === i ? "border-accent bg-accent text-on-accent" : "border-line text-body hover:text-ink"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-muted">Colour</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => chooseColor(-1)}
                aria-pressed={color === -1}
                aria-label="Multicolour"
                className={`${swatch} ${color === -1 ? "border-ink" : "border-transparent"}`}
                style={{ background: `conic-gradient(${FALLBACK.join(", ")}, ${FALLBACK[0]})` }}
              />
              {FALLBACK.map((c, i) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => chooseColor(i)}
                  aria-pressed={color === i}
                  aria-label={`Colour ${i + 1}`}
                  className={`${swatch} ${color === i ? "border-ink" : "border-transparent"}`}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Customise the look"
          title="Customise the look"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-page/90 text-accent backdrop-blur-md transition-colors hover:border-accent"
        >
          {/* palette icon */}
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.9 1.8-1.9 0-.5-.2-.9-.5-1.2-.3-.4-.5-.8-.5-1.3 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4c0-4.3-4-7.8-9-7.8z" />
            <circle cx="7.5" cy="11.5" r="1" />
            <circle cx="10.5" cy="7.5" r="1" />
            <circle cx="15" cy="7.5" r="1" />
          </svg>
        </button>
      </div>
    </>
  );
}
