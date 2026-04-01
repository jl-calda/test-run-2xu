"use client";

import { useState } from "react";

const tips = [
  {
    title: "Water Points",
    content:
      "There are drinking fountains near the Supertree Grove restrooms and at the MBS Event Plaza. Carry a small bottle for the 5km distance.",
  },
  {
    title: "Best Time to Run",
    content:
      "Early morning (6-7 AM) for cooler temps and sunrise views, or evening (6:30-7:30 PM) for the Marina Bay light show. Avoid midday — Singapore heat is no joke!",
  },
  {
    title: "Shade & Cover",
    content:
      "Dragonfly Lake boardwalk is partially shaded. The MBS promenade section is exposed — wear sunscreen and a cap for daytime runs.",
  },
  {
    title: "What to Bring",
    content:
      "Light running shoes, a sweat towel, and your phone for photos. The route is flat and paved — no trail shoes needed.",
  },
];

export default function Tips() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="px-4 py-12" id="tips">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-6 text-center font-heading text-3xl font-bold text-white sm:text-4xl">
          Tips
        </h2>
        <div className="space-y-3">
          {tips.map((tip, i) => (
            <div
              key={tip.title}
              className="rounded-xl bg-navy-light/60 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between p-4 text-left"
              >
                <span className="font-heading font-semibold text-white">
                  {tip.title}
                </span>
                <span
                  className={`text-orange transition-transform duration-200 ${
                    open === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-4 pb-4 text-sm text-slate-300">
                  {tip.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
