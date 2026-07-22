"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function HeroFeatures() {
  return (
    <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-grid-white" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        <ScrollReveal>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm text-accent">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Features</span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Everything You Need in{" "}
            <span className="text-gradient">One Place</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary">
            Powerful features designed to supercharge your AI workflow
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
