import type { Metadata } from "next";
import { MarketplaceSection } from "@/components/sections/MarketplaceSection";
import { HeroMarketplace } from "./hero-marketplace";

export const metadata: Metadata = {
  title: "Marketplace",
  description:
    "Discover AI agents, extensions, MCP servers, and tools in the OmniAIApp open marketplace.",
};

export default function MarketplacePage() {
  return (
    <>
      <HeroMarketplace />
      <MarketplaceSection />
    </>
  );
}
