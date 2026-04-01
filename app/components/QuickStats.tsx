const stats = [
  { label: "Date", value: "Fri, Apr 3", icon: "\u{1F4C5}" },
  { label: "Time", value: "7 \u2013 8 AM", icon: "\u{23F0}" },
  { label: "Distance", value: "10 km", sub: "100% paved, flat", icon: "\u{1F4CF}" },
  { label: "Difficulty", value: "Moderate", sub: "~60 min @ 6 min/km", icon: "\u{1F4AA}" },
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
