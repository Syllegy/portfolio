import * as THREE from "three";

const cache = new Map<string, THREE.Texture>();

/**
 * A small tiled "circuit board" pattern tinted with the given accent color,
 * used as the back face of the skills carousel cards. Cached per color so
 * skills sharing a category (and therefore a color) reuse one texture
 * instance instead of regenerating an identical canvas per card.
 */
export function getCardBackTexture(color: string): THREE.Texture {
  const cached = cache.get(color);
  if (cached) return cached;

  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#0a0f1c";
  ctx.fillRect(0, 0, size, size);

  const step = size / 8;
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.3;
  ctx.lineWidth = 1;
  for (let i = 1; i < 8; i++) {
    ctx.beginPath();
    ctx.moveTo(i * step, 0);
    ctx.lineTo(i * step, size);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * step);
    ctx.lineTo(size, i * step);
    ctx.stroke();
  }

  ctx.globalAlpha = 0.85;
  ctx.fillStyle = color;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if ((x + y) % 3 === 0) {
        ctx.beginPath();
        ctx.arc(x * step + step / 2, y * step + step / 2, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  ctx.globalAlpha = 1;
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.strokeRect(4, 4, size - 8, size - 8);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  cache.set(color, tex);
  return tex;
}
