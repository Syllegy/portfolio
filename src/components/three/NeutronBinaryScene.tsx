"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Star } from "./Star";
import { JetParticles } from "./JetParticles";
import { FieldRings } from "./FieldRings";

const SEP = 5.2;
const M1 = 1.45;
const M2 = 1.15;
const R1 = (SEP * M2) / (M1 + M2);
const R2 = (SEP * M1) / (M1 + M2);

const PERIOD = 5.2; // seconds per orbit
const JET_TILT = 0.24; // rad lean from vertical, opposite signs -> X-shape crossing
const JET_LEN = 15;
const JET_SPEED = 8;

export function NeutronBinaryScene() {
  const tiltGroup = useRef<THREE.Group>(null);
  const star1 = useRef<THREE.Group>(null);
  const star2 = useRef<THREE.Group>(null);
  const jet1 = useRef<THREE.Group>(null);
  const jet2 = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!star1.current || !star2.current || !jet1.current || !jet2.current) return;

    const t = state.clock.elapsedTime;
    const orb = (t / PERIOD) * Math.PI * 2;
    const sin = Math.sin(orb);
    const cos = Math.cos(orb);

    star1.current.position.set(cos * R1, 0, sin * R1);
    star2.current.position.set(-cos * R2, 0, -sin * R2);
    jet1.current.position.copy(star1.current.position);
    jet2.current.position.copy(star2.current.position);

    // Very slow precession keeps the X-shaped jet crossing subtly alive
    const precess = (t / 26) * Math.PI * 2;
    jet1.current.rotation.z = JET_TILT + Math.sin(precess) * 0.02;
    jet2.current.rotation.z = -JET_TILT - Math.sin(precess * 0.9) * 0.02;
  });

  return (
    <group ref={tiltGroup} rotation={[-0.42, 0.5, 0]}>
      <FieldRings maxRadius={22} />

      <group ref={star1}>
        <Star color={[225, 242, 255]} radius={0.55} />
      </group>
      <group ref={star2}>
        <Star color={[140, 205, 255]} radius={0.46} />
      </group>

      <group ref={jet1}>
        <JetParticles length={JET_LEN} speed={JET_SPEED} alpha={0.85} />
      </group>
      <group ref={jet2}>
        <JetParticles length={JET_LEN} speed={JET_SPEED * 0.94} alpha={0.75} />
      </group>
    </group>
  );
}
