"use client";

import { useEffect, useRef, useState } from "react";
import {
  drawJets,
  drawStar,
  drawFieldLines,
  easeOutCubic,
} from "@/lib/neutronStarHelpers";

const BG = "rgb(6, 8, 22)";

// ── Timing ────────────────────────────────────────────────────────────────────
const T_HOLD = 200;   // hold at close-up before pulling back
const T_ZOOM = 3500;  // zoom 3.5x → 1x  (easeOutCubic: fast start, slow settle)
const T_FADE = 1100;  // CSS opacity fade that OVERLAPS with the tail of T_ZOOM

// Fade starts at this fraction of zoom progress (zoom is ~1.02x here, nearly 1x)
const FADE_AT = 0.80;

// ── Orbital / physics constants ───────────────────────────────────────────────
const SEP   = 72;
const M1    = 1.45;
const M2    = 1.15;
const r1    = SEP * M2 / (M1 + M2); // ~32 px (heavier star, closer to CoM)
const r2    = SEP * M1 / (M1 + M2); // ~40 px

const PERIOD  = 4800;  // orbital period ms
const SPIN1   = 2300;  // star 1 pulsar spin ms
const SPIN2   = 3400;  // star 2 pulsar spin ms
const JET_LEN = 380;   // logical px — 3.5× zoom makes these span the whole screen

// 3D disk tilt: y-axis compression factor for orbits/rings
const TILT = 0.38;

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

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const W  = canvas.width;
    const H  = canvas.height;
    const cx = W / 2;
    const cy = H / 2;

    const start = performance.now();
    let rafId   = 0;
    let fading  = false;

    const draw = (now: number) => {
      const e = now - start;

      // Zoom progress (clamped to [0,1])
      const zoomT = Math.min(Math.max(e - T_HOLD, 0) / T_ZOOM, 1);
      const zoom  = 3.5 - easeOutCubic(zoomT) * 2.5; // 3.5 → 1.0

      // Kick off CSS fade once zoom is nearly complete, but keep RAF running
      // so the stars continue orbiting smoothly during the fade-out.
      if (!fading && zoomT >= FADE_AT) {
        fading = true;
        canvas.style.transition = `opacity ${T_FADE}ms ease-in-out`;
        canvas.style.opacity    = "0";
        setTimeout(() => {
          cancelAnimationFrame(rafId);
          sessionStorage.setItem("intro-done", "1");
          setVisible(false);
        }, T_FADE + 100);
      }

      // Angles
      const orb   = (e / PERIOD) * Math.PI * 2;
      const spin1 = (e / SPIN1)  * Math.PI * 2;
      const spin2 = (e / SPIN2)  * Math.PI * 2 + 1.1;

      // Star screen positions — y-compressed for 3D tilted-disk look
      const s1x = cx + Math.cos(orb) * r1;
      const s1y = cy + Math.sin(orb) * r1 * TILT;
      const s2x = cx - Math.cos(orb) * r2;
      const s2y = cy - Math.sin(orb) * r2 * TILT;

      // Depth-based size: stars at the "near" side appear slightly larger
      const sinOrb = Math.sin(orb);
      const s1r = 6   * (1 + sinOrb * 0.07);
      const s2r = 5   * (1 - sinOrb * 0.07);

      // ── Draw ──────────────────────────────────────────────────────────────
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      // Subtle nebula glow behind the system
      const neb = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.5);
      neb.addColorStop(0,   "rgba(18,45,120,0.30)");
      neb.addColorStop(0.5, "rgba(8,22,65,0.12)");
      neb.addColorStop(1,   "transparent");
      ctx.fillStyle = neb;
      ctx.fillRect(0, 0, W, H);

      // Apply zoom — anchored to canvas centre so zoom is from the middle
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(zoom, zoom);
      ctx.translate(-cx, -cy);

      // Field lines (ellipses = tilted disk)
      drawFieldLines(ctx, cx, cy, 480, 1, TILT);

      // Jets behind stars
      drawJets(ctx, s2x, s2y, spin2, JET_LEN, e);
      drawJets(ctx, s1x, s1y, spin1, JET_LEN, e);

      // Depth-sorted stars
      const s1Front = sinOrb > 0;
      if (!s1Front) drawStar(ctx, s1x, s1y, s1r, [225, 242, 255]);
      drawStar(ctx,  s2x, s2y, s2r, [140, 205, 255]);
      if (s1Front)  drawStar(ctx, s1x, s1y, s1r, [225, 242, 255]);

      ctx.restore();

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
