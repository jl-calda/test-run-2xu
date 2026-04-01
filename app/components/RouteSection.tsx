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
  photo: string;
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
          window.dispatchEvent(
            new CustomEvent("waypoint-visible", { detail: waypoint.id })
          );
        }
      },
      { threshold: 0.3 }
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
      {/* Real photo background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${waypoint.photo})` }}
      />

      {/* Dark overlay + gradient for readability */}
      <div className="absolute inset-0 bg-black/50" />
      <div className={`absolute inset-0 ${waypoint.gradient} opacity-60`} />

      {/* Vignette edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(15,23,42,0.8)_100%)]" />

      {/* Location effect canvas */}
      <LocationEffect type={waypoint.effect} active={visible} />

      {/* Content */}
      <div
        className={`relative z-20 mx-auto max-w-sm px-6 text-center transition-all duration-700 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <span className="text-6xl sm:text-7xl drop-shadow-lg">{waypoint.icon}</span>

        <div className="mt-4 inline-block rounded-full bg-black/40 px-4 py-1.5 backdrop-blur-md">
          <span className="font-heading text-sm font-bold text-orange">
            {waypoint.km} km
          </span>
        </div>

        <h2 className="mt-3 font-heading text-2xl font-bold text-white sm:text-3xl drop-shadow-lg">
          {waypoint.name}
        </h2>

        <p className="mt-2 text-sm text-white/80 drop-shadow">{waypoint.desc}</p>

        {isLast && (
          <div className="mt-6">
            <span className="inline-block animate-bounce rounded-full bg-gradient-to-r from-orange to-yellow px-6 py-2 font-heading font-bold text-navy shadow-lg">
              FINISH!
            </span>
          </div>
        )}
      </div>

      {/* Top fade into previous section */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-navy to-transparent" />

      {/* Bottom fade into next section */}
      {!isLast && (
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-navy" />
      )}
    </section>
  );
}
