"use client";

import { useState, useEffect } from "react";
import { Runner, RunnerTraits } from "@/app/lib/types";
import {
  pixelateFace,
  composePixelCharacter,
  generatePlaceholderCharacter,
} from "@/app/lib/pixel-art";
import StepName from "./StepName";
import StepQuestionnaire from "./StepQuestionnaire";
import StepSelfie from "./StepSelfie";
import StepConfirm from "./StepConfirm";

interface JoinFlowProps {
  open: boolean;
  onClose: () => void;
  onJoined: (runners: Runner[], joined: Runner) => void;
  runnerCount: number;
}

type Step = "name" | "quiz" | "selfie" | "confirm";

export default function JoinFlow({
  open,
  onClose,
  onJoined,
  runnerCount,
}: JoinFlowProps) {
  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");
  const [traits, setTraits] = useState<RunnerTraits>({
    vibe: "chill",
    time: "sunrise",
    animal: "cat",
  });
  const [avatarDataUrl, setAvatarDataUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Reset on close
  useEffect(() => {
    if (!open) {
      setStep("name");
      setName("");
      setTraits({ vibe: "chill", time: "sunrise", animal: "cat" });
      setAvatarDataUrl("");
      setError("");
    }
  }, [open]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  const handleSelfieCapture = (canvas: HTMLCanvasElement) => {
    const faceData = pixelateFace(canvas, 16);
    const dataUrl = composePixelCharacter(faceData, traits);
    setAvatarDataUrl(dataUrl);
    setStep("confirm");
  };

  const handleSkipSelfie = () => {
    const dataUrl = generatePlaceholderCharacter(name, traits);
    setAvatarDataUrl(dataUrl);
    setStep("confirm");
  };

  const handleJoin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/runners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          avatarDataUrl,
          traits,
        }),
      });

      if (!res.ok) {
        try {
          const data = await res.json();
          setError(data.error || "Something went wrong.");
        } catch {
          setError("Something went wrong. Please try again.");
        }
        setLoading(false);
        return;
      }

      const data = await res.json();
      localStorage.setItem("marina-bay-runner-id", data.joined.id);
      localStorage.setItem("marina-bay-runner-name", data.joined.name);
      onJoined(data.runners, data.joined);
      onClose();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center sm:items-center"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Bottom sheet — full height on mobile, centered card on desktop */}
      <div
        className="relative z-10 w-full sm:max-w-md animate-slide-up rounded-t-3xl sm:rounded-3xl bg-navy-light shadow-2xl flex flex-col"
        style={{ maxHeight: "calc(100svh - 40px)" }}
      >
        {/* Handle bar — tappable to close */}
        <div className="shrink-0 pt-3 pb-2 px-6" onClick={onClose}>
          <div className="mx-auto h-1.5 w-12 rounded-full bg-slate-600" />
        </div>

        {/* Progress dots */}
        <div className="shrink-0 pb-4 flex justify-center gap-2">
          {(["name", "quiz", "selfie", "confirm"] as Step[]).map((s, i) => {
            const steps: Step[] = ["name", "quiz", "selfie", "confirm"];
            const current = steps.indexOf(step);
            return (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i <= current ? "w-6 bg-orange" : "w-2 bg-navy-lighter"
                }`}
              />
            );
          })}
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 pb-8">
          {runnerCount >= 10 ? (
            <div className="text-center py-8">
              <p className="text-2xl mb-2">{"\u{1F525}"}</p>
              <p className="font-heading text-xl font-bold text-white">
                Run is full!
              </p>
              <p className="mt-1 text-sm text-slate-400">
                All 10 slots are taken
              </p>
              <button
                onClick={onClose}
                className="mt-6 cursor-pointer rounded-2xl border border-slate-500 px-8 py-3 text-sm text-slate-300 transition active:scale-95"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {step === "name" && (
                <StepName
                  name={name}
                  onChange={setName}
                  onNext={() => setStep("quiz")}
                />
              )}
              {step === "quiz" && (
                <StepQuestionnaire
                  traits={traits}
                  onChange={setTraits}
                  onNext={() => setStep("selfie")}
                  onBack={() => setStep("name")}
                />
              )}
              {step === "selfie" && (
                <StepSelfie
                  onCapture={handleSelfieCapture}
                  onBack={() => setStep("quiz")}
                  onSkip={handleSkipSelfie}
                />
              )}
              {step === "confirm" && (
                <StepConfirm
                  name={name}
                  avatarDataUrl={avatarDataUrl}
                  loading={loading}
                  error={error}
                  onJoin={handleJoin}
                  onBack={() => setStep("selfie")}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
