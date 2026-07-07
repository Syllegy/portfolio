"use client";

import { Canvas } from "@react-three/fiber";
import { Planet } from "./three/Planet";

const VARIANTS = {
  about:   { color: "#c76b4a", accentColor: "#e8b98f", hasRing: false, hasMoon: true,  spinSpeed: 0.10 },
  skills:  { color: "#3f8f7a", accentColor: "#8fe3c9", hasRing: false, hasMoon: false, spinSpeed: 0.16 },
  work:    { color: "#d4a94a", accentColor: "#f0d99b", hasRing: true,  hasMoon: false, spinSpeed: 0.08 },
  contact: { color: "#4a7fc7", accentColor: "#9fc4f2", hasRing: false, hasMoon: true,  spinSpeed: 0.13 },
} as const;

interface PagePlanetProps {
  variant: keyof typeof VARIANTS;
  className?: string;
}

/** A small decorative planet rendered behind a page header, echoing the neutron-star hero without competing with it. Purely ambient — no intro, no interaction. */
export function PagePlanet({ variant, className }: PagePlanetProps) {
  const cfg = VARIANTS[variant];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className ?? ""}`}
    >
      <Canvas
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.75]}
        camera={{ fov: 40, near: 0.1, far: 50, position: [0, 0.6, 5] }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <Planet
          color={cfg.color}
          accentColor={cfg.accentColor}
          hasRing={cfg.hasRing}
          hasMoon={cfg.hasMoon}
          spinSpeed={cfg.spinSpeed}
          radius={1}
        />
      </Canvas>
    </div>
  );
}
