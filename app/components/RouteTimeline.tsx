const waypoints = [
  {
    km: "0.0",
    name: "Gardens by the Bay MRT (TE22)",
    desc: "Exit station, head south into Outdoor Gardens",
    icon: "\u{1F689}",
  },
  {
    km: "0.8",
    name: "Supertree Grove",
    desc: "Clockwise loop around the Supertrees",
    icon: "\u{1F333}",
  },
  {
    km: "1.5",
    name: "Dragonfly Lake (south shore)",
    desc: "Counter-clockwise lake perimeter, partial shade on boardwalk",
    icon: "\u{1F4A7}",
  },
  {
    km: "2.2",
    name: "Dragonfly Island",
    desc: "Complete loop, head west between Cloud Forest & Flower Dome",
    icon: "\u{1FAB7}",
  },
  {
    km: "3.0",
    name: "MBS Event Plaza Waterfront",
    desc: "Exit via Bayfront underpass, join the promenade heading west",
    icon: "\u{1F3D9}\u{FE0F}",
  },
  {
    km: "3.8",
    name: "The Promontory @ Marina Bay",
    desc: "270° skyline views, curve north along western bay edge",
    icon: "\u{1F305}",
  },
  {
    km: "5.0",
    name: "Merlion Park (FINISH)",
    desc: "Final stretch past One Fullerton, cool down at the Merlion",
    icon: "\u{1F3C1}",
  },
];

export default function RouteTimeline() {
  return (
    <section className="px-4 py-16" id="route">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-10 text-center font-heading text-3xl font-bold text-white sm:text-4xl">
          Route Breakdown
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 h-full w-0.5 bg-gradient-to-b from-orange via-yellow to-green" />

          <div className="space-y-8">
            {waypoints.map((wp, i) => (
              <div
                key={wp.km}
                className="animate-fade-up relative pl-14"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Dot */}
                <div className="absolute left-3 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-navy ring-2 ring-orange">
                  <div className="h-2 w-2 rounded-full bg-orange" />
                </div>

                <div className="rounded-xl bg-navy-light/60 p-4">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-lg">{wp.icon}</span>
                    <span className="rounded bg-navy-lighter px-2 py-0.5 text-xs font-semibold text-orange">
                      {wp.km} km
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-white">
                    {wp.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">{wp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
