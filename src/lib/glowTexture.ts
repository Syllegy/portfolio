import * as THREE from "three";

let cached: THREE.Texture | null = null;

/**
 * A soft white radial-gradient texture used for star halos, coronas, and jet
 * particles. Tint it via a material's `color` property (multiplies against
 * this white base) rather than baking colour into the texture itself, so one
 * texture instance can be reused for every glow in the scene.
 */
export function getGlowTexture(): THREE.Texture {
  if (cached) return cached;

  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const grad = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2,
  );
  grad.addColorStop(0,    "rgba(255,255,255,1)");
  grad.addColorStop(0.25, "rgba(255,255,255,0.55)");
  grad.addColorStop(0.6,  "rgba(255,255,255,0.12)");
  grad.addColorStop(1,    "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  cached = tex;
  return tex;
}
