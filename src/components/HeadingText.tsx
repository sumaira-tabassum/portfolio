"use client";

import { useEffect, useRef, useState } from "react";
import SplitText from "./SplitText";

// Section heading whose letters animate in once, when it scrolls into view.
// It waits until the heading is on screen and only then starts the Split Text animation,
// so it never depends on scroll positions measured earlier.
export function HeadingText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Checked on scroll and resize (cheap: one measurement per heading, and it stops once shown).
    const check = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
        setSeen(true);
        window.removeEventListener('scroll', check);
        window.removeEventListener('resize', check);
      }
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);

  return (
    <span ref={ref} className="inline-block">
      {seen ? (
        <SplitText text={text} tag="span" trigger="load" delay={45} duration={1.1} />
      ) : (
        <span className="invisible">{text}</span>
      )}
    </span>
  );
}
