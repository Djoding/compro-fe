"use client";

import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";
import { FlipText } from "@/components/magicui/flip-text";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";

const features = [
  { icon: "🚀", text: "Fast Development" },
  { icon: "⚡", text: "High Performance" },
  { icon: "🛡️", text: "Secure Solutions" },
  { icon: "📱", text: "Responsive Design" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

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
          duration={20}
          delay={10}
          radius={190}
        >
          <div className="size-8 bg-accent/20 rounded-full" />
        </OrbitingCircles>
        <OrbitingCircles
          className="size-[30px] border-none bg-transparent"
          duration={25}
          delay={0}
          radius={120}
          reverse
        >
          <div className="size-6 bg-primary/30 rounded-full" />
        </OrbitingCircles>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-4 pt-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary"
          >
            <Sparkles className="w-4 h-4" />
            <span>Digital Innovation Partners</span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-2"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground leading-tight">
              <FlipText
                duration={800}
                delayMultiple={100}
                framerProps={{
                  hidden: { rotateX: -90, opacity: 0 },
                  visible: { rotateX: 0, opacity: 1 },
                }}
                className="text-primary"
              >
                Accelerating
              </FlipText>
              
              Your Business Through
              
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Digital Innovation
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <TypingAnimation
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed"
              duration={50}
            >
              We are dedicated digital innovation partners focused on
              accelerating business growth, designing and building custom
              technology solutions that enhance efficiency and unlock new
              potential for our clients.
            </TypingAnimation>
          </motion.div>

          {/* Feature Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 py-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="flex items-center space-x-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2"
              >
                <span className="text-xl">{feature.icon}</span>
                <span className="text-sm font-medium text-foreground">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <InteractiveHoverButton className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg font-semibold">
              Get Started
            </InteractiveHoverButton>

            <Button
              variant="outline"
              size="lg"
              className="group border-2 border-border hover:border-primary transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="pt-8"
          >
            <AnimatedSubscribeButton className="bg-primary text-primary-foreground">
              <span className="group inline-flex items-center">
                Stay Updated{" "}
                <ArrowRight className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="group inline-flex items-center">
                <span className="mr-2">✓</span>
                Subscribed{" "}
              </span>
            </AnimatedSubscribeButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
