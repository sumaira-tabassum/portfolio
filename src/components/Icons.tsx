type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export function MailIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.7z" />
      <path d="M9.5 9.5c.3 1.6 1.4 3.2 3 4l1-1 2 .8v1.2c-3 .5-6.6-2.8-6.8-6l1.3-.1z" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </svg>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 11v6M8 7v.01M12 17v-6M12 13a3 3 0 0 1 6 0v4" />
    </svg>
  );
}

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5a3 3 0 0 0-1-2.5c3 0 6-2 6-5.5a4.5 4.5 0 0 0-1-3 4 4 0 0 0 0-3s-1 0-3 1.5a10 10 0 0 0-6 0C7 3.5 6 3.5 6 3.5a4 4 0 0 0 0 3 4.5 4.5 0 0 0-1 3c0 3.5 3 5.5 6 5.5a3 3 0 0 0-1 2.5V21" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg {...base} strokeWidth={2} className={className}>
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}
