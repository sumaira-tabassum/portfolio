"use client";

import { useEffect, useState } from "react";

// Types the text out letter by letter, with a blinking cursor.
// The full text is always in the page for screen readers and search engines.
export function TypingText({
  text,
  startDelay = 0,
  speed = 35,
  className = "",
}: {
  text: string;
  startDelay?: number; // ms before typing starts
  speed?: number; // ms per letter
  className?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      return;
    }
    let timer: number;
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            window.clearInterval(timer);
            return c;
          }
          return c + 1;
        });
      }, speed);
    }, startDelay);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(timer);
    };
  }, [text, startDelay, speed]);

  return (
    <p className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.slice(0, count)}
        <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-[blink_1s_steps(1)_infinite] bg-accent" />
        {/* Invisible rest of the text keeps the line breaks fixed, so nothing jumps while typing. */}
        <span className="invisible">{text.slice(count)}</span>
      </span>
    </p>
  );
}
