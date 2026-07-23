"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltDegree?: number;
  glareOpacity?: number;
}

export function TiltCard({
  children,
  className = "",
  tiltDegree = 8,
  glareOpacity = 0.15,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const smoothX = useSpring(x, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(smoothY, [0, 1], [tiltDegree, -tiltDegree]);
  const rotateY = useTransform(smoothX, [0, 1], [-tiltDegree, tiltDegree]);

  const glareX = useTransform(smoothX, [0, 1], [0, 100]);
  const glareY = useTransform(smoothY, [0, 1], [0, 100]);

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <div style={{ transformStyle: "preserve-3d" }} className="relative">
        {children}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,${glareOpacity}) 0%, transparent 60%)`
            ),
          }}
        />
      </div>
    </motion.div>
  );
}
