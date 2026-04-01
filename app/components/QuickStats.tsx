const stats = [
  { label: "Distance", value: "~5.0 km", icon: "\u{1F4CF}" },
  { label: "Est. Time", value: "30 min", sub: "@ 6 min/km", icon: "\u{23F1}\u{FE0F}" },
  { label: "Terrain", value: "100% paved", sub: "flat", icon: "\u{1F6E4}\u{FE0F}" },
  { label: "Difficulty", value: "Easy", icon: "\u{2705}" },
];

export default function QuickStats() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl bg-navy-light/60 p-4 text-center"
          >
            <span className="text-2xl">{s.icon}</span>
            <p className="mt-2 font-heading text-lg font-bold text-white">
              {s.value}
            </p>
            {s.sub && (
              <p className="text-xs text-slate-400">{s.sub}</p>
            )}
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
