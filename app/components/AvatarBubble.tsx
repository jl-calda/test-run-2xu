"use client";

interface AvatarBubbleProps {
  name: string;
  avatarDataUrl: string;
  glow: boolean;
  index: number;
}

export default function AvatarBubble({
  name,
  avatarDataUrl,
  glow,
  index,
}: AvatarBubbleProps) {
  return (
    <div
      className="group relative animate-pop-in"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div
        className={`h-14 w-14 overflow-hidden rounded-full border-2 border-orange bg-navy-lighter transition-transform duration-200 group-hover:scale-110 ${
          glow ? "animate-pulse-glow" : ""
        }`}
        style={{ imageRendering: "pixelated" }}
      >
        {/* Show only first frame of sprite sheet */}
        <img
          src={avatarDataUrl}
          alt={name}
          className="h-full animate-running-sprite"
          style={{
            imageRendering: "pixelated",
            width: "200%",
          }}
        />
      </div>
      <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-navy-lighter px-2 py-0.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
        {name}
      </span>
    </div>
  );
}
