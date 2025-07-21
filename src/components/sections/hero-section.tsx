// src/components/sections/hero-section.tsx
"use client";

import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { FlipText } from "@/components/magicui/flip-text";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { Particles } from "@/components/magicui/particles";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { WarpBackground } from "@/components/magicui/warp-background";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Cloud,
  Code,
  Database,
  Play,
  Shield,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const techIcons = [
  { icon: Code, label: "Development" },
  { icon: Database, label: "Data Solutions" },
  { icon: Cloud, label: "Cloud Services" },
  { icon: Shield, label: "Security" },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const icon1Ref = useRef<HTMLDivElement>(null);
  const icon2Ref = useRef<HTMLDivElement>(null);
  const icon3Ref = useRef<HTMLDivElement>(null);
  const icon4Ref = useRef<HTMLDivElement>(null);

  const [refsReady, setRefsReady] = useState(false);

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
        setRefsReady(true);
      }
    };

    // Use a timeout to ensure DOM is ready
    const timer = setTimeout(checkRefs, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <Particles
          className="absolute inset-0"
          quantity={100}
          staticity={30}
          color="#8b5cf6"
        />
        <InteractiveGridPattern
          className="absolute inset-0 opacity-30"
          width={40}
          height={40}
        />
      </div>

      {/* Warp Background for central focus */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <WarpBackground
          className="w-96 h-96 opacity-20"
          beamsPerSide={4}
          beamSize={8}
        >
          <div
            ref={centerRef}
            className="w-20 h-20 bg-primary/20 rounded-full"
          />
        </WarpBackground>
      </div>

      {/* Animated Beams connecting tech icons */}
      <div className="absolute inset-0 pointer-events-none">
        {refsReady && (
          <>
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={centerRef}
              toRef={icon1Ref}
              curvature={20}
              gradientStartColor="#8b5cf6"
              gradientStopColor="#3b82f6"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={centerRef}
              toRef={icon2Ref}
              curvature={-20}
              gradientStartColor="#8b5cf6"
              gradientStopColor="#10b981"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={centerRef}
              toRef={icon3Ref}
              curvature={20}
              reverse
              gradientStartColor="#8b5cf6"
              gradientStopColor="#f59e0b"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={centerRef}
              toRef={icon4Ref}
              curvature={-20}
              reverse
              gradientStartColor="#8b5cf6"
              gradientStopColor="#ef4444"
            />
          </>
        )}
      </div>

      {/* Tech Icons positioned around */}
      <div
        ref={icon1Ref}
        className="absolute top-20 left-20 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center"
      >
        <Code className="w-8 h-8 text-primary" />
      </div>
      <div
        ref={icon2Ref}
        className="absolute top-20 right-20 w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center"
      >
        <Database className="w-8 h-8 text-accent" />
      </div>
      <div
        ref={icon3Ref}
        className="absolute bottom-20 left-20 w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center"
      >
        <Cloud className="w-8 h-8 text-green-500" />
      </div>
      <div
        ref={icon4Ref}
        className="absolute bottom-20 right-20 w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center"
      >
        <Shield className="w-8 h-8 text-orange-500" />
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6 pt-16 md:pt-12">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 text-sm font-medium text-primary backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>PT. Teknalogi Transformasi Digital</span>
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
                <FlipText className="text-primary">Accelerating</FlipText>
              </div>

              <div className="block mb-4">Your Business Through</div>

              <div className="block">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Digital Innovation
                </span>
              </div>
            </h1>
          </motion.div>

          {/* Subtitle with Typing Animation */}
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
              We are dedicated digital innovation partners focused on
              accelerating business growth, designing and building custom
              technology solutions that enhance efficiency and unlock new
              potential for our clients.
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
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="group border-2 border-border hover:border-primary transition-all duration-300 px-8 py-4 text-lg"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Our Story
            </Button>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-12 max-w-2xl mx-auto"
          >
            {[
              { number: "50+", label: "Projects" },
              { number: "25+", label: "Clients" },
              { number: "5+", label: "Years" },
              { number: "15+", label: "Experts" },
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
