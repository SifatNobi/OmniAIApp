"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, TrendingUp, Flame, Download } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { marketplaceItems, marketplaceCategories } from "@/constants";
import { cn } from "@/lib/utils";

export function MarketplaceSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = marketplaceItems.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="marketplace" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Open <span className="text-gradient">Marketplace</span>
            </h2>
            <p className="text-lg text-text-secondary">
              Discover AI agents, extensions, MCP servers, and tools built by the community
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                placeholder="Search marketplace..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-border bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-text-secondary/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 transition-all"
              />
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-2 sm:pb-0">
              {marketplaceCategories.slice(0, 7).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300",
                    activeCategory === category
                      ? "bg-accent text-white"
                      : "border border-border bg-white/5 text-text-secondary hover:border-accent/50 hover:text-white"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="glass-hover group relative overflow-hidden rounded-2xl border border-border bg-white/[0.02] p-5"
              >
                <TiltCard tiltDegree={5} glareOpacity={0.06}>
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex gap-1">
                    {item.featured && (
                      <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-medium text-accent">
                        Featured
                      </span>
                    )}
                    {item.trending && (
                      <TrendingUp className="h-3.5 w-3.5 text-green-400" />
                    )}
                  </div>
                </div>
                <h3 className="mb-1 text-sm font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mb-3 text-xs leading-relaxed text-text-secondary">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      <span className="text-xs text-text-secondary">{item.rating}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Download className="h-3 w-3 text-text-secondary" />
                      <span className="text-xs text-text-secondary">{item.downloads}</span>
                    </div>
                  </div>
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-text-secondary">
                    {item.category}
                  </span>
                </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
