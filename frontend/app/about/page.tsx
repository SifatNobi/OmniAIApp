import type { Metadata } from "next";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Sparkles, Target, Eye, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about OmniAIApp's mission, vision, and the team behind the platform.",
};

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To democratize access to the world's best AI technology by unifying it into a single, powerful platform that anyone can use.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "A world where every individual and business can harness the full potential of AI without being locked into a single provider or platform.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "Privacy first, user empowerment, open ecosystems, and relentless innovation drive everything we build.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-24">
        <div className="absolute inset-0 bg-grid-white" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <ScrollReveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              <span>About Us</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Building the Future of{" "}
              <span className="text-gradient">AI</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="mx-auto max-w-2xl text-lg text-text-secondary">
              OmniAIApp was founded with a simple belief: AI should be accessible, private, and powerful for everyone.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.1}>
                <div className="glass-hover rounded-2xl border border-border p-8 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
                    <value.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-white">{value.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
