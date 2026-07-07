"use client";

import { useEffect, useRef, useState } from "react";

interface WaveRing {
  r: number;
  born: number;
}

// How long before neutron stars fade in (should match or slightly exceed the intro duration)
const INTRO_DURATION_MS = 1600 + 340 + 160 + 850; // T_WARP + T_EXPLODE + T_FLASH + T_FADE

export function NeutronStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [show, setShow] = useState(false);

  // Appear immediately for return visitors, or after intro completes on first visit
  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("intro-done");
    if (alreadyShown) {
      setShow(true);
    } else {
      const t = setTimeout(() => setShow(true), INTRO_DURATION_MS + 100);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (!show) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Orbital parameters ────────────────────────────────────────────────
    const PERIOD   = 5000;      // orbital period ms
    const SEP      = 58;        // visual separation px
    const M1       = 1.45;      // heavier star (white)
    const M2       = 1.15;      // lighter star (blue)
    const TOTAL_M  = M1 + M2;
    const r1       = SEP * M2 / TOTAL_M; // heavier → orbits closer to CoM
    const r2       = SEP * M1 / TOTAL_M;
    const PERSP    = 0.28;      // y-axis flattening (disk perspective)

    // ── Gravitational wave rings ──────────────────────────────────────────
    const WAVE_INTERVAL = 1800; // ms between pulses
    const WAVE_SPEED    = 55;   // px per second
    const MAX_R         = 520;
    const waves: WaveRing[] = [];
    let lastWave = 0;

    const start = performance.now();
    let rafId = 0;

    // ── Helpers ───────────────────────────────────────────────────────────
    const drawStar = (
      x: number, y: number,
      coreR: number,
      rgb: [number, number, number],
    ) => {
      // Outer atmospheric halo (very large, very faint)
      const halo = ctx.createRadialGradient(x, y, 0, x, y, coreR * 20);
      halo.addColorStop(0,   `rgba(${rgb},0.10)`);
      halo.addColorStop(0.3, `rgba(${rgb},0.04)`);
      halo.addColorStop(1,   `rgba(${rgb},0)`);
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(x, y, coreR * 20, 0, Math.PI * 2);
      ctx.fill();

      // Mid glow
      const mid = ctx.createRadialGradient(x, y, 0, x, y, coreR * 6);
      mid.addColorStop(0,   `rgba(${rgb},0.45)`);
      mid.addColorStop(0.6, `rgba(${rgb},0.12)`);
      mid.addColorStop(1,   `rgba(${rgb},0)`);
      ctx.fillStyle = mid;
      ctx.beginPath();
      ctx.arc(x, y, coreR * 6, 0, Math.PI * 2);
      ctx.fill();

      // Bright core
      const core = ctx.createRadialGradient(x, y, 0, x, y, coreR);
      core.addColorStop(0, "rgba(255,255,255,1)");
      core.addColorStop(0.5, `rgba(${rgb},0.9)`);
      core.addColorStop(1, `rgba(${rgb},0)`);
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(x, y, coreR, 0, Math.PI * 2);
      ctx.fill();
    };

    // ── Main draw loop ────────────────────────────────────────────────────
    const draw = (now: number) => {
      const W  = canvas.width;
      const H  = canvas.height;
      // Position the system slightly right of center
      const cx = W * 0.62;
      const cy = H * 0.50;

      ctx.clearRect(0, 0, W, H);

      const elapsed = now - start;
      const angle   = (elapsed / PERIOD) * Math.PI * 2;

      // Spawn wave rings
      if (now - lastWave > WAVE_INTERVAL) {
        waves.push({ r: SEP * 0.4, born: now });
        lastWave = now;
      }

      // ── Orbital disk rings (background, very faint) ──────────────────
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.18);

      const NUM_DISK = 9;
      for (let i = 0; i < NUM_DISK; i++) {
        const diskR   = 70 + i * 38;
        const alpha   = Math.max(0, 0.085 - i * 0.007);
        const lw      = i < 2 ? 1.8 - i * 0.3 : 1;
        ctx.beginPath();
        ctx.ellipse(0, 0, diskR, diskR * PERSP, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(140,180,230,${alpha})`;
        ctx.lineWidth = lw;
        ctx.stroke();
      }
      ctx.restore();

      // ── Gravitational wave rings ─────────────────────────────────────
      for (let i = waves.length - 1; i >= 0; i--) {
        const wave = waves[i];
        const age  = (now - wave.born) / 1000;
        wave.r     = SEP * 0.4 + age * WAVE_SPEED;

        if (wave.r > MAX_R) { waves.splice(i, 1); continue; }

        const alpha = (1 - wave.r / MAX_R) * 0.22;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(-0.18);
        ctx.beginPath();
        ctx.ellipse(0, 0, wave.r, wave.r * PERSP * 0.9, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(170,210,255,${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      }

      // ── Orbiting stars ───────────────────────────────────────────────
      // Apply perspective to y so they follow the disk plane
      const s1x = cx + Math.cos(angle) * r1;
      const s1y = cy + Math.sin(angle) * r1 * PERSP;
      const s2x = cx - Math.cos(angle) * r2;
      const s2y = cy - Math.sin(angle) * r2 * PERSP;

      // Determine draw order (closer star drawn on top)
      const s1Front = Math.sin(angle) > 0;

      if (!s1Front) drawStar(s1x, s1y, 5, [220, 238, 255]);
      drawStar(s2x, s2y, 4.2, [160, 210, 255]);
      if (s1Front) drawStar(s1x, s1y, 5, [220, 238, 255]);

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [show]);

  if (!show) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none animate-[fadeIn_1.2s_ease-out_forwards]"
    />
  );
}
