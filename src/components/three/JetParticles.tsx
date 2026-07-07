"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getGlowTexture } from "@/lib/glowTexture";

const VERTEX_SHADER = /* glsl */ `
  attribute float aSize;
  attribute float aDist;
  attribute float aRand;
  varying float vDist;
  varying float vRand;
  void main() {
    vDist = aDist;
    vRand = aRand;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (220.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uAlpha;
  varying float vDist;
  varying float vRand;
  void main() {
    // warm white near the star -> cool blue-white toward the jet tip
    vec3 near = vec3(1.0, 0.97, 0.90);
    vec3 far  = vec3(0.72, 0.85, 1.0);
    vec3 color = mix(near, far, clamp(vDist, 0.0, 1.0));
    float fade = (1.0 - vDist) * (0.4 + vRand * 0.8);
    vec4 tex = texture2D(uMap, gl_PointCoord);
    gl_FragColor = vec4(color, 1.0) * tex.a * fade * uAlpha;
  }
`;

interface JetParticlesProps {
  length: number;
  speed: number;
  alpha?: number;
  count?: number;
  waveLen?: number;
  waveAmp?: number;
}

/** A dense, organically-wiggling particle stream shooting out both ends of a neutron star's magnetic axis (local +Y / -Y). Parent group orientation determines the jet's world-space direction. */
export function JetParticles({
  length,
  speed,
  alpha = 1,
  count = 260,
  waveLen = 2.6,
  waveAmp = 0.85,
}: JetParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const tex = getGlowTexture();

  const { geometry, material, phases, sides, waveSeed } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const dists = new Float32Array(count);
    const rands = new Float32Array(count);
    const phasesArr = new Float32Array(count);
    const sidesArr = new Float32Array(count);
    const waveSeedArr = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      phasesArr[i] = Math.random();
      sidesArr[i] = i < count / 2 ? 1 : -1;
      waveSeedArr[i] = Math.random() * Math.PI * 2;
      rands[i] = Math.random();
      sizes[i] = 2.0 + Math.random() * 3.2;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aDist", new THREE.BufferAttribute(dists, 1));
    geo.setAttribute("aRand", new THREE.BufferAttribute(rands, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: { uMap: { value: tex }, uAlpha: { value: alpha } },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return { geometry: geo, material: mat, phases: phasesArr, sides: sidesArr, waveSeed: waveSeedArr };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const distAttr = geometry.attributes.aDist as THREE.BufferAttribute;
    const pos = posAttr.array as Float32Array;
    const dist = distAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const phase = phases[i];
      const side = sides[i];
      const d = (phase * length + t * speed) % length;
      const tn = d / length;
      dist[i] = tn;

      const env = Math.pow(tn, 1.7) * waveAmp * length * 0.05;
      const wx = Math.sin((d + waveSeed[i] * waveLen) / waveLen * Math.PI * 2 + t * 1.4) * env;
      const wz = Math.cos((d * 0.83 + waveSeed[i] * waveLen) / (waveLen * 1.3) * Math.PI * 2 + t * 1.1) * env * 0.8;

      pos[i * 3]     = wx;
      pos[i * 3 + 1] = side * d;
      pos[i * 3 + 2] = wz;
    }

    posAttr.needsUpdate = true;
    distAttr.needsUpdate = true;
    (material.uniforms.uAlpha.value as number) = alpha;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />;
}
