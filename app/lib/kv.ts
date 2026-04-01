import { kv } from "@vercel/kv";
import { Runner } from "./types";

const RUNNERS_KEY = "run:5km-marina-bay:runners";

export async function getRunners(): Promise<Runner[]> {
  const runners = await kv.get<Runner[]>(RUNNERS_KEY);
  return runners ?? [];
}

export async function setRunners(runners: Runner[]): Promise<void> {
  await kv.set(RUNNERS_KEY, runners);
}
