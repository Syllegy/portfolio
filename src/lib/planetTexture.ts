import * as THREE from "three";

export type PlanetSurface = "rocky" | "earth" | "gasgiant" | "ice" | "moon";

interface SurfaceConfig {
  base: string;
  accent: string;
  accent2?: string;
}

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function blotch(
  ctx: CanvasRenderingContext2D,
  rand: () => number,
  w: number,
  h: number,
  color: string,
  count: number,
  minR: number,
  maxR: number,
  alpha: number,
) {
  for (let i = 0; i < count; i++) {
    const x = rand() * w;
    const y = rand() * h;
    const r = minR + rand() * (maxR - minR);
    const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
    grd.addColorStop(0, color);
    grd.addColorStop(1, "transparent");
    ctx.globalAlpha = alpha * (0.6 + rand() * 0.4);
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    // wrap around the seam so the texture tiles horizontally
    ctx.beginPath();
    ctx.arc(x - w, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + w, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

/** Deterministic per-planet-kind procedural surface texture, generated once on a small equirectangular canvas and wrapped onto the sphere's UVs. Gives each planet a distinguishable look without needing external image assets. */
export function generatePlanetTexture(surface: PlanetSurface, cfg: SurfaceConfig, seed = 1): THREE.Texture {
  const W = 256;
  const H = 128;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  const rand = mulberry32(seed * 9973 + 17);

  ctx.fillStyle = cfg.base;
  ctx.fillRect(0, 0, W, H);

  switch (surface) {
    case "rocky": {
      blotch(ctx, rand, W, H, cfg.accent, 26, 4, 14, 0.5);
      blotch(ctx, rand, W, H, "#00000055", 18, 2, 7, 0.4);
      break;
    }
    case "earth": {
      blotch(ctx, rand, W, H, cfg.accent, 16, 10, 26, 0.85);
      blotch(ctx, rand, W, H, cfg.accent2 ?? cfg.accent, 10, 6, 16, 0.6);
      blotch(ctx, rand, W, H, "rgba(255,255,255,0.55)", 14, 8, 20, 0.35);
      break;
    }
    case "gasgiant": {
      const bands = 9;
      for (let i = 0; i < bands; i++) {
        const y0 = (i / bands) * H;
        const bandH = H / bands;
        ctx.fillStyle = i % 2 === 0 ? cfg.accent : cfg.base;
        ctx.globalAlpha = 0.35 + rand() * 0.25;
        ctx.beginPath();
        for (let x = 0; x <= W; x += 8) {
          const wob = Math.sin(x * 0.05 + i * 1.7) * bandH * 0.18;
          ctx.rect(x, y0 + wob, 8, bandH);
        }
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      blotch(ctx, rand, W, H, cfg.accent2 ?? cfg.accent, 4, 6, 12, 0.4);
      break;
    }
    case "ice": {
      blotch(ctx, rand, W, H, cfg.accent, 20, 8, 22, 0.4);
      for (let i = 0; i < 10; i++) {
        const y = rand() * H;
        ctx.strokeStyle = "rgba(255,255,255,0.25)";
        ctx.lineWidth = 1 + rand() * 2;
        ctx.beginPath();
        ctx.moveTo(0, y);
        for (let x = 0; x <= W; x += 16) {
          ctx.lineTo(x, y + Math.sin(x * 0.06 + i) * 6);
        }
        ctx.stroke();
      }
      break;
    }
    case "moon": {
      blotch(ctx, rand, W, H, "#00000066", 30, 3, 10, 0.55);
      blotch(ctx, rand, W, H, "#ffffff22", 14, 2, 6, 0.4);
      break;
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.needsUpdate = true;
  return tex;
}
