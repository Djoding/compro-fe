"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { MagicCard } from "@/components/magicui/magic-card";
import { Button } from "@/components/ui/button";
import { servicesAPI, platformsAPI } from "@/lib/api";
import { useLanguage } from "@/contexts/language-context";
import { getImageUrl } from "@/lib/utils";
import { ArrowRight, CheckCircle, Cloud, Database, Globe, Settings, Shield, Smartphone, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Service {
  id: string;
  title_id: string;
  title_en: string;
  description_id: string;
  description_en: string;
  features?: string[];
  icon?: string;
  color?: string;
}

interface Platform {
  id: string;
  name_id: string;
  name_en: string;
  logoUrl: string;
  websiteUrl?: string;
}

// Fallback services with icons mapping
const fallbackServices = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Custom web applications built with modern frameworks and technologies",
    features: ["React & Next.js", "Progressive Web Apps", "E-commerce Solutions", "CMS Development"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications for iOS and Android",
    features: ["React Native", "Flutter", "Native iOS/Android", "App Store Optimization"],
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and deployment strategies",
    features: ["AWS & Azure", "DevOps & CI/CD", "Microservices", "Container Orchestration"],
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Database,
    title: "Data Solutions",
    description: "Database design, analytics, and business intelligence systems",
    features: ["Database Design", "Data Analytics", "Business Intelligence", "API Development"],
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Shield,
    title: "Security Solutions",
    description: "Comprehensive cybersecurity and data protection services",
    features: ["Security Audits", "Penetration Testing", "Compliance", "Threat Monitoring"],
    color: "from-gray-500 to-slate-500"
  },
  {
    icon: Settings,
    title: "Digital Transformation",
    description: "End-to-end digital transformation and process optimization",
    features: ["Process Automation", "Legacy Modernization", "Digital Strategy", "Change Management"],
    color: "from-indigo-500 to-purple-500"
  }
];

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe: Globe,
  Smartphone: Smartphone,
  Cloud: Cloud,
  Database: Database,
  Shield: Shield,
  Settings: Settings
};

// Color mapping for services
const colorClasses = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-gray-500 to-slate-500",
  "from-indigo-500 to-purple-500"
];

export default function ServicesSection() {
  const { locale } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {
      const fetchData = async () => {
        try {
          setLoading(true);

          const [servicesResponse, platformsResponse] = await Promise.all([servicesAPI.getAll(), platformsAPI.getAll()]);

          if (servicesResponse.status === "success" && Array.isArray(servicesResponse.data)) {
            setServices(servicesResponse.data);
          }

          if (platformsResponse.status === "success" && Array.isArray(platformsResponse.data)) {
            setPlatforms(platformsResponse.data);
          }
        } catch (err) {
          console.error("Error fetching services data:", err);
          // Silently fail and use fallback data
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    },
    [locale]
  );

  // Use API data if available, otherwise fallback to static data
  const displayServices = services.length > 0 ? services : fallbackServices;

  if (loading) {
    return (
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading services...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <BlurFade delay={0.2} inView>
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent text-sm font-semibold rounded-full mb-4">
              Our Expertise
            </span>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">Comprehensive Digital Solutions</h2>
          </BlurFade>

          <BlurFade delay={0.6} inView>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From web development to cloud solutions, we offer a full spectrum of digital services to help your business thrive
              in the modern technological landscape.
            </p>
          </BlurFade>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {displayServices.map((service, index) => {
            // For API services, use dynamic data
            const isApiService = "title_id" in service;
            const title = isApiService ? (locale === "id" ? service.title_id : service.title_en) : service.title;
            const description = isApiService
              ? locale === "id"
                ? service.description_id
                : service.description_en
              : service.description;

            // Generate unique key
            const serviceKey = isApiService ? `api-service-${service.id}` : `fallback-service-${index}-${title}`;

            // Get icon (fallback to Globe if not found)
            const IconComponent = isApiService ? (service.icon && iconMap[service.icon]) || Globe : service.icon || Globe;

            // Debug logging for development
            if (process.env.NODE_ENV === "development" && isApiService) {
              console.log("Service icon:", service.icon, "IconComponent:", IconComponent);
            }

            // Safety check - ensure IconComponent is always a valid React component
            const SafeIconComponent = typeof IconComponent === "function" ? IconComponent : Globe;

            // Get color class
            const colorClass = isApiService ? service.color || colorClasses[index % colorClasses.length] : service.color;

            return (
              <BlurFade key={serviceKey} delay={0.8 + index * 0.1} inView>
                <MagicCard className="group h-full">
                  <div className="p-6 h-full flex flex-col">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${colorClass} rounded-lg flex items-center justify-center mb-4`}
                    >
                      <SafeIconComponent className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {title}
                    </h3>

                    <p className="text-muted-foreground mb-4 flex-grow">{description}</p>

                    {service.features && (
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <li
                            key={`${isApiService ? service.id : title}-feature-${featureIndex}`}
                            className="flex items-center text-sm text-muted-foreground"
                          >
                            <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}

                    <Button
                      variant="ghost"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </MagicCard>
              </BlurFade>
            );
          })}
        </div>

        {/* Technologies with Dock */}
        {platforms.length > 0 && (
          <BlurFade delay={1.4} inView>
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-foreground mb-8">Technologies We Work With</h3>
              <div className="flex justify-center">
                <Dock
                  iconMagnification={60}
                  iconDistance={140}
                  direction="middle"
                  className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-4"
                >
                  {platforms.slice(0, 8).map(platform => (
                    <DockIcon
                      key={`platform-${platform.id}`}
                      className="bg-white/10 hover:bg-white/20 transition-colors duration-300"
                    >
                      <div className="flex flex-col items-center justify-center w-full h-full">
                        <img
                          src={getImageUrl(platform.logoUrl)}
                          alt={locale === "id" ? platform.name_id : platform.name_en}
                          className="w-8 h-8 object-contain"
                          onError={e => {
                            e.currentTarget.src = "/placeholder.png";
                          }}
                        />
                      </div>
                    </DockIcon>
                  ))}
                </Dock>
              </div>
            </div>
          </BlurFade>
        )}

        {/* CTA */}
        <BlurFade delay={1.6} inView>
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 lg:p-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Ready to Transform Your Business?</h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let&apos;s discuss how our expertise can help you achieve your digital transformation goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="px-8">
                  View Our Portfolio
                </Button>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
