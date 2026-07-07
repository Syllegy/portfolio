import * as THREE from "three";
import { mulberry32 } from "./prng";

interface AsteroidTexture {
  map: THREE.Texture;
  bumpMap: THREE.Texture;
}

const cache = new Map<number, AsteroidTexture>();

/**
 * A procedural rocky surface (color + matching bump map) — mottled patches
 * of lighter/darker stone, dark crater pits with a faint highlighted rim,
 * and fine speckle grain. Both maps are built from the same crater/patch
 * layout so the shading in the bump map lines up with what's painted in the
 * color map. Cached per variant since many asteroids can share a look.
 */
export function getAsteroidTexture(variant: number): AsteroidTexture {
  const cached = cache.get(variant);
  if (cached) return cached;

  const size = 256;
  const rand = mulberry32(variant * 7919 + 3);

  const patches = Array.from({ length: 40 }, () => ({
    x: rand() * size,
    y: rand() * size,
    r: 10 + rand() * 30,
    shade: 110 + Math.floor(rand() * 60),
    a: 0.15 + rand() * 0.2,
  }));
  const craters = Array.from({ length: 55 }, () => ({
    x: rand() * size,
    y: rand() * size,
    r: 3 + rand() * 14,
  }));
  const speckle = Array.from({ length: 2200 }, () => ({
    x: rand() * size,
    y: rand() * size,
    shade: Math.floor(rand() * 60) - 30,
  }));

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#8f867a";
  ctx.fillRect(0, 0, size, size);
  for (const p of patches) {
    ctx.fillStyle = `rgba(${p.shade},${p.shade - 8},${p.shade - 18},${p.a})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
  for (const c of craters) {
    const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
    grad.addColorStop(0, "rgba(20,17,14,0.85)");
    grad.addColorStop(0.7, "rgba(40,35,30,0.5)");
    grad.addColorStop(1, "rgba(150,140,125,0.25)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fill();
  }
  for (const s of speckle) {
    ctx.fillStyle =
      s.shade > 0 ? `rgba(255,255,255,${s.shade / 200})` : `rgba(0,0,0,${-s.shade / 200})`;
    ctx.fillRect(s.x, s.y, 1, 1);
  }

  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bctx = bumpCanvas.getContext("2d")!;
  bctx.fillStyle = "#808080";
  bctx.fillRect(0, 0, size, size);
  for (const c of craters) {
    const grad = bctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
    grad.addColorStop(0, "rgba(0,0,0,0.9)");
    grad.addColorStop(0.75, "rgba(0,0,0,0.4)");
    grad.addColorStop(0.85, "rgba(255,255,255,0.35)");
    grad.addColorStop(1, "rgba(128,128,128,0)");
    bctx.fillStyle = grad;
    bctx.beginPath();
    bctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    bctx.fill();
  }
  for (const s of speckle) {
    const a = Math.abs(s.shade) / 150;
    bctx.fillStyle = s.shade > 0 ? `rgba(255,255,255,${a})` : `rgba(0,0,0,${a})`;
    bctx.fillRect(s.x, s.y, 1, 1);
  }

  const map = new THREE.CanvasTexture(canvas);
  map.needsUpdate = true;
  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.needsUpdate = true;

  const result: AsteroidTexture = { map, bumpMap };
  cache.set(variant, result);
  return result;
}
