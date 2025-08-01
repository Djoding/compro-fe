// src/app/about/page.tsx
"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Particles } from "@/components/magicui/particles";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import AboutSection from "@/components/sections/about-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  WavySeparator,
  WavySeparatorSmooth,
} from "@/components/ui/wavy-separator";
import { useAboutData } from "@/hooks/use-about-data";
import { useTranslations } from "@/hooks/use-translations";
import { ArrowRight, BadgeInfo, Eye, Heart, Target, Zap } from "lucide-react";

// Fallback vision/mission data
const getFallbackVisionMission = (t: (key: string) => string) => [
  {
    icon: Eye,
    title: t("pages.about.fallback.visionMission.vision.title"),
    content: t("pages.about.fallback.visionMission.vision.content"),
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Target,
    title: t("pages.about.fallback.visionMission.mission.title"),
    content: t("pages.about.fallback.visionMission.mission.content"),
    color: "from-purple-500 to-pink-500",
  },
];

// Fallback core values data
const getFallbackCoreValues = (t: (key: string) => string) => [
  {
    icon: Heart,
    title: t("pages.about.fallback.coreValues.passionExcellence.title"),
    description: t(
      "pages.about.fallback.coreValues.passionExcellence.description"
    ),
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Zap,
    title: t("pages.about.fallback.coreValues.innovationFirst.title"),
    description: t(
      "pages.about.fallback.coreValues.innovationFirst.description"
    ),
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Target,
    title: t("pages.about.fallback.coreValues.clientSuccess.title"),
    description: t("pages.about.fallback.coreValues.clientSuccess.description"),
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Eye,
    title: t("pages.about.fallback.coreValues.transparencyTrust.title"),
    description: t(
      "pages.about.fallback.coreValues.transparencyTrust.description"
    ),
    color: "from-blue-500 to-purple-500",
  },
];

// Fallback timeline data
const getFallbackTimeline = (t: (key: string) => string) => [
  {
    year: "2019",
    title: t("pages.about.fallback.timeline.2019.title"),
    description: t("pages.about.fallback.timeline.2019.description"),
    milestone: t("pages.about.fallback.timeline.2019.milestone"),
  },
  {
    year: "2020",
    title: t("pages.about.fallback.timeline.2020.title"),
    description: t("pages.about.fallback.timeline.2020.description"),
    milestone: t("pages.about.fallback.timeline.2020.milestone"),
  },
  {
    year: "2021",
    title: t("pages.about.fallback.timeline.2021.title"),
    description: t("pages.about.fallback.timeline.2021.description"),
    milestone: t("pages.about.fallback.timeline.2021.milestone"),
  },
  {
    year: "2022",
    title: t("pages.about.fallback.timeline.2022.title"),
    description: t("pages.about.fallback.timeline.2022.description"),
    milestone: t("pages.about.fallback.timeline.2022.milestone"),
  },
  {
    year: "2023",
    title: t("pages.about.fallback.timeline.2023.title"),
    description: t("pages.about.fallback.timeline.2023.description"),
    milestone: t("pages.about.fallback.timeline.2023.milestone"),
  },
  {
    year: "2025",
    title: t("pages.about.fallback.timeline.2025.title"),
    description: t("pages.about.fallback.timeline.2025.description"),
    milestone: t("pages.about.fallback.timeline.2025.milestone"),
  },
];

export default function AboutPage() {
  const { t, locale } = useTranslations();
  const { companyProfile, journey, loading } = useAboutData();

  // Get fallback data with translations
  const fallbackVisionMission = getFallbackVisionMission(t);
  const fallbackCoreValues = getFallbackCoreValues(t);
  const fallbackTimeline = getFallbackTimeline(t);

  // Get vision/mission from company profile with fallback
  const getVisionContent = () => {
    if (companyProfile?.vision_id && companyProfile?.vision_en) {
      return locale === "id"
        ? companyProfile.vision_id
        : companyProfile.vision_en;
    }
    return fallbackVisionMission[0].content;
  };

  const getMissionContent = () => {
    if (companyProfile?.mission_id && companyProfile?.mission_en) {
      return locale === "id"
        ? companyProfile.mission_id
        : companyProfile.mission_en;
    }
    return fallbackVisionMission[1].content;
  };

  const visionMission = [
    {
      icon: Eye,
      title: t("pages.about.fallback.visionMission.vision.title"),
      content: getVisionContent(),
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Target,
      title: t("pages.about.fallback.visionMission.mission.title"),
      content: getMissionContent(),
      color: "from-purple-500 to-pink-500",
    },
  ];

  // Use core values from fallback for now (no API endpoint for values yet)
  const coreValues = fallbackCoreValues;

  // Get timeline from journey data with fallback
  const timeline =
    journey && journey.length > 0
      ? journey.map((item) => ({
          year: item.year?.toString() || "2025",
          title:
            locale === "id"
              ? item.title_id || item.title_en || "Milestone"
              : item.title_en || item.title_id || "Milestone",
          description:
            locale === "id"
              ? item.description_id || item.description_en || ""
              : item.description_en || item.description_id || "",
          milestone:
            locale === "id"
              ? item.achievement_id || item.achievement_en || ""
              : item.achievement_en || item.achievement_id || "",
        }))
      : fallbackTimeline;

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t("pages.about.loading")}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="absolute inset-0">
          <Particles className="absolute inset-0" color="#8B5CF6" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BlurFade delay={0.1} inView>
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <BadgeInfo className="w-4 h-4 mr-2" />
              {t("pages.about.badge")}
            </Badge>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {t("pages.about.title")}
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t("pages.about.titleSpan")}
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t("pages.about.subtitle")}
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Wavy Separator */}
      <WavySeparator className="fill-primary/20" />

      {/* Vision & Mission Section */}
      <section className="py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                {t("pages.about.visionMission.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t("pages.about.visionMission.subtitle")}
              </p>
            </div>
          </BlurFade>

          <div className="grid md:grid-cols-2 items-stretch gap-8 mb-16">
            {visionMission.map((item, index) => {
              const Icon = item.icon;
              return (
                <BlurFade key={item.title} delay={0.1 + index * 0.1} inView>
                  <div
                    className={`relative min-h-[300px] h-full p-8 rounded-2xl bg-gradient-to-br ${item.color} text-white overflow-hidden`}
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
          {t("pages.about.scrollingText")}
        </VelocityScroll>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                {t("pages.about.coreValues.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t("pages.about.coreValues.subtitle")}
              </p>
            </div>
          </BlurFade>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <BlurFade key={value.title} delay={0.1 + index * 0.1} inView>
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

      {/* Wavy Separator */}
      <WavySeparatorSmooth rotated className="fill-primary/20" />

      {/* About Section (existing) */}
      <AboutSection />

      {/* Company Journey */}
      <section className="py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                {t("pages.about.journey.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t("pages.about.journey.subtitle")}
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
                  <BlurFade
                    key={milestone.year}
                    delay={0.1 + index * 0.1}
                    inView
                  >
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
                            side === "right" ? "text-left" : "text-right"
                          }`}
                        >
                          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                            <div className="flex flex-col md:flex-row items-center gap-3 mb-3">
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
          <BlurFade delay={0.1} inView>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              {t("pages.about.cta.title")}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("pages.about.cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                {t("pages.about.cta.primaryButton")}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                {t("pages.about.cta.secondaryButton")}
              </Button>
            </div>
          </BlurFade>
        </div>
      </section>
    </div>
  );
}
