"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { skillCategories } from "@/data/skills";
import { SkillCard } from "./SkillCard";

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

/** A ring of skill cards that slowly spins on its own — the cards facing the camera read clearly while the rest recede around the back, showing their branded card-back pattern instead of a flat repeated grid. */
export function SkillsCarouselScene() {
  const pivotRef = useRef<THREE.Group>(null);
  const skills = useFlatSkills();

  useFrame((_, delta) => {
    if (pivotRef.current) pivotRef.current.rotation.y += delta * ROTATION_SPEED;
  });

  return (
    <group>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 6]} intensity={1.2} color="#eaf3ff" />
      <directionalLight position={[-4, -2, -3]} intensity={0.35} color="#5b8dff" />
      <group ref={pivotRef}>
        {skills.map((skill, i) => (
          <SkillCard
            key={skill.name}
            name={skill.name}
            color={skill.color}
            angle={(i / skills.length) * Math.PI * 2}
            radius={RADIUS}
          />
        ))}
      </group>
    </group>
  );
}
