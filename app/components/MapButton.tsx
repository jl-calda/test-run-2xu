const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&origin=1.27973,103.86797&destination=1.2867449,103.8543872&waypoints=1.2820,103.8639|1.2802,103.8655|1.2816,103.8622|1.2844,103.8583|1.2817,103.8541&travelmode=walking";

export default function MapButton() {
  return (
    <section className="px-4 py-12 text-center">
      <a
        href={GOOGLE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange to-yellow px-8 py-4 font-heading text-lg font-bold text-navy transition hover:opacity-90"
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
