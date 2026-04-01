import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { Runner } from "./types";

const RUNNERS_KEY = "run:5km-marina-bay:runners";
const STORE_FILE = join(tmpdir(), "marina-bay-runners.json");

function isKvConfigured(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

function readFileStore(): Runner[] {
  try {
    return JSON.parse(readFileSync(STORE_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeFileStore(runners: Runner[]): void {
  writeFileSync(STORE_FILE, JSON.stringify(runners));
}

export async function getRunners(): Promise<Runner[]> {
  if (!isKvConfigured()) {
    return readFileStore();
  }

  const { kv } = await import("@vercel/kv");
  const runners = await kv.get<Runner[]>(RUNNERS_KEY);
  return runners ?? [];
}

export async function setRunners(runners: Runner[]): Promise<void> {
  if (!isKvConfigured()) {
    writeFileStore(runners);
    return;
  }

  const { kv } = await import("@vercel/kv");
  await kv.set(RUNNERS_KEY, runners);
}
