"use client";

import { useEffect, useRef, useState } from "react";
import { drawJets, drawStar, drawFieldLines } from "@/lib/neutronStarHelpers";

// Must match IntroAnimation's T_HOLD + T_ZOOM + T_FADE
const INTRO_MS = 350 + 3100 + 950;

// ── Orbital / physics constants ───────────────────────────────────────────────
const SEP   = 70;
const M1    = 1.45;
const M2    = 1.15;
const r1    = SEP * M2 / (M1 + M2);
const r2    = SEP * M1 / (M1 + M2);

const PERIOD  = 5200;   // slightly different from intro for visual continuity illusion
const SPIN1   = 2300;
const SPIN2   = 3400;
const JET_LEN = 400;    // px at 1x – jets sweep across the hero area

export function NeutronStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [show, setShow]   = useState(false);

  // Return visitors see it immediately; first-time visitors wait for the intro to finish
  useEffect(() => {
    if (sessionStorage.getItem("intro-done")) {
      setShow(true);
    } else {
      const t = setTimeout(() => setShow(true), INTRO_MS + 100);
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

    const start = performance.now();
    let rafId   = 0;

    const draw = (now: number) => {
      const W  = canvas.width;
      const H  = canvas.height;

      // Place the system in the right half of the hero so it doesn't crowd the text
      const cx = W > 768 ? W * 0.64 : W * 0.5;
      const cy = H * 0.50;

      ctx.clearRect(0, 0, W, H);

      const e     = now - start;
      const orb   = (e / PERIOD)  * Math.PI * 2;
      const spin1 = (e / SPIN1)   * Math.PI * 2;
      const spin2 = (e / SPIN2)   * Math.PI * 2 + 1.1;

      // Slight y-flattening gives the sense of viewing the orbit at an angle
      const PERSP = 0.30;
      const s1x = cx + Math.cos(orb) * r1;
      const s1y = cy + Math.sin(orb) * r1 * PERSP;
      const s2x = cx - Math.cos(orb) * r2;
      const s2y = cy - Math.sin(orb) * r2 * PERSP;

      // Field lines (dimmed vs intro – atmospheric, not dominant)
      drawFieldLines(ctx, cx, cy, 500, 0.65);

      // Jets (drawn behind stars)
      drawJets(ctx, s2x, s2y, spin2, JET_LEN, 0.70);
      drawJets(ctx, s1x, s1y, spin1, JET_LEN, 0.75);

      // Stars (depth-sorted)
      const s1Front = Math.sin(orb) > 0;
      if (!s1Front) drawStar(ctx, s1x, s1y, 5.5, [225, 242, 255], 0.90);
      drawStar(ctx,  s2x, s2y, 4.5, [140, 205, 255], 0.85);
      if (s1Front)  drawStar(ctx, s1x, s1y, 5.5, [225, 242, 255], 0.90);

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
      className="absolute inset-0 w-full h-full pointer-events-none animate-[fadeIn_1.4s_ease-out_forwards]"
    />
  );
}
