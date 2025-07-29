"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { MorphingText } from "@/components/magicui/morphing-text";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { motion } from "framer-motion";
import { Award, Lightbulb, Target, Users, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { companyProfileAPI } from "@/lib/api";
import { useLanguage } from "@/contexts/language-context";

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
const defaultStats = [
  {
    number: 50,
    suffix: "+",
    label: "Projects Completed",
    description: "Successful digital solutions delivered"
  },
  {
    number: 25,
    suffix: "+",
    label: "Happy Clients",
    description: "Businesses transformed through technology"
  },
  {
    number: 5,
    suffix: "+",
    label: "Years Experience",
    description: "Years of digital innovation expertise"
  },
  {
    number: 15,
    suffix: "+",
    label: "Team Members",
    description: "Skilled professionals ready to help"
  }
];

const values = [
  {
    icon: Target,
    title: "Innovation First",
    description: "We prioritize cutting-edge solutions that drive meaningful business transformation and competitive advantage."
  },
  {
    icon: Users,
    title: "Client-Centric",
    description: "Your success is our success. We work closely with clients to understand and exceed their expectations."
  },
  {
    icon: Lightbulb,
    title: "Creative Solutions",
    description: "We think outside the box to deliver unique, tailored solutions that address your specific challenges."
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description: "We maintain the highest standards in everything we do, ensuring reliable and scalable solutions."
  }
];

const texts = ["Digital Innovation", "Business Growth", "Technology Solutions", "Future Success"];

export default function AboutSection() {
  const { locale } = useLanguage();
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
  const [stats, setStats] = useState(defaultStats);
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {
      const fetchData = async () => {
        try {
          setLoading(true);

          const [profileResponse, statsResponse] = await Promise.all([
            companyProfileAPI.getProfile(),
            companyProfileAPI.getStats().catch(() => ({ data: null })) // Optional stats
          ]);

          if (profileResponse.status === "success" && profileResponse.data) {
            setCompanyProfile(profileResponse.data);
          }

          // Update stats if available from API
          if (statsResponse.data) {
            // You can customize this based on your API response structure
            const apiStats = statsResponse.data as CompanyStats;
            if (apiStats.projectsCompleted) {
              setStats(prev =>
                prev.map(stat =>
                  stat.label === "Projects Completed" ? { ...stat, number: apiStats.projectsCompleted! } : stat
                )
              );
            }
            if (apiStats.happyClients) {
              setStats(prev =>
                prev.map(stat => (stat.label === "Happy Clients" ? { ...stat, number: apiStats.happyClients! } : stat))
              );
            }
            if (apiStats.teamMembers) {
              setStats(prev =>
                prev.map(stat => (stat.label === "Team Members" ? { ...stat, number: apiStats.teamMembers! } : stat))
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
    },
    [locale]
  );

  // Get company data with fallbacks
  const companyName = companyProfile
    ? (locale === "id" ? companyProfile.name_id : companyProfile.name_en) || "PT. Teknalogi Transformasi Digital"
    : "PT. Teknalogi Transformasi Digital";

  // Ensure companyName is always a string to prevent split errors
  const safeCompanyName = companyName || "PT. Teknalogi Transformasi Digital";

  const companyDescription = companyProfile
    ? (locale === "id" ? companyProfile.description_id : companyProfile.description_en) ||
      "PT. Teknalogi Transformasi Digital is dedicated to helping businesses thrive in the digital age. We provide comprehensive technology solutions that enhance efficiency, drive innovation, and unlock new growth opportunities."
    : "PT. Teknalogi Transformasi Digital is dedicated to helping businesses thrive in the digital age. We provide comprehensive technology solutions that enhance efficiency, drive innovation, and unlock new growth opportunities.";

  const companyMission = companyProfile
    ? (locale === "id" ? companyProfile.mission_id : companyProfile.mission_en) ||
      "To accelerate business growth through innovative digital solutions, ensuring your business not only survives but excels by providing flexible and scalable architectures in an ever-evolving digital world."
    : "To accelerate business growth through innovative digital solutions, ensuring your business not only survives but excels by providing flexible and scalable architectures in an ever-evolving digital world.";

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading company information...</span>
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
          <BlurFade delay={0.2} inView>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
              About {safeCompanyName.split(" ")[1] || "Teknalogi"}
            </span>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Transforming Businesses Through <MorphingText texts={texts} className="text-primary" />
            </h2>
          </BlurFade>

          <BlurFade delay={0.6} inView>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mt-24">{companyDescription}</p>
          </BlurFade>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <BlurFade key={stat.label} delay={0.8 + index * 0.1} inView>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2">
                  <NumberTicker value={stat.number} />
                  {stat.suffix}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{stat.label}</h3>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </div>
            </BlurFade>
          ))}
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <BlurFade key={value.title} delay={1.2 + index * 0.1} inView>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-card border border-border rounded-xl p-6 h-full hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </motion.div>
              </BlurFade>
            );
          })}
        </div>

        {/* Mission Statement */}
        <BlurFade delay={1.6} inView>
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 lg:p-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">Our Mission</h3>
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">&ldquo;{companyMission}&rdquo;</p>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
