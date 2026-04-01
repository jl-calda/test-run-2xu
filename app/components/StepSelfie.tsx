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
  const [mode, setMode] = useState<"camera" | "upload">("camera");

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const startCamera = useCallback(async () => {
    // Check if getUserMedia is available
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError(true);
      setMode("upload");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 480 },
          height: { ideal: 480 },
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // iOS Safari needs this sequence
        videoRef.current.setAttribute("playsinline", "true");
        videoRef.current.setAttribute("webkit-playsinline", "true");
        try {
          await videoRef.current.play();
          setCameraReady(true);
        } catch {
          stopCamera();
          setCameraError(true);
          setMode("upload");
        }
      }
    } catch {
      setCameraError(true);
      setMode("upload");
    }
  }, [stopCamera]);

  useEffect(() => {
    if (mode === "camera") {
      startCamera();
    }
    return () => stopCamera();
  }, [mode, startCamera, stopCamera]);

  const snap = () => {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0) return;
    const canvas = document.createElement("canvas");
    const size = Math.min(video.videoWidth, video.videoHeight);
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const sx = (video.videoWidth - size) / 2;
    const sy = (video.videoHeight - size) / 2;
    // Mirror for selfie
    ctx.translate(size, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, sx, sy, size, size, 0, 0, size, size);
    stopCamera();
    onCapture(canvas);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
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
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center gap-4 px-2">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold text-white">
          Take a selfie
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Your face becomes your pixel runner
        </p>
      </div>

      {mode === "camera" && !cameraError ? (
        <div className="relative">
          <div className="h-48 w-48 overflow-hidden rounded-full border-4 border-orange/50 bg-navy-lighter">
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
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-48 w-48 items-center justify-center rounded-full bg-navy-lighter/60">
            <span className="text-5xl">{"\u{1F933}"}</span>
          </div>
          <label className="cursor-pointer rounded-2xl bg-gradient-to-r from-orange to-yellow px-8 py-3.5 font-heading font-bold text-navy transition active:scale-95">
            Take Photo
            <input
              type="file"
              accept="image/*"
              capture="user"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          <label className="cursor-pointer text-sm text-slate-400 underline underline-offset-2">
            or upload from gallery
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      )}

      {/* Mode toggle + nav */}
      <div className="flex w-full gap-2 mt-2">
        <button
          onClick={onBack}
          className="flex-1 cursor-pointer rounded-2xl border border-slate-600 py-3 text-sm font-medium text-slate-300 transition active:scale-95"
        >
          Back
        </button>
        {mode === "camera" && !cameraError && (
          <button
            onClick={() => { stopCamera(); setMode("upload"); }}
            className="flex-1 cursor-pointer rounded-2xl border border-slate-600 py-3 text-sm font-medium text-slate-300 transition active:scale-95"
          >
            Upload instead
          </button>
        )}
        {mode === "upload" && !cameraError && (
          <button
            onClick={() => setMode("camera")}
            className="flex-1 cursor-pointer rounded-2xl border border-slate-600 py-3 text-sm font-medium text-slate-300 transition active:scale-95"
          >
            Use camera
          </button>
        )}
        <button
          onClick={onSkip}
          className="flex-1 cursor-pointer rounded-2xl border border-slate-600 py-3 text-sm font-medium text-slate-300 transition active:scale-95"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
