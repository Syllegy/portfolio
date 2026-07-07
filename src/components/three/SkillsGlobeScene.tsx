"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { getGlowTexture } from "@/lib/glowTexture";
import { fibonacciSpherePoint } from "@/lib/sphere";
import { skillCategories } from "@/data/skills";

const RADIUS = 3;

// Deterministic PRNG so the dust shell's layout is stable across re-renders
// (Math.random() during render/useMemo would be flagged as an impure call).
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface FlatSkill {
  name: string;
  color: string;
}

function useFlatSkills(): FlatSkill[] {
  return useMemo(
    () =>
      skillCategories.flatMap((cat) =>
        cat.skills.map((name) => ({ name, color: cat.color })),
      ),
    [],
  );
}

/** The dense "planet made of tiny dots" backdrop — a shell of small glowing points with slight radial jitter for texture/depth, purely decorative. */
function DustShell() {
  const tex = getGlowTexture();
  const geometry = useMemo(() => {
    const count = 900;
    const rand = mulberry32(1337);
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const p = fibonacciSpherePoint(i + rand() * 0.6, count, RADIUS * (0.97 + rand() * 0.05));
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        map={tex}
        color="#bcd4ff"
        size={0.06}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

interface SkillPointProps {
  position: THREE.Vector3;
  name: string;
  color: string;
}

/** A single labelled skill marker on the globe surface. The label fades in/out based on whether the point currently faces the camera, so labels only appear as their skill "rotates into view". */
function SkillPoint({ position, name, color }: SkillPointProps) {
  const dotRef = useRef<THREE.Mesh>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useFrame(({ camera }) => {
    const dot = dotRef.current;
    if (!dot) return;
    const worldPos = dot.getWorldPosition(new THREE.Vector3());
    const normal = worldPos.clone().normalize();
    const viewDir = camera.position.clone().sub(worldPos).normalize();
    const facing = normal.dot(viewDir);
    const t = THREE.MathUtils.clamp((facing + 0.05) / 0.55, 0, 1);

    if (labelRef.current) {
      labelRef.current.style.opacity = String(t);
    }
    (dot.material as THREE.MeshBasicMaterial).opacity = 0.3 + t * 0.7;
  });

  return (
    <group position={position}>
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={1} />
      </mesh>
      <Html center distanceFactor={7} style={{ pointerEvents: "none" }}>
        <div
          ref={labelRef}
          className="px-2 py-1 rounded-sm text-[11px] font-mono font-medium whitespace-nowrap bg-background/85 border border-border/60 backdrop-blur-sm"
          style={{ color, opacity: 0 }}
        >
          {name}
        </div>
      </Html>
    </group>
  );
}

export function SkillsGlobeScene() {
  const skills = useFlatSkills();

  const points = useMemo(
    () => skills.map((s, i) => ({ ...s, position: fibonacciSpherePoint(i, skills.length, RADIUS) })),
    [skills],
  );

  return (
    <group>
      <DustShell />
      {points.map((p) => (
        <SkillPoint key={p.name} position={p.position} name={p.name} color={p.color} />
      ))}
    </group>
  );
}
