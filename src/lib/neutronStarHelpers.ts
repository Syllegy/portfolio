// Shared canvas drawing utilities for the neutron star animation system

export type RGB = [number, number, number];

// ── Easing ────────────────────────────────────────────────────────────────────
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// ── Jet streams ───────────────────────────────────────────────────────────────
/**
 * Draws animated bipolar matter jets that wiggle as they travel outward.
 * The wiggle is a traveling sine wave — looks like ejected matter spiraling out.
 *
 * Context must NOT have an active outer transform.
 * `time` = elapsed ms, drives the wave travel animation.
 */
export function drawJets(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  jetLen: number,
  time: number,
  alpha = 1,
): void {
  const WAVE_LEN   = 88;            // spatial wavelength (px)
  const WAVE_LEN2  = 44;            // second harmonic
  const MAX_AMP    = jetLen * 0.08; // max perpendicular oscillation
  const WAVE_VEL   = 240;           // apparent wave travel speed (px/s)
  const phaseOff   = (time / 1000) * WAVE_VEL;

  // Wiggly y-position at distance bx from star (in rotated local coordinates)
  const wy = (bx: number): number => {
    const envAmp = Math.pow(bx / jetLen, 1.8) * MAX_AMP;
    const primary   = Math.sin((bx + phaseOff) / WAVE_LEN  * Math.PI * 2);
    const secondary = Math.sin((bx + phaseOff) / WAVE_LEN2 * Math.PI * 2) * 0.28;
    return (primary + secondary) * envAmp;
  };

  const SEGS  = 60; // path subdivisions per band
  const BANDS = 12; // opacity bands (fewer stroke() calls than one per seg)

  for (const dir of [0, Math.PI]) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle + dir);

    // Soft glow cone (background fill behind the wiggly line)
    const coneW = jetLen * 0.17;
    const cg = ctx.createLinearGradient(0, 0, jetLen, 0);
    cg.addColorStop(0,    `rgba(160,225,255,${0.40 * alpha})`);
    cg.addColorStop(0.22, `rgba(90,175,255,${0.16 * alpha})`);
    cg.addColorStop(1,    `rgba(60,135,255,0)`);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(jetLen, coneW);
    ctx.lineTo(jetLen, -coneW);
    ctx.closePath();
    ctx.fillStyle = cg;
    ctx.fill();

    // Wiggly core beam — batched into opacity bands for performance
    for (let b = 0; b < BANDS; b++) {
      const t0  = b       / BANDS;
      const t1  = (b + 1) / BANDS;
      const tm  = (t0 + t1) * 0.5;
      const op  = (1 - tm) * alpha * 0.94;
      const lw  = 2.1 - tm * 0.8;

      const si = Math.floor(t0 * SEGS);
      const ei = Math.floor(t1 * SEGS);

      ctx.beginPath();
      for (let s = si; s <= ei; s++) {
        const bx = (s / SEGS) * jetLen;
        const by = wy(bx);
        if (s === si) ctx.moveTo(bx, by);
        else          ctx.lineTo(bx, by);
      }
      ctx.strokeStyle = `rgba(255,255,255,${op})`;
      ctx.lineWidth   = lw;
      ctx.stroke();
    }

    ctx.restore();
  }
}

// ── Star body ─────────────────────────────────────────────────────────────────
/**
 * Draws a glowing neutron star: wide atmospheric halo → inner corona → white core.
 */
export function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  color: RGB,
  alpha = 1,
): void {
  const [cr, cg, cb] = color;

  const halo = ctx.createRadialGradient(x, y, 0, x, y, r * 22);
  halo.addColorStop(0,   `rgba(${cr},${cg},${cb},${0.14 * alpha})`);
  halo.addColorStop(0.3, `rgba(${cr},${cg},${cb},${0.05 * alpha})`);
  halo.addColorStop(1,   `rgba(${cr},${cg},${cb},0)`);
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(x, y, r * 22, 0, Math.PI * 2);
  ctx.fill();

  const corona = ctx.createRadialGradient(x, y, 0, x, y, r * 7);
  corona.addColorStop(0,   `rgba(${cr},${cg},${cb},${0.62 * alpha})`);
  corona.addColorStop(0.45,`rgba(${cr},${cg},${cb},${0.22 * alpha})`);
  corona.addColorStop(1,   `rgba(${cr},${cg},${cb},0)`);
  ctx.fillStyle = corona;
  ctx.beginPath();
  ctx.arc(x, y, r * 7, 0, Math.PI * 2);
  ctx.fill();

  const core = ctx.createRadialGradient(x, y, 0, x, y, r);
  core.addColorStop(0,   "rgba(255,255,255,1)");
  core.addColorStop(0.6, `rgba(${cr},${cg},${cb},0.88)`);
  core.addColorStop(1,   `rgba(${cr},${cg},${cb},0)`);
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

// ── Field lines ───────────────────────────────────────────────────────────────
/**
 * Draws concentric magnetic field line rings as ellipses,
 * giving the impression of a tilted orbital disk viewed from an angle.
 *
 * `yScale` controls disk tilt: 1.0 = circles (top-down), 0.35 ≈ 30° elevation view.
 */
export function drawFieldLines(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  maxR: number,
  alpha = 1,
  yScale = 0.38,
): void {
  const N = 28;
  for (let i = 1; i <= N; i++) {
    const t = i / N;
    const r = maxR * t;
    const a = (0.072 - t * 0.056) * alpha;
    if (a < 0.003) continue;
    ctx.beginPath();
    ctx.ellipse(cx, cy, r, r * yScale, 0, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(120,200,255,${a})`;
    ctx.lineWidth   = 0.9;
    ctx.stroke();
  }
}
