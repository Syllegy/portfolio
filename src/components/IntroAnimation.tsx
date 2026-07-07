"use client";

import { useEffect, useRef, useState } from "react";
import {
  drawJets,
  drawStar,
  drawFieldLines,
  easeInOutCubic,
} from "@/lib/neutronStarHelpers";

const BG = "rgb(6, 8, 22)";

// ── Timing ────────────────────────────────────────────────────────────────────
const T_HOLD = 350;    // hold at max zoom so the close-up registers
const T_ZOOM = 3100;   // zoom-out from close-up to 1x
const T_FADE = 950;    // CSS opacity fade, revealing the site

// ── Orbital / physics constants ───────────────────────────────────────────────
const SEP   = 70;       // logical px separation between stars
const M1    = 1.45;     // heavier star (white)
const M2    = 1.15;     // lighter star (cyan)
const r1    = SEP * M2 / (M1 + M2); // ~31 px, heavier → closer to CoM
const r2    = SEP * M1 / (M1 + M2); // ~39 px

const PERIOD   = 4800;   // orbital period ms
const SPIN1    = 2300;   // star 1 spin period ms
const SPIN2    = 3400;   // star 2 spin period ms (different for visual variety)
const JET_LEN  = 380;    // logical px – at 3.5x zoom these go well off-screen

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

      // Hand off to CSS once we enter the fade phase
      if (e > T_HOLD + T_ZOOM && !fading) {
        fading = true;
        canvas.style.transition = `opacity ${T_FADE}ms ease-in-out`;
        canvas.style.opacity    = "0";
        cancelAnimationFrame(rafId);
        setTimeout(() => {
          sessionStorage.setItem("intro-done", "1");
          setVisible(false);
        }, T_FADE + 80);
        return;
      }

      // Zoom factor: 3.5 → 1 using cubic ease-in-out
      const zoomT    = Math.min(Math.max(e - T_HOLD, 0) / T_ZOOM, 1);
      const zoom     = 3.5 - easeInOutCubic(zoomT) * 2.5; // 3.5 → 1.0

      // Orbital + spin angles
      const orb   = (e / PERIOD) * Math.PI * 2;
      const spin1 = (e / SPIN1)  * Math.PI * 2;
      const spin2 = (e / SPIN2)  * Math.PI * 2 + 1.1; // offset so beams start at different angles

      // Star positions (no y-perspective in intro – full circular orbit for dramatic look)
      const s1x = cx + Math.cos(orb) * r1;
      const s1y = cy + Math.sin(orb) * r1;
      const s2x = cx - Math.cos(orb) * r2;
      const s2y = cy - Math.sin(orb) * r2;

      // ── Draw ────────────────────────────────────────────────────────────
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      // Background nebula — subtle blue cloud centred on the system
      const neb = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.55);
      neb.addColorStop(0,   "rgba(18,45,120,0.28)");
      neb.addColorStop(0.5, "rgba(8,22,70,0.14)");
      neb.addColorStop(1,   "transparent");
      ctx.fillStyle = neb;
      ctx.fillRect(0, 0, W, H);

      // Apply zoom transform, anchored to canvas centre
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(zoom, zoom);
      ctx.translate(-cx, -cy);

      // Field lines centred on the orbital centre of mass
      drawFieldLines(ctx, cx, cy, 480);

      // Jets rendered behind stars so glows layer correctly
      drawJets(ctx, s2x, s2y, spin2, JET_LEN);
      drawJets(ctx, s1x, s1y, spin1, JET_LEN);

      // Stars (depth-sort: star behind gets drawn first)
      const s1Front = Math.sin(orb) > 0;
      if (!s1Front) drawStar(ctx, s1x, s1y, 6, [225, 242, 255]);
      drawStar(ctx,  s2x, s2y, 5, [140, 205, 255]);
      if (s1Front)  drawStar(ctx, s1x, s1y, 6, [225, 242, 255]);

      ctx.restore();

      rafId = requestAnimationFrame(draw);
    };

    // Solid fill before first frame to prevent flash
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
