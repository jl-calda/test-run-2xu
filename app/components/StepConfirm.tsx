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
    <div className="flex flex-col items-center gap-4 px-2">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold text-white">
          Meet your runner!
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          {name}, this is you in pixel form
        </p>
      </div>

      {/* Large pixel avatar preview — takes up most of the sheet */}
      <div className="relative flex items-center justify-center w-full" style={{ height: "40svh" }}>
        <div className="h-full overflow-hidden" style={{ imageRendering: "pixelated", aspectRatio: "2/3" }}>
          <img
            src={avatarDataUrl}
            alt="Your pixel runner"
            className="h-full w-full object-contain animate-running-sprite"
            style={{ imageRendering: "pixelated" }}
          />
        </div>
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
