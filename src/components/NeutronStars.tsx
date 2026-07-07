"use client";

import { useEffect, useRef, useState } from "react";
import { drawJets, drawStar, drawFieldLines } from "@/lib/neutronStarHelpers";

// Total intro duration before this component appears
const INTRO_MS = 250 + 3600 * 0.82 + 1200; // T_HOLD + T_ZOOM*FADE_AT + T_FADE ≈ 4402ms

const SEP   = 72;
const M1    = 1.45;
const M2    = 1.15;
const r1    = SEP * M2 / (M1 + M2);
const r2    = SEP * M1 / (M1 + M2);

const PERIOD         = 5200;   // ms
const TILT           = 0.28;
const JET_TILT       = 0.26;   // rad from vertical
const JET_PRECESS_MS = 28000;  // very slow precession
const JET_LEN        = 430;    // px

export function NeutronStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [show, setShow] = useState(false);

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
      const cx = W > 768 ? W * 0.64 : W * 0.5;
      const cy = H * 0.50;

      ctx.clearRect(0, 0, W, H);

      const e       = now - start;
      const orb     = (e / PERIOD)         * Math.PI * 2;
      const precess = (e / JET_PRECESS_MS) * Math.PI * 2;

      // Near-vertical jet axes with slow precession (X-shape)
      const jet1Angle = Math.PI / 2 + JET_TILT + precess * 0.06;
      const jet2Angle = Math.PI / 2 - JET_TILT - precess * 0.05;

      // Elliptical orbits (3D disk tilt)
      const sinOrb = Math.sin(orb);
      const cosOrb = Math.cos(orb);
      const s1x = cx + cosOrb * r1;
      const s1y = cy + sinOrb * r1 * TILT;
      const s2x = cx - cosOrb * r2;
      const s2y = cy - sinOrb * r2 * TILT;

      // Depth-based sizing
      const s1r = 5.5 * (1 + sinOrb * 0.07);
      const s2r = 4.5 * (1 - sinOrb * 0.07);

      // Field lines (tilted ellipse rings)
      drawFieldLines(ctx, cx, cy, 510, 0.60, TILT);

      // Jets
      drawJets(ctx, s2x, s2y, jet2Angle, JET_LEN, e, 0.68);
      drawJets(ctx, s1x, s1y, jet1Angle, JET_LEN, e, 0.72);

      // Depth-sorted stars
      const s1Front = sinOrb > 0;
      if (!s1Front) drawStar(ctx, s1x, s1y, s1r, [225, 242, 255], 0.90);
      drawStar(ctx,  s2x, s2y, s2r, [140, 205, 255], 0.85);
      if (s1Front)  drawStar(ctx, s1x, s1y, s1r, [225, 242, 255], 0.90);

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
