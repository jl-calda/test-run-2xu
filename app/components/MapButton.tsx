const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&origin=The+Esplanade+Singapore&destination=The+Esplanade+Singapore&waypoints=1.2935,103.8595|1.2995,103.8648|1.3044,103.8750|1.2978,103.8738|1.2968,103.8668|1.2935,103.8590&travelmode=walking";

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
