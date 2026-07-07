"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PlanetProps {
  color: string;
  accentColor?: string;
  radius?: number;
  hasRing?: boolean;
  hasMoon?: boolean;
  spinSpeed?: number;
}

/** A small stylised planet: shaded sphere, optional tilted ring, optional orbiting moon. Lit by a single soft directional light so it reads as a 3D sphere rather than a flat circle. */
export function Planet({
  color,
  accentColor,
  radius = 1,
  hasRing = false,
  hasMoon = false,
  spinSpeed = 0.12,
}: PlanetProps) {
  const bodyRef = useRef<THREE.Mesh>(null);
  const moonRef = useRef<THREE.Group>(null);

  const ringGeometry = useMemo(
    () => (hasRing ? new THREE.RingGeometry(radius * 1.5, radius * 2.3, 64) : null),
    [hasRing, radius],
  );

  useFrame((state, delta) => {
    if (bodyRef.current) bodyRef.current.rotation.y += delta * spinSpeed;
    if (moonRef.current) moonRef.current.rotation.y += delta * 0.35;
  });

  return (
    <group>
      <directionalLight position={[3, 2, 4]} intensity={2.2} color="#eaf3ff" />
      <ambientLight intensity={0.18} color={accentColor ?? color} />

      <mesh ref={bodyRef}>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} />
      </mesh>

      {hasRing && ringGeometry && (
        <mesh geometry={ringGeometry} rotation={[Math.PI / 2.4, 0, 0]}>
          <meshBasicMaterial
            color={accentColor ?? color}
            side={THREE.DoubleSide}
            transparent
            opacity={0.55}
          />
        </mesh>
      )}

      {hasMoon && (
        <group ref={moonRef}>
          <mesh position={[radius * 2.6, radius * 0.4, 0]}>
            <sphereGeometry args={[radius * 0.22, 20, 20]} />
            <meshStandardMaterial color={accentColor ?? "#cbd5e1"} roughness={0.9} />
          </mesh>
        </group>
      )}
    </group>
  );
}
