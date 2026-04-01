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
      {/* Container clips to one frame; img is 200% wide for sprite animation */}
      <div
        className={`w-full aspect-[2/3] overflow-hidden transition-transform duration-200 group-hover:scale-105 ${
          glow ? "animate-pulse-glow rounded-lg" : ""
        }`}
      >
        <img
          src={avatarDataUrl}
          alt={name}
          className="h-full animate-running-sprite"
          style={{
            imageRendering: "pixelated",
            width: "200%",
            maxWidth: "none",
          }}
        />
      </div>
      <span className="mt-1 text-xs font-semibold text-white truncate w-full text-center">
        {name}
      </span>
    </div>
  );
}
