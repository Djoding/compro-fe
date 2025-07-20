import AboutSection from "@/components/sections/about-section";
import ContactSection from "@/components/sections/contact-section";
import HeroSection from "@/components/sections/hero-section";
import PortfolioSection from "@/components/sections/portfolio-section";
import ServicesSection from "@/components/sections/services-section";
import TestimonialsSection from "@/components/sections/testimonials-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
