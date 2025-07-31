"use client";

import AboutSection from "@/components/sections/about-section";
import ContactSection from "@/components/sections/contact-section";
import HeroSection from "@/components/sections/hero-section";
import PortfolioSection from "@/components/sections/portfolio-section";
import ServicesSection from "@/components/sections/services-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import { ConnectedFlowingPattern } from "@/components/ui/abstract-wave-pattern";
import { useLanguage } from "@/contexts/language-context";

export default function Home() {
  const { locale, isLoading } = useLanguage();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">

      {/* Main Content */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <ContactSection />
      </div>

      {/* Debug info - hapus setelah testing */}
      <div className="fixed bottom-4 right-16 md:right-4 bg-card border border-border rounded-lg p-3 text-xs z-50">
        <div>
          Current Language: <strong>{locale}</strong>
        </div>
        <div>Locale Loading: {isLoading ? "Yes" : "No"}</div>
      </div>
    </div>
  );
}
