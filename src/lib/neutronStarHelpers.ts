export type RGB = [number, number, number];

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// ── Matter jet streams — dense particle field, soft glow, no hard outlines ────
export function drawJets(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  jetLen: number,
  time: number,
  alpha = 1,
): void {
  const WAVE_LEN  = 82;
  const MAX_AMP   = jetLen * 0.09;
  const WAVE_VEL  = 235;
  const phaseOff  = (time / 1000) * WAVE_VEL;

  // Wave path y-offset (two harmonics for organic motion)
  const wy = (bx: number): number => {
    const env = Math.pow(bx / jetLen, 1.8) * MAX_AMP;
    return (
      Math.sin((bx + phaseOff) / WAVE_LEN * Math.PI * 2) +
      Math.sin((bx + phaseOff) / (WAVE_LEN * 0.49) * Math.PI * 2) * 0.30
    ) * env;
  };

  const SEGS       = 50;
  const NUM_P      = 160;    // particles per direction
  const NUM_ZONES  = 9;      // opacity buckets (batches fill calls)
  const PART_SPEED = 185;    // px/s apparent outward travel

  for (const dir of [0, Math.PI]) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle + dir);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Helper: stroke the wave path with given width/color
    const strokeWave = (lw: number, col: string) => {
      ctx.beginPath();
      for (let s = 0; s <= SEGS; s++) {
        const bx = (s / SEGS) * jetLen;
        if (s === 0) ctx.moveTo(bx, wy(bx)); else ctx.lineTo(bx, wy(bx));
      }
      ctx.strokeStyle = col;
      ctx.lineWidth   = lw;
      ctx.stroke();
    };

    // ── Soft atmospheric glow (NO solid cone, NO hard edges) ──────────────
    strokeWave(30, `rgba(50,115,210,${0.016 * alpha})`);
    strokeWave(18, `rgba(80,155,235,${0.038 * alpha})`);
    strokeWave(9,  `rgba(120,195,255,${0.072 * alpha})`);
    strokeWave(4,  `rgba(165,220,255,${0.110 * alpha})`);

    // ── Dense particle stream ──────────────────────────────────────────────
    // Bucket particles by distance zone so we need only NUM_ZONES fill() calls
    const zones: [number, number, number][][] =
      Array.from({ length: NUM_ZONES }, () => []);

    for (let p = 0; p < NUM_P; p++) {
      const phase = p / NUM_P;
      // Deterministic per-particle pseudo-random values (no flicker)
      const rA = Math.abs(Math.sin(phase * 127.31));
      const rB = Math.abs(Math.sin(phase * 73.1 + 1.7));

      // Particle travels outward and wraps back to origin
      const dist = (phase * jetLen + (time / 1000) * PART_SPEED) % jetLen;
      const t_n  = dist / jetLen;

      // Position: wave axis + perpendicular spread that grows with distance
      const bx = dist;
      const by = wy(dist) + (rB * 2 - 1) * dist * 0.09;

      // Size: large/bright near star, tiny near tip
      const sz = Math.max(0.35, (2.0 - t_n * 1.45) * (0.35 + rA * 0.95));

      zones[Math.min(NUM_ZONES - 1, Math.floor(t_n * NUM_ZONES))].push([bx, by, sz]);
    }

    // Render each zone as a single batched fill call
    for (let z = 0; z < NUM_ZONES; z++) {
      if (zones[z].length === 0) continue;
      const t_z = (z + 0.5) / NUM_ZONES;
      const wh  = 1 - t_z * 0.22;           // warm white → cool blue-white
      const pa  = (1 - t_z) * alpha * 0.75;

      ctx.beginPath();
      for (const [bx, by, sz] of zones[z]) {
        ctx.moveTo(bx + sz, by);             // moveTo needed to start new subpath
        ctx.arc(bx, by, sz, 0, Math.PI * 2);
      }
      ctx.fillStyle = `rgba(${Math.round(255 * wh)},${Math.round(242 * wh)},255,${pa})`;
      ctx.fill();
    }

    ctx.restore();
  }
}

// ── Neutron star body ─────────────────────────────────────────────────────────
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
  const halo = ctx.createRadialGradient(x, y, 0, x, y, r * 18);
  halo.addColorStop(0,    `rgba(${cr},${cg},${cb},${0.18 * alpha})`);
  halo.addColorStop(0.25, `rgba(${cr},${cg},${cb},${0.07 * alpha})`);
  halo.addColorStop(1,    `rgba(${cr},${cg},${cb},0)`);
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(x, y, r * 18, 0, Math.PI * 2);
  ctx.fill();

  // Bright inner corona
  const corona = ctx.createRadialGradient(x, y, 0, x, y, r * 6);
  corona.addColorStop(0,    `rgba(${cr},${cg},${cb},${0.70 * alpha})`);
  corona.addColorStop(0.4,  `rgba(${cr},${cg},${cb},${0.28 * alpha})`);
  corona.addColorStop(1,    `rgba(${cr},${cg},${cb},0)`);
  ctx.fillStyle = corona;
  ctx.beginPath();
  ctx.arc(x, y, r * 6, 0, Math.PI * 2);
  ctx.fill();

  // Hot white core
  const core = ctx.createRadialGradient(x, y, 0, x, y, r);
  core.addColorStop(0,   "rgba(255,255,255,1)");
  core.addColorStop(0.5, `rgba(${cr},${cg},${cb},0.90)`);
  core.addColorStop(1,   `rgba(${cr},${cg},${cb},0)`);
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

// ── Magnetic field line rings (ellipses = tilted disk) ────────────────────────
export function drawFieldLines(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  maxR: number,
  alpha = 1,
  yScale = 0.28,
): void {
  const N = 16;
  for (let i = 1; i <= N; i++) {
    const t = i / N;
    const r = maxR * t;
    const a = (0.065 - t * 0.052) * alpha;
    if (a < 0.003) continue;
    ctx.beginPath();
    ctx.ellipse(cx, cy, r, r * yScale, 0, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(110,185,255,${a})`;
    ctx.lineWidth   = 0.9;
    ctx.stroke();
  }
}
