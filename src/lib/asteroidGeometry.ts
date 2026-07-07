import * as THREE from "three";
import { mulberry32 } from "./prng";

/**
 * A lumpy, irregular rock built by randomly displacing an icosahedron's
 * vertices outward/inward along their own direction from centre. The
 * geometry is indexed (shared vertices across faces), so displacing each
 * unique vertex once keeps every face seamless — no cracks. Same seed always
 * produces the same shape.
 */
export function createAsteroidGeometry(seed: number, baseRadius: number): THREE.BufferGeometry {
  const geo = new THREE.IcosahedronGeometry(baseRadius, 1);
  const rand = mulberry32(seed);
  const pos = geo.attributes.position;
  const vertex = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    vertex.fromBufferAttribute(pos, i);
    const noise = 0.7 + rand() * 0.55; // 0.7–1.25x — irregular, non-spherical bumps
    vertex.multiplyScalar(noise);
    pos.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  geo.computeVertexNormals();
  return geo;
}
