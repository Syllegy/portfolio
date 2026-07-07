"use client";

import { useEffect, useRef, useState } from "react";

interface WarpStar {
  angle: number;
  dist: number;
  speed: number;
  thickness: number;
}

const BG = "rgb(8, 7, 18)";

// Timing (ms)
const T_WARP    = 1600;
const T_EXPLODE = 340;
const T_FLASH   = 160;
const T_FADE    = 850;
const T_TOTAL   = T_WARP + T_EXPLODE + T_FLASH + T_FADE;

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

    // Fewer, more separated stars
    const NUM = 160;
    const stars: WarpStar[] = Array.from({ length: NUM }, () => ({
      angle: Math.random() * Math.PI * 2,
      // Spread initial positions out more so they're visually separated
      dist: 20 + Math.random() * 60,
      speed: 0.8 + Math.random() * 1.8,
      thickness: 0.5 + Math.random() * 0.7,
    }));

    const start = performance.now();
    let rafId = 0;
    let fadingOut = false;

    const draw = (now: number) => {
      const e = now - start;

      const warpProgress = Math.min(e / T_WARP, 1);
      const inExplode    = e > T_WARP && e < T_WARP + T_EXPLODE;
      const inFlash      = e > T_WARP + T_EXPLODE && e < T_WARP + T_EXPLODE + T_FLASH;
      const inFade       = e > T_WARP + T_EXPLODE + T_FLASH;

      // Hand off to CSS once fade starts — cleaner crossfade into the site
      if (inFade && !fadingOut) {
        fadingOut = true;
        canvas.style.transition = `opacity ${T_FADE}ms ease-in-out`;
        canvas.style.opacity = "0";
        cancelAnimationFrame(rafId);
        setTimeout(() => {
          sessionStorage.setItem("intro-done", "1");
          setVisible(false);
        }, T_FADE + 50);
        return;
      }

      // Speed curve: gentle cubic ease-in
      // Peak ~8x during warp, blast to 22x on explode
      const speedMult = inExplode
        ? 22
        : 1 + Math.pow(warpProgress, 2.5) * 7;

      // Higher alpha = shorter streaks (stars stay as points longer)
      const trailAlpha = inExplode ? 0.08 : 0.3;
      ctx.fillStyle = `rgba(8,7,18,${trailAlpha})`;
      ctx.fillRect(0, 0, W, H);

      // Center glow — ice blue, not purple
      if (!inFade) {
        const glowR = 50 + warpProgress * 35;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
        g.addColorStop(0,   `rgba(180,220,255,${0.4 + warpProgress * 0.25})`);
        g.addColorStop(0.5, `rgba(80,150,220,0.12)`);
        g.addColorStop(1,   "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
        ctx.fill();
      }

      // Stars
      for (const s of stars) {
        const prev = s.dist;
        s.dist += s.speed * speedMult;

        if (s.dist > Math.max(W, H) * 0.8) {
          s.dist = 20 + Math.random() * 40;
          s.angle = Math.random() * Math.PI * 2;
        }

        const x1 = cx + Math.cos(s.angle) * prev;
        const y1 = cy + Math.sin(s.angle) * prev;
        const x2 = cx + Math.cos(s.angle) * s.dist;
        const y2 = cy + Math.sin(s.angle) * s.dist;

        // Ice blue / near-white tint
        const bright = Math.min(1, s.dist / 100);
        const r = 210 + Math.floor(Math.random() * 10);
        const g2 = 225 + Math.floor(Math.random() * 10);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(${r},${g2},255,${bright * 0.9})`;
        ctx.lineWidth = s.thickness * (1 + warpProgress * 0.5);
        ctx.stroke();
      }

      // Explosion flash — white to ice blue, zero purple
      if (inExplode || inFlash) {
        const t = inFlash
          ? 1 - (e - T_WARP - T_EXPLODE) / T_FLASH
          : (e - T_WARP) / T_EXPLODE;
        const intensity = Math.pow(Math.sin(t * Math.PI * 0.95), 0.5);
        const flashGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.65);
        flashGrad.addColorStop(0,    `rgba(255,255,255,${intensity * 0.95})`);
        flashGrad.addColorStop(0.2,  `rgba(190,225,255,${intensity * 0.45})`);
        flashGrad.addColorStop(0.55, `rgba(100,170,240,${intensity * 0.15})`);
        flashGrad.addColorStop(1,    "transparent");
        ctx.fillStyle = flashGrad;
        ctx.fillRect(0, 0, W, H);
      }

      rafId = requestAnimationFrame(draw);
    };

    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);
    rafId = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(rafId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-[200] pointer-events-none"
      style={{ background: BG }}
    />
  );
}
