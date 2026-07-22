"use client";

import { motion } from "framer-motion";
import { Sparkles, Check, ArrowRight, Clock, Gift } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-accent/3 rounded-full blur-[80px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mb-6 inline-flex"
            >
              <Badge variant="gradient" className="text-sm px-4 py-1.5">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                Pricing Coming Soon
              </Badge>
            </motion.div>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Simple, Transparent <span className="text-gradient">Pricing</span>
            </h2>
            <p className="text-lg text-text-secondary">
              We&apos;re currently finalizing our pricing plans to deliver the best value possible for everyone.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mx-auto max-w-lg">
            <motion.div
              whileHover={{ y: -8 }}
              className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-white/[0.04] to-transparent p-1"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 rounded-2xl blur-xl opacity-50" />
              <div className="relative rounded-2xl bg-gradient-to-b from-black to-secondary p-8 md:p-10">
                <div className="mb-6 text-center">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-4 inline-flex"
                  >
                    <Badge variant="success" className="text-sm px-4 py-1.5">
                      <Clock className="mr-1.5 h-3.5 w-3.5" />
                      Currently FREE During Testing
                    </Badge>
                  </motion.div>
                  <p className="text-text-secondary leading-relaxed">
                    OmniAIApp is currently available <span className="text-white font-semibold">free to use during the testing phase</span>.
                    Early users can explore the platform, experience upcoming features, and help shape the future
                    of OmniAIApp before the official launch.
                  </p>
                </div>

                <div className="mb-8 space-y-3">
                  {[
                    "Access to all AI models",
                    "Full marketplace access",
                    "Unlimited workflows",
                    "Priority community support",
                    "Early adopter badge",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20">
                        <Check className="h-3 w-3 text-accent" />
                      </div>
                      <span className="text-sm text-text-secondary">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-6 rounded-xl border border-accent/20 bg-acent/5 p-4">
                  <div className="flex items-center gap-3">
                    <Gift className="h-5 w-5 text-accent shrink-0" />
                    <p className="text-sm text-text-secondary">
                      When pricing becomes available, early adopters and waitlist members will receive
                      <span className="text-white"> priority access</span> and
                      <span className="text-white"> exclusive launch benefits</span>.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1"
                  >
                    <Button variant="primary" size="lg" className="w-full" asChild>
                      <Link href="#waitlist">
                        Join Waitlist
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1"
                  >
                    <Button variant="secondary" size="lg" className="w-full" asChild>
                      <Link href="#early-access">
                        <Sparkles className="mr-1.5 h-4 w-4" />
                        Get Early Access
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
