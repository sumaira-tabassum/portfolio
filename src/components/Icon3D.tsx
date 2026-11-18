import Image from "next/image";

// 3D icons from Microsoft Fluent Emoji (MIT licence), stored in /public/icons.
export type Icon3DName =
  | "bust_in_silhouette"
  | "briefcase"
  | "file_folder"
  | "robot"
  | "laptop"
  | "gear"
  | "stethoscope"
  | "mobile_phone";

export function Icon3D({
  name,
  size,
  className = "",
}: {
  name: Icon3DName;
  size: number;
  className?: string;
}) {
  // Shadow sits on the wrapper so the colour filter can be switched off on its own.
  return (
    <span className={`inline-block shrink-0 drop-shadow-[0_8px_14px_rgb(0_0_0/0.5)] ${className}`}>
      <Image
        src={`/icons/${name}.png`}
        alt=""
        aria-hidden
        width={size}
        height={size}
        style={{ filter: "var(--icon-filter)" }}
      />
    </span>
  );
}
