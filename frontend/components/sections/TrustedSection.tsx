"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const logos = [
  "OpenAI", "Anthropic", "Google", "Meta", "Mistral",
  "Microsoft", "Amazon", "Hugging Face", "Stability AI", "Midjourney",
];

export function TrustedSection() {
  return (
    <section className="relative border-y border-border/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-text-secondary">
            Trusted by users of leading AI platforms
          </p>
        </ScrollReveal>
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee gap-16">
            {[...logos, ...logos].map((name, i) => (
              <div
                key={i}
                className="flex items-center justify-center"
              >
                <span className="whitespace-nowrap text-lg font-semibold text-text-secondary/40 transition-colors hover:text-text-secondary/60">
                  {name}
                </span>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent" />
        </div>
      </div>
    </section>
  );
}
