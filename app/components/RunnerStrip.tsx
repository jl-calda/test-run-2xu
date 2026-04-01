"use client";

import { useEffect, useState, useCallback } from "react";
import { Runner } from "@/app/lib/types";
import AvatarBubble from "./AvatarBubble";

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
      // silent fail on poll
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchRunners, 10_000);
    return () => clearInterval(interval);
  }, [fetchRunners]);

  // Listen for custom event from JoinInput
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
  const ghostCount = count < 3 ? 3 - count : 0;

  return (
    <section className="py-8 px-4">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-center gap-3 flex-wrap pb-4">
          {runners.map((r, i) => (
            <AvatarBubble
              key={r.id}
              name={r.name}
              avatarUrl={r.avatarUrl}
              glow={glow}
              index={i}
            />
          ))}
          {Array.from({ length: ghostCount }).map((_, i) => (
            <div
              key={`ghost-${i}`}
              className="w-11 h-11 rounded-full border-2 border-dashed border-navy-lighter bg-navy-light/40"
            />
          ))}
        </div>
        <p className="text-center text-sm font-medium text-slate-300">
          {count === 0 && "Be the first to join! 3 runners needed to start the crew."}
          {count > 0 && count < 3 && `${3 - count} more needed to start the crew!`}
          {count >= 3 && count < 10 && `\u{1F3C3} ${count} runners are in!`}
          {count === 10 && "\u{1F525} Run is full! All 10 slots taken."}
        </p>
      </div>
    </section>
  );
}
