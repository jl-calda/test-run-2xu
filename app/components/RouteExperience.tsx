"use client";

import RouteSection, { Waypoint } from "./RouteSection";
import ProgressMap from "./ProgressMap";

// Distances based on Google Maps, Rome2Rio, NParks park connector data,
// and Singapore Marathon course maps for this corridor.
const WAYPOINTS: Waypoint[] = [
  {
    id: "wp-start",
    km: "0",
    name: "The Esplanade (START)",
    desc: "Flag off at Raffles Avenue. Head north along Marina Promenade!",
    icon: "\u{1F3C3}",
    gradient: "bg-gradient-to-b from-navy via-amber-950/40 to-navy",
    effect: "sparkle",
    photo: "https://images.unsplash.com/photo-1533288519498-97e0bbdacc3e?w=800&q=80",
  },
  {
    id: "wp-promenade",
    km: "1.0",
    name: "Marina Promenade",
    desc: "Heading north along the waterfront. The bay stretches out beside you.",
    icon: "\u{1F309}",
    gradient: "bg-gradient-to-b from-navy via-cyan-950/40 to-navy",
    effect: "ripple",
    photo: "https://images.unsplash.com/photo-1496939376851-89342e90adcd?w=800&q=80",
  },
  {
    id: "wp-nicoll",
    km: "2.0",
    name: "Nicoll Highway",
    desc: "Onto Nicoll Highway heading northeast. Urban stretch toward Kallang.",
    icon: "\u{1F6E3}\u{FE0F}",
    gradient: "bg-gradient-to-b from-navy via-slate-800/40 to-navy",
    effect: "twinkle",
    photo: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
  },
  {
    id: "wp-stadium",
    km: "3.5",
    name: "National Stadium",
    desc: "Loop around Singapore\u2019s 55,000-seat dome. The crowd roars!",
    icon: "\u{1F3DF}\u{FE0F}",
    gradient: "bg-gradient-to-b from-navy via-purple-950/40 to-navy",
    effect: "rays",
    photo: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&q=80",
  },
  {
    id: "wp-stadium-exit",
    km: "5.0",
    name: "Stadium Loop Exit",
    desc: "Halfway done! Cross the suspension bridge toward Tanjong Rhu.",
    icon: "\u{1F3CB}\u{FE0F}",
    gradient: "bg-gradient-to-b from-navy via-indigo-950/40 to-navy",
    effect: "butterfly",
    photo: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&q=80",
  },
  {
    id: "wp-tanjong-rhu",
    km: "6.5",
    name: "Tanjong Rhu",
    desc: "Scenic stretch along the promenade. Quiet streets and river views.",
    icon: "\u{1F333}",
    gradient: "bg-gradient-to-b from-navy via-green-950/40 to-navy",
    effect: "leaves",
    photo: "https://images.unsplash.com/photo-1555217851-6141535bd771?w=800&q=80",
  },
  {
    id: "wp-return",
    km: "8.0",
    name: "Sheares Bridge Return",
    desc: "Under Benjamin Sheares Bridge heading back. The finish is close!",
    icon: "\u{26A1}",
    gradient: "bg-gradient-to-b from-navy via-orange-950/30 to-navy",
    effect: "twinkle",
    photo: "https://images.unsplash.com/photo-1506351421178-63b52a2d2562?w=800&q=80",
  },
  {
    id: "wp-finish",
    km: "10",
    name: "The Esplanade (FINISH)",
    desc: "Cross the line at Raffles Avenue! 10km done!",
    icon: "\u{1F3C1}",
    gradient: "bg-gradient-to-b from-navy via-amber-950/40 to-navy",
    effect: "confetti",
    photo: "https://images.unsplash.com/photo-1533288519498-97e0bbdacc3e?w=800&q=80",
  },
];

export default function RouteExperience() {
  return (
    <>
      <div className="px-6 py-10 text-center">
        <h2 className="font-heading text-3xl font-bold text-white">
          The Route
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          10km loop — scroll through each waypoint
        </p>
      </div>

      {WAYPOINTS.map((wp, i) => (
        <RouteSection
          key={wp.id}
          waypoint={wp}
          index={i}
          isLast={i === WAYPOINTS.length - 1}
        />
      ))}

      <ProgressMap waypoints={WAYPOINTS} />
    </>
  );
}
