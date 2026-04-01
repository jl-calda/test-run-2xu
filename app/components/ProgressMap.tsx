"use client";

import { useEffect, useState } from "react";
import { Waypoint } from "./RouteSection";

interface ProgressMapProps {
  waypoints: Waypoint[];
}

export default function ProgressMap({ waypoints }: ProgressMapProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const idx = waypoints.findIndex((w) => w.id === id);
      if (idx >= 0) {
        setActiveIndex(idx);
        setVisible(true);
      }
    };
    window.addEventListener("waypoint-visible", handler);
    return () => window.removeEventListener("waypoint-visible", handler);
  }, [waypoints]);

  // Hide when scrolled back to top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 300) {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const progress =
    activeIndex >= 0 ? (activeIndex / (waypoints.length - 1)) * 100 : 0;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-500 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto max-w-md px-4" style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}>
        <div className="rounded-2xl bg-navy-light/90 px-4 py-3 shadow-xl backdrop-blur-md border border-navy-lighter/50">
          {/* Route line */}
          <div className="relative h-2 rounded-full bg-navy-lighter">
            {/* Progress fill */}
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-orange to-yellow transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />

            {/* Waypoint dots */}
            {waypoints.map((wp, i) => {
              const pct = (i / (waypoints.length - 1)) * 100;
              const reached = i <= activeIndex;
              return (
                <button
                  key={wp.id}
                  onClick={() => scrollTo(wp.id)}
                  className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer rounded-full transition-all duration-300 ${
                    reached
                      ? "h-4 w-4 bg-orange shadow-md shadow-orange/40"
                      : "h-3 w-3 bg-navy-lighter border border-slate-500"
                  }`}
                  style={{ left: `${pct}%` }}
                  aria-label={wp.name}
                />
              );
            })}
          </div>

          {/* Labels */}
          <div className="mt-2 flex justify-between">
            <span className="text-[10px] font-medium text-slate-400">
              START
            </span>
            {activeIndex >= 0 && (
              <span className="text-[10px] font-semibold text-orange">
                {waypoints[activeIndex]?.km} km
              </span>
            )}
            <span className="text-[10px] font-medium text-slate-400">
              FINISH
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
