"use client";

import { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";
import * as THREE from "three";
import { DragonModel } from "./DragonModel";
import { DragonParticles } from "./DragonParticles";

export function DragonScene() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [buttonHovered, setButtonHovered] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX / window.innerWidth, y: 1 - e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", handleMove, { passive: true });

    const btns = document.querySelectorAll('a[href*="kickoffpages"], a[href*="forms.gle"]');
    const onEnter = () => setButtonHovered(true);
    const onLeave = () => setButtonHovered(false);
    btns.forEach((b) => {
      b.addEventListener("mouseenter", onEnter);
      b.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      btns.forEach((b) => {
        b.removeEventListener("mouseenter", onEnter);
        b.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 1, 6], fov: 45, near: 0.1, far: 20 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[3, 5, 3]} intensity={0.8} color={new THREE.Color(0x4488ff)} />
          <directionalLight position={[-2, 3, -2]} intensity={0.3} color={new THREE.Color(0x88bbff)} />
          <hemisphereLight
            args={[new THREE.Color(0x4488ff), new THREE.Color(0x001122), 0.3]}
          />

          <DragonModel
            mouseX={mouse.x}
            mouseY={mouse.y}
            buttonHovered={buttonHovered}
          />
          <DragonParticles
            intensity={buttonHovered ? 1.5 : 1}
          />

          <EffectComposer>
            <Bloom
              luminanceThreshold={0.3}
              luminanceSmoothing={0.6}
              intensity={0.6}
              mipmapBlur
            />
            <Noise opacity={0.015} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
