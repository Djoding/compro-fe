"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { MorphingText } from "@/components/magicui/morphing-text";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { useTranslations } from "@/hooks/use-translations";
import { companyProfileAPI } from "@/lib/api";
import {
  Award,
  BadgeInfo,
  Lightbulb,
  Loader2,
  Target,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

interface CompanyStats {
  projectsCompleted?: number;
  happyClients?: number;
  teamMembers?: number;
  yearsExperience?: number;
}

interface CompanyProfile {
  name_id?: string;
  name_en?: string;
  description_id?: string;
  description_en?: string;
  vision_id?: string;
  vision_en?: string;
  mission_id?: string;
  mission_en?: string;
}

// Fallback stats
const getDefaultStats = (t: (key: string) => string) => [
  {
    number: 50,
    suffix: "+",
    label: t("sections.about.stats.projectsCompleted"),
    description: t("sections.about.stats.projectsCompletedDesc"),
  },
  {
    number: 25,
    suffix: "+",
    label: t("sections.about.stats.happyClients"),
    description: t("sections.about.stats.happyClientsDesc"),
  },
  {
    number: 5,
    suffix: "+",
    label: t("sections.about.stats.yearsExperience"),
    description: t("sections.about.stats.yearsExperienceDesc"),
  },
  {
    number: 15,
    suffix: "+",
    label: t("sections.about.stats.teamMembers"),
    description: t("sections.about.stats.teamMembersDesc"),
  },
];

const getValues = (t: (key: string) => string) => [
  {
    icon: Target,
    title: t("sections.about.values.innovationFirst.title"),
    description: t("sections.about.values.innovationFirst.description"),
  },
  {
    icon: Users,
    title: t("sections.about.values.clientCentric.title"),
    description: t("sections.about.values.clientCentric.description"),
  },
  {
    icon: Lightbulb,
    title: t("sections.about.values.creativeSolutions.title"),
    description: t("sections.about.values.creativeSolutions.description"),
  },
  {
    icon: Award,
    title: t("sections.about.values.qualityExcellence.title"),
    description: t("sections.about.values.qualityExcellence.description"),
  },
];

const getTexts = (t: (key: string) => string) => [
  t("sections.about.morphingTexts.digitalInnovation"),
  t("sections.about.morphingTexts.businessGrowth"),
  t("sections.about.morphingTexts.technologySolutions"),
  t("sections.about.morphingTexts.futureSuccess"),
];

export default function AboutSection() {
  const { locale } = useLanguage();
  const { t } = useTranslations();
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(
    null
  );
  const [stats, setStats] = useState(() => getDefaultStats(t));
  const [loading, setLoading] = useState(true);

  const values = getValues(t);
  const texts = getTexts(t);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [profileResponse, statsResponse] = await Promise.all([
          companyProfileAPI.getProfile(),
          companyProfileAPI.getStats().catch(() => ({ data: null })), // Optional stats
        ]);

        if (profileResponse.status === "success" && profileResponse.data) {
          setCompanyProfile(profileResponse.data);
        }

        // Update stats if available from API
        if (statsResponse.data) {
          // You can customize this based on your API response structure
          const apiStats = statsResponse.data as CompanyStats;
          if (apiStats.projectsCompleted) {
            setStats((prev) =>
              prev.map((stat) =>
                stat.label === "Projects Completed"
                  ? { ...stat, number: apiStats.projectsCompleted! }
                  : stat
              )
            );
          }
          if (apiStats.happyClients) {
            setStats((prev) =>
              prev.map((stat) =>
                stat.label === "Happy Clients"
                  ? { ...stat, number: apiStats.happyClients! }
                  : stat
              )
            );
          }
          if (apiStats.teamMembers) {
            setStats((prev) =>
              prev.map((stat) =>
                stat.label === "Team Members"
                  ? { ...stat, number: apiStats.teamMembers! }
                  : stat
              )
            );
          }
        }
      } catch (err) {
        console.error("Error fetching company profile:", err);
        // Silently fail and use fallback data
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  // Get company data with fallbacks
  const companyName = companyProfile
    ? (locale === "id" ? companyProfile.name_id : companyProfile.name_en) ||
      "PT. Teknalogi Transformasi Digital"
    : "PT. Teknalogi Transformasi Digital";

  // Ensure companyName is always a string to prevent split errors
  const safeCompanyName = companyName || "PT. Teknalogi Transformasi Digital";

  const companyDescription = companyProfile
    ? (locale === "id"
        ? companyProfile.description_id
        : companyProfile.description_en) ||
      t("sections.about.fallbackDescription")
    : t("sections.about.fallbackDescription");

  const companyMission = companyProfile
    ? (locale === "id"
        ? companyProfile.mission_id
        : companyProfile.mission_en) || t("sections.about.mission.fallbackText")
    : t("sections.about.mission.fallbackText");

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">
              {t("ui.loadingCompanyInfo")}
            </span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <BlurFade delay={0.1} inView>
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <BadgeInfo className="w-4 h-4 mr-2" />
              {t("sections.about.badge")}{" "}
              {safeCompanyName.split(" ")[1] || "Teknalogi"}
            </Badge>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t("sections.about.transformingTitle")}{" "}
              <MorphingText texts={texts} className="text-primary" />
            </h2>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mt-24">
              {companyDescription}
            </p>
          </BlurFade>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <BlurFade key={stat.label} delay={0.1 + index * 0.1} inView>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2">
                  <NumberTicker value={stat.number} />
                  {stat.suffix}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {stat.label}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <BlurFade key={value.title} delay={0.1 + index * 0.1} inView>
                <Card className="h-full group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </BlurFade>
            );
          })}
        </div>

        {/* Mission Statement */}
        <BlurFade delay={0.1} inView>
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 lg:p-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
                {t("sections.about.mission.title")}
              </h3>
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                &ldquo;{companyMission}&rdquo;
              </p>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
