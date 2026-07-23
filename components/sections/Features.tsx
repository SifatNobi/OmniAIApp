"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import { TiltCard } from "@/components/ui/tilt-card";
import { features } from "@/constants";

export function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Everything You Need in{" "}
              <span className="text-gradient">One Place</span>
            </h2>
            <p className="text-lg text-text-secondary">
              Powerful features designed to supercharge your AI workflow
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={i * 0.05}>
              <TiltCard
                tiltDegree={6}
                glareOpacity={0.08}
                className="group glass-hover rounded-2xl border border-border bg-white/[0.02] p-6 transition-all duration-500"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <AnimatedIcon name={feature.icon} size={22} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {feature.description}
                </p>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
