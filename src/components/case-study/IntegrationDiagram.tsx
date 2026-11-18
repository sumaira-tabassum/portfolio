import type { CaseStudy } from "@/data/caseStudies";
import { FlowIconSvg } from "./FlowIcons";
import { PlaceholderText } from "./PlaceholderText";

function SystemBox({ name, role }: { name: string; role: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-line bg-page px-4 py-6 text-center">
      <p className="text-lg font-semibold text-ink">{name}</p>
      <p className="mt-1 text-xs text-muted">{role}</p>
    </div>
  );
}

// Two systems with a webhook in the middle, and what travels each way.
export function IntegrationDiagram({ integration }: { integration: CaseStudy["integration"] }) {
  return (
    <div className="rounded-2xl border border-line bg-card p-6 backdrop-blur-md">
      <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
        <SystemBox name="GoHighLevel" role="CRM, pipelines, AI agent" />
        <div className="flex flex-col items-center gap-2 px-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent text-accent">
            <FlowIconSvg name="webhook" className="h-6 w-6" />
          </div>
          <p className="text-xs font-semibold text-accent">Custom webhook</p>
          <p className="text-lg leading-none text-muted" aria-hidden>
            ⇄
          </p>
        </div>
        <SystemBox name="ServiceM8" role="Jobs and on-site schedule" />
      </div>

      <ul className="mt-6 flex flex-col gap-3">
        {integration.steps.map((step) => (
          <li key={step.from + step.what} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
            <span className="shrink-0 text-sm font-semibold text-ink sm:w-56">
              {step.from} → {step.to}
            </span>
            <span className="text-sm leading-relaxed">
              <PlaceholderText text={step.what} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
