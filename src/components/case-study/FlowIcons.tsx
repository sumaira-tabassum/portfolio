import type { FlowIcon } from "@/data/caseStudies";

const paths: Record<FlowIcon, React.ReactNode> = {
  inbox: (
    <>
      <path d="M4 13h4l2 3h4l2-3h4" />
      <path d="M4 13l2-8h12l2 8v6H4z" />
    </>
  ),
  "user-check": (
    <>
      <circle cx="9" cy="8" r="4" />
      <path d="M2 21c0-4 3-6 7-6s7 2 7 6" />
      <path d="M16 11l2 2 4-4" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
      <path d="M19 16l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
    </>
  ),
  split: (
    <>
      <path d="M4 12h5l5-6h6" />
      <path d="M9 12h11" />
      <path d="M9 12l5 6h6" />
    </>
  ),
  car: (
    <>
      <path d="M4 16h16v-4l-2.5-5h-11L4 12z" />
      <circle cx="8" cy="17" r="1.6" />
      <circle cx="16" cy="17" r="1.6" />
    </>
  ),
  home: (
    <>
      <path d="M4 11l8-7 8 7v9H4z" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  flame: <path d="M12 3c1 4 5 6 5 11a5 5 0 0 1-10 0c0-3 2-4 2-7 1 1 2 2 3 2 0-2 0-4 0-6z" />,
  bell: (
    <>
      <path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 10h16M9 3v4M15 3v4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  star: <path d="M12 4l2.5 5 5.5.8-4 3.9 1 5.5-5-2.7-5 2.7 1-5.5-4-3.9 5.5-.8z" />,
  zap: <path d="M13 3L4 14h7l-1 7 9-11h-7z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.5-4.5" />
    </>
  ),
  tag: (
    <>
      <path d="M3 12V4h8l10 10-8 8z" />
      <circle cx="7.5" cy="7.5" r="1.2" />
    </>
  ),
  plus: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  bot: (
    <>
      <rect x="5" y="8" width="14" height="11" rx="3" />
      <path d="M12 4v4M9.5 13h.01M14.5 13h.01M9.5 16h5" />
    </>
  ),
  message: <path d="M4 5h16v11H9l-5 4z" />,
  alert: (
    <>
      <path d="M12 4l9 16H3z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.5 2.5-5.5 6-5.5s6 2 6 5.5" />
      <path d="M16 5a3 3 0 0 1 0 6M18 14.5c2 .7 3 2.6 3 5.5" />
    </>
  ),
  flow: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8.5 6H14a4 4 0 0 1 4 4v5.5" />
    </>
  ),
  webhook: (
    <>
      <circle cx="12" cy="6" r="2.5" />
      <circle cx="6" cy="17" r="2.5" />
      <circle cx="18" cy="17" r="2.5" />
      <path d="M10.8 8.2L7.3 14.8M8.5 17h7M13.2 8.2l3.5 6.6" />
    </>
  ),
};

export function FlowIconSvg({ name, className }: { name: FlowIcon; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
