import { NextRequest, NextResponse } from "next/server";
import { getRunners, setRunners } from "@/app/lib/kv";

const MAX_RUNNERS = 10;
const MAX_NAME_LENGTH = 20;

export async function GET() {
  const runners = await getRunners();
  return NextResponse.json(runners);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const name = typeof body.name === "string" ? body.name.trim() : "";

  if (!name || name.length > MAX_NAME_LENGTH) {
    return NextResponse.json(
      { error: "Name must be 1-20 characters." },
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
    avatarUrl: `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(name)}`,
    joinedAt: new Date().toISOString(),
  };

  const updated = [...runners, newRunner];
  await setRunners(updated);

  return NextResponse.json({ runners: updated, joined: newRunner });
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const id = typeof body.id === "string" ? body.id : "";

  if (!id) {
    return NextResponse.json({ error: "Missing runner id." }, { status: 400 });
  }

  const runners = await getRunners();
  const updated = runners.filter((r) => r.id !== id);
  await setRunners(updated);

  return NextResponse.json(updated);
}
