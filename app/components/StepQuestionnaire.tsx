"use client";

import { RunnerTraits } from "@/app/lib/types";

interface StepQuestionnaireProps {
  traits: RunnerTraits;
  onChange: (traits: RunnerTraits) => void;
  onNext: () => void;
  onBack: () => void;
}

type Question = {
  key: keyof RunnerTraits;
  title: string;
  options: { value: string; label: string; emoji: string }[];
};

const QUESTIONS: Question[] = [
  {
    key: "vibe",
    title: "Your running vibe?",
    options: [
      { value: "chill", label: "Chill", emoji: "\u{1F60E}" },
      { value: "speedy", label: "Speedy", emoji: "\u{26A1}" },
      { value: "explorer", label: "Explorer", emoji: "\u{1F9ED}" },
      { value: "party", label: "Party", emoji: "\u{1F389}" },
    ],
  },
  {
    key: "time",
    title: "Favorite time to run?",
    options: [
      { value: "sunrise", label: "Sunrise", emoji: "\u{1F305}" },
      { value: "noon", label: "Noon", emoji: "\u{2600}\u{FE0F}" },
      { value: "sunset", label: "Sunset", emoji: "\u{1F307}" },
      { value: "night", label: "Night", emoji: "\u{1F303}" },
    ],
  },
  {
    key: "animal",
    title: "Spirit animal?",
    options: [
      { value: "cat", label: "Cat", emoji: "\u{1F431}" },
      { value: "dog", label: "Dog", emoji: "\u{1F436}" },
      { value: "bird", label: "Bird", emoji: "\u{1F426}" },
      { value: "dragon", label: "Dragon", emoji: "\u{1F409}" },
    ],
  },
];

export default function StepQuestionnaire({
  traits,
  onChange,
  onNext,
  onBack,
}: StepQuestionnaireProps) {
  const allAnswered = traits.vibe && traits.time && traits.animal;

  return (
    <div className="flex flex-col gap-6 px-2">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold text-white">
          Build your runner
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Your answers shape your pixel character
        </p>
      </div>

      {QUESTIONS.map((q) => (
        <div key={q.key}>
          <p className="mb-2 text-sm font-medium text-slate-300">{q.title}</p>
          <div className="grid grid-cols-2 gap-2">
            {q.options.map((opt) => {
              const selected = traits[q.key] === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() =>
                    onChange({ ...traits, [q.key]: opt.value } as RunnerTraits)
                  }
                  className={`cursor-pointer rounded-xl px-3 py-3 text-center transition active:scale-95 ${
                    selected
                      ? "bg-orange/20 ring-2 ring-orange text-white"
                      : "bg-navy-lighter/60 text-slate-300 ring-1 ring-navy-lighter"
                  }`}
                >
                  <span className="text-xl">{opt.emoji}</span>
                  <span className="ml-2 text-sm font-medium">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 cursor-pointer rounded-2xl border border-slate-500 py-3 text-sm font-medium text-slate-300 transition active:scale-95"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!allAnswered}
          className="flex-1 cursor-pointer rounded-2xl bg-gradient-to-r from-orange to-yellow py-3 font-heading font-bold text-navy transition active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
