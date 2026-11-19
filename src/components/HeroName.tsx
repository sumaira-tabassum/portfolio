import { profile } from "@/data/profile";
import { HeadingText } from "./HeadingText";
import WarpText from "./WarpText";
import { letterColors } from "./colors";

// Which animation the big name uses. Change this one word to switch:
//   "split" = React Bits Split Text (letters animate in one by one, again each time it comes back on screen)
//   "warp"  = React Bits Warp Text (bends like glass around the mouse)
const NAME_ANIMATION: "split" | "warp" = "split";

const nameSize = "clamp(4rem, min(17vw, 24svh), 11rem)";

export function HeroName() {
  if (NAME_ANIMATION === "warp") {
    return (
      <>
        <h1 className="sr-only">{profile.name}</h1>
        <WarpText
          text={profile.handle}
          colors={letterColors}
          className="mx-auto max-w-4xl text-ink"
          style={{ height: "clamp(150px, 30svh, 280px)" }}
          fontSize={nameSize}
          fontWeight={800}
          letterSpacing="-0.04em"
          lens="bulge"
          chromatic={0.35}
          idleDrift={0.2}
        />
      </>
    );
  }

  return (
    <>
      <h1 className="sr-only">{profile.name}</h1>
      {/* hero-name colours each letter (see globals.css). aria-hidden: the h1 above is the real heading. */}
      <div aria-hidden className="hero-name">
        <HeadingText
          text={profile.handle}
          delay={70}
          duration={1.25}
          className="font-extrabold leading-[1.05] tracking-[-0.04em] [font-size:clamp(4rem,min(17vw,24svh),11rem)]"
        />
      </div>
    </>
  );
}
