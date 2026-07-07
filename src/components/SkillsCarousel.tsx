"use client";

import { Canvas } from "@react-three/fiber";
import { SkillsCarouselScene } from "./three/SkillsCarouselScene";

/** A slowly rotating 3D carousel of skill cards, used as the homepage's technologies preview. */
export function SkillsCarousel() {
  return (
    <div className="relative w-full h-[220px] sm:h-[340px] md:h-[420px]">
      <Canvas
        // Elevated and angled down at the ring (rather than sitting at its
        // equator) for a slight looking-down-on-it perspective. Total
        // distance from the ring's centre is kept about the same as before
        // so cards don't get any closer to the edge of the frustum.
        camera={{ fov: 50, position: [0, 3, 8.5] }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.75]}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        // Card labels are DOM elements (drei's Html) portaled into the
        // canvas wrapper, which clips overflow by default — let cards near
        // the edge of the ring render their labels in full.
        style={{ overflow: "visible" }}
      >
        <SkillsCarouselScene />
      </Canvas>
    </div>
  );
}
