// Shared canvas drawing utilities for the neutron star animation system

export type RGB = [number, number, number];

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// ── Matter jet streams ────────────────────────────────────────────────────────
/**
 * Draws an animated bipolar jet with a soft particle-like glow (no hard edges)
 * and a wiggly bright core that travels like ejected matter.
 *
 * `time` (ms) drives the wave travel speed.
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
  const WAVE_LEN  = 85;
  const MAX_AMP   = jetLen * 0.085;
  const WAVE_VEL  = 250; // px/s apparent travel
  const phaseOff  = (time / 1000) * WAVE_VEL;

  // Wiggly y-offset at distance bx from star (two harmonics for organic feel)
  const wy = (bx: number): number => {
    const env      = Math.pow(bx / jetLen, 1.8) * MAX_AMP;
    const primary  = Math.sin((bx + phaseOff) / WAVE_LEN * Math.PI * 2);
    const second   = Math.sin((bx + phaseOff) / (WAVE_LEN * 0.48) * Math.PI * 2) * 0.28;
    return (primary + second) * env;
  };

  const SEGS  = 60;
  const BANDS = 12;

  for (const dir of [0, Math.PI]) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle + dir);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Pre-build path points once per direction
    const pts: [number, number][] = [];
    for (let s = 0; s <= SEGS; s++) {
      pts.push([(s / SEGS) * jetLen, wy((s / SEGS) * jetLen)]);
    }

    // Helper: stroke the full path with given style
    const strokePath = (lw: number, color: string) => {
      ctx.beginPath();
      pts.forEach(([bx, by], i) =>
        i === 0 ? ctx.moveTo(bx, by) : ctx.lineTo(bx, by)
      );
      ctx.strokeStyle = color;
      ctx.lineWidth   = lw;
      ctx.stroke();
    };

    // ── Soft diffuse glow (no hard cone edges — multiple wide soft passes) ──
    strokePath(28, `rgba(60,130,220,${0.018 * alpha})`);
    strokePath(18, `rgba(90,165,240,${0.040 * alpha})`);
    strokePath(10, `rgba(120,195,255,${0.070 * alpha})`);
    strokePath(5,  `rgba(160,220,255,${0.110 * alpha})`);

    // ── Wiggly bright core (fades with distance — 12 opacity bands) ──────────
    for (let b = 0; b < BANDS; b++) {
      const t0 = b       / BANDS;
      const t1 = (b + 1) / BANDS;
      const tm = (t0 + t1) * 0.5;

      const si = Math.floor(t0 * SEGS);
      const ei = Math.floor(t1 * SEGS);

      ctx.beginPath();
      for (let s = si; s <= ei; s++) {
        const [bx, by] = pts[s];
        if (s === si) ctx.moveTo(bx, by); else ctx.lineTo(bx, by);
      }
      ctx.strokeStyle = `rgba(255,255,255,${(1 - tm) * alpha * 0.92})`;
      ctx.lineWidth   = 2.1 - tm * 0.85;
      ctx.stroke();
    }

    ctx.restore();
  }
}

// ── Star body ─────────────────────────────────────────────────────────────────
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
  halo.addColorStop(0,    `rgba(${cr},${cg},${cb},${0.14 * alpha})`);
  halo.addColorStop(0.28, `rgba(${cr},${cg},${cb},${0.05 * alpha})`);
  halo.addColorStop(1,    `rgba(${cr},${cg},${cb},0)`);
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(x, y, r * 22, 0, Math.PI * 2);
  ctx.fill();

  const corona = ctx.createRadialGradient(x, y, 0, x, y, r * 7);
  corona.addColorStop(0,    `rgba(${cr},${cg},${cb},${0.62 * alpha})`);
  corona.addColorStop(0.45, `rgba(${cr},${cg},${cb},${0.22 * alpha})`);
  corona.addColorStop(1,    `rgba(${cr},${cg},${cb},0)`);
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

// ── Magnetic field line rings ─────────────────────────────────────────────────
/**
 * Draws concentric rings as ellipses, simulating a tilted orbital disk.
 * `yScale` = 1.0 → circles (top-down); 0.28 → ~30° elevation disk view.
 */
export function drawFieldLines(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  maxR: number,
  alpha = 1,
  yScale = 0.28,
): void {
  const N = 26;
  for (let i = 1; i <= N; i++) {
    const t = i / N;
    const r = maxR * t;
    const a = (0.068 - t * 0.054) * alpha;
    if (a < 0.003) continue;
    ctx.beginPath();
    ctx.ellipse(cx, cy, r, r * yScale, 0, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(110,190,255,${a})`;
    ctx.lineWidth   = 0.9;
    ctx.stroke();
  }
}
