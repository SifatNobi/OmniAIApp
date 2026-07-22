"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Bot,
  Puzzle,
  Store,
  Server,
  Workflow,
  Key,
  Monitor,
  Smartphone,
  Shield,
  Cloud,
  Zap,
  Palette,
  Lock,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  brain: Brain,
  bot: Bot,
  puzzle: Puzzle,
  store: Store,
  server: Server,
  workflow: Workflow,
  key: Key,
  monitor: Monitor,
  smartphone: Smartphone,
  shield: Shield,
  cloud: Cloud,
  zap: Zap,
  palette: Palette,
  lock: Lock,
};

interface AnimatedIconProps {
  name: string;
  size?: number;
  className?: string;
}

export function AnimatedIcon({ name, size = 24, className = "" }: AnimatedIconProps) {
  const Icon = iconMap[name] || Brain;
  return (
    <motion.div
      whileHover={{ scale: 1.2, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      className={className}
    >
      <Icon size={size} className="text-accent" />
    </motion.div>
  );
}
