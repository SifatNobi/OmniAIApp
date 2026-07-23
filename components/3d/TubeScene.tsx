"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

type Variant = "hero" | "pricing";

const COLORS = [
  0x2563eb, 0x3b82f6, 0x06b6d4, 0x7c3aed, 0x8b5cf6,
];

interface TubeData {
  mesh: THREE.Mesh;
  phase: number;
  speed: number;
  floatAmp: number;
  basePos: THREE.Vector3;
  baseRot: THREE.Euler;
}

function buildTube(
  color: number,
  curvePoints: THREE.Vector3[],
  radius: number,
  opacity: number
): THREE.Mesh {
  const curve = new THREE.CatmullRomCurve3(curvePoints);
  const geom = new THREE.TubeGeometry(curve, 40, radius, 6, false);
  const mat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    emissive: new THREE.Color(color),
    emissiveIntensity: 0.4,
    metalness: 0.1,
    roughness: 0.3,
    transparent: true,
    opacity,
    clearcoat: 0.3,
    clearcoatRoughness: 0.4,
    blending: THREE.NormalBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.frustumCulled = false;
  return mesh;
}

function generateCurve(
  areaSize: number,
  depthRange: number
): THREE.Vector3[] {
  const segs = 4 + Math.floor(Math.random() * 2);
  const pts: THREE.Vector3[] = [];
  const sx = (Math.random() - 0.5) * areaSize;
  const sy = (Math.random() - 0.5) * areaSize;
  const sz = (Math.random() - 0.5) * depthRange;
  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    const x = sx + Math.sin(t * Math.PI * 2 + Math.random() * 0.5) * areaSize * 0.3;
    const y = sy + Math.cos(t * Math.PI * 1.5 + Math.random() * 0.5) * areaSize * 0.25;
    const z = sz + Math.sin(t * Math.PI * 3 + Math.random() * 0.5) * depthRange * 0.2;
    pts.push(new THREE.Vector3(x, y, z));
  }
  return pts;
}

interface TubeSceneProps {
  variant: Variant;
  isActive: boolean;
}

export function TubeScene({ variant, isActive }: TubeSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const cursorRef = useRef({ x: 0.5, y: 0.5 });
  const timeRef = useRef(0);
  const tubesRef = useRef<TubeData[]>([]);
  const { size } = useThree();

  const config = useMemo(() => {
    const isMobile = size.width < 768;
    const isTablet = size.width < 1024;
    const tubeCount = variant === "hero"
      ? (isMobile ? 6 : isTablet ? 10 : 15)
      : (isMobile ? 4 : isTablet ? 6 : 8);
    return {
      tubeCount,
      opacity: variant === "hero" ? 0.7 : 0.25,
      radius: variant === "hero" ? 0.04 : 0.03,
      areaSize: variant === "hero" ? 8 : 6,
      depthRange: variant === "hero" ? 4 : 3,
      bloomThreshold: variant === "hero" ? 0.2 : 0.4,
      bloomIntensity: variant === "hero" ? 0.8 : 0.4,
      speed: variant === "hero" ? 1 : 0.6,
      cursorStrength: variant === "hero" ? 0.03 : 0.008,
    };
  }, [variant, size.width]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      cursorRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      cursorRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    if (!groupRef.current) return;
    while (groupRef.current.children.length > 0) {
      const child = groupRef.current.children[0];
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        (child.material as THREE.Material).dispose();
      }
      groupRef.current.remove(child);
    }
    tubesRef.current = [];

    const newTubes: TubeData[] = [];
    for (let i = 0; i < config.tubeCount; i++) {
      const colorIdx = i % COLORS.length;
      const pts = generateCurve(config.areaSize, config.depthRange);
      const mesh = buildTube(COLORS[colorIdx], pts, config.radius, config.opacity);
      groupRef.current.add(mesh);

      newTubes.push({
        mesh,
        phase: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.3,
        floatAmp: 0.1 + Math.random() * 0.2,
        basePos: mesh.position.clone(),
        baseRot: mesh.rotation.clone(),
      });
    }
    tubesRef.current = newTubes;
  }, [config.tubeCount, config.radius, config.opacity, config.areaSize, config.depthRange]);

  useFrame((state, delta) => {
    if (!isActive || !groupRef.current) return;
    timeRef.current += delta * config.speed;
    const t = timeRef.current;
    const cx = cursorRef.current.x * config.cursorStrength;
    const cy = cursorRef.current.y * config.cursorStrength;

    tubesRef.current.forEach((tube) => {
      const float = Math.sin(t * tube.speed + tube.phase) * tube.floatAmp;
      const driftX = Math.sin(t * 0.1 + tube.phase) * 0.05;
      const driftZ = Math.cos(t * 0.08 + tube.phase) * 0.05;
      tube.mesh.position.x = tube.basePos.x + cx + driftX;
      tube.mesh.position.y = tube.basePos.y + cy + float;
      tube.mesh.position.z = tube.basePos.z + driftZ;

      tube.mesh.rotation.x = tube.baseRot.x + Math.sin(t * 0.15 + tube.phase) * 0.02;
      tube.mesh.rotation.y = tube.baseRot.y + Math.cos(t * 0.1 + tube.phase) * 0.03;
    });

    if (variant === "hero") {
      groupRef.current.rotation.y = Math.sin(t * 0.02) * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 3, 4]} intensity={0.5} color={new THREE.Color(0x3b82f6)} />
      <pointLight position={[-3, -2, 3]} intensity={0.3} color={new THREE.Color(0x7c3aed)} />
      <group ref={groupRef} />
      <EffectComposer>
        <Bloom
          luminanceThreshold={config.bloomThreshold}
          luminanceSmoothing={0.4}
          intensity={config.bloomIntensity}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}
