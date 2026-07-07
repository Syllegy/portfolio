"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { generatePlanetTexture, type PlanetSurface } from "@/lib/planetTexture";

interface PlanetProps {
  color: string;
  accentColor?: string;
  accentColor2?: string;
  surface?: PlanetSurface;
  seed?: number;
  radius?: number;
  hasRing?: boolean;
  ringColor?: string;
  hasMoon?: boolean;
  moonColor?: string;
  spinSpeed?: number;
}

/** A small stylised planet: procedurally-textured sphere, optional tilted ring, optional orbiting moon. Lit by a soft directional + ambient light so it reads as a real 3D sphere rather than a flat circle. */
export function Planet({
  color,
  accentColor,
  accentColor2,
  surface = "rocky",
  seed = 1,
  radius = 1,
  hasRing = false,
  ringColor,
  hasMoon = false,
  moonColor,
  spinSpeed = 0.12,
}: PlanetProps) {
  const bodyRef = useRef<THREE.Mesh>(null);
  const moonRef = useRef<THREE.Group>(null);

  const texture = useMemo(
    () => generatePlanetTexture(surface, { base: color, accent: accentColor ?? color, accent2: accentColor2 }, seed),
    [surface, color, accentColor, accentColor2, seed],
  );

  const moonTexture = useMemo(
    () => generatePlanetTexture("moon", { base: moonColor ?? "#b7bfc9", accent: "#8993a1" }, seed + 51),
    [moonColor, seed],
  );

  // Kept compact (well inside the camera frustum) so the ring/moon never
  // get clipped by the canvas edge regardless of container size.
  const ringGeometry = useMemo(
    () => (hasRing ? new THREE.RingGeometry(radius * 1.3, radius * 1.5, 64) : null),
    [hasRing, radius],
  );

  useFrame((state, delta) => {
    if (bodyRef.current) bodyRef.current.rotation.y += delta * spinSpeed;
    if (moonRef.current) moonRef.current.rotation.y += delta * 0.35;
  });

  return (
    <group>
      <directionalLight position={[3, 2, 4]} intensity={2.2} color="#eaf3ff" />
      <ambientLight intensity={0.2} color={accentColor ?? color} />

      <mesh ref={bodyRef}>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshStandardMaterial map={texture} roughness={0.85} metalness={0.05} />
      </mesh>

      {hasRing && ringGeometry && (
        <mesh geometry={ringGeometry} rotation={[Math.PI / 2.4, 0, 0]}>
          <meshBasicMaterial
            color={ringColor ?? accentColor ?? color}
            side={THREE.DoubleSide}
            transparent
            opacity={0.55}
          />
        </mesh>
      )}

      {hasMoon && (
        <group ref={moonRef}>
          <mesh position={[radius * 1.5, radius * 0.25, 0]}>
            <sphereGeometry args={[radius * 0.2, 20, 20]} />
            <meshStandardMaterial map={moonTexture} roughness={0.95} />
          </mesh>
        </group>
      )}
    </group>
  );
}
