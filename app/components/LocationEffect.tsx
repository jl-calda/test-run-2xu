"use client";

import { useRef, useEffect, useCallback } from "react";

type EffectType =
  | "sparkle"
  | "leaves"
  | "ripple"
  | "butterfly"
  | "twinkle"
  | "rays"
  | "confetti";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  rotation: number;
  rotSpeed: number;
}

const EFFECT_CONFIGS: Record<
  EffectType,
  {
    count: number;
    colors: string[];
    speed: number;
    gravity: number;
    spread: number;
  }
> = {
  sparkle:   { count: 40, colors: ["#fbbf24", "#fde68a", "#ffffff"], speed: 3, gravity: -0.5, spread: 1 },
  leaves:    { count: 25, colors: ["#22c55e", "#4ade80", "#86efac", "#166534"], speed: 1.5, gravity: 0.8, spread: 0.5 },
  ripple:    { count: 6,  colors: ["#38bdf8", "#7dd3fc", "#bae6fd"], speed: 2, gravity: 0, spread: 0 },
  butterfly: { count: 15, colors: ["#c084fc", "#e879f9", "#f0abfc", "#fbbf24"], speed: 1, gravity: -0.2, spread: 0.8 },
  twinkle:   { count: 35, colors: ["#fbbf24", "#ffffff", "#fde68a", "#f97316"], speed: 0.5, gravity: 0, spread: 1 },
  rays:      { count: 12, colors: ["#f97316", "#fbbf24", "#fde68a"], speed: 4, gravity: 0, spread: 0 },
  confetti:  { count: 50, colors: ["#ef4444", "#fbbf24", "#22c55e", "#3b82f6", "#a855f7", "#f97316"], speed: 5, gravity: 1.5, spread: 1 },
};

interface LocationEffectProps {
  type: EffectType;
  active: boolean;
}

export default function LocationEffect({ type, active }: LocationEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const firedRef = useRef(false);
  const animRef = useRef<number>(0);

  const runEffect = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const config = EFFECT_CONFIGS[type];
    const particles: Particle[] = [];
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    for (let i = 0; i < config.count; i++) {
      const angle = (Math.PI * 2 * i) / config.count;
      const color = config.colors[i % config.colors.length];

      if (type === "ripple") {
        // Ripples are concentric circles, not point particles
        particles.push({
          x: cx, y: cy,
          vx: 0, vy: 0,
          size: i * 15,
          color,
          life: 60 + i * 15,
          maxLife: 60 + i * 15,
          rotation: 0, rotSpeed: 0,
        });
      } else {
        particles.push({
          x: cx + (Math.random() - 0.5) * 40,
          y: cy + (Math.random() - 0.5) * 40,
          vx: Math.cos(angle) * config.speed * (0.5 + Math.random()) * (config.spread || 1),
          vy: Math.sin(angle) * config.speed * (0.5 + Math.random()),
          size: 3 + Math.random() * 4,
          color,
          life: 60 + Math.random() * 40,
          maxLife: 60 + Math.random() * 40,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.1,
        });
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      for (const p of particles) {
        if (p.life <= 0) continue;
        alive = true;
        p.life--;

        const alpha = Math.min(1, p.life / (p.maxLife * 0.3));

        if (type === "ripple") {
          p.size += 2;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = alpha * 0.6;
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.globalAlpha = 1;
        } else if (type === "rays") {
          const angle = (Math.PI * 2 * particles.indexOf(p)) / particles.length;
          const len = (1 - p.life / p.maxLife) * 120;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = alpha * 0.7;
          ctx.lineWidth = 3;
          ctx.stroke();
          ctx.globalAlpha = 1;
        } else {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += config.gravity * 0.05;
          p.rotation += p.rotSpeed;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = alpha;
          ctx.fillStyle = p.color;

          if (type === "confetti") {
            ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.globalAlpha = 1;
          ctx.restore();
        }
      }

      if (alive) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animate();
  }, [type]);

  useEffect(() => {
    if (active && !firedRef.current) {
      firedRef.current = true;
      runEffect();
    }
    if (!active) {
      firedRef.current = false;
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [active, runEffect]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
    />
  );
}
