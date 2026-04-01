"use client";

interface StepConfirmProps {
  name: string;
  avatarDataUrl: string;
  loading: boolean;
  error: string;
  onJoin: () => void;
  onBack: () => void;
}

export default function StepConfirm({
  name,
  avatarDataUrl,
  loading,
  error,
  onJoin,
  onBack,
}: StepConfirmProps) {
  return (
    <div className="flex flex-col items-center gap-6 px-2">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold text-white">
          Meet your runner!
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          {name}, this is you in pixel form
        </p>
      </div>

      {/* Avatar preview with running animation */}
      <div className="relative flex items-center justify-center">
        <div className="h-48 w-24 overflow-hidden" style={{ imageRendering: "pixelated" }}>
          <img
            src={avatarDataUrl}
            alt="Your pixel runner"
            className="h-full animate-running-sprite"
            style={{
              imageRendering: "pixelated",
              width: "200%",
            }}
          />
        </div>
        {/* Glow ring */}
        <div className="pointer-events-none absolute inset-0 rounded-full opacity-30 animate-pulse-glow" />
      </div>

      {error && (
        <p className="text-center text-sm text-red-400">{error}</p>
      )}

      <div className="flex w-full gap-3">
        <button
          onClick={onBack}
          disabled={loading}
          className="flex-1 cursor-pointer rounded-2xl border border-slate-500 py-4 text-sm font-medium text-slate-300 transition active:scale-95 disabled:opacity-40"
        >
          Back
        </button>
        <button
          onClick={onJoin}
          disabled={loading}
          className="flex-1 cursor-pointer rounded-2xl bg-gradient-to-r from-orange to-yellow py-4 font-heading text-lg font-bold text-navy transition active:scale-95 disabled:opacity-60"
        >
          {loading ? "Joining..." : "Join This Run!"}
        </button>
      </div>
    </div>
  );
}
