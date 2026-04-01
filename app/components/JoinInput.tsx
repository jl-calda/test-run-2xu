"use client";

import { useState, useEffect } from "react";
import { Runner } from "@/app/lib/types";

interface JoinInputProps {
  initialRunners: Runner[];
}

export default function JoinInput({ initialRunners }: JoinInputProps) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "joined" | "full" | "error"
  >("idle");
  const [error, setError] = useState("");
  const [joinedName, setJoinedName] = useState("");
  const [runnerId, setRunnerId] = useState<string | null>(null);
  const [runnerCount, setRunnerCount] = useState(initialRunners.length);

  // Check localStorage on mount
  useEffect(() => {
    const storedId = localStorage.getItem("marina-bay-runner-id");
    const storedName = localStorage.getItem("marina-bay-runner-name");
    if (storedId && storedName) {
      setRunnerId(storedId);
      setJoinedName(storedName);
      setStatus("joined");
    }
    if (initialRunners.length >= 10) {
      setStatus("full");
    }
  }, [initialRunners]);

  // Listen for runner updates
  useEffect(() => {
    const handler = (e: Event) => {
      const runners = (e as CustomEvent<Runner[]>).detail;
      setRunnerCount(runners.length);
      if (runners.length >= 10 && status === "idle") {
        setStatus("full");
      }
      // If our runner was removed externally
      if (runnerId && !runners.find((r) => r.id === runnerId)) {
        setRunnerId(null);
        setJoinedName("");
        setStatus(runners.length >= 10 ? "full" : "idle");
        localStorage.removeItem("marina-bay-runner-id");
        localStorage.removeItem("marina-bay-runner-name");
      }
    };
    window.addEventListener("runners-updated", handler);
    return () => window.removeEventListener("runners-updated", handler);
  }, [runnerId, status]);

  const dispatchUpdate = (runners: Runner[]) => {
    window.dispatchEvent(
      new CustomEvent("runners-updated", { detail: runners })
    );
  };

  const handleJoin = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/runners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      const data = await res.json();
      localStorage.setItem("marina-bay-runner-id", data.joined.id);
      localStorage.setItem("marina-bay-runner-name", data.joined.name);
      setRunnerId(data.joined.id);
      setJoinedName(data.joined.name);
      setRunnerCount(data.runners.length);
      setStatus("joined");
      setName("");
      dispatchUpdate(data.runners);
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  };

  const handleLeave = async () => {
    if (!runnerId) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/runners", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: runnerId }),
      });

      if (res.ok) {
        const runners: Runner[] = await res.json();
        localStorage.removeItem("marina-bay-runner-id");
        localStorage.removeItem("marina-bay-runner-name");
        setRunnerId(null);
        setJoinedName("");
        setRunnerCount(runners.length);
        setStatus(runners.length >= 10 ? "full" : "idle");
        dispatchUpdate(runners);
      }
    } catch {
      setStatus("joined");
    }
  };

  if (status === "joined") {
    return (
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
        <span className="rounded-full bg-green/20 px-4 py-2 text-sm font-semibold text-green">
          You&apos;re in, {joinedName}! ✓
        </span>
        <button
          onClick={handleLeave}
          className="cursor-pointer rounded-full border border-slate-500 px-4 py-2 text-sm text-slate-300 transition hover:border-red-400 hover:text-red-400"
        >
          Leave Run
        </button>
      </div>
    );
  }

  if (status === "full" && !runnerId) {
    return (
      <p className="text-center text-sm font-medium text-orange">
        Run is full! All 10 slots taken.
      </p>
    );
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          maxLength={20}
          placeholder="Your name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleJoin()}
          className="flex-1 rounded-full bg-navy-lighter/80 px-5 py-3 text-white placeholder-slate-400 outline-none ring-1 ring-navy-lighter focus:ring-orange transition"
          disabled={status === "loading"}
        />
        <button
          onClick={handleJoin}
          disabled={status === "loading" || !name.trim()}
          className="cursor-pointer whitespace-nowrap rounded-full bg-gradient-to-r from-orange to-yellow px-6 py-3 font-heading font-semibold text-navy transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Joining..." : "Join This Run"}
        </button>
      </div>
      {status === "error" && error && (
        <p className="mt-2 text-center text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
