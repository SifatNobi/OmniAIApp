import type { Metadata } from "next";
import { Features } from "@/components/sections/Features";
import { HeroFeatures } from "./hero-features";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Discover the powerful features of OmniAIApp - Multiple AI models, AI agents, extensions, marketplace, MCP servers, workflow automation, and more.",
};

export default function FeaturesPage() {
  return (
    <>
      <HeroFeatures />
      <Features />
    </>
  );
}
