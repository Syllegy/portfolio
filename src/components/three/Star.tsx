"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { getGlowTexture } from "@/lib/glowTexture";

interface StarProps {
  color: [number, number, number];
  radius: number;
}

/** A neutron star: hot white core + inner corona + wide atmospheric halo, all additive-blended sprites for a soft glow with no hard edges. */
export function Star({ color, radius }: StarProps) {
  const tex = getGlowTexture();
  const [r, g, b] = color;
  const colorStr = useMemo(() => new THREE.Color(r / 255, g / 255, b / 255), [r, g, b]);

  return (
    <group>
      {/* Wide atmospheric halo */}
      <sprite scale={[radius * 22, radius * 22, 1]}>
        <spriteMaterial
          map={tex}
          color={colorStr}
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>
      {/* Inner corona */}
      <sprite scale={[radius * 8, radius * 8, 1]}>
        <spriteMaterial
          map={tex}
          color={colorStr}
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>
      {/* Hot white core */}
      <sprite scale={[radius * 2.4, radius * 2.4, 1]}>
        <spriteMaterial
          map={tex}
          color="white"
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>
    </group>
  );
}
