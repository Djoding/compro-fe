"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Particles } from "@/components/magicui/particles";
import { Badge } from "@/components/ui/badge";
import { WavySeparator } from "@/components/ui/wavy-separator";
import { useTranslations } from "@/hooks/use-translations";
import {
  Cloud,
  Code,
  Database,
  Globe,
  Shield,
  Smartphone,
  Zap,
} from "lucide-react";

export default function ExpertisePage() {
  const { t } = useTranslations();

  // Get translated expertise areas
  const expertiseAreas = [
    {
      icon: Code,
      title: t("pages.expertise.expertiseAreas.fullStackDevelopment.title"),
      description: t(
        "pages.expertise.expertiseAreas.fullStackDevelopment.description"
      ),
      technologies: [
        "React",
        "Next.js",
        "Node.js",
        "TypeScript",
        "Python",
        "Java",
      ],
      projects: t(
        "pages.expertise.expertiseAreas.fullStackDevelopment.projects"
      ),
    },
    {
      icon: Smartphone,
      title: t("pages.expertise.expertiseAreas.mobileDevelopment.title"),
      description: t(
        "pages.expertise.expertiseAreas.mobileDevelopment.description"
      ),
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Ionic"],
      projects: t("pages.expertise.expertiseAreas.mobileDevelopment.projects"),
    },
    {
      icon: Cloud,
      title: t("pages.expertise.expertiseAreas.cloudArchitecture.title"),
      description: t(
        "pages.expertise.expertiseAreas.cloudArchitecture.description"
      ),
      technologies: [
        "AWS",
        "Azure",
        "Google Cloud",
        "Docker",
        "Kubernetes",
        "Terraform",
      ],
      projects: t("pages.expertise.expertiseAreas.cloudArchitecture.projects"),
    },
    {
      icon: Database,
      title: t("pages.expertise.expertiseAreas.dataEngineering.title"),
      description: t(
        "pages.expertise.expertiseAreas.dataEngineering.description"
      ),
      technologies: [
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "Elasticsearch",
        "Apache Spark",
      ],
      projects: t("pages.expertise.expertiseAreas.dataEngineering.projects"),
    },
    {
      icon: Shield,
      title: t("pages.expertise.expertiseAreas.cybersecurity.title"),
      description: t(
        "pages.expertise.expertiseAreas.cybersecurity.description"
      ),
      technologies: [
        "OWASP",
        "SIEM",
        "Penetration Testing",
        "Compliance",
        "Security Audits",
      ],
      projects: t("pages.expertise.expertiseAreas.cybersecurity.projects"),
    },
    {
      icon: Globe,
      title: t("pages.expertise.expertiseAreas.apiDevelopment.title"),
      description: t(
        "pages.expertise.expertiseAreas.apiDevelopment.description"
      ),
      technologies: [
        "REST",
        "GraphQL",
        "OpenAPI",
        "Microservices",
        "API Gateway",
      ],
      projects: t("pages.expertise.expertiseAreas.apiDevelopment.projects"),
    },
  ];

  // Get translated platforms
  const platforms = [
    {
      name: t("pages.expertise.platforms.aws.name"),
      description: t("pages.expertise.platforms.aws.description"),
      level: t("pages.expertise.platforms.aws.level"),
    },
    {
      name: t("pages.expertise.platforms.azure.name"),
      description: t("pages.expertise.platforms.azure.description"),
      level: t("pages.expertise.platforms.azure.level"),
    },
    {
      name: t("pages.expertise.platforms.gcp.name"),
      description: t("pages.expertise.platforms.gcp.description"),
      level: t("pages.expertise.platforms.gcp.level"),
    },
    {
      name: t("pages.expertise.platforms.vercel.name"),
      description: t("pages.expertise.platforms.vercel.description"),
      level: t("pages.expertise.platforms.vercel.level"),
    },
    {
      name: t("pages.expertise.platforms.mongodb.name"),
      description: t("pages.expertise.platforms.mongodb.description"),
      level: t("pages.expertise.platforms.mongodb.level"),
    },
    {
      name: t("pages.expertise.platforms.stripe.name"),
      description: t("pages.expertise.platforms.stripe.description"),
      level: t("pages.expertise.platforms.stripe.level"),
    },
  ];

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
              <Zap className="w-4 h-4 mr-2" />
              {t("pages.expertise.badge")}
            </Badge>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {t("pages.expertise.title")}
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t("pages.expertise.titleSpan")}
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t("pages.expertise.subtitle")}
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Wavy Separator */}
      <WavySeparator className="fill-primary/20" />

      {/* Expertise Areas */}
      <section className="pt-40 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                {t("pages.expertise.coreCompetencies.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t("pages.expertise.coreCompetencies.subtitle")}
              </p>
            </div>
          </BlurFade>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertiseAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <BlurFade key={area.title} delay={0.4 + index * 0.1} inView>
                  <div className="bg-card border border-border rounded-xl p-6 h-full hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">
                          {area.title}
                        </h3>
                        <span className="text-sm text-primary font-medium">
                          {area.projects}
                        </span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {area.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {area.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform Partners */}
      <section className="py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                {t("pages.expertise.platformPartners.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t("pages.expertise.platformPartners.subtitle")}
              </p>
            </div>
          </BlurFade>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((platform, index) => (
              <BlurFade key={platform.name} delay={0.4 + index * 0.1} inView>
                <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground">
                      {platform.name}
                    </h3>
                    <Badge
                      variant={
                        platform.level === "Expert" ? "default" : "outline"
                      }
                    >
                      {platform.level}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {platform.description}
                  </p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
