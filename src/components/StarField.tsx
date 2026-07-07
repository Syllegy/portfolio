"use client";

import { useEffect, useRef } from "react";

interface StaticStar {
  x: number;
  y: number;
  size: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  layer: 0 | 1 | 2;
}

interface FlareStar {
  x: number;
  y: number;
  phase: number;
  cycleLength: number;
}

const PARALLAX_RATES = [0.04, 0.11, 0.22] as const;

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const staticStars: StaticStar[] = Array.from({ length: 220 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      size: Math.random() * 1.3 + 0.2,
      twinkleSpeed: 0.3 + Math.random() * 2,
      twinkleOffset: Math.random() * Math.PI * 2,
      layer: Math.floor(Math.random() * 3) as 0 | 1 | 2,
    }));

    const flareStars: FlareStar[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      phase: Math.random(),
      cycleLength: 22 + Math.random() * 26, // slow, chill breathing (22-48s per cycle)
    }));

    let scroll = 0;
    let rafId = 0;
    let lastTime = 0;

    const onScroll = () => { scroll = window.scrollY; };
    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const draw = (time: number) => {
      const t = time * 0.001;
      const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.1) : 0;
      lastTime = time;
      ctx.clearRect(0, 0, W, H);

      // Nebula clouds (blurred gradients)
      if (!prefersReduced) {
        ctx.save();
        ctx.filter = "blur(70px)";

        const pulse = 1 + 0.025 * Math.sin(t * 0.04);

        const g1 = ctx.createRadialGradient(W * 0.5, H * 0.45 + scroll * 0.07, 0, W * 0.5, H * 0.45, W * 0.52 * pulse);
        g1.addColorStop(0, "rgba(87,76,213,0.13)");
        g1.addColorStop(1, "transparent");
        ctx.fillStyle = g1;
        ctx.fillRect(0, 0, W, H);

        const ox2 = Math.sin(t * 0.025) * 40;
        const g2 = ctx.createRadialGradient(W * 0.18 + ox2, H * 0.72, 0, W * 0.18 + ox2, H * 0.72, W * 0.38);
        g2.addColorStop(0, "rgba(0,200,255,0.09)");
        g2.addColorStop(1, "transparent");
        ctx.fillStyle = g2;
        ctx.fillRect(0, 0, W, H);

        const oy3 = Math.cos(t * 0.03) * 30;
        const g3 = ctx.createRadialGradient(W * 0.82, H * 0.2 + oy3, 0, W * 0.82, H * 0.2 + oy3, W * 0.32);
        g3.addColorStop(0, "rgba(160,0,255,0.08)");
        g3.addColorStop(1, "transparent");
        ctx.fillStyle = g3;
        ctx.fillRect(0, 0, W, H);

        ctx.restore();
      }

      // Static twinkle stars with parallax depth
      for (const s of staticStars) {
        const parallaxY = scroll * PARALLAX_RATES[s.layer];
        let y = (s.y - parallaxY) % H;
        if (y < 0) y += H;

        const opacity = prefersReduced
          ? 0.5
          : 0.2 + 0.6 * (0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.twinkleOffset));

        ctx.beginPath();
        ctx.arc(s.x, y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity.toFixed(3)})`;
        ctx.fill();
      }

      // Flaring star-birth effect — a small, slow breathing glow. Kept even
      // under prefers-reduced-motion since it's subtle/small-scale, unlike
      // the larger nebula panning above.
      for (const fs of flareStars) {
        // Time-based (not frame-based) so the breathing rate stays
        // consistent regardless of the display's refresh rate.
        fs.phase = (fs.phase + dt / fs.cycleLength) % 1;

        // Dormant → flare up (0.35-0.5) → peak → fall (0.5-0.65) → dormant
        let intensity = 0;
        if (fs.phase >= 0.35 && fs.phase < 0.65) {
          intensity = Math.sin(((fs.phase - 0.35) / 0.3) * Math.PI);
        }
        if (intensity < 0.015) continue;

        const parallaxY = scroll * 0.17;
        let y = (fs.y - parallaxY) % H;
        if (y < 0) y += H;

        const glowR = intensity * 20;
        const grd = ctx.createRadialGradient(fs.x, y, 0, fs.x, y, glowR);
        grd.addColorStop(0, `rgba(200,230,255,${(intensity * 0.85).toFixed(3)})`);
        grd.addColorStop(0.45, `rgba(0,200,255,${(intensity * 0.35).toFixed(3)})`);
        grd.addColorStop(1, "transparent");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(fs.x, y, glowR, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(fs.x, y, 1.2 + intensity * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${intensity.toFixed(3)})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
