// The colour set from theme.css, written out as full class names so Tailwind can find them.
// Projects and sections take one colour each, in this order.
export const accents = [
  { text: "text-purple", hoverText: "hover:text-purple", bg: "bg-purple", border: "border-purple/50", hover: "hover:border-purple/60" },
  { text: "text-pink", hoverText: "hover:text-pink", bg: "bg-pink", border: "border-pink/50", hover: "hover:border-pink/60" },
  { text: "text-orange", hoverText: "hover:text-orange", bg: "bg-orange", border: "border-orange/50", hover: "hover:border-orange/60" },
  { text: "text-blue", hoverText: "hover:text-blue", bg: "bg-blue", border: "border-blue/50", hover: "hover:border-blue/60" },
  { text: "text-green", hoverText: "hover:text-green", bg: "bg-green", border: "border-green/50", hover: "hover:border-green/60" },
  { text: "text-coral", hoverText: "hover:text-coral", bg: "bg-coral", border: "border-coral/50", hover: "hover:border-coral/60" },
];

export function accent(index: number) {
  return accents[index % accents.length];
}

// One colour per home page section (index into `accents`). Change a number to recolour a whole section.
export const sectionColor = {
  about: 0, // purple
  experience: 1, // pink
  automations: 5, // coral, the "m" in the name (also the "selected work" title)
  apps: 2, // orange (peach), the first "a" in the name
  whyMe: 3, // blue
  contact: 4, // green
};

// Project cards take their group's colour.
export const projectColor = (kind: "Automation" | "App") =>
  kind === "Automation" ? sectionColor.automations : sectionColor.apps;

// One colour per letter of the name, as CSS variables (used inside SVG).
export const letterColors = [
  "var(--color-purple)",
  "var(--color-pink)",
  "var(--color-coral)",
  "var(--color-orange)",
  "var(--color-blue)",
  "var(--color-green)",
  "var(--color-plum)",
];
