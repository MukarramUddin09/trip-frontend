import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { useReveal } from "@/hooks/useReveal";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
  useReveal();
  useEffect(() => {
    document.title = "TripAI — Your entire journey, one intelligent platform";
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#050A14", color: "#E2E8F0" }}>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
