"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Sparkles, Store } from "lucide-react";

export function HeroMarketplace() {
  return (
    <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-grid-white" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        <ScrollReveal>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm text-accent">
            <Store className="h-3.5 w-3.5" />
            <span>Marketplace</span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Open <span className="text-gradient">Marketplace</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary">
            Discover AI agents, extensions, MCP servers, and tools built by the community
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
