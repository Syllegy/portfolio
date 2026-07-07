"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface OrbitConfig {
  radius: number;
  /** rad/s — sign controls direction, magnitude controls speed. Deliberately varied and unrelated to the globe's own auto-rotate speed so each satellite reads as having its own independent orbit. */
  speed: number;
  tiltX: number;
  tiltZ: number;
  /** Initial angle around the ring so satellites don't all start lined up. */
  phase: number;
  scale: number;
  accentColor: string;
}

// Orbit radii are kept in a fairly narrow band: they must clear the globe's
// dust shell (radius ~3.06) on the inside, but a satellite's outward-facing
// solar panel constantly sits farther from the orbit centre than the body
// itself, so the *outer* edge of that panel is what actually needs to stay
// inside the camera frustum (see the frustum-margin note on the camera in
// SkillsPlanet.tsx). Keep radius + panelReach * scale comfortably under that
// limit for every entry here.
const ORBITS: OrbitConfig[] = [
  { radius: 3.1, speed: 0.26, tiltX: -0.2, tiltZ: 0.1, phase: 0, scale: 0.42, accentColor: "#ff5b5b" },
  { radius: 3.2, speed: -0.15, tiltX: 0.68, tiltZ: -0.32, phase: 2.35, scale: 0.38, accentColor: "#5be0ff" },
  { radius: 3.35, speed: 0.09, tiltX: -1.05, tiltZ: 0.48, phase: 4.55, scale: 0.46, accentColor: "#ffd45b" },
];

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

interface SatelliteModelProps {
  scale: number;
  accentColor: string;
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
function SatelliteModel({ scale, accentColor }: SatelliteModelProps) {
  const panelTex = usePanelTexture();

  return (
    <group scale={scale} rotation={[0, Math.PI, 0]}>
      <mesh>
        <boxGeometry args={[0.34, 0.2, 0.24]} />
        <meshStandardMaterial color="#d8dee8" metalness={0.55} roughness={0.35} />
      </mesh>

      {/* Solar panel wings — kept short so the outward wing doesn't push the
          satellite's effective radius too close to the camera frustum edge. */}
      <mesh position={[0.46, 0, 0]}>
        <boxGeometry args={[0.46, 0.02, 0.24]} />
        <meshStandardMaterial map={panelTex} metalness={0.25} roughness={0.55} />
      </mesh>
      <mesh position={[-0.46, 0, 0]}>
        <boxGeometry args={[0.46, 0.02, 0.24]} />
        <meshStandardMaterial map={panelTex} metalness={0.25} roughness={0.55} />
      </mesh>
      <mesh position={[0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.012, 0.1, 8]} />
        <meshStandardMaterial color="#8891a0" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[-0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.012, 0.1, 8]} />
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
        <meshBasicMaterial color={accentColor} />
      </mesh>
    </group>
  );
}

/**
 * One satellite on its own fixed, tilted ring. Each ring's tilt is set once
 * from its config (a plane distinct from — and mostly not aligned with — the
 * globe's own vertical spin axis), and the pivot's rotation.y is advanced
 * every frame at the config's own rate. Because this rotation is entirely
 * independent of the globe/camera auto-rotation driving the rest of the
 * scene, each satellite visibly drifts at its own speed and along its own
 * plane rather than appearing glued to the planet's spin.
 */
function SatelliteOrbit({ config }: { config: OrbitConfig }) {
  const pivotRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (pivotRef.current) pivotRef.current.rotation.y = config.phase;
  }, [config.phase]);

  useFrame((_, delta) => {
    if (pivotRef.current) pivotRef.current.rotation.y += delta * config.speed;
  });

  return (
    <group rotation={[config.tiltX, 0, config.tiltZ]}>
      <group ref={pivotRef}>
        <group position={[config.radius, 0, 0]}>
          <SatelliteModel scale={config.scale} accentColor={config.accentColor} />
        </group>
      </group>
    </group>
  );
}

/** A small fleet of satellites orbiting the skills globe, each on its own tilted plane and speed, positioned outside the globe's dust shell/skill dots so none of them ever intersect the planet. */
export function SatelliteSwarm() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 3, 5]} intensity={1.5} color="#eaf3ff" />
      {ORBITS.map((config, i) => (
        <SatelliteOrbit key={i} config={config} />
      ))}
    </>
  );
}
