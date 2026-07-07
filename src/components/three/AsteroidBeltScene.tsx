"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { skillCategories } from "@/data/skills";
import { SkillAsteroid } from "./SkillAsteroid";

const RADIUS = 4.3;
const ROTATION_SPEED = 0.12; // rad/s — slow, ambient drift

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

/** A slowly drifting asteroid belt, one tumbling rock per skill — the ones swinging toward the camera light up with their label, the rest recede into the belt. */
export function AsteroidBeltScene() {
  const pivotRef = useRef<THREE.Group>(null);
  const skills = useFlatSkills();

  useFrame((_, delta) => {
    if (pivotRef.current) pivotRef.current.rotation.y += delta * ROTATION_SPEED;
  });

  return (
    <group>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 6]} intensity={1.3} color="#eaf3ff" />
      <directionalLight position={[-4, -2, -3]} intensity={0.35} color="#5b8dff" />
      <group ref={pivotRef}>
        {skills.map((skill, i) => (
          <SkillAsteroid
            key={skill.name}
            name={skill.name}
            color={skill.color}
            angle={(i / skills.length) * Math.PI * 2}
            radius={RADIUS}
            seed={i * 97 + 13}
          />
        ))}
      </group>
    </group>
  );
}
