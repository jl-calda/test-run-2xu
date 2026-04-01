"use client";

import { useState, useEffect } from "react";

export default function MobilePrompt() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show on larger screens (likely desktop)
    // Only show on non-touch desktops
    const isDesktop = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    if (isDesktop.matches) {
      const dismissed = sessionStorage.getItem("marina-bay-desktop-ok");
      if (!dismissed) {
        setShow(true);
      }
    }
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("marina-bay-desktop-ok", "1");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/95 backdrop-blur-md">
      <div className="mx-auto max-w-sm px-6 text-center">
        {/* Phone illustration */}
        <div className="mx-auto mb-6 flex h-48 w-28 items-center justify-center rounded-3xl border-4 border-slate-500 bg-navy-light shadow-2xl">
          <div className="text-center">
            <p className="text-4xl">{"\u{1F4F1}"}</p>
            <p className="mt-1 text-4xl">{"\u{1F3C3}"}</p>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold text-white">
          Best on your phone!
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          This experience uses your camera for a selfie and is designed for
          mobile scrolling. Grab your phone and scan the QR code below.
        </p>

        {/* QR code placeholder — simple SVG representation */}
        <div className="mx-auto mt-6 flex h-40 w-40 items-center justify-center rounded-xl bg-white p-3">
          <div className="text-center">
            <p className="text-xs font-medium text-navy">
              Scan with your phone camera
            </p>
            {/* Simple QR-style grid as visual placeholder */}
            <svg viewBox="0 0 100 100" className="mt-2 h-24 w-24 mx-auto">
              {/* Corners */}
              <rect x="5" y="5" width="25" height="25" rx="3" fill="#0f172a" />
              <rect x="9" y="9" width="17" height="17" rx="1" fill="white" />
              <rect x="12" y="12" width="11" height="11" rx="1" fill="#0f172a" />

              <rect x="70" y="5" width="25" height="25" rx="3" fill="#0f172a" />
              <rect x="74" y="9" width="17" height="17" rx="1" fill="white" />
              <rect x="77" y="12" width="11" height="11" rx="1" fill="#0f172a" />

              <rect x="5" y="70" width="25" height="25" rx="3" fill="#0f172a" />
              <rect x="9" y="74" width="17" height="17" rx="1" fill="white" />
              <rect x="12" y="77" width="11" height="11" rx="1" fill="#0f172a" />

              {/* Center pattern */}
              <rect x="35" y="35" width="7" height="7" fill="#0f172a" />
              <rect x="45" y="35" width="7" height="7" fill="#0f172a" />
              <rect x="55" y="35" width="7" height="7" fill="#0f172a" />
              <rect x="35" y="45" width="7" height="7" fill="#0f172a" />
              <rect x="55" y="45" width="7" height="7" fill="#0f172a" />
              <rect x="35" y="55" width="7" height="7" fill="#0f172a" />
              <rect x="45" y="55" width="7" height="7" fill="#0f172a" />
              <rect x="55" y="55" width="7" height="7" fill="#0f172a" />

              {/* Scattered modules */}
              <rect x="35" y="10" width="5" height="5" fill="#0f172a" />
              <rect x="45" y="15" width="5" height="5" fill="#0f172a" />
              <rect x="55" y="10" width="5" height="5" fill="#0f172a" />
              <rect x="10" y="40" width="5" height="5" fill="#0f172a" />
              <rect x="20" y="50" width="5" height="5" fill="#0f172a" />
              <rect x="10" y="55" width="5" height="5" fill="#0f172a" />
              <rect x="80" y="40" width="5" height="5" fill="#0f172a" />
              <rect x="75" y="50" width="5" height="5" fill="#0f172a" />
              <rect x="85" y="55" width="5" height="5" fill="#0f172a" />
              <rect x="40" y="80" width="5" height="5" fill="#0f172a" />
              <rect x="50" y="75" width="5" height="5" fill="#0f172a" />
              <rect x="60" y="80" width="5" height="5" fill="#0f172a" />
              <rect x="75" y="75" width="5" height="5" fill="#0f172a" />
              <rect x="80" y="85" width="5" height="5" fill="#0f172a" />
            </svg>
          </div>
        </div>

        <button
          onClick={dismiss}
          className="mt-8 cursor-pointer text-sm text-slate-500 underline underline-offset-2 transition hover:text-slate-300"
        >
          Continue on desktop anyway
        </button>
      </div>
    </div>
  );
}
