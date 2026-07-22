"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Smartphone, MessageSquare, Sparkles } from "lucide-react";

export function MobileShowcase() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              AI in Your <span className="text-gradient">Pocket</span>
            </h2>
            <p className="text-lg text-text-secondary">
              Take OmniAIApp anywhere with our feature-rich Android application
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col items-center justify-center gap-8 lg:flex-row">
          <ScrollReveal direction="left" delay={0.2}>
            <div className="relative">
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative mx-auto h-[580px] w-[280px] overflow-hidden rounded-[3rem] border-2 border-border bg-black p-3"
              >
                <div className="mb-2 flex items-center justify-center">
                  <div className="h-1.5 w-20 rounded-full bg-white/10" />
                </div>
                <div className="glass mb-3 rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <span className="text-xs font-medium text-white">OmniAIApp</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/30 text-[10px] text-accent">
                      AI
                    </div>
                    <div className="rounded-2xl rounded-tl-none bg-accent/10 p-2.5">
                      <p className="text-[11px] text-white">
                        What can I help you with today?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start justify-end gap-2">
                    <div className="rounded-2xl rounded-tr-none bg-white/10 p-2.5">
                      <p className="text-[11px] text-white">
                        Write a blog post about AI trends
                      </p>
                    </div>
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] text-white">
                      U
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/30 text-[10px] text-accent">
                      AI
                    </div>
                    <div className="rounded-2xl rounded-tl-none bg-accent/10 p-2.5">
                      <p className="text-[11px] text-white">
                        Here&apos;s a comprehensive blog post about the top AI trends shaping 2026...
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-x-3 bottom-3 glass rounded-xl p-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-text-secondary" />
                    <div className="h-6 flex-1 rounded-lg bg-white/5" />
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent">
                      <MessageSquare className="h-3.5 w-3.5 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.3}>
            <div className="max-w-md space-y-4">
              {[
                { label: "Native Android Experience", desc: "Optimized for all Android devices with Material You design" },
                { label: "Offline Capabilities", desc: "Use AI models locally without an internet connection" },
                { label: "Voice Input", desc: "Speak to AI with built-in voice recognition" },
                { label: "Biometric Security", desc: "Fingerprint and face unlock for secure access" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.5 }}
                  className="glass-hover rounded-xl border border-border p-4"
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-4 w-4 text-accent" />
                    <div>
                      <div className="text-sm font-medium text-white">{item.label}</div>
                      <div className="text-xs text-text-secondary">{item.desc}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
