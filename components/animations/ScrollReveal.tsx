"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type AnimationVariant = "up" | "down" | "left" | "right" | "scale" | "blur" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: AnimationVariant;
  direction?: AnimationVariant;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
}

const springConfig = {
  type: "spring" as const,
  stiffness: 120,
  damping: 20,
};

export function ScrollReveal({
  children,
  className = "",
  variant,
  direction,
  delay = 0,
  duration = 0.7,
  distance = 40,
  once = true,
}: ScrollRevealProps) {
  const resolvedVariant = variant ?? direction ?? "up";
  const getInitial = () => {
    switch (resolvedVariant) {
      case "up": return { opacity: 0, y: distance };
      case "down": return { opacity: 0, y: -distance };
      case "left": return { opacity: 0, x: distance };
      case "right": return { opacity: 0, x: -distance };
      case "scale": return { opacity: 0, scale: 0.9 };
      case "blur": return { opacity: 0, filter: "blur(8px)" };
      case "none": return { opacity: 0 };
    }
  };

  const getAnimate = () => {
    switch (resolvedVariant) {
      case "blur": return { opacity: 1, filter: "blur(0px)", x: 0, y: 0 };
      default: return { opacity: 1, x: 0, y: 0, scale: 1 };
    }
  };

  const useSpring =
    resolvedVariant === "scale" || resolvedVariant === "blur";

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once, margin: "-40px" }}
      transition={{
        ...(useSpring ? springConfig : {}),
        duration: useSpring ? undefined : duration,
        delay,
        ease: useSpring ? undefined : [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
