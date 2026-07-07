"use client";

import { Canvas } from "@react-three/fiber";
import { AsteroidBeltScene } from "./three/AsteroidBeltScene";

/** A slowly rotating belt of tumbling asteroids — one per skill — used as the homepage's technologies preview. */
export function SkillsAsteroidBelt() {
  return (
    <div className="relative w-full h-[220px] sm:h-[340px] md:h-[420px]">
      <Canvas
        // Elevated and angled down at the belt (rather than sitting at its
        // equator) for a slight looking-down-on-it perspective.
        camera={{ fov: 50, position: [0, 3, 8.5] }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.75]}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        // Labels are DOM elements (drei's Html) portaled into the canvas
        // wrapper, which clips overflow by default — let rocks near the
        // edge of the belt render their labels in full.
        style={{ overflow: "visible" }}
      >
        <AsteroidBeltScene />
      </Canvas>
    </div>
  );
}
