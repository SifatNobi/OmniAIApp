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
          <motion.div
            className="flex w-max"
            animate={{ x: "-50%" }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          >
            {[...logos, ...logos].map((name, i) => (
              <span
                key={i}
                className="mr-16 whitespace-nowrap text-lg font-semibold text-text-secondary/40 transition-colors hover:text-text-secondary/60"
              >
                {name}
              </span>
            ))}
          </motion.div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent" />
        </div>
      </div>
    </section>
  );
}
