import * as THREE from "three";

/** Evenly distributes `total` points across a sphere surface using the golden-angle (Fibonacci) spiral — no clustering at the poles like naive lat/long grids. */
export function fibonacciSpherePoint(index: number, total: number, radius: number): THREE.Vector3 {
  const offset = 2 / total;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const y = index * offset - 1 + offset / 2;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const phi = index * goldenAngle;
  const x = Math.cos(phi) * r;
  const z = Math.sin(phi) * r;
  return new THREE.Vector3(x, y, z).multiplyScalar(radius);
}
