"use client";

import { useEffect, useState, type RefObject } from "react";

// Counts how many times an element has come onto the screen (scrolling down or up).
// Returns 0 while it has never been seen. Use the number as a React `key` to replay an animation.
export function useViewEntries(ref: RefObject<HTMLElement | null>) {
  const [entries, setEntries] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let inView = false;
    // Checked on scroll and resize: one measurement per element, so it stays cheap.
    const check = () => {
      const box = el.getBoundingClientRect();
      const now = box.top < window.innerHeight * 0.85 && box.bottom > window.innerHeight * 0.1;
      if (now && !inView) setEntries((n) => n + 1);
      inView = now;
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [ref]);

  return entries;
}
