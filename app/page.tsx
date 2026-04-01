import { getRunners } from "@/app/lib/kv";
import Hero from "@/app/components/Hero";
import RunnerStrip from "@/app/components/RunnerStrip";
import RouteExperience from "@/app/components/RouteExperience";
import QuickStats from "@/app/components/QuickStats";
import Tips from "@/app/components/Tips";
import MapButton from "@/app/components/MapButton";
import MobilePrompt from "@/app/components/MobilePrompt";

export const dynamic = "force-dynamic";

export default async function Home() {
  let initialRunners: Awaited<ReturnType<typeof getRunners>> = [];
  try {
    initialRunners = await getRunners();
  } catch {
    // KV unavailable
  }

  return (
    <main className="min-h-screen bg-navy">
      <MobilePrompt />
      <Hero initialRunners={initialRunners} />
      <RunnerStrip initialRunners={initialRunners} />
      <RouteExperience />
      <QuickStats />
      <Tips />
      <MapButton />
      <footer className="px-4 py-10 text-center text-xs text-slate-500" style={{ paddingBottom: "max(80px, calc(60px + env(safe-area-inset-bottom)))" }}>
        <p>5km Marina Bay Jogging Route · Singapore</p>
      </footer>
    </main>
  );
}
