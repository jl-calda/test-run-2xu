"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface StepSelfieProps {
  onCapture: (canvas: HTMLCanvasElement) => void;
  onBack: () => void;
  onSkip: () => void;
}

export default function StepSelfie({ onCapture, onBack, onSkip }: StepSelfieProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState(false);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 320, height: 320 },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraReady(true);
      }
    } catch {
      setCameraError(true);
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [startCamera]);

  const snap = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    const size = Math.min(video.videoWidth, video.videoHeight);
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    // Center crop + mirror for selfie
    const sx = (video.videoWidth - size) / 2;
    const sy = (video.videoHeight - size) / 2;
    ctx.translate(size, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, sx, sy, size, size, 0, 0, size, size);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    onCapture(canvas);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const size = Math.min(img.width, img.height);
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      const sx = (img.width - size) / 2;
      const sy = (img.height - size) / 2;
      ctx.drawImage(img, sx, sy, size, size, 0, 0, size, size);
      onCapture(canvas);
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <div className="flex flex-col items-center gap-5 px-2">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold text-white">
          Take a selfie
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Your face becomes your pixel runner
        </p>
      </div>

      {!cameraError ? (
        <div className="relative">
          <div className="h-56 w-56 overflow-hidden rounded-full border-4 border-orange/50 bg-navy-lighter">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="h-full w-full object-cover"
              style={{ transform: "scaleX(-1)" }}
            />
          </div>
          {cameraReady && (
            <button
              onClick={snap}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 cursor-pointer rounded-full bg-gradient-to-r from-orange to-yellow px-8 py-3 font-heading font-bold text-navy shadow-lg transition active:scale-90"
            >
              Snap!
            </button>
          )}
          {!cameraReady && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-sm text-slate-400">Starting camera...</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-56 w-56 items-center justify-center rounded-full border-4 border-dashed border-navy-lighter bg-navy-lighter/40">
            <p className="px-6 text-center text-sm text-slate-400">
              Camera unavailable. Upload a photo instead!
            </p>
          </div>
          <label className="cursor-pointer rounded-2xl bg-gradient-to-r from-orange to-yellow px-6 py-3 font-heading font-bold text-navy transition active:scale-95">
            Upload Photo
            <input
              type="file"
              accept="image/*"
              capture="user"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      )}

      <div className="mt-4 flex w-full gap-3">
        <button
          onClick={onBack}
          className="flex-1 cursor-pointer rounded-2xl border border-slate-500 py-3 text-sm font-medium text-slate-300 transition active:scale-95"
        >
          Back
        </button>
        <button
          onClick={onSkip}
          className="flex-1 cursor-pointer rounded-2xl border border-slate-500 py-3 text-sm font-medium text-slate-300 transition active:scale-95"
        >
          Skip (auto-face)
        </button>
      </div>
    </div>
  );
}
