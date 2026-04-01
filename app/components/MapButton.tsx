const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&origin=1.2899,103.8557&destination=1.2899,103.8557&waypoints=1.2920,103.8600|1.2985,103.8630|1.3044,103.8750|1.2987,103.8730|1.2960,103.8650|1.2930,103.8580&travelmode=walking";

export default function MapButton() {
  return (
    <section className="px-4 py-12 text-center">
      <a
        href={GOOGLE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange to-yellow px-8 py-4 font-heading text-lg font-bold text-navy transition hover:opacity-90 active:scale-95"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        Open Full Route in Google Maps
      </a>
    </section>
  );
}
