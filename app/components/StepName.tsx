"use client";

interface StepNameProps {
  name: string;
  onChange: (name: string) => void;
  onNext: () => void;
}

export default function StepName({ name, onChange, onNext }: StepNameProps) {
  return (
    <div className="flex flex-col items-center gap-6 px-2">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold text-white">
          What&apos;s your name?
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          This shows up on the run crew
        </p>
      </div>

      <input
        type="text"
        maxLength={20}
        placeholder="Your name"
        value={name}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && name.trim() && onNext()}
        autoFocus
        className="w-full rounded-2xl bg-navy-lighter/80 px-5 py-4 text-center text-lg text-white placeholder-slate-400 outline-none ring-1 ring-navy-lighter focus:ring-orange transition"
      />

      <button
        onClick={onNext}
        disabled={!name.trim()}
        className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-orange to-yellow py-4 font-heading text-lg font-bold text-navy transition active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}
