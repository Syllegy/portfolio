"use client";

import { useEffect, useRef, useState } from "react";
import {
  drawJets,
  drawStar,
  drawFieldLines,
  easeOutCubic,
  easeInOutCubic,
} from "@/lib/neutronStarHelpers";

const BG = "rgb(6, 8, 22)";

// ── Timing ────────────────────────────────────────────────────────────────────
const T_HOLD = 250;    // ms — brief close-up before pulling back
const T_ZOOM = 3600;   // ms — zoom 3.5× → 1× (easeOutCubic: fast then slow drift)
const T_FADE = 1200;   // ms — CSS fade; starts at FADE_AT fraction of zoom

const FADE_AT      = 0.82; // start fading when zoom is 82% complete (~1.08×)
const REVEAL_START = 0.22; // page starts appearing from edges at this zoom fraction

// ── Orbital parameters ────────────────────────────────────────────────────────
const SEP   = 72;
const M1    = 1.45;
const M2    = 1.15;
const r1    = SEP * M2 / (M1 + M2);
const r2    = SEP * M1 / (M1 + M2);

const PERIOD = 4800;  // ms — orbital period
const TILT   = 0.28;  // y-compression: disk viewed from ~16° elevation

// Jet axes — fixed near-vertical with slight opposing tilts (X-shape)
// Both stars' jets point mostly up/down; their slight offsets create a scissors cross.
const JET_TILT        = 0.26;        // rad offset from vertical (~15°)
const JET_PRECESS_MS  = 28000;       // very slow precession period
const JET_LEN         = 385;         // logical px

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

    // Final resting centre (matches NeutronStars homepage position)
    const cxStart = W * 0.50;
    const cxEnd   = W * 0.64;
    const cy      = H * 0.50;

    const maxRevealR = Math.sqrt(W * W + H * H) / 2 + 150;
    const minRevealR = 310;
    const EDGE_W     = 130;

    const start = performance.now();
    let rafId   = 0;
    let fading  = false;

    const draw = (now: number) => {
      const e     = now - start;
      const zoomT = Math.min(Math.max(e - T_HOLD, 0) / T_ZOOM, 1);
      const zoom  = 3.5 - easeOutCubic(zoomT) * 2.5; // 3.5 → 1.0

      // Kick off CSS fade — but keep RAF running so stars orbit through it
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

      // Slowly pan centre from screen-middle to homepage star position
      const cx = cxStart + (cxEnd - cxStart) * easeOutCubic(zoomT);

      // Orbital & jet angles
      const orb         = (e / PERIOD) * Math.PI * 2;
      const precess     = (e / JET_PRECESS_MS) * Math.PI * 2;
      const jet1Angle   = Math.PI / 2 + JET_TILT + precess * 0.06;
      const jet2Angle   = Math.PI / 2 - JET_TILT - precess * 0.05;

      // Star screen positions with perspective (tilted orbit = ellipse)
      const sinOrb = Math.sin(orb);
      const cosOrb = Math.cos(orb);
      const s1x = cx + cosOrb * r1;
      const s1y = cy + sinOrb * r1 * TILT;
      const s2x = cx - cosOrb * r2;
      const s2y = cy - sinOrb * r2 * TILT;

      // Depth: near-side stars appear ~7% larger
      const s1r = 10  * (1 + sinOrb * 0.07);
      const s2r = 8.5 * (1 - sinOrb * 0.07);

      // ── Fill background ──────────────────────────────────────────────────
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      // Blue nebula glow behind system
      const neb = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.48);
      neb.addColorStop(0,   "rgba(15,40,110,0.28)");
      neb.addColorStop(0.5, "rgba(6,18,60,0.10)");
      neb.addColorStop(1,   "transparent");
      ctx.fillStyle = neb;
      ctx.fillRect(0, 0, W, H);

      // ── Apply zoom centred on the (slowly panning) focal point ───────────
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(zoom, zoom);
      ctx.translate(-cx, -cy);

      drawFieldLines(ctx, cx, cy, 490, 1, TILT);

      // Jets (fixed near-vertical axes, slow precession)
      drawJets(ctx, s2x, s2y, jet2Angle, JET_LEN, e);
      drawJets(ctx, s1x, s1y, jet1Angle, JET_LEN, e);

      // Depth-sorted stars
      const s1Front = sinOrb > 0;
      if (!s1Front) drawStar(ctx, s1x, s1y, s1r, [225, 242, 255]);
      drawStar(ctx,  s2x, s2y, s2r, [140, 205, 255]);
      if (s1Front)  drawStar(ctx, s1x, s1y, s1r, [225, 242, 255]);

      ctx.restore();

      // ── Progressive reveal: erase canvas outside a shrinking circle ──────
      // Page becomes visible from the edges as the camera pulls back.
      const revealProgress = easeInOutCubic(
        Math.max(0, (zoomT - REVEAL_START) / (1 - REVEAL_START))
      );
      const revealR = minRevealR + (maxRevealR - minRevealR) * (1 - revealProgress);

      // Radial gradient: transparent inside revealR (keeps stars), opaque outside (erases bg)
      const grad = ctx.createRadialGradient(
        cx, cy, Math.max(0, revealR - EDGE_W),
        cx, cy, revealR + EDGE_W,
      );
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(1, "rgba(0,0,0,1)");
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();

      rafId = requestAnimationFrame(draw);
    };

    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);
    rafId = requestAnimationFrame(draw);

    // Fade the canvas IN from transparent so the intro doesn't appear abruptly
    canvas.style.opacity  = "0";
    canvas.style.transition = "opacity 0.9s ease-out";
    const fadeInTimer = setTimeout(() => { canvas.style.opacity = "1"; }, 40);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(fadeInTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    // No CSS background — transparent pixels from destination-out must show the page,
    // not the canvas element's own background. The dark fill comes from the draw loop.
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-[200] pointer-events-none"
      style={{ opacity: 0 }}
    />
  );
}
