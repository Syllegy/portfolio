"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { NeutronBinaryScene } from "./three/NeutronBinaryScene";

const T_HOLD = 0.15;   // s — brief close-up before pulling back
const T_ZOOM = 2.6;    // s — dolly out, eased
const START_DIST = 7.5;
const END_DIST   = 24;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// Mutating the camera object directly inside useFrame/useEffect is the
// standard, recommended react-three-fiber pattern (see the R3F docs: "mutate,
// don't set state" — driving a render loop through React state would cause a
// full re-render every animation frame). The generic react-hooks lint rules
// aren't aware of this idiom, hence the targeted disables below.
function CameraRig({ skipIntro }: { skipIntro: boolean }) {
  const { camera, size } = useThree();
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const targetX = size.width > 768 ? 2.4 : 0; // frame slightly right-of-centre on wide screens
    camera.position.set(targetX, 1.4, skipIntro ? END_DIST : START_DIST);
    camera.lookAt(targetX * 0.4, 0, 0);
  }, [size.width, skipIntro, camera]);

  /* eslint-disable react-hooks/immutability -- idiomatic R3F: mutate the camera each frame instead of driving it through React state */
  useFrame((state) => {
    if (skipIntro) return;
    if (startRef.current === null) startRef.current = state.clock.elapsedTime;
    const e = state.clock.elapsedTime - startRef.current;
    const zoomT = Math.min(Math.max(e - T_HOLD, 0) / T_ZOOM, 1);
    const dist = START_DIST + (END_DIST - START_DIST) * easeOutCubic(zoomT);
    const targetX = size.width > 768 ? 2.4 : 0;
    camera.position.z = dist;
    camera.lookAt(targetX * 0.4, 0, 0);
  });
  /* eslint-enable react-hooks/immutability */

  return null;
}

export function SpaceHero() {
  const [skipIntro, setSkipIntro] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // sessionStorage isn't available during the static (Node) prerender pass,
    // so this read has to happen client-side in an effect rather than a lazy
    // useState initializer.
    const seen = sessionStorage.getItem("neutron-intro-seen");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSkipIntro(!!seen);
    if (!seen) {
      const t = setTimeout(() => sessionStorage.setItem("neutron-intro-seen", "1"), (T_HOLD + T_ZOOM) * 1000);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 40);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: ready ? 1 : 0, transition: "opacity 1.1s ease-out" }}
    >
      <Canvas
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.75]}
        camera={{ fov: 50, near: 0.1, far: 200 }}
      >
        <CameraRig skipIntro={skipIntro} />
        <NeutronBinaryScene />
      </Canvas>
    </div>
  );
}
