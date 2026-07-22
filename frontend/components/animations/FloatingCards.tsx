"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingCardsProps {
  children: ReactNode;
  className?: string;
  floatAmount?: number;
  duration?: number;
  delay?: number;
}

export function FloatingCards({
  children,
  className = "",
  floatAmount = 10,
  duration = 4,
  delay = 0,
}: FloatingCardsProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-floatAmount, floatAmount, -floatAmount],
        rotate: [-1, 1, -1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
