import { Hero } from "@/components/sections/Hero";
import { TrustedSection } from "@/components/sections/TrustedSection";
import { Features } from "@/components/sections/Features";
import { MarketplaceSection } from "@/components/sections/MarketplaceSection";
import { DesktopShowcase } from "@/components/sections/DesktopShowcase";
import { MobileShowcase } from "@/components/sections/MobileShowcase";
import { WhyOmniAI } from "@/components/sections/WhyOmniAI";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { PricingSection } from "@/components/sections/PricingSection";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedSection />
      <Features />
      <MarketplaceSection />
      <DesktopShowcase />
      <MobileShowcase />
      <WhyOmniAI />
      <Stats />
      <Testimonials />
      <FAQ />
      <PricingSection />
      <CTA />
    </>
  );
}
