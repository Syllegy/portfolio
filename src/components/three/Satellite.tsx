"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ORBIT_RADIUS = 3.35;
const ORBIT_SPEED = 0.16; // rad/s
const ORBIT_TILT_X = -0.25;
const ORBIT_TILT_Z = 0.12;

function usePanelTexture(): THREE.Texture {
  return useMemo(() => {
    const w = 64;
    const h = 32;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#132a52";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(150,195,255,0.55)";
    ctx.lineWidth = 1;
    const cols = 6;
    const rows = 3;
    for (let i = 1; i < cols; i++) {
      const x = (i / cols) * w;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let j = 1; j < rows; j++) {
      const y = (j / rows) * h;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

/**
 * A small stylised satellite built from primitives: a central bus, two
 * solar-panel wings, a forward-facing dish, and a whip antenna. The dish is
 * modelled pointing along local +Z; the outer 180° flip below re-points it to
 * -Z, which is the true tangential direction of travel for a child sitting at
 * local (R, 0, 0) under a pivot whose rotation.y increases over time (Three's
 * Y-rotation convention). Net effect: the satellite always noses forward
 * along its orbit with zero per-frame orientation math.
 */
function SatelliteModel() {
  const panelTex = usePanelTexture();

  return (
    <group scale={0.42} rotation={[0, Math.PI, 0]}>
      <mesh>
        <boxGeometry args={[0.34, 0.2, 0.24]} />
        <meshStandardMaterial color="#d8dee8" metalness={0.55} roughness={0.35} />
      </mesh>

      {/* Solar panel wings */}
      <mesh position={[0.62, 0, 0]}>
        <boxGeometry args={[0.72, 0.02, 0.26]} />
        <meshStandardMaterial map={panelTex} metalness={0.25} roughness={0.55} />
      </mesh>
      <mesh position={[-0.62, 0, 0]}>
        <boxGeometry args={[0.72, 0.02, 0.26]} />
        <meshStandardMaterial map={panelTex} metalness={0.25} roughness={0.55} />
      </mesh>
      <mesh position={[0.24, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.012, 0.16, 8]} />
        <meshStandardMaterial color="#8891a0" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[-0.24, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.012, 0.16, 8]} />
        <meshStandardMaterial color="#8891a0" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Forward dish (points along +Z, the direction of travel) */}
      <mesh position={[0, 0.02, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.11, 0.09, 16, 1, true]} />
        <meshStandardMaterial color="#eef2f7" metalness={0.15} roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.02, 0.16]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.14, 8]} />
        <meshStandardMaterial color="#8891a0" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Whip antenna + status light */}
      <mesh position={[0, 0.17, -0.06]}>
        <cylinderGeometry args={[0.006, 0.006, 0.2, 6]} />
        <meshStandardMaterial color="#8891a0" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0.17, 0.1, -0.1]}>
        <sphereGeometry args={[0.018, 8, 8]} />
        <meshBasicMaterial color="#ff5b5b" />
      </mesh>
    </group>
  );
}

/** Orbits the satellite around the skills globe on a fixed, tilted ring. Positioned outside the globe's dust shell/skill dots so it never intersects the planet. */
export function OrbitingSatellite() {
  const pivotRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (pivotRef.current) pivotRef.current.rotation.y += delta * ORBIT_SPEED;
  });

  return (
    <group rotation={[ORBIT_TILT_X, 0, ORBIT_TILT_Z]}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 3, 5]} intensity={1.5} color="#eaf3ff" />
      <group ref={pivotRef}>
        <group position={[ORBIT_RADIUS, 0, 0]}>
          <SatelliteModel />
        </group>
      </group>
    </group>
  );
}
