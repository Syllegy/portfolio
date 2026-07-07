"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { createAsteroidGeometry } from "@/lib/asteroidGeometry";
import { mulberry32 } from "@/lib/prng";
import { skillIconUrl } from "@/lib/skillIcons";

interface SkillAsteroidProps {
  name: string;
  color: string;
  /** Fixed slot angle around the belt (radians). */
  angle: number;
  radius: number;
  seed: number;
}

/**
 * A single rock in the skills asteroid belt. Sits at a fixed angle around
 * the belt's own local origin, and tumbles continuously on its own randomly
 * seeded axis — independent of, and at a different rate than, the belt's
 * overall rotation — so it reads as its own free-tumbling body rather than
 * something rigidly attached to the ring.
 */
export function SkillAsteroid({ name, color, angle, radius, seed }: SkillAsteroidProps) {
  const groupRef = useRef<THREE.Group>(null);
  const rockRef = useRef<THREE.Mesh>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const iconUrl = skillIconUrl(name);

  const { geometry, tumbleAxis, tumbleSpeed } = useMemo(() => {
    const rand = mulberry32(seed);
    const baseRadius = 0.34 + rand() * 0.26;
    const geo = createAsteroidGeometry(seed + 1000, baseRadius);
    const axis = new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize();
    const speed = 0.18 + rand() * 0.32;
    return { geometry: geo, tumbleAxis: axis, tumbleSpeed: speed };
  }, [seed]);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#8c8377",
        roughness: 0.95,
        metalness: 0.05,
        emissive: new THREE.Color(color),
        emissiveIntensity: 0.24,
      }),
    [color],
  );

  const position = useMemo(
    () => new THREE.Vector3(Math.sin(angle) * radius, 0, Math.cos(angle) * radius),
    [angle, radius],
  );

  useFrame(({ camera }, delta) => {
    rockRef.current?.rotateOnAxis(tumbleAxis, tumbleSpeed * delta);

    const group = groupRef.current;
    if (!group) return;
    // Recomputed from the live world position (not the static local one)
    // since the parent belt keeps spinning underneath this rock.
    const worldPos = group.getWorldPosition(new THREE.Vector3());
    const normal = worldPos.clone().normalize();
    const viewDir = camera.position.clone().sub(worldPos).normalize();
    const facing = normal.dot(viewDir);
    const t = THREE.MathUtils.clamp((facing + 0.1) / 0.5, 0, 1);
    if (labelRef.current) labelRef.current.style.opacity = String(t);
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh ref={rockRef} geometry={geometry} material={material} />

      <Html center distanceFactor={6} style={{ pointerEvents: "none" }}>
        <div
          ref={labelRef}
          className="flex flex-col items-center gap-2 w-[92px] text-center"
          style={{ opacity: 0 }}
        >
          {iconUrl && (
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/95 p-1.5 shrink-0 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={iconUrl} alt="" width={20} height={20} />
            </span>
          )}
          <span className="text-[11px] font-mono font-medium leading-tight text-white/90">
            {name}
          </span>
        </div>
      </Html>
    </group>
  );
}
