"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { motion, useSpring } from "framer-motion";

export function ScrollProgress() {
  const progress = useScrollProgress();
  const scaleX = useSpring(progress / 100, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60 h-[2px] origin-left bg-gradient-to-r from-accent to-accent-hover"
      style={{ scaleX }}
    />
  );
}
