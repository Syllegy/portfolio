"use client";

import { Canvas } from "@react-three/fiber";
import { Planet } from "./three/Planet";
import type { PlanetSurface } from "@/lib/planetTexture";

interface VariantConfig {
  surface: PlanetSurface;
  color: string;
  accentColor?: string;
  accentColor2?: string;
  hasRing?: boolean;
  ringColor?: string;
  hasMoon?: boolean;
  moonColor?: string;
  spinSpeed: number;
}

const VARIANTS: Record<string, VariantConfig> = {
  // primary planets — one per page
  about:   { surface: "rocky",    color: "#c76b4a", accentColor: "#8f4a30",                     hasMoon: true,  moonColor: "#cbb9a8", spinSpeed: 0.10 },
  skills:  { surface: "earth",    color: "#1f6fa8", accentColor: "#2f9e63", accentColor2: "#1f7a4a", hasMoon: true,  moonColor: "#b7bfc9", spinSpeed: 0.16 },
  work:    { surface: "gasgiant", color: "#d4a94a", accentColor: "#b5842f", accentColor2: "#f0d99b", hasRing: true, ringColor: "#e8c98a", spinSpeed: 0.08 },
  contact: { surface: "ice",      color: "#3f6ea8", accentColor: "#8fc2f2",                     hasMoon: true,  moonColor: "#cbd5e1", spinSpeed: 0.13 },
  // smaller accent planets — placed further away, on the opposite side
  aboutAccent:   { surface: "moon",     color: "#9aa3ad", accentColor: "#6b7280", spinSpeed: 0.05 },
  skillsAccent:  { surface: "rocky",    color: "#b1503a", accentColor: "#7a3322", spinSpeed: 0.12 },
  workAccent:    { surface: "ice",      color: "#4a7fc7", accentColor: "#89b6ea", spinSpeed: 0.14 },
  contactAccent: { surface: "gasgiant", color: "#c98a3a", accentColor: "#e8b96a", accentColor2: "#8a5a20", spinSpeed: 0.10 },
};

interface PagePlanetProps {
  variant: keyof typeof VARIANTS;
  seed?: number;
  className?: string;
}

/** A small decorative planet used as page-header/margin ambience, echoing the neutron-star hero without competing with it. Purely ambient — no intro, no interaction. */
export function PagePlanet({ variant, seed = 1, className }: PagePlanetProps) {
  const cfg = VARIANTS[variant];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className ?? ""}`}
    >
      <Canvas
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.75]}
        camera={{ fov: 40, near: 0.1, far: 50, position: [0, 0.6, 5.5] }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <Planet
          surface={cfg.surface}
          color={cfg.color}
          accentColor={cfg.accentColor}
          accentColor2={cfg.accentColor2}
          hasRing={cfg.hasRing}
          ringColor={cfg.ringColor}
          hasMoon={cfg.hasMoon}
          moonColor={cfg.moonColor}
          spinSpeed={cfg.spinSpeed}
          seed={seed}
          radius={1}
        />
      </Canvas>
    </div>
  );
}
