"use client";

import { useEffect, useRef, useState } from "react";

interface WarpStar {
  angle: number;
  dist: number;
  speed: number;
  thickness: number;
}

const BG = "rgb(8, 7, 18)";

export function IntroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("intro-done")) {
      setVisible(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = (canvas.width = window.innerWidth);
    const H = (canvas.height = window.innerHeight);
    const cx = W / 2;
    const cy = H / 2;

    const NUM = 350;
    const stars: WarpStar[] = Array.from({ length: NUM }, () => ({
      angle: Math.random() * Math.PI * 2,
      dist: Math.random() * 30,
      speed: 1 + Math.random() * 2.5,
      thickness: 0.4 + Math.random() * 0.8,
    }));

    // Timing (ms)
    const T_WARP      = 2200;
    const T_EXPLODE   = 450;
    const T_FLASH     = 200;
    const T_FADE      = 700;
    const T_TOTAL     = T_WARP + T_EXPLODE + T_FLASH + T_FADE;

    const start = performance.now();
    let rafId = 0;

    const draw = (now: number) => {
      const e = now - start;

      // -- phase helpers
      const warpProgress   = Math.min(e / T_WARP, 1);
      const inExplode      = e > T_WARP && e < T_WARP + T_EXPLODE;
      const inFlash        = e > T_WARP + T_EXPLODE && e < T_WARP + T_EXPLODE + T_FLASH;
      const inFade         = e > T_WARP + T_EXPLODE + T_FLASH;
      const fadeProgress   = inFade
        ? Math.min((e - T_WARP - T_EXPLODE - T_FLASH) / T_FADE, 1)
        : 0;

      if (e > T_TOTAL) {
        canvas.style.opacity = "0";
        cancelAnimationFrame(rafId);
        sessionStorage.setItem("intro-done", "1");
        setTimeout(() => setVisible(false), 50);
        return;
      }

      // Ease-in speed curve during warp: cubic
      const speedMult = inExplode
        ? 40
        : 1 + Math.pow(warpProgress, 2) * 14;

      // Trail — use semi-transparent fill to get streaks
      ctx.fillStyle = inExplode ? "rgba(8,7,18,0.05)" : "rgba(8,7,18,0.18)";
      ctx.fillRect(0, 0, W, H);

      // Center nebula glow
      if (!inFade) {
        const glowR = 60 + warpProgress * 40;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
        g.addColorStop(0,   `rgba(160,140,255,${0.35 + warpProgress * 0.2})`);
        g.addColorStop(0.5, `rgba(80,60,180,0.15)`);
        g.addColorStop(1,   "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
        ctx.fill();
      }

      // Stars / streaks
      for (const s of stars) {
        const prev = s.dist;
        s.dist += s.speed * speedMult;

        if (s.dist > Math.max(W, H) * 0.75) {
          s.dist = Math.random() * 8;
          s.angle = Math.random() * Math.PI * 2;
        }

        const x1 = cx + Math.cos(s.angle) * prev;
        const y1 = cy + Math.sin(s.angle) * prev;
        const x2 = cx + Math.cos(s.angle) * s.dist;
        const y2 = cy + Math.sin(s.angle) * s.dist;

        const bright = Math.min(1, s.dist / 80);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(220,215,255,${bright * 0.85})`;
        ctx.lineWidth = s.thickness * (1 + warpProgress * 0.6);
        ctx.stroke();
      }

      // Explosion flash
      if (inExplode || inFlash) {
        const t = inFlash
          ? 1 - (e - T_WARP - T_EXPLODE) / T_FLASH
          : (e - T_WARP) / T_EXPLODE;
        const intensity = Math.pow(Math.sin(t * Math.PI * 0.9), 0.6);
        const flashGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.7);
        flashGrad.addColorStop(0,   `rgba(255,255,255,${intensity * 0.9})`);
        flashGrad.addColorStop(0.15,`rgba(200,190,255,${intensity * 0.5})`);
        flashGrad.addColorStop(0.5, `rgba(80,60,200,${intensity * 0.2})`);
        flashGrad.addColorStop(1,   "transparent");
        ctx.fillStyle = flashGrad;
        ctx.fillRect(0, 0, W, H);
      }

      // Fade out to transparent
      if (inFade) {
        ctx.fillStyle = `rgba(8,7,18,${Math.pow(fadeProgress, 1.5)})`;
        ctx.fillRect(0, 0, W, H);
      }

      rafId = requestAnimationFrame(draw);
    };

    // Start with solid background
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, []);

  if (!visible) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-[200] pointer-events-none transition-opacity duration-100"
      style={{ background: BG }}
    />
  );
}
