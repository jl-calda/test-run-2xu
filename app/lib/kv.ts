import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { Runner } from "./types";

// Store in project .data/ dir — persists across restarts, no database needed
const DATA_DIR = join(process.cwd(), ".data");
const STORE_FILE = join(DATA_DIR, "runners.json");

function ensureDir(): void {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

export async function getRunners(): Promise<Runner[]> {
  try {
    return JSON.parse(readFileSync(STORE_FILE, "utf-8"));
  } catch {
    return [];
  }
}

export async function setRunners(runners: Runner[]): Promise<void> {
  ensureDir();
  writeFileSync(STORE_FILE, JSON.stringify(runners, null, 2));
}
