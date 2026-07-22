"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Monitor, BarChart3, MessageSquare, Bot, Workflow } from "lucide-react";

export function DesktopShowcase() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Powerful <span className="text-gradient">Desktop</span> Experience
            </h2>
            <p className="text-lg text-text-secondary">
              A native desktop application for Windows, macOS, and Linux
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-white/[0.03] to-transparent p-2">
              <div className="rounded-xl bg-black p-4 sm:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/50" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                    <div className="h-3 w-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex-1 text-center text-xs text-text-secondary">
                    OmniAIApp Premium Workspace
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                  <div className="glass col-span-1 hidden rounded-xl p-3 lg:block">
                    {[
                      { icon: MessageSquare, label: "Chat", active: true },
                      { icon: Bot, label: "Agents", active: false },
                      { icon: Workflow, label: "Workflows", active: false },
                      { icon: BarChart3, label: "Analytics", active: false },
                    ].map(({ icon: Icon, label, active }) => (
                      <div
                        key={label}
                        className={`mb-1 flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition-colors ${
                          active
                            ? "bg-accent/20 text-accent"
                            : "text-text-secondary hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {label}
                      </div>
                    ))}
                  </div>
                  <div className="glass col-span-1 rounded-xl p-4 lg:col-span-2">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/30 text-[10px] text-accent">
                        AI
                      </div>
                      <div>
                        <div className="text-xs font-medium text-white">AI Assistant</div>
                        <div className="text-[10px] text-text-secondary">Online</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="rounded-lg bg-white/5 p-3">
                        <p className="text-xs text-text-secondary">
                          Generate a React component for a data table with sorting and filtering
                        </p>
                      </div>
                      <div className="rounded-lg bg-accent/10 p-3">
                        <p className="text-xs text-white">
                          Here&apos;s a production-ready data table component with sorting,
                          filtering, and pagination using React and TypeScript...
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-8 flex-1 rounded-lg border border-border bg-transparent px-3 text-xs text-text-secondary flex items-center">
                          Type your message...
                        </div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                          <MessageSquare className="h-3.5 w-3.5 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="glass col-span-1 hidden rounded-xl p-4 lg:block">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-medium text-white">Activity</span>
                      <BarChart3 className="h-3.5 w-3.5 text-accent" />
                    </div>
                    <div className="mb-3 h-20 rounded-lg bg-gradient-to-t from-accent/20 to-transparent" />
                    <div className="space-y-2">
                      {["Model Usage", "Agent Tasks", "Tokens"].map((label) => (
                        <div key={label}>
                          <div className="mb-1 flex justify-between text-[10px] text-text-secondary">
                            <span>{label}</span>
                            <span>--</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-white/5">
                            <div
                              className="h-full rounded-full bg-accent/50"
                              style={{ width: `${30 + Math.random() * 50}%` }}
                            />
                          </div>
                        </div>
                      ))}
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
