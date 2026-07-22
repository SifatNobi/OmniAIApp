"use client";

import { useRef, useMemo, useCallback, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createDragonMaterial } from "./DragonShader";

interface DragonModelProps {
  mouseX?: number;
  mouseY?: number;
  buttonHovered?: boolean;
}

export function DragonModel({ mouseX = 0.5, mouseY = 0.5, buttonHovered = false }: DragonModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const eyelRef = useRef<THREE.Mesh>(null);
  const eyerRef = useRef<THREE.Mesh>(null);
  const w1Ref = useRef<THREE.Mesh>(null);
  const w2Ref = useRef<THREE.Mesh>(null);

  const blinkTimer = useRef(4 + Math.random() * 3);
  const isBlinking = useRef(false);
  const energyPhase = useRef(0);

  const bodyCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-3.0, -1.6, 0.4),
    new THREE.Vector3(-2.5, -1.4, 0.0),
    new THREE.Vector3(-1.8, -0.9, -0.4),
    new THREE.Vector3(-0.8, -0.4, -0.6),
    new THREE.Vector3(0.2, -0.1, -0.5),
    new THREE.Vector3(1.0, 0.2, -0.3),
    new THREE.Vector3(1.8, 0.6, -0.5),
    new THREE.Vector3(2.4, 1.0, -0.7),
    new THREE.Vector3(2.8, 1.4, -0.6),
  ]), []);

  const { bodyGeom, origPos } = useMemo(() => {
    const tubularSegs = 80;
    const radialSegs = 12;
    const avgRadius = 0.12;
    const geom = new THREE.TubeGeometry(bodyCurve, tubularSegs, avgRadius, radialSegs, false);
    const pos = geom.getAttribute("position") as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    const vertsPerRing = radialSegs + 1;

    for (let t = 0; t <= tubularSegs; t++) {
      let cx = 0, cy = 0, cz = 0;
      const base = t * vertsPerRing;
      for (let r = 0; r < vertsPerRing; r++) {
        const idx = (base + r) * 3;
        cx += arr[idx]; cy += arr[idx + 1]; cz += arr[idx + 2];
      }
      cx /= vertsPerRing; cy /= vertsPerRing; cz /= vertsPerRing;
      const tubularT = t / tubularSegs;
      const cb = Math.sin(tubularT * Math.PI) * 0.08;
      const taper = 1.0 - tubularT * 0.5;
      const targetR = Math.max(0.04, (0.1 + cb * 1.2) * taper);
      const scale = avgRadius > 0 ? targetR / avgRadius : 1;
      for (let r = 0; r < vertsPerRing; r++) {
        const idx = (base + r) * 3;
        arr[idx] = cx + (arr[idx] - cx) * scale;
        arr[idx + 1] = cy + (arr[idx + 1] - cy) * scale;
        arr[idx + 2] = cz + (arr[idx + 2] - cz) * scale;
      }
    }
    geom.computeVertexNormals();
    return { bodyGeom: geom, origPos: new Float32Array(arr) };
  }, [bodyCurve]);

  const whiskerGeom1 = useMemo(() => {
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(2.9, 1.4, -0.5),
      new THREE.Vector3(3.6, 1.6, -0.9),
      new THREE.Vector3(4.2, 1.2, -1.1),
      new THREE.Vector3(4.6, 0.7, -1.0),
    ]);
    return new THREE.TubeGeometry(c, 24, 0.009, 4, false);
  }, []);

  const whiskerGeom2 = useMemo(() => {
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(2.9, 1.3, -0.7),
      new THREE.Vector3(3.5, 1.1, -1.3),
      new THREE.Vector3(4.1, 0.6, -1.4),
      new THREE.Vector3(4.5, 0.2, -1.2),
    ]);
    return new THREE.TubeGeometry(c, 24, 0.008, 4, false);
  }, []);

  const dorsalGeom = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < 60; i++) {
      const t = i / 60;
      const p = bodyCurve.getPoint(t);
      const tan = bodyCurve.getTangent(t);
      const right = new THREE.Vector3().crossVectors(tan, new THREE.Vector3(0, 1, 0)).normalize();
      const s = Math.sin(t * Math.PI) * 0.08;
      const offset = t < 0.5 ? 0.02 + t * 0.06 : 0.05 - (t - 0.5) * 0.08;
      pts.push(new THREE.Vector3(p.x + right.x * s, p.y + offset, p.z + right.z * s));
    }
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 60, 0.003, 4, false);
  }, [bodyCurve]);

  const wMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xc0c8e0), metalness: 0.3, roughness: 0.2,
    transparent: true, opacity: 0.85,
  }), []);

  const dMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x00bbff), emissive: new THREE.Color(0x0088ff),
    emissiveIntensity: 0.4, transparent: true, opacity: 0.2,
    metalness: 0.4, roughness: 0.1, side: THREE.DoubleSide,
  }), []);

  const antlerMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xe8ddd0), metalness: 0.15, roughness: 0.3,
  }), []);

  const headMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x0a1a3a), metalness: 0.7, roughness: 0.2,
  }), []);

  const eyeMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color(0x00eeff),
  }), []);

  const blink = useCallback(() => { isBlinking.current = true; }, []);

  useEffect(() => {
    if (!bodyRef.current) return;
    const pos = bodyRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < arr.length; i++) arr[i] = origPos[i];
    pos.needsUpdate = true;
  }, [origPos]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    blinkTimer.current -= delta;
    if (blinkTimer.current <= 0) {
      blink();
      blinkTimer.current = 6 + Math.random() * 5;
    }
    if (isBlinking.current) {
      const bt = t * 12;
      if (bt - Math.floor(bt) > 0.12) isBlinking.current = false;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.position.y = Math.sin(t * 0.15) * 0.15;
      groupRef.current.position.x = Math.sin(t * 0.1) * 0.1;
      groupRef.current.position.z = Math.cos(t * 0.08) * 0.1;
    }

    if (eyelRef.current) {
      const s = isBlinking.current ? 0.1 : 1;
      eyelRef.current.scale.y = s;
      eyerRef.current!.scale.y = s;
    }

    energyPhase.current += delta * 0.3;

    if (bodyRef.current) {
      const pos = bodyRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
      const arr = pos.array as Float32Array;
      const len = origPos.length;
      for (let i = 0; i < len; i += 3) {
        const idx = i / 3;
        const seg = idx % 13;
        const ring = Math.floor(idx / 13);
        const along = ring / 80;

        const tailW = 1.0 - along;
        const midW = Math.sin(along * Math.PI);

        arr[i] = origPos[i]
          + Math.sin(along * 7 + t * 0.55) * 0.025 * midW
          + Math.sin(along * 9 + t * 0.7) * 0.04 * tailW;

        arr[i + 1] = origPos[i + 1]
          + Math.sin(t * 0.3) * 0.012 * midW
          + Math.sin(t * 0.5 + along * 2) * 0.015 * tailW;

        arr[i + 2] = origPos[i + 2]
          + Math.sin(along * 6 + t * 0.35) * 0.01 * midW;
      }
      pos.needsUpdate = true;
      bodyRef.current.geometry.computeVertexNormals();
    }

    if (w1Ref.current) {
      const sway = Math.sin(t * 0.4) * 0.02;
      w1Ref.current.rotation.z = sway;
      w2Ref.current!.rotation.z = -sway * 0.7;
    }
  });

  const dragonMat = useMemo(() => createDragonMaterial(), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    dragonMat.uniforms.uTime.value = t;
    dragonMat.uniforms.uBodyWave.value = Math.sin(t * 0.15) * 0.3;
    dragonMat.uniforms.uEyeGlow.value = buttonHovered ? 0.6 : 0.1;
    dragonMat.uniforms.uEnergyPulse.value = Math.sin(energyPhase.current) * 0.5 + 0.5;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={bodyRef} geometry={bodyGeom} material={dragonMat} />
      <mesh geometry={dorsalGeom} material={dMat} />

      <group position={[2.85, 1.4, -0.6]}>
        <mesh position={[0, 0, 0.1]} material={headMat}>
          <sphereGeometry args={[0.13, 10, 8]} />
        </mesh>
        <mesh position={[0.08, -0.02, 0]} material={headMat}>
          <sphereGeometry args={[0.08, 8, 6]} />
        </mesh>

        <mesh ref={eyelRef} position={[0.04, 0.04, -0.1]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <primitive object={eyeMat} attach="material" />
        </mesh>
        <mesh ref={eyerRef} position={[0.04, 0.04, 0.1]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <primitive object={eyeMat} attach="material" />
        </mesh>

        <group position={[0.02, 0.15, -0.02]}>
          <mesh position={[0, 0, 0]} rotation={[0.2, 0.3, 0]} material={antlerMat}>
            <coneGeometry args={[0.015, 0.22, 4]} />
          </mesh>
          <mesh position={[0, 0, 0.04]} rotation={[0.2, -0.3, 0]} material={antlerMat}>
            <coneGeometry args={[0.012, 0.18, 4]} />
          </mesh>
          <mesh position={[0.04, 0.08, -0.01]} rotation={[0.5, 0.2, 0.1]} material={antlerMat}>
            <coneGeometry args={[0.01, 0.1, 4]} />
          </mesh>
          <mesh position={[0.04, 0.08, 0.03]} rotation={[0.5, -0.2, 0.1]} material={antlerMat}>
            <coneGeometry args={[0.008, 0.08, 4]} />
          </mesh>
        </group>
      </group>

      <mesh ref={w1Ref} geometry={whiskerGeom1} material={wMat} />
      <mesh ref={w2Ref} geometry={whiskerGeom2} material={wMat} />

      <pointLight position={[2.5, 1.2, -0.5]} intensity={0.25} color={new THREE.Color(0x0088ff)} distance={4} />
    </group>
  );
}
