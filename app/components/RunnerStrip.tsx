"use client";

import { useEffect, useState, useCallback } from "react";
import { Runner } from "@/app/lib/types";
import AvatarBubble from "./AvatarBubble";

const TOTAL_SLOTS = 8;

interface RunnerStripProps {
  initialRunners: Runner[];
}

export default function RunnerStrip({ initialRunners }: RunnerStripProps) {
  const [runners, setRunners] = useState<Runner[]>(initialRunners);

  const fetchRunners = useCallback(async () => {
    try {
      const res = await fetch("/api/runners");
      if (res.ok) {
        const data: Runner[] = await res.json();
        setRunners(data);
      }
    } catch {
      // silent
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchRunners, 10_000);
    return () => clearInterval(interval);
  }, [fetchRunners]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<Runner[]>).detail;
      setRunners(detail);
    };
    window.addEventListener("runners-updated", handler);
    return () => window.removeEventListener("runners-updated", handler);
  }, []);

  const count = runners.length;
  const glow = count >= 3;
  const emptySlots = Math.max(0, TOTAL_SLOTS - count);

  return (
    <section className="sticky top-0 z-30 h-[45svh] max-h-[400px] bg-navy/95 backdrop-blur-sm flex flex-col">
      {/* Label */}
      <div className="px-4 pt-3 pb-2 text-center shrink-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Run Crew
        </p>
        <p className="text-sm font-medium text-slate-300 mt-0.5">
          {count === 0 && "8 open slots — be the first!"}
          {count > 0 && count < 3 && `${count}/${TOTAL_SLOTS} joined · ${3 - count} more to start the crew`}
          {count >= 3 && count < TOTAL_SLOTS && `\u{1F3C3} ${count}/${TOTAL_SLOTS} runners in the crew!`}
          {count >= TOTAL_SLOTS && "\u{1F525} All slots filled!"}
        </p>
      </div>

      {/* Avatar grid — fills remaining space */}
      <div className="flex-1 px-3 pb-3 min-h-0">
        <div className="grid grid-cols-4 gap-2 h-full">
          {runners.slice(0, TOTAL_SLOTS).map((r, i) => (
            <AvatarBubble
              key={r.id}
              name={r.name}
              avatarDataUrl={r.avatarDataUrl}
              glow={glow}
              index={i}
            />
          ))}
          {Array.from({ length: emptySlots }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="flex flex-col items-center"
            >
              <div className="w-full aspect-[2/3] rounded-lg bg-white/[0.03]" />
              <span className="mt-1 text-[10px] text-slate-600">open</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
