"use client";

import { useEffect, useRef, useState } from "react";
import { Icon3D, type Icon3DName } from "./Icon3D";

// The card picture: the screenshot if it exists, otherwise (no image set, or the file isn't there yet) the 3D icon.
export function ProjectImage({
  src,
  alt,
  icon,
  iconSize,
}: {
  src?: string;
  alt: string;
  icon: Icon3DName;
  iconSize: number;
}) {
  const [missing, setMissing] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // The file may fail to load before React is ready to hear onError, so check once after loading too.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setMissing(true);
  }, []);

  if (src && !missing) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- plain img keeps the zoom lens simple
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onError={() => setMissing(true)}
        className="h-full w-full object-cover object-top"
      />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_center,var(--bg-glow),transparent_70%)]">
      <Icon3D name={icon} size={iconSize} />
    </div>
  );
}
