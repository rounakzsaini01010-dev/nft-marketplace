import { HeroSection } from "@/components/landing/HeroSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { TrendingSection } from "@/components/landing/TrendingSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { FooterSection } from "@/components/landing/FooterSection";

export default function Home() {
  return (
    <div className="bg-black">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TrendingSection />
      <HowItWorksSection />
      <FaqSection />
      <FooterSection />
    </div>
  );
}
