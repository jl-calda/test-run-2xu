import { Runner } from "./types";

const RUNNERS_KEY = "run:5km-marina-bay:runners";

// In-memory fallback when Vercel KV is not configured
let memoryStore: Runner[] = [];

function isKvConfigured(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export async function getRunners(): Promise<Runner[]> {
  if (!isKvConfigured()) {
    return memoryStore;
  }

  const { kv } = await import("@vercel/kv");
  const runners = await kv.get<Runner[]>(RUNNERS_KEY);
  return runners ?? [];
}

export async function setRunners(runners: Runner[]): Promise<void> {
  if (!isKvConfigured()) {
    memoryStore = runners;
    return;
  }

  const { kv } = await import("@vercel/kv");
  await kv.set(RUNNERS_KEY, runners);
}
