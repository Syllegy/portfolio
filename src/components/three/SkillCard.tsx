"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { getCardBackTexture } from "@/lib/cardBackTexture";
import { skillIconUrl } from "@/lib/skillIcons";

const CARD_WIDTH = 1.0;
const CARD_HEIGHT = 1.25;
const CARD_DEPTH = 0.06;

interface SkillCardProps {
  name: string;
  color: string;
  /** Fixed slot angle around the ring (radians). */
  angle: number;
  radius: number;
}

/**
 * A single card on the skills carousel ring. Positioned at a fixed angle
 * around the ring's own local origin with rotation.y = angle, which makes
 * the card's front face (local +Z) point exactly radially outward — the
 * same direction as its position vector from the ring's centre. That means
 * the label's facing calculation below can reuse the card's own position
 * (normalized) directly as its front-face normal.
 */
export function SkillCard({ name, color, angle, radius }: SkillCardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const backTexture = getCardBackTexture(color);
  const iconUrl = skillIconUrl(name);

  const materials = useMemo(() => {
    const edge = new THREE.MeshStandardMaterial({ color: "#141d33", metalness: 0.3, roughness: 0.6 });
    const front = new THREE.MeshStandardMaterial({ color: "#0f1830", metalness: 0.2, roughness: 0.55 });
    const back = new THREE.MeshStandardMaterial({ map: backTexture, metalness: 0.15, roughness: 0.6 });
    // BoxGeometry face order: +x, -x, +y, -y, +z (front), -z (back)
    return [edge, edge, edge, edge, front, back];
  }, [backTexture]);

  const position = useMemo(
    () => new THREE.Vector3(Math.sin(angle) * radius, 0, Math.cos(angle) * radius),
    [angle, radius],
  );

  useFrame(({ camera }) => {
    const group = groupRef.current;
    if (!group) return;
    // Recomputed from the live world position (not the static local one)
    // since the parent ring keeps spinning underneath this card.
    const worldPos = group.getWorldPosition(new THREE.Vector3());
    const normal = worldPos.clone().normalize();
    const viewDir = camera.position.clone().sub(worldPos).normalize();
    const facing = normal.dot(viewDir);
    const t = THREE.MathUtils.clamp((facing + 0.1) / 0.5, 0, 1);
    if (labelRef.current) labelRef.current.style.opacity = String(t);
  });

  return (
    <group ref={groupRef} position={position} rotation={[0, angle, 0]}>
      <mesh material={materials}>
        <boxGeometry args={[CARD_WIDTH, CARD_HEIGHT, CARD_DEPTH]} />
      </mesh>

      {/* Category-color accent strip along the top of the front face */}
      <mesh position={[0, CARD_HEIGHT / 2 - 0.06, CARD_DEPTH / 2 + 0.002]}>
        <boxGeometry args={[CARD_WIDTH, 0.06, 0.01]} />
        <meshBasicMaterial color={color} />
      </mesh>

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
