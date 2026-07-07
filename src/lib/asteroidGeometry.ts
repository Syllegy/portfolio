import * as THREE from "three";
import { mulberry32 } from "./prng";

interface RadialFeature {
  dir: THREE.Vector3;
  radius: number;
  strength: number;
}

/** A uniformly distributed random point on the unit sphere. */
function randomDirection(rand: () => number): THREE.Vector3 {
  const u = rand() * 2 - 1;
  const theta = rand() * Math.PI * 2;
  const r = Math.sqrt(1 - u * u);
  return new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), u);
}

/** Cubic smoothstep falloff: 1 at the centre, 0 at (and past) the radius — gives rounded, organic bumps instead of hard-edged spikes. */
function falloff(distance: number, radius: number): number {
  if (distance >= radius) return 0;
  const x = 1 - distance / radius;
  return x * x * (3 - 2 * x);
}

/**
 * A rock built from layered large-scale bumps plus crater depressions (each
 * with a faint raised rim) on a fairly high-subdivision sphere, topped with
 * a small amount of fine per-vertex jitter for surface grain. This reads as
 * an irregular, cratered rock rather than a low-poly faceted blob because
 * the displacement is spatially coherent (smooth radial-basis bumps) instead
 * of independent random noise per vertex, and the base mesh has enough
 * triangles to actually resolve those smooth curves.
 */
export function createAsteroidGeometry(seed: number, baseRadius: number): THREE.BufferGeometry {
  const geo = new THREE.IcosahedronGeometry(baseRadius, 3);
  const rand = mulberry32(seed);

  const bumps: RadialFeature[] = Array.from({ length: 5 + Math.floor(rand() * 3) }, () => ({
    dir: randomDirection(rand),
    radius: 0.55 + rand() * 0.55,
    strength: (rand() - 0.3) * 0.3,
  }));

  const craters: RadialFeature[] = Array.from({ length: 4 + Math.floor(rand() * 5) }, () => ({
    dir: randomDirection(rand),
    radius: 0.16 + rand() * 0.3,
    strength: 0.12 + rand() * 0.22,
  }));

  const pos = geo.attributes.position;
  const vertex = new THREE.Vector3();
  const normal = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    vertex.fromBufferAttribute(pos, i);
    normal.copy(vertex).normalize();

    let height = 1;
    for (const b of bumps) {
      height += b.strength * falloff(normal.distanceTo(b.dir), b.radius);
    }
    for (const c of craters) {
      const d = normal.distanceTo(c.dir);
      height -= c.strength * falloff(d, c.radius);
      // Faint raised rim just outside the crater's rim edge.
      height += c.strength * 0.35 * falloff(Math.abs(d - c.radius * 0.85), c.radius * 0.25);
    }
    height += (rand() - 0.5) * 0.03; // fine surface grain

    vertex.multiplyScalar(Math.max(height, 0.4));
    pos.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  geo.computeVertexNormals();
  return geo;
}
