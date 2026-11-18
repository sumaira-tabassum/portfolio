// Renders text, turning any [square bracket] part into a visible "to add" marker.
export function PlaceholderText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[") && part.endsWith("]") ? (
          <span
            key={i}
            className="rounded-md border border-dashed border-accent/50 bg-accent-soft px-1.5 py-0.5 text-accent"
          >
            {part.slice(1, -1)}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

// A box that holds space for content that isn't ready yet (video, screenshots).
export function PlaceholderBox({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl border border-dashed border-line bg-card p-6 text-center text-sm text-muted ${className}`}
    >
      <PlaceholderText text={label} />
    </div>
  );
}
