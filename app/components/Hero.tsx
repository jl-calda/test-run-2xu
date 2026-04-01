"use client";

import { useState, useEffect } from "react";
import { Runner } from "@/app/lib/types";
import JoinFlow from "./JoinFlow";

interface HeroProps {
  initialRunners: Runner[];
}

export default function Hero({ initialRunners }: HeroProps) {
  const [flowOpen, setFlowOpen] = useState(false);
  const [joined, setJoined] = useState(false);
  const [joinedName, setJoinedName] = useState("");
  const [runnerCount, setRunnerCount] = useState(initialRunners.length);

  useEffect(() => {
    const storedId = localStorage.getItem("marina-bay-runner-id");
    const storedName = localStorage.getItem("marina-bay-runner-name");
    if (storedId && storedName) {
      setJoined(true);
      setJoinedName(storedName);
    }
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const runners = (e as CustomEvent<Runner[]>).detail;
      setRunnerCount(runners.length);
    };
    window.addEventListener("runners-updated", handler);
    return () => window.removeEventListener("runners-updated", handler);
  }, []);

  const handleJoined = (runners: Runner[], runner: Runner) => {
    setJoined(true);
    setJoinedName(runner.name);
    setRunnerCount(runners.length);
    window.dispatchEvent(
      new CustomEvent("runners-updated", { detail: runners })
    );
  };

  const handleLeave = async () => {
    const id = localStorage.getItem("marina-bay-runner-id");
    if (!id) return;
    try {
      const res = await fetch("/api/runners", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        const runners: Runner[] = await res.json();
        localStorage.removeItem("marina-bay-runner-id");
        localStorage.removeItem("marina-bay-runner-name");
        setJoined(false);
        setJoinedName("");
        setRunnerCount(runners.length);
        window.dispatchEvent(
          new CustomEvent("runners-updated", { detail: runners })
        );
      }
    } catch {
      // silent
    }
  };

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy via-navy-light/50 to-navy" />
      <div className="pointer-events-none absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_30%,_#f97316_0%,_transparent_60%)]" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange">
          Friday Apr 3 · 7 – 8 AM · 5km · Singapore
        </p>

        <h1 className="font-heading text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-r from-orange to-yellow bg-clip-text text-transparent">
            5km Scenic Jog
          </span>
          <br />
          <span className="text-white text-3xl sm:text-4xl lg:text-5xl">
            Gardens by the Bay
          </span>
          <br />
          <span className="text-white text-3xl sm:text-4xl lg:text-5xl">
            → Merlion Park
          </span>
        </h1>

        <p className="max-w-xs text-sm text-slate-400">
          Supertree Grove · Dragonfly Lake · Marina Bay waterfront · Zero road crossings
        </p>

        {/* CTA */}
        {joined ? (
          <div className="flex flex-col items-center gap-3">
            <span className="rounded-full bg-green/20 px-5 py-2.5 text-sm font-semibold text-green">
              You&apos;re in, {joinedName}! ✓
            </span>
            <button
              onClick={handleLeave}
              className="cursor-pointer text-sm text-slate-500 underline underline-offset-2 transition hover:text-red-400"
            >
              Leave run
            </button>
          </div>
        ) : (
          <button
            onClick={() => setFlowOpen(true)}
            className="mt-2 cursor-pointer rounded-2xl bg-gradient-to-r from-orange to-yellow px-10 py-4 font-heading text-lg font-bold text-navy shadow-lg shadow-orange/20 transition active:scale-95 hover:shadow-orange/40"
          >
            Join This Run
          </button>
        )}

        {/* Scroll hint */}
        <div className="mt-8 animate-bounce text-slate-500">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      <JoinFlow
        open={flowOpen}
        onClose={() => setFlowOpen(false)}
        onJoined={handleJoined}
        runnerCount={runnerCount}
      />
    </section>
  );
}
