"use client";

import { motion } from "framer-motion";

const orbs = [
  {
    size: 300,
    x: "10%",
    y: "20%",
    color: "rgba(37, 99, 235, 0.08)",
    duration: 8,
    delay: 0,
  },
  {
    size: 200,
    x: "80%",
    y: "30%",
    color: "rgba(59, 130, 246, 0.06)",
    duration: 10,
    delay: 1,
  },
  {
    size: 250,
    x: "50%",
    y: "70%",
    color: "rgba(96, 165, 250, 0.05)",
    duration: 12,
    delay: 2,
  },
  {
    size: 180,
    x: "20%",
    y: "80%",
    color: "rgba(37, 99, 235, 0.06)",
    duration: 9,
    delay: 0.5,
  },
  {
    size: 350,
    x: "70%",
    y: "60%",
    color: "rgba(59, 130, 246, 0.04)",
    duration: 11,
    delay: 1.5,
  },
];

export function FloatingOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          }}
          initial={{ x: orb.x, y: orb.y, scale: 0.8, opacity: 0 }}
          animate={{
            x: [orb.x, `calc(${orb.x} + 100px)`, `calc(${orb.x} - 50px)`, orb.x],
            y: [orb.y, `calc(${orb.y} - 80px)`, `calc(${orb.y} + 120px)`, orb.y],
            scale: [0.8, 1.2, 1, 0.8],
            opacity: [0.4, 0.8, 0.6, 0.4],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
