import { Runner } from "@/app/lib/types";
import JoinInput from "./JoinInput";

interface HeroProps {
  initialRunners: Runner[];
}

export default function Hero({ initialRunners }: HeroProps) {
  return (
    <section className="relative overflow-hidden px-4 pb-6 pt-16 sm:pt-24">
      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy via-navy/80 to-navy" />

      {/* Map background */}
      <div className="absolute inset-0 opacity-20">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d7977.6!2d103.858!3d1.283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e2!4m5!1s0x31da190563ccf20d%3A0xb08cfc0517e4b7c!2sGardens%20by%20the%20Bay%20MRT!3m2!1d1.27973!2d103.86797!4m5!1s0x31da190be2fef473%3A0xe5d8d0e5e3e4bfb4!2sMerlion%20Park!3m2!1d1.2867449!2d103.8543872!5e0!3m2!1sen!2ssg!4v1"
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Route map"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange">
          Singapore · 5km · Flat · Scenic
        </p>
        <h1 className="font-heading text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-r from-orange to-yellow bg-clip-text text-transparent">
            5km Scenic Jog
          </span>
          <br />
          <span className="text-white">
            Gardens by the Bay → Merlion
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-slate-300 sm:text-lg">
          Marina Bay waterfront · Supertree Grove · Dragonfly Lake · Zero road
          crossings
        </p>

        <div className="mx-auto mt-8 max-w-md">
          <JoinInput initialRunners={initialRunners} />
        </div>
      </div>
    </section>
  );
}
