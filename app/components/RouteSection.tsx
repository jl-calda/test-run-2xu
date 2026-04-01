"use client";

import { useEffect, useRef, useState } from "react";
import LocationEffect from "./LocationEffect";

type EffectType =
  | "sparkle"
  | "leaves"
  | "ripple"
  | "butterfly"
  | "twinkle"
  | "rays"
  | "confetti";

export interface Waypoint {
  km: string;
  name: string;
  desc: string;
  icon: string;
  gradient: string;
  effect: EffectType;
  id: string;
}

interface RouteSectionProps {
  waypoint: Waypoint;
  index: number;
  isLast: boolean;
}

export default function RouteSection({ waypoint, index, isLast }: RouteSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          // Dispatch event for progress map
          window.dispatchEvent(
            new CustomEvent("waypoint-visible", { detail: waypoint.id })
          );
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [waypoint.id]);

  return (
    <section
      ref={ref}
      id={waypoint.id}
      className="relative flex min-h-[80svh] items-center justify-center overflow-hidden"
    >
      {/* Gradient background */}
      <div
        className={`absolute inset-0 ${waypoint.gradient}`}
      />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Location effect canvas */}
      <LocationEffect type={waypoint.effect} active={visible} />

      {/* Content */}
      <div
        className={`relative z-20 mx-auto max-w-sm px-6 text-center transition-all duration-700 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <span className="text-6xl sm:text-7xl">{waypoint.icon}</span>

        <div className="mt-4 inline-block rounded-full bg-black/30 px-4 py-1 backdrop-blur-sm">
          <span className="font-heading text-sm font-bold text-orange">
            {waypoint.km} km
          </span>
        </div>

        <h2 className="mt-3 font-heading text-2xl font-bold text-white sm:text-3xl">
          {waypoint.name}
        </h2>

        <p className="mt-2 text-sm text-white/70">{waypoint.desc}</p>

        {isLast && (
          <div className="mt-6">
            <span className="inline-block animate-bounce rounded-full bg-gradient-to-r from-orange to-yellow px-6 py-2 font-heading font-bold text-navy">
              FINISH!
            </span>
          </div>
        )}
      </div>

      {/* Section divider */}
      {!isLast && (
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-navy" />
      )}
    </section>
  );
}
