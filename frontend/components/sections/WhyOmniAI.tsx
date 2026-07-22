"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { AnimatedIcon } from "@/components/ui/animated-icon";

const reasons = [
  {
    icon: "monitor",
    title: "One Platform",
    desc: "Access every AI tool from a single, unified interface",
  },
  {
    icon: "brain",
    title: "Every AI",
    desc: "All major AI models in one place with seamless switching",
  },
  {
    icon: "store",
    title: "Marketplace",
    desc: "Discover community-built extensions and tools",
  },
  {
    icon: "smartphone",
    title: "Desktop & Android",
    desc: "Native apps for Windows, macOS, Linux, and Android",
  },
  {
    icon: "puzzle",
    title: "Extensions",
    desc: "Extend functionality with AI-powered plugins",
  },
  {
    icon: "server",
    title: "MCP Servers",
    desc: "Connect real-time data and tools to your AI",
  },
  {
    icon: "key",
    title: "BYOK",
    desc: "Use your own API keys across all providers",
  },
  {
    icon: "shield",
    title: "Privacy",
    desc: "Your data stays on your device, always",
  },
  {
    icon: "zap",
    title: "Speed",
    desc: "Lightning-fast performance with instant responses",
  },
  {
    icon: "palette",
    title: "Customization",
    desc: "Personalize everything to your workflow",
  },
];

export function WhyOmniAI() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Why <span className="text-gradient">OmniAIApp</span>?
            </h2>
            <p className="text-lg text-text-secondary">
              The all-in-one AI platform designed for power users
            </p>
          </div>
        </ScrollReveal>

        <div className="relative">
          <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-accent/20 via-accent/10 to-transparent hidden md:block" />
          <div className="space-y-8">
            {reasons.map((reason, i) => (
              <ScrollReveal key={reason.title} delay={i * 0.05} direction="left">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="group relative flex items-start gap-6 rounded-2xl border border-transparent p-4 transition-all duration-300 hover:border-border hover:bg-white/[0.02]"
                >
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/10 md:ml-4">
                    <div className="absolute -left-9 top-1/2 hidden h-3 w-3 -translate-y-1/2 rounded-full border-2 border-accent bg-black md:block" />
                    <AnimatedIcon name={reason.icon} size={22} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1 text-lg font-semibold text-white">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-text-secondary">{reason.desc}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
