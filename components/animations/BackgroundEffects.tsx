"use client";

import { useEffect, useState } from "react";
import { Aurora } from "./Aurora";
import { Particles } from "./Particles";
import { FloatingOrbs } from "./FloatingOrbs";
import { MeshGradient } from "./MeshGradient";
import { MouseSpotlight } from "./MouseSpotlight";

export function BackgroundEffects() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <Aurora />
      <Particles count={isMobile ? 15 : 40} />
      {!isMobile && <FloatingOrbs />}
      {!isMobile && <MeshGradient />}
      <MouseSpotlight />
    </>
  );
}
