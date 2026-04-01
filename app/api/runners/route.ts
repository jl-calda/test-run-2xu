import { NextRequest, NextResponse } from "next/server";
import { getRunners, setRunners } from "@/app/lib/kv";
import { RunnerTraits } from "@/app/lib/types";

const MAX_RUNNERS = 10;
const MAX_NAME_LENGTH = 20;
const MAX_AVATAR_SIZE = 80_000; // ~80KB base64

const VALID_VIBES = ["chill", "speedy", "explorer", "party"];
const VALID_TIMES = ["sunrise", "noon", "sunset", "night"];
const VALID_ANIMALS = ["cat", "dog", "bird", "dragon"];

function isValidTraits(traits: unknown): traits is RunnerTraits {
  if (!traits || typeof traits !== "object") return false;
  const t = traits as Record<string, unknown>;
  return (
    VALID_VIBES.includes(t.vibe as string) &&
    VALID_TIMES.includes(t.time as string) &&
    VALID_ANIMALS.includes(t.animal as string)
  );
}

export async function GET() {
  try {
    const runners = await getRunners();
    return NextResponse.json(runners);
  } catch (e) {
    console.error("GET /api/runners error:", e);
    return NextResponse.json(
      { error: "Failed to load runners." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";

    if (!name || name.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        { error: "Name must be 1-20 characters." },
        { status: 400 }
      );
    }

    const avatarDataUrl =
      typeof body.avatarDataUrl === "string" ? body.avatarDataUrl : "";
    if (!avatarDataUrl.startsWith("data:image/png;base64,")) {
      return NextResponse.json(
        { error: "Invalid avatar image." },
        { status: 400 }
      );
    }
    if (avatarDataUrl.length > MAX_AVATAR_SIZE) {
      return NextResponse.json(
        { error: "Avatar image too large." },
        { status: 400 }
      );
    }

    if (!isValidTraits(body.traits)) {
      return NextResponse.json(
        { error: "Invalid runner traits." },
        { status: 400 }
      );
    }

    const runners = await getRunners();

    if (runners.length >= MAX_RUNNERS) {
      return NextResponse.json(
        { error: "Run is full! Max 10 runners." },
        { status: 409 }
      );
    }

    const duplicate = runners.some(
      (r) => r.name.toLowerCase() === name.toLowerCase()
    );
    if (duplicate) {
      return NextResponse.json(
        { error: "That name's taken, try another!" },
        { status: 409 }
      );
    }

    const newRunner = {
      id: crypto.randomUUID(),
      name,
      avatarDataUrl,
      traits: body.traits as RunnerTraits,
      joinedAt: new Date().toISOString(),
    };

    const updated = [...runners, newRunner];
    await setRunners(updated);

    return NextResponse.json({ runners: updated, joined: newRunner });
  } catch (e) {
    console.error("POST /api/runners error:", e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const id = typeof body.id === "string" ? body.id : "";

    if (!id) {
      return NextResponse.json(
        { error: "Missing runner id." },
        { status: 400 }
      );
    }

    const runners = await getRunners();
    const updated = runners.filter((r) => r.id !== id);
    await setRunners(updated);

    return NextResponse.json(updated);
  } catch (e) {
    console.error("DELETE /api/runners error:", e);
    return NextResponse.json(
      { error: "Failed to remove runner." },
      { status: 500 }
    );
  }
}
