"use client";

import { useState } from "react";

// A picture with a round magnifying lens that follows the mouse (like Magic UI's Lens).
// The picture is drawn twice: normally, and a zoomed copy that only shows inside the circle.
export function ZoomImage({
  children,
  zoom = 1.3,
  lensSize = 170,
  className = "",
}: {
  children: React.ReactNode;
  zoom?: number;
  lensSize?: number;
  className?: string;
}) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  function move(e: React.MouseEvent<HTMLDivElement>) {
    const box = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - box.left, y: e.clientY - box.top });
  }

  const mask = pos
    ? `radial-gradient(circle ${lensSize / 2}px at ${pos.x}px ${pos.y}px, black 100%, transparent 100%)`
    : undefined;

  return (
    <div
      onMouseMove={move}
      onMouseLeave={() => setPos(null)}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      {pos && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 motion-reduce:hidden"
          style={{ maskImage: mask, WebkitMaskImage: mask }}
        >
          <div
            className="h-full w-full"
            style={{ transform: `scale(${zoom})`, transformOrigin: `${pos.x}px ${pos.y}px` }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
