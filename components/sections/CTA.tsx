"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { OmniHeroBackground } from "@/components/3d/OmniHeroBackground";

export function CTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      <OmniHeroBackground variant="pricing" />
      <div className="absolute inset-0 pointer-events-none z-[2]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl md:text-6xl">
            Ready for the{" "}
            <span className="text-gradient">Future of AI</span>?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-text-secondary">
            Join thousands of early adopters already using OmniAIApp. Be among the first to experience
            the most powerful AI platform ever created.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="primary" size="xl" asChild>
                <a href="https://forms.gle/p9pwFxEpWPxrKCDx8" target="_blank" rel="noopener noreferrer">
                  Join Waitlist
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="secondary" size="xl" asChild>
                <a href="https://19f5fa36.kickoffpages.com/" target="_blank" rel="noopener noreferrer">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get Early Access
                </a>
              </Button>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
