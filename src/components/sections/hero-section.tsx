"use client";

import { FlipText } from "@/components/magicui/flip-text";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { Particles } from "@/components/magicui/particles";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { WarpBackground } from "@/components/magicui/warp-background";
import { Button } from "@/components/ui/button";
import { useHomeData } from "@/hooks/use-home-data";
import { useTranslations } from "@/hooks/use-translations";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  Sparkles,
  Loader2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const icon1Ref = useRef<HTMLDivElement>(null);
  const icon2Ref = useRef<HTMLDivElement>(null);
  const icon3Ref = useRef<HTMLDivElement>(null);
  const icon4Ref = useRef<HTMLDivElement>(null);

  const { t, locale } = useTranslations();
  const { data, loading, error } = useHomeData();

  const [stats, setStats] = useState({
    projects: 50,
    clients: 25,
    years: 5,
    experts: 15,
  });

  // Static texts dari translations
  const heroTexts = {
    badge: t("sections.hero.badge") || "PT. Teknalogi Transformasi Digital",
    accelerating: locale === "id" ? "Mempercepat" : "Accelerating",
    businessThrough:
      locale === "id" ? "Bisnis Anda Melalui" : "Your Business Through",
    digitalInnovation:
      locale === "id" ? "Inovasi Digital" : "Digital Innovation",
    startProject: t("buttons.startProject"),
    watchStory: t("buttons.watchStory"),
    loading: t("ui.loading"),
    errorLoadData:
      locale === "id" ? "Gagal memuat data" : "Failed to load data",
    defaultDescription:
      locale === "id"
        ? "Kami adalah mitra inovasi digital yang berdedikasi fokus pada percepatan pertumbuhan bisnis, merancang dan membangun solusi teknologi khusus yang meningkatkan efisiensi dan membuka potensi baru bagi klien kami."
        : "We are dedicated digital innovation partners focused on accelerating business growth, designing and building custom technology solutions that enhance efficiency and unlock new potential for our clients.",
  };

  useEffect(() => {
    // Check if all refs are ready
    const checkRefs = () => {
      if (
        containerRef.current &&
        centerRef.current &&
        icon1Ref.current &&
        icon2Ref.current &&
        icon3Ref.current &&
        icon4Ref.current
      ) {
        // Refs are ready, you can add any logic here if needed
      }
    };

    // Use a timeout to ensure DOM is ready
    const timer = setTimeout(checkRefs, 100);
    return () => clearTimeout(timer);
  }, []);

  // Update stats dari backend jika ada
  useEffect(() => {
    if (data?.companyProfile) {
      // Mapping stats dari backend response
      setStats({
        projects: 50,
        clients: 25,
        years: 5,
        experts: 15,
      });
    }
  }, [data]);

  // Loading state
  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="text-lg text-muted-foreground">
            {heroTexts.loading}
          </span>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <div className="text-center">
          <div className="text-red-500 mb-4 text-lg font-semibold">
            {heroTexts.errorLoadData}
          </div>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            {t("ui.retry")}
          </Button>
        </div>
      </section>
    );
  }

  // Dynamic content dari backend (sudah dalam bahasa yang sesuai)
  const companyDescription =
    heroTexts.defaultDescription;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <Particles
          className="absolute inset-0"
          quantity={300}
          size={0.8}
          staticity={30}
          color="#8B5CF6"
        />
      </div>

      {/* Warp Background for central focus */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <WarpBackground
          className="w-full h-full opacity-60"
          beamsPerSide={1}
          beamSize={1}
        >
          <div
            ref={centerRef}
            className="w-20 h-20 bg-primary/20 rounded-full"
          />
        </WarpBackground>
      </div>

      {/* Orbiting Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <OrbitingCircles
          className="size-[30px] border-none bg-transparent"
          duration={20}
          delay={20}
          radius={80}
        >
          <div className="size-6 bg-primary/20 rounded-full" />
        </OrbitingCircles>
        <OrbitingCircles
          className="size-[50px] border-none bg-transparent"
          duration={25}
          delay={10}
          radius={190}
        >
          <div className="size-8 bg-accent/20 rounded-full" />
        </OrbitingCircles>
        <OrbitingCircles
          className="size-[30px] border-none bg-transparent"
          duration={30}
          delay={0}
          radius={120}
          reverse
        >
          <div className="size-6 bg-primary/30 rounded-full" />
        </OrbitingCircles>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6 py-24">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 text-sm font-medium text-primary backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>{heroTexts.badge}</span>
          </motion.div>

          {/* Main Heading with Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground leading-tight">
              <div className="block mb-4">
                <FlipText className="text-primary">
                  {heroTexts.accelerating}
                </FlipText>
              </div>

              <div className="block mb-4">{heroTexts.businessThrough}</div>

              <div className="block">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  {heroTexts.digitalInnovation}
                </span>
              </div>
            </h1>
          </motion.div>

          {/* Subtitle with Typing Animation - Dynamic Content dari Backend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <TypingAnimation
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed"
              duration={50}
              delay={1000}
            >
              {companyDescription}
            </TypingAnimation>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
          >
            <Button size="lg" className="group px-8 py-4 text-lg font-semibold">
              {heroTexts.startProject}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="group border-2 border-border hover:border-primary transition-all duration-300 px-8 py-4 text-lg"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              {heroTexts.watchStory}
            </Button>
          </motion.div>

          {/* Stats Preview - Data dari Backend dengan Labels Statis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-12 max-w-2xl mx-auto"
          >
            {[
              {
                number: `${stats.projects}+`,
                label:
                  t("sections.stats.projects") ||
                  (locale === "id" ? "Proyek" : "Projects"),
              },
              {
                number: `${stats.clients}+`,
                label:
                  t("sections.stats.clients") ||
                  (locale === "id" ? "Klien" : "Clients"),
              },
              {
                number: `${stats.years}+`,
                label:
                  t("sections.stats.years") ||
                  (locale === "id" ? "Tahun" : "Years"),
              },
              {
                number: `${stats.experts}+`,
                label:
                  t("sections.stats.experts") ||
                  (locale === "id" ? "Ahli" : "Experts"),
              },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">
                  {stat.number}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
