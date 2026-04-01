import { getRunners } from "@/app/lib/kv";
import Hero from "@/app/components/Hero";
import RunnerStrip from "@/app/components/RunnerStrip";
import RouteTimeline from "@/app/components/RouteTimeline";
import QuickStats from "@/app/components/QuickStats";
import Tips from "@/app/components/Tips";
import MapButton from "@/app/components/MapButton";

export const dynamic = "force-dynamic";

export default async function Home() {
  let initialRunners: Awaited<ReturnType<typeof getRunners>> = [];
  try {
    initialRunners = await getRunners();
  } catch {
    // KV unavailable, start with empty
  }

  return (
    <main className="min-h-screen bg-navy">
      <Hero initialRunners={initialRunners} />
      <RunnerStrip initialRunners={initialRunners} />

      <div className="mx-auto max-w-4xl">
        <hr className="border-navy-lighter" />
      </div>

      <QuickStats />

      <div className="mx-auto max-w-4xl">
        <hr className="border-navy-lighter" />
      </div>

      <RouteTimeline />

      <div className="mx-auto max-w-4xl">
        <hr className="border-navy-lighter" />
      </div>

      <Tips />
      <MapButton />

      <footer className="px-4 py-8 text-center text-xs text-slate-500">
        <p>5km Marina Bay Jogging Route · Singapore</p>
      </footer>
    </main>
  );
}
