import { Runner } from "./types";

const RUNNERS_KEY = "run:5km-marina-bay:runners";

// Use globalThis to persist in-memory store across Next.js hot reloads
const globalStore = globalThis as typeof globalThis & {
  __marinaBayRunners?: Runner[];
};
if (!globalStore.__marinaBayRunners) {
  globalStore.__marinaBayRunners = [];
}

function isKvConfigured(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export async function getRunners(): Promise<Runner[]> {
  if (!isKvConfigured()) {
    return globalStore.__marinaBayRunners!;
  }

  const { kv } = await import("@vercel/kv");
  const runners = await kv.get<Runner[]>(RUNNERS_KEY);
  return runners ?? [];
}

export async function setRunners(runners: Runner[]): Promise<void> {
  if (!isKvConfigured()) {
    globalStore.__marinaBayRunners = runners;
    return;
  }

  const { kv } = await import("@vercel/kv");
  await kv.set(RUNNERS_KEY, runners);
}
