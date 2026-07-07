"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SkillsGlobeScene } from "./three/SkillsGlobeScene";

/** A rotating "planet" made of tiny dots, with each skill appearing as a labelled point as it rotates into view. Drag to spin manually, otherwise it rotates on its own. */
export function SkillsPlanet() {
  return (
    <div className="relative w-full aspect-square max-w-xl mx-auto touch-none">
      <Canvas
        // Distance is a bit more than the tightest fit around the globe
        // itself — the orbiting satellites need extra frustum headroom so
        // their outward-facing solar panels don't get clipped at the edge
        // of the view as they swing around (see Satellite.tsx).
        camera={{ fov: 45, position: [0, 0, 10.2] }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.75]}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        // R3F's canvas wrapper clips overflow by default, which cuts off
        // skill-name labels (rendered as DOM elements via drei's Html) when
        // they rotate near the globe's horizon and poke past the box.
        style={{ overflow: "visible" }}
      >
        <SkillsGlobeScene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          autoRotate
          autoRotateSpeed={0.8}
          rotateSpeed={0.5}
          minPolarAngle={Math.PI / 2 - 0.9}
          maxPolarAngle={Math.PI / 2 + 0.9}
        />
      </Canvas>
    </div>
  );
}
