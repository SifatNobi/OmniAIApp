import type { Metadata } from "next";
import { PricingSection } from "@/components/sections/PricingSection";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "OmniAIApp pricing - currently free during testing. Join the waitlist for early access and exclusive launch benefits.",
};

export default function PricingPage() {
  return (
    <>
      <div className="pt-20" />
      <PricingSection />
    </>
  );
}
