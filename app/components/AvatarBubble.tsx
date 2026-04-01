"use client";

interface AvatarBubbleProps {
  name: string;
  avatarUrl: string;
  glow: boolean;
  index: number;
}

export default function AvatarBubble({
  name,
  avatarUrl,
  glow,
  index,
}: AvatarBubbleProps) {
  return (
    <div
      className="group relative animate-pop-in"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <img
        src={avatarUrl}
        alt={name}
        className={`w-11 h-11 rounded-full border-2 border-orange bg-navy-light transition-transform duration-200 group-hover:scale-110 ${
          glow ? "animate-pulse-glow" : ""
        }`}
      />
      <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-navy-lighter px-2 py-0.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
        {name}
      </span>
    </div>
  );
}
