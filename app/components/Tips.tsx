"use client";

import { useState } from "react";

const tips = [
  {
    title: "Water Points",
    content:
      "Water stations at approximately 3km, 5km, 6km, and 8km (marked on the route map). Carry a small bottle if you prefer sipping between stations.",
  },
  {
    title: "Schedule",
    content:
      "We\u2019re running 7\u20138 AM on Friday April 3. Start/finish at The Esplanade, Raffles Avenue. Arrive by 6:45 AM for warm-up and bag drop.",
  },
  {
    title: "The Route",
    content:
      "10km loop: north on Marina Promenade \u2192 Crawford \u2192 Nicoll Highway \u2192 around National Stadium \u2192 Tanjong Rhu loop \u2192 back south to The Esplanade. Mostly flat, 100% paved.",
  },
  {
    title: "What to Bring",
    content:
      "Light running shoes, a sweat towel, and your phone for photos. Sunscreen and a cap recommended \u2014 the Nicoll Highway stretch is exposed.",
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
