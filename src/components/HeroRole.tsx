"use client";

import { useEffect, useState } from "react";
import RotatingText from "./RotatingText";

// The role under the tagline. It is hidden until the tagline has finished typing, then fades in
// and stays for about 4 seconds before swapping to the next role letter by letter in random order. Letters take the site colours (see .role-char in
// globals.css), so a single chosen colour makes them one colour.
export function HeroRole({ texts, startAfter }: { texts: string[]; startAfter: number }) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setStarted(true), startAfter);
    return () => window.clearTimeout(t);
  }, [startAfter]);

  return (
    <span className={`transition-opacity duration-700 ${started ? "opacity-100" : "opacity-0"}`}>
    <RotatingText
      texts={texts}
      auto={started}
      effect="scale"
      staggerFrom="random"
      staggerDuration={0.05}
      rotationInterval={4600}
      elementLevelClassName="role-char"
    />
    </span>
  );
}
