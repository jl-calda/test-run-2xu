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
      className="group relative animate-pop-in flex flex-col items-center"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div
        className={`w-full aspect-[2/3] overflow-hidden transition-transform duration-200 group-hover:scale-105 ${
          glow ? "animate-pulse-glow rounded-lg" : ""
        }`}
        style={{ imageRendering: "pixelated" }}
      >
        <img
          src={avatarDataUrl}
          alt={name}
          className="h-full w-full object-contain animate-running-sprite"
          style={{
            imageRendering: "pixelated",
          }}
        />
      </div>
      <span className="mt-1 text-xs font-semibold text-white truncate w-full text-center">
        {name}
      </span>
    </div>
  );
}
