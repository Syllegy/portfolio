// Shared canvas drawing utilities for the neutron star animation system

export type RGB = [number, number, number];

/**
 * Draws bipolar matter jets from a neutron star.
 * Context must NOT have an active transform – the function handles its own save/restore.
 */
export function drawJets(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  jetLen: number,
  alpha = 1,
): void {
  // Bipolar jets – one each direction along the spin axis
  for (const offset of [0, Math.PI]) {
    const a = angle + offset;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(a);

    // Soft cone glow (triangle shape, fills with gradient along x-axis)
    const coneW = jetLen * 0.13;
    const cg = ctx.createLinearGradient(0, 0, jetLen, 0);
    cg.addColorStop(0,   `rgba(160,225,255,${0.40 * alpha})`);
    cg.addColorStop(0.25,`rgba(90,170,255,${0.18 * alpha})`);
    cg.addColorStop(1,   `rgba(60,135,255,0)`);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(jetLen,  coneW);
    ctx.lineTo(jetLen, -coneW);
    ctx.closePath();
    ctx.fillStyle = cg;
    ctx.fill();

    // Bright core beam line
    const bg = ctx.createLinearGradient(0, 0, jetLen, 0);
    bg.addColorStop(0,    `rgba(255,255,255,${0.97 * alpha})`);
    bg.addColorStop(0.10, `rgba(220,242,255,${0.85 * alpha})`);
    bg.addColorStop(0.40, `rgba(145,215,255,${0.45 * alpha})`);
    bg.addColorStop(1,    `rgba(80,160,255,0)`);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(jetLen, 0);
    ctx.strokeStyle = bg;
    ctx.lineWidth = 1.8;
    ctx.stroke();

    ctx.restore();
  }
}

/**
 * Draws a glowing neutron star with multi-layer halo, glow, and bright core.
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

  // Wide atmospheric halo
  const halo = ctx.createRadialGradient(x, y, 0, x, y, r * 22);
  halo.addColorStop(0,   `rgba(${cr},${cg},${cb},${0.14 * alpha})`);
  halo.addColorStop(0.3, `rgba(${cr},${cg},${cb},${0.05 * alpha})`);
  halo.addColorStop(1,   `rgba(${cr},${cg},${cb},0)`);
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(x, y, r * 22, 0, Math.PI * 2);
  ctx.fill();

  // Inner glow corona
  const corona = ctx.createRadialGradient(x, y, 0, x, y, r * 7);
  corona.addColorStop(0,   `rgba(${cr},${cg},${cb},${0.60 * alpha})`);
  corona.addColorStop(0.45,`rgba(${cr},${cg},${cb},${0.22 * alpha})`);
  corona.addColorStop(1,   `rgba(${cr},${cg},${cb},0)`);
  ctx.fillStyle = corona;
  ctx.beginPath();
  ctx.arc(x, y, r * 7, 0, Math.PI * 2);
  ctx.fill();

  // Bright white core
  const core = ctx.createRadialGradient(x, y, 0, x, y, r);
  core.addColorStop(0,   "rgba(255,255,255,1)");
  core.addColorStop(0.6, `rgba(${cr},${cg},${cb},0.85)`);
  core.addColorStop(1,   `rgba(${cr},${cg},${cb},0)`);
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * Draws concentric magnetic field line rings centered on the binary system.
 */
export function drawFieldLines(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  maxR: number,
  alpha = 1,
): void {
  const N = 28;
  for (let i = 1; i <= N; i++) {
    const t = i / N;
    const r = maxR * t;
    // Inner rings slightly more visible; outer rings fade out
    const a = (0.072 - t * 0.055) * alpha;
    if (a < 0.003) continue;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(120,200,255,${a})`;
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
