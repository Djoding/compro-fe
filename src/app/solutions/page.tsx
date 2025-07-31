import { BlurFade } from "@/components/magicui/blur-fade";
import { Particles } from "@/components/magicui/particles";
import PortfolioSection from "@/components/sections/portfolio-section";
import ServicesSection from "@/components/sections/services-section";
import { Badge } from "@/components/ui/badge";
import {
  WavySeparator,
  WavySeparatorSmooth,
} from "@/components/ui/wavy-separator";
import { Lightbulb } from "lucide-react";

export default function SolutionsPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-accent/5 to-background">
        <div className="absolute inset-0">
          <Particles className="absolute inset-0" color="#8B5CF6" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BlurFade delay={0.1} inView>
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Lightbulb className="w-4 h-4 mr-2" />
              Our Solutions
            </Badge>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Digital Solutions That
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Drive Results
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore our comprehensive portfolio of successful digital
              transformation projects. Each solution is crafted to meet specific
              business needs and deliver measurable impact.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Wavy Separator */}
      <WavySeparator className="fill-primary/20" />

      {/* Portfolio Section */}
      <PortfolioSection />

      {/* Wavy Separator */}
      <WavySeparatorSmooth rotated className="fill-accent/10" />

      {/* Services Overview */}
      <ServicesSection />
    </div>
  );
}
