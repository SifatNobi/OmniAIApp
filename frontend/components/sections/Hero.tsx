"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypingAnimation } from "@/components/animations/TypingAnimation";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const typingWords = [
  "AI Models",
  "AI Agents",
  "AI Extensions",
  "Marketplace",
  "MCP Servers",
  "Workflows",
  "Desktop",
  "Android",
  "BYOK",
  "Workspace",
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-grid-white" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6">
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm text-accent"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>The Future of AI is Here</span>
          </motion.div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <h1 className="mb-4 text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            One Platform.
            <br />
            <span className="text-gradient">Every AI.</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="mb-6">
            <p className="text-lg text-text-secondary sm:text-xl md:text-2xl">
              Access the world's leading{" "}
              <TypingAnimation
                words={typingWords}
                className="text-gradient font-semibold"
              />
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-base text-text-secondary/80 sm:text-lg">
              Access the world&apos;s leading AI models, intelligent agents, extensions, MCP servers,
              workflows, and an open marketplace from one powerful desktop and Android application.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="primary" size="xl" asChild>
                <Link href="#early-access">
                  Get Early Access
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="secondary" size="xl" asChild>
                <Link href="#waitlist">Join Waitlist</Link>
              </Button>
            </motion.div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.7}>
          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-white/[0.04] to-transparent p-1">
              <div className="rounded-xl bg-black p-4">
                <div className="grid grid-cols-4 gap-3">
                  <div className="glass col-span-1 hidden rounded-xl p-4 lg:block">
                    <div className="mb-4 h-4 w-20 rounded bg-white/5" />
                    <div className="space-y-2">
                      {["Chat", "Models", "Agents", "Marketplace"].map((item) => (
                        <div
                          key={item}
                          className="rounded-lg bg-accent/10 px-3 py-2 text-xs text-accent"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="glass col-span-4 rounded-xl p-4 lg:col-span-3">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-accent" />
                      <div className="h-3 w-3 rounded-full bg-accent/40" />
                      <div className="h-3 w-3 rounded-full bg-accent/20" />
                    </div>
                    <div className="mb-4 h-32 rounded-lg bg-gradient-to-br from-accent/10 via-accent/5 to-transparent p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-accent/30" />
                        <div className="h-3 w-24 rounded bg-white/10" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 w-3/4 rounded bg-white/5" />
                        <div className="h-3 w-1/2 rounded bg-white/5" />
                        <div className="h-3 w-2/3 rounded bg-white/5" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-8 flex-1 rounded-lg bg-white/5" />
                      <div className="h-8 w-20 rounded-lg bg-accent" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-t from-accent/10 via-transparent to-transparent blur-3xl" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
