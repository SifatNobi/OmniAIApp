"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DragonParticlesProps {
  intensity?: number;
}

export function DragonParticles({ intensity = 1 }: DragonParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const glowRef = useRef<THREE.Points>(null);
  const ribbonRef = useRef<THREE.Mesh>(null);

  const count = Math.floor(200 * intensity);
  const glowCount = Math.floor(40 * intensity);

  const { positions, glowPos } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 0.5 + Math.random() * 3.5;
      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = -2 + Math.random() * 4;
      pos[i * 3 + 2] = Math.sin(theta) * r - 0.5;
    }
    const gPos = new Float32Array(glowCount * 3);
    for (let i = 0; i < glowCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 0.3 + Math.random() * 1.5;
      gPos[i * 3] = Math.cos(theta) * r + 2;
      gPos[i * 3 + 1] = -1 + Math.random() * 2;
      gPos[i * 3 + 2] = Math.sin(theta) * r - 0.5;
    }
    return { positions: pos, glowPos: gPos };
  }, [count, glowCount]);

  const velocities = useMemo(() => {
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return vel;
  }, [count]);

  const speeds = useMemo(() => {
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) spd[i] = 0.2 + Math.random() * 0.8;
    return spd;
  }, [count]);

  const pMat = useMemo(() => new THREE.PointsMaterial({
    color: new THREE.Color(0x66ddff),
    size: 0.015,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  }), []);

  const gpMat = useMemo(() => new THREE.PointsMaterial({
    color: new THREE.Color(0x00ccff),
    size: 0.03,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  }), []);

  const rMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color(0x0088ff),
    transparent: true,
    opacity: 0.08,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  }), []);

  const ribbonGeom = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 30; i++) {
      const t = i / 30;
      pts.push(new THREE.Vector3(
        Math.sin(t * Math.PI * 3) * 0.3 + 1,
        -1.5 + t * 3 + Math.cos(t * Math.PI * 2) * 0.2,
        -0.8 + Math.sin(t * Math.PI * 2) * 0.3,
      ));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    return new THREE.TubeGeometry(curve, 30, 0.004, 3, false);
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3] * speeds[i];
      arr[i * 3 + 1] += velocities[i * 3 + 1] * speeds[i];
      arr[i * 3 + 2] += velocities[i * 3 + 2] * speeds[i];
      if (Math.abs(arr[i * 3]) > 4) {
        arr[i * 3] = (Math.random() - 0.5) * 6;
        arr[i * 3 + 1] = -2 + Math.random() * 4;
        arr[i * 3 + 2] = -2 + Math.random() * 3;
      }
      if (Math.abs(arr[i * 3 + 1]) > 2.5) arr[i * 3 + 1] = -2 + Math.random() * 4;
      if (Math.abs(arr[i * 3 + 2]) > 2.5) arr[i * 3 + 2] = -0.5 + Math.random() * 2;
    }
    pos.needsUpdate = true;

    const t = performance.now() / 1000;
    if (ribbonRef.current) {
      ribbonRef.current.rotation.y = t * 0.05;
      ribbonRef.current.position.x = 1 + Math.sin(t * 0.1) * 0.3;
      ribbonRef.current.position.y = Math.sin(t * 0.15) * 0.2;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y = t * 0.02;
      gpMat.opacity = 0.3 + Math.sin(t * 0.5) * 0.15;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <primitive object={pMat} attach="material" />
      </points>

      <points ref={glowRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[glowPos, 3]} />
        </bufferGeometry>
        <primitive object={gpMat} attach="material" />
      </points>

      <mesh ref={ribbonRef} geometry={ribbonGeom} material={rMat} />
    </group>
  );
}
