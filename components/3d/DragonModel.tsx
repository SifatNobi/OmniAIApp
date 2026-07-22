"use client";

import { useRef, useMemo, useCallback } from "react";
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
  const headGroupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
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
    const arr = pos.array;
    const vertsPerRing = radialSegs + 1;
    for (let t = 0; t <= tubularSegs; t++) {
      let cx = 0, cy = 0, cz = 0;
      const base = t * vertsPerRing;
      for (let r = 0; r < vertsPerRing; r++) {
        const idx = (base + r) * 3;
        cx += arr[idx];
        cy += arr[idx + 1];
        cz += arr[idx + 2];
      }
      cx /= vertsPerRing;
      cy /= vertsPerRing;
      cz /= vertsPerRing;
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
    return { bodyGeom: geom, origPos: new Float32Array(pos.array) };
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
      const up = new THREE.Vector3(0, 1, 0);
      const right = new THREE.Vector3().crossVectors(tan, up).normalize();
      const s = Math.sin(t * Math.PI) * 0.08;
      const offset = t < 0.5 ? 0.02 + t * 0.06 : 0.05 - (t - 0.5) * 0.08;
      pts.push(new THREE.Vector3(p.x + right.x * s, p.y + offset, p.z + right.z * s));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const g = new THREE.TubeGeometry(curve, 60, 0.003, 4, false);
    return g;
  }, [bodyCurve]);

  const mat = useMemo(() => createDragonMaterial(), []);

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
    envMapIntensity: 0.5,
  }), []);

  const eyeMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color(0x00eeff),
  }), []);

  const blink = useCallback(() => { isBlinking.current = true; }, []);

  useFrame((_, delta) => {
    if (!matRef.current || !bodyRef.current) return;
    const t = matRef.current.uniforms.uTime.value + delta;
    matRef.current.uniforms.uTime.value = t;

    blinkTimer.current -= delta;
    if (blinkTimer.current <= 0) {
      blink();
      blinkTimer.current = 6 + Math.random() * 5;
    }
    if (isBlinking.current) {
      const bt = t * 12;
      const bp = bt - Math.floor(bt);
      if (bp > 0.12) isBlinking.current = false;
    }

    const headTilt = Math.sin(t * 0.4) * 0.015 + Math.sin(t * 0.7) * 0.01;
    const headTurn = Math.sin(t * 0.25) * 0.025;
    if (headGroupRef.current) {
      headGroupRef.current.rotation.z = headTilt + (mouseX - 0.5) * 0.04;
      headGroupRef.current.rotation.y = headTurn + (mouseX - 0.5) * 0.03;
      headGroupRef.current.rotation.x = (mouseY - 0.5) * 0.03;
    }

    if (eyelRef.current) {
      const s = isBlinking.current ? 0.1 : 1;
      eyelRef.current.scale.y = s;
      eyerRef.current!.scale.y = s;
      const m = eyelRef.current.material as THREE.MeshBasicMaterial;
      m.color.setHSL(0.55, 1, isBlinking.current ? 0.9 : 0.6 + (buttonHovered ? 0.3 : 0));
    }

    energyPhase.current += delta * 0.3;
    matRef.current.uniforms.uEnergyPulse.value = Math.sin(energyPhase.current) * 0.5 + 0.5;
    matRef.current.uniforms.uEyeGlow.value = buttonHovered ? 0.5 : 0.1;

    if (bodyRef.current) {
      const pos = bodyGeom.getAttribute("position") as THREE.BufferAttribute;
      const arr = pos.array;
      const len = origPos.length;
      for (let i = 0; i < len; i += 3) {
        const idx = i / 3;
        const along = (idx % 80) / 80;
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

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.2) * 0.025;
      const px = (mouseX - 0.5) * 0.015;
      const py = (mouseY - 0.5) * 0.015;
      groupRef.current.position.x += (px - groupRef.current.position.x) * 0.005;
      groupRef.current.position.z += (py - groupRef.current.position.z) * 0.005;
    }

    if (w1Ref.current) {
      const sway = Math.sin(t * 0.4) * 0.02;
      w1Ref.current.rotation.z = sway;
      w2Ref.current!.rotation.z = -sway * 0.7;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={bodyRef} geometry={bodyGeom} material={mat} />
      <mesh geometry={dorsalGeom} material={dMat} />

      <group ref={headGroupRef} position={[2.85, 1.4, -0.6]}>
        <mesh position={[0, 0, 0.1]}>
          <sphereGeometry args={[0.13, 10, 8]} />
          <meshPhysicalMaterial color={new THREE.Color(0x0a1a3a)} metalness={0.7} roughness={0.2} />
        </mesh>
        <mesh position={[0.08, -0.02, 0]}>
          <sphereGeometry args={[0.08, 8, 6]} />
          <meshPhysicalMaterial color={new THREE.Color(0x0a1a3a)} metalness={0.7} roughness={0.2} />
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
          <mesh position={[0, 0, 0]} rotation={[0.2, 0.3, 0]}>
            <coneGeometry args={[0.015, 0.22, 4]} />
            <primitive object={antlerMat} attach="material" />
          </mesh>
          <mesh position={[0, 0, 0.04]} rotation={[0.2, -0.3, 0]}>
            <coneGeometry args={[0.012, 0.18, 4]} />
            <primitive object={antlerMat} attach="material" />
          </mesh>
          <mesh position={[0.04, 0.08, -0.01]} rotation={[0.5, 0.2, 0.1]}>
            <coneGeometry args={[0.01, 0.1, 4]} />
            <primitive object={antlerMat} attach="material" />
          </mesh>
          <mesh position={[0.04, 0.08, 0.03]} rotation={[0.5, -0.2, 0.1]}>
            <coneGeometry args={[0.008, 0.08, 4]} />
            <primitive object={antlerMat} attach="material" />
          </mesh>
        </group>
      </group>

      <mesh ref={w1Ref} geometry={whiskerGeom1} material={wMat} />
      <mesh ref={w2Ref} geometry={whiskerGeom2} material={wMat} />

      <pointLight position={[2.5, 1.2, -0.5]} intensity={0.25} color={new THREE.Color(0x0088ff)} distance={4} />
    </group>
  );
}
