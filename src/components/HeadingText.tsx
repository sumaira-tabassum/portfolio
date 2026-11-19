"use client";

import { useRef } from "react";
import SplitText from "./SplitText";
import { useViewEntries } from "./useViewEntries";

// Heading (section titles and the big name) whose letters animate in (React Bits Split Text) every time it comes on screen,
// scrolling down or up. It only starts once the heading is really visible, so it never depends on
// scroll positions measured earlier.
// The bottom padding keeps letters like y, g and p from being clipped (Split Text hides overflow).
export function HeadingText({
  text,
  delay = 45,
  duration = 1.1,
  className = "",
}: {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const entries = useViewEntries(ref);

  return (
    <span ref={ref} className="inline-block">
      {entries > 0 ? (
        <SplitText
          key={entries}
          text={text}
          tag="span"
          trigger="load"
          delay={delay}
          duration={duration}
          className={`pb-[0.14em] ${className}`}
        />
      ) : (
        <span className={`invisible inline-block pb-[0.14em] ${className}`}>{text}</span>
      )}
    </span>
  );
}
