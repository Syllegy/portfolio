"use client";

import { useMemo } from "react";
import * as THREE from "three";

interface FieldRingsProps {
  maxRadius: number;
  count?: number;
}

/** Faint concentric rings suggesting the binary's magnetic field / accretion disk. */
export function FieldRings({ maxRadius, count = 14 }: FieldRingsProps) {
  const rings = useMemo(() => {
    const segments = 96;
    return Array.from({ length: count }, (_, i) => {
      const t = (i + 1) / count;
      const radius = maxRadius * t;
      const opacity = Math.max(0, 0.16 - t * 0.13);

      const points: THREE.Vector3[] = [];
      for (let s = 0; s <= segments; s++) {
        const a = (s / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      return { geometry, opacity, key: i };
    });
  }, [maxRadius, count]);

  return (
    <group>
      {rings.map(({ geometry, opacity, key }) => (
        <lineLoop key={key} geometry={geometry}>
          <lineBasicMaterial color="#6eb9ff" transparent opacity={opacity} />
        </lineLoop>
      ))}
    </group>
  );
}
