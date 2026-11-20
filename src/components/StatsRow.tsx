import CountUp from "./CountUp";
import { accent, sectionColor } from "./colors";
import { highlights } from "@/data/profile";

// Big numbers that count up from 0 (React Bits Count Up) once per page load,
// the first time they come on screen.
export function StatsRow() {
  return (
    <dl className="mx-auto mb-12 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
      {highlights.map((item, i) => (
        <div key={item.label} className="rounded-3xl border border-line bg-card px-6 py-6 text-center backdrop-blur-sm">
          <dd className={`text-5xl font-extrabold tracking-tight ${accent(sectionColor.about).text}`}>
            <CountUp to={item.value} suffix={item.suffix ?? ""} duration={2} delay={0.15 * i} />
          </dd>
          <dt className="mt-2 font-mono text-xs uppercase tracking-wider text-muted">{item.label}</dt>
        </div>
      ))}
    </dl>
  );
}
