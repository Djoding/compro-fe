// src/app/about/page.tsx
'use client';

import AboutSection from "@/components/sections/about-section";
import { BlurFade } from "@/components/magicui/blur-fade";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, Target, Heart, Zap } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";
import { useAboutData } from "@/hooks/use-about-data";

// Fallback vision/mission data
const fallbackVisionMission = [
  {
    icon: Eye,
    title: "Vision",
    content:
      "To become Indonesia's leading digital transformation partner, empowering businesses of all sizes to thrive in the digital era through innovative technology solutions that create lasting competitive advantages.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Target,
    title: "Mission",
    content:
      "To accelerate business growth through innovative digital solutions, ensuring your business not only survives but excels by providing flexible and scalable architectures in an ever-evolving digital world.",
    color: "from-purple-500 to-pink-500",
  },
];

// Fallback core values data
const fallbackCoreValues = [
  {
    icon: Heart,
    title: "Passion for Excellence",
    description:
      "We are driven by an unwavering commitment to delivering exceptional results that exceed expectations.",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Innovation First",
    description:
      "We embrace cutting-edge technologies and creative solutions to solve complex business challenges.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Target,
    title: "Client Success Focus",
    description:
      "Your success is our success. We work as true partners invested in your long-term growth.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Eye,
    title: "Transparency & Trust",
    description:
      "We believe in open communication and honest relationships built on trust and mutual respect.",
    color: "from-blue-500 to-purple-500",
  },
];

// Fallback timeline data
const fallbackTimeline = [
  {
    year: "2019",
    title: "Company Founded",
    description: "PT Teknalogi was established with a vision to transform businesses through technology.",
    milestone: "Started with 3 founding members"
  },
  {
    year: "2020", 
    title: "First Major Client",
    description: "Successfully delivered our first enterprise-level digital transformation project.",
    milestone: "Team expanded to 8 professionals"
  },
  {
    year: "2021",
    title: "Service Expansion", 
    description: "Expanded our services to include cloud solutions, mobile development, and cybersecurity.",
    milestone: "Served 25+ clients across Indonesia"
  },
  {
    year: "2022",
    title: "Technology Partnerships",
    description: "Formed strategic partnerships with major technology providers and cloud platforms.",
    milestone: "Achieved AWS Partner status"
  },
  {
    year: "2023",
    title: "Innovation Focus",
    description: "Launched our AI and machine learning practice to help clients leverage advanced analytics.",
    milestone: "Delivered 50+ successful projects"
  },
  {
    year: "2024",
    title: "Continued Growth",
    description: "Expanding our team and capabilities to serve more clients with comprehensive digital solutions.",
    milestone: "15+ expert developers and consultants"
  }
];

export default function AboutPage() {
  const { locale } = useTranslations();
  const { companyProfile, journey, loading } = useAboutData();

  // Get vision/mission from company profile with fallback
  const visionMission = [
    {
      icon: Eye,
      title: "Vision",
      content: companyProfile?.vision_id && companyProfile?.vision_en
        ? (locale === 'id' ? companyProfile.vision_id : companyProfile.vision_en)
        : fallbackVisionMission[0].content,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Target,
      title: "Mission",
      content: companyProfile?.mission_id && companyProfile?.mission_en
        ? (locale === 'id' ? companyProfile.mission_id : companyProfile.mission_en)
        : fallbackVisionMission[1].content,
      color: "from-purple-500 to-pink-500",
    },
  ];

  // Use core values from fallback for now (no API endpoint for values yet)
  const coreValues = fallbackCoreValues;

  // Get timeline from journey data with fallback
  const timeline = journey && journey.length > 0 
    ? journey.map((item) => ({
        year: item.year?.toString() || "2024",
        title: locale === 'id' ? (item.title_id || item.title_en || "Milestone") : (item.title_en || item.title_id || "Milestone"),
        description: locale === 'id' ? (item.description_id || item.description_en || "") : (item.description_en || item.description_id || ""),
        milestone: locale === 'id' ? (item.achievement_id || item.achievement_en || "") : (item.achievement_en || item.achievement_id || "")
      }))
    : fallbackTimeline;

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading about information...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BlurFade delay={0.2} inView>
            <Badge variant="outline" className="mb-6">
              About Teknalogi
            </Badge>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Leading Digital Innovation
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Since 2019
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.6} inView>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              PT. Teknalogi Transformasi Digital has been at the forefront of
              digital innovation, helping businesses transform and thrive in the
              digital era through cutting-edge technology solutions.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.2} inView>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Our Vision & Mission
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Guiding principles that drive everything we do
              </p>
            </div>
          </BlurFade>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {visionMission.map((item, index) => {
              const Icon = item.icon;
              return (
                <BlurFade key={item.title} delay={0.4 + index * 0.2} inView>
                  <div
                    className={`relative p-8 rounded-2xl bg-gradient-to-br ${item.color} text-white overflow-hidden`}
                  >
                    <div className="relative z-10">
                      <Icon className="w-12 h-12 mb-4" />
                      <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                      <p className="text-lg leading-relaxed opacity-90">
                        {item.content}
                      </p>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
                  </div>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>

      {/* Scrolling Values Text */}
      <section className="py-12 bg-muted/20 overflow-hidden">
        <VelocityScroll
          defaultVelocity={1}
          className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-primary/20 drop-shadow-sm"
        >
          Excellence • Innovation • Partnership • Trust • Growth • Excellence •
          Innovation • Partnership • Trust • Growth •
        </VelocityScroll>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.2} inView>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Our Core Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                The principles that guide our decisions and shape our culture
              </p>
            </div>
          </BlurFade>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <BlurFade key={value.title} delay={0.4 + index * 0.1} inView>
                  <div className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 h-full">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${value.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section (existing) */}
      <AboutSection />

      {/* Company Journey */}
      <section className="py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.2} inView>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Our Journey
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                From humble beginnings to becoming a trusted digital innovation
                partner
              </p>
            </div>
          </BlurFade>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-0.5 bg-gradient-to-b from-primary via-accent to-primary"></div>

            <div className="space-y-12">
              {timeline.map((milestone, index) => {
                const side = index % 2 === 0 ? "left" : "right";
                return (
                  <BlurFade key={milestone.year} delay={0.4 + index * 0.1} inView>
                    <div
                      className={`flex items-center ${
                        side === "right" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`w-1/2 ${
                          side === "right" ? "pl-8" : "pr-8"
                        }`}
                      >
                        <div
                          className={`${
                            side === "right"
                              ? "text-left"
                              : "text-right"
                          }`}
                        >
                          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-primary font-bold text-sm">
                                  {milestone.year}
                                </span>
                              </div>
                              <h3 className="text-lg font-semibold text-foreground">
                                {milestone.title}
                              </h3>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                              {milestone.description}
                            </p>
                            <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                              {milestone.milestone}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Timeline dot */}
                      <div className="relative">
                        <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"></div>
                      </div>

                      <div className="w-1/2"></div>
                    </div>
                  </BlurFade>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BlurFade delay={0.2} inView>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to Start Your Digital Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the growing number of businesses that trust Teknalogi to
              accelerate their digital transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                Learn More About Us
              </Button>
            </div>
          </BlurFade>
        </div>
      </section>
    </div>
  );
}
