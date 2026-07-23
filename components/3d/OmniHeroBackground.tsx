"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { TubeScene } from "./TubeScene";

type Variant = "hero" | "pricing";

interface OmniHeroBackgroundProps {
  variant: Variant;
}

export function OmniHeroBackground({ variant }: OmniHeroBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOnScreen, setIsOnScreen] = useState(true);
  const [isTabActive, setIsTabActive] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [dpr, setDpr] = useState<number | [number, number]>([1, 1.5]);

  const isActive = isOnScreen && isTabActive && !reducedMotion;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsOnScreen(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);

    const onVisChange = () => setIsTabActive(!document.hidden);
    document.addEventListener("visibilitychange", onVisChange);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onMQ = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onMQ);

    const onResize = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setDpr([1, 1]);
      } else if (w < 1024) {
        setDpr([1, 1.2]);
      } else if (variant === "pricing") {
        setDpr([1, 1.2]);
      } else {
        setDpr([1, 1.5]);
      }
    };
    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisChange);
      mq.removeEventListener("change", onMQ);
      window.removeEventListener("resize", onResize);
    };
  }, [variant]);

  const overlayClass = useMemo(() => {
    if (variant === "hero") {
      return "absolute inset-0 z-[1] bg-black/50";
    }
    return "absolute inset-0 z-[1] bg-gradient-to-b from-blue-950/20 via-purple-950/10 to-blue-950/20";
  }, [variant]);

  return (
    <div ref={ref} className="absolute inset-0 z-0 overflow-hidden">
      {isActive ? (
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50, near: 0.1, far: 20 }}
          dpr={dpr}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
          }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <TubeScene variant={variant} isActive={isActive} />
        </Canvas>
      ) : null}
      <div className={overlayClass} />
    </div>
  );
}
