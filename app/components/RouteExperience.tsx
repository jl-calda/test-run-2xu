"use client";

import RouteSection, { Waypoint } from "./RouteSection";
import ProgressMap from "./ProgressMap";

const WAYPOINTS: Waypoint[] = [
  {
    id: "wp-start",
    km: "0.0",
    name: "Gardens by the Bay MRT",
    desc: "Exit station, head south into Outdoor Gardens. Your 5km journey begins!",
    icon: "\u{1F689}",
    gradient: "bg-gradient-to-b from-navy via-emerald-950/40 to-navy",
    effect: "sparkle",
  },
  {
    id: "wp-supertree",
    km: "0.8",
    name: "Supertree Grove",
    desc: "Clockwise loop around the iconic Supertrees. Pure sci-fi vibes.",
    icon: "\u{1F333}",
    gradient: "bg-gradient-to-b from-navy via-purple-950/40 to-navy",
    effect: "leaves",
  },
  {
    id: "wp-dragonfly",
    km: "1.5",
    name: "Dragonfly Lake",
    desc: "Counter-clockwise lake perimeter. Partial shade on the boardwalk.",
    icon: "\u{1F4A7}",
    gradient: "bg-gradient-to-b from-navy via-cyan-950/40 to-navy",
    effect: "ripple",
  },
  {
    id: "wp-island",
    km: "2.2",
    name: "Dragonfly Island",
    desc: "Complete the loop, head west between Cloud Forest & Flower Dome.",
    icon: "\u{1FAB7}",
    gradient: "bg-gradient-to-b from-navy via-green-950/40 to-navy",
    effect: "butterfly",
  },
  {
    id: "wp-mbs",
    km: "3.0",
    name: "MBS Event Plaza",
    desc: "Exit via Bayfront underpass. Join the promenade heading west.",
    icon: "\u{1F3D9}\u{FE0F}",
    gradient: "bg-gradient-to-b from-navy via-amber-950/30 to-navy",
    effect: "twinkle",
  },
  {
    id: "wp-promontory",
    km: "3.8",
    name: "The Promontory",
    desc: "270\u{00B0} skyline views. Curve north along the western bay edge.",
    icon: "\u{1F305}",
    gradient: "bg-gradient-to-b from-navy via-orange-950/30 to-navy",
    effect: "rays",
  },
  {
    id: "wp-finish",
    km: "5.0",
    name: "Merlion Park",
    desc: "Final stretch past One Fullerton. Cool down at the Merlion!",
    icon: "\u{1F3C1}",
    gradient: "bg-gradient-to-b from-navy via-red-950/30 to-navy",
    effect: "confetti",
  },
];

export default function RouteExperience() {
  return (
    <>
      {/* Section header */}
      <div className="px-6 py-10 text-center">
        <h2 className="font-heading text-3xl font-bold text-white">
          The Route
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Scroll through each waypoint
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
