"use client";

import RouteSection, { Waypoint } from "./RouteSection";
import ProgressMap from "./ProgressMap";

const WAYPOINTS: Waypoint[] = [
  {
    id: "wp-start",
    km: "0",
    name: "The Esplanade (START)",
    desc: "Flag off at Raffles Avenue. Head north along the Marina Promenade!",
    icon: "\u{1F3C3}",
    gradient: "bg-gradient-to-b from-navy via-amber-950/40 to-navy",
    effect: "sparkle",
    photo: "https://images.unsplash.com/photo-1533288519498-97e0bbdacc3e?w=800&q=80",
  },
  {
    id: "wp-promenade",
    km: "2",
    name: "Marina Promenade",
    desc: "Waterfront stretch heading north. City skyline on your left, bay breeze on your right.",
    icon: "\u{1F309}",
    gradient: "bg-gradient-to-b from-navy via-cyan-950/40 to-navy",
    effect: "ripple",
    photo: "https://images.unsplash.com/photo-1496939376851-89342e90adcd?w=800&q=80",
  },
  {
    id: "wp-crawford",
    km: "3",
    name: "Crawford / Nicoll Highway",
    desc: "Turn northeast past the Crawford junction. Push through the urban stretch.",
    icon: "\u{1F6E3}\u{FE0F}",
    gradient: "bg-gradient-to-b from-navy via-slate-800/40 to-navy",
    effect: "twinkle",
    photo: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
  },
  {
    id: "wp-stadium",
    km: "5",
    name: "National Stadium",
    desc: "Loop around Singapore\u2019s iconic 55,000-seat dome. Halfway mark!",
    icon: "\u{1F3DF}\u{FE0F}",
    gradient: "bg-gradient-to-b from-navy via-purple-950/40 to-navy",
    effect: "rays",
    photo: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&q=80",
  },
  {
    id: "wp-tanjong-rhu",
    km: "6",
    name: "Tanjong Rhu",
    desc: "Scenic loop through Tanjong Rhu. Quieter streets, greenery, and the river bend.",
    icon: "\u{1F333}",
    gradient: "bg-gradient-to-b from-navy via-green-950/40 to-navy",
    effect: "leaves",
    photo: "https://images.unsplash.com/photo-1555217851-6141535bd771?w=800&q=80",
  },
  {
    id: "wp-return",
    km: "8",
    name: "Nicoll Highway Return",
    desc: "Heading back south along Nicoll Highway. You can see the finish from here!",
    icon: "\u{26A1}",
    gradient: "bg-gradient-to-b from-navy via-orange-950/30 to-navy",
    effect: "butterfly",
    photo: "https://images.unsplash.com/photo-1506351421178-63b52a2d2562?w=800&q=80",
  },
  {
    id: "wp-promenade-south",
    km: "9",
    name: "Marina Promenade South",
    desc: "Final stretch along the promenade. The Esplanade domes are in sight!",
    icon: "\u{1F525}",
    gradient: "bg-gradient-to-b from-navy via-red-950/30 to-navy",
    effect: "twinkle",
    photo: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&q=80",
  },
  {
    id: "wp-finish",
    km: "10",
    name: "The Esplanade (FINISH)",
    desc: "Cross the finish line at Raffles Avenue! You did it \u2014 10km done!",
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
          10km loop \u2014 scroll through each waypoint
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
