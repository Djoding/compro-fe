"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { AbstractWavePattern } from "@/components/ui/abstract-wave-pattern";
import { Badge } from "@/components/ui/badge";
import {
  InteractiveCard,
  InteractiveCardGrid,
} from "@/components/ui/interactive-card";
import { useLanguage } from "@/contexts/language-context";
import { usePlatformsData } from "@/hooks/use-platforms-data";
import { useServicesData } from "@/hooks/use-services-data";
import {
  Cloud,
  Code,
  Database,
  Globe,
  Loader2,
  Palette,
  Settings,
  Shield,
  Smartphone,
  Target,
  Wrench,
  Zap,
} from "lucide-react";

interface ServiceData {
  id: string;
  title_id?: string;
  title_en?: string;
  description_id?: string;
  description_en?: string;
  features?: string[];
  category_id?: string;
  category_en?: string;
}

interface PlatformData {
  id: string;
  name_id?: string;
  name_en?: string;
  description_id?: string;
  description_en?: string;
  category_id?: string;
  category_en?: string;
}

interface TransformedService {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  rating: number;
  actionLabel: string;
}

// Extract fallback data constant
const FALLBACK_SERVICES_DATA = [
  {
    id: "1",
    titleId: "Pengembangan Web",
    titleEn: "Web Development",
    descriptionId:
      "Aplikasi web kustom yang dibangun dengan framework dan teknologi modern. Solusi end-to-end dari konsep hingga deployment dengan performa tinggi.",
    descriptionEn:
      "Custom web applications built with modern frameworks and technologies. End-to-end solutions from concept to deployment with high performance.",
    categoryId: "Pengembangan",
    categoryEn: "Development",
    actionLabelId: "Pelajari Lebih",
    actionLabelEn: "Learn More",
    iconType: "globe",
  },
  {
    id: "2",
    titleId: "Pengembangan Mobile",
    titleEn: "Mobile Development",
    descriptionId:
      "Aplikasi mobile native dan cross-platform untuk iOS dan Android. User experience yang optimal dengan performa native dan design yang menarik.",
    descriptionEn:
      "Native and cross-platform mobile applications for iOS and Android. Optimal user experience with native performance and attractive design.",
    categoryId: "Aplikasi Mobile",
    categoryEn: "Mobile Apps",
    actionLabelId: "Lihat Portfolio",
    actionLabelEn: "View Portfolio",
    iconType: "smartphone",
  },
  {
    id: "3",
    titleId: "Solusi Cloud",
    titleEn: "Cloud Solutions",
    descriptionId:
      "Infrastruktur cloud yang scalable dan strategi deployment modern. Optimasi biaya dengan keamanan enterprise dan monitoring 24/7.",
    descriptionEn:
      "Scalable cloud infrastructure and modern deployment strategies. Cost optimization with enterprise security and 24/7 monitoring.",
    categoryId: "Cloud Computing",
    categoryEn: "Cloud Computing",
    actionLabelId: "Konsultasi",
    actionLabelEn: "Consult",
    iconType: "cloud",
  },
  {
    id: "4",
    titleId: "Solusi Data",
    titleEn: "Data Solutions",
    descriptionId:
      "Design database, analytics, dan sistem business intelligence. Transform data menjadi insights yang actionable untuk pengambilan keputusan bisnis.",
    descriptionEn:
      "Database design, analytics, and business intelligence systems. Transform data into actionable insights for business decision making.",
    categoryId: "Data & Analytics",
    categoryEn: "Data & Analytics",
    actionLabelId: "Eksplorasi",
    actionLabelEn: "Explore",
    iconType: "database",
  },
  {
    id: "5",
    titleId: "Keamanan Cyber",
    titleEn: "Cybersecurity",
    descriptionId:
      "Audit keamanan, penetration testing, dan implementasi standar keamanan enterprise. Proteksi menyeluruh dari berbagai ancaman cyber.",
    descriptionEn:
      "Security audits, penetration testing, and enterprise security standards implementation. Comprehensive protection from various cyber threats.",
    categoryId: "Keamanan",
    categoryEn: "Security",
    actionLabelId: "Audit Gratis",
    actionLabelEn: "Free Audit",
    iconType: "shield",
  },
  {
    id: "6",
    titleId: "DevOps & Automation",
    titleEn: "DevOps & Automation",
    descriptionId:
      "CI/CD pipeline, infrastructure as code, dan automation untuk mempercepat development lifecycle dengan quality assurance yang ketat.",
    descriptionEn:
      "CI/CD pipelines, infrastructure as code, and automation to accelerate development lifecycle with strict quality assurance.",
    categoryId: "DevOps",
    categoryEn: "DevOps",
    actionLabelId: "Setup Otomasi",
    actionLabelEn: "Setup Automation",
    iconType: "settings",
  },
];

const FALLBACK_PLATFORMS_DATA = [
  {
    id: "1",
    nameId: "React & Next.js",
    nameEn: "React & Next.js",
    descriptionId:
      "Framework JavaScript modern untuk aplikasi web yang cepat dan SEO-friendly dengan server-side rendering.",
    descriptionEn:
      "Modern JavaScript framework for fast and SEO-friendly web applications with server-side rendering.",
    categoryId: "Frontend Framework",
    categoryEn: "Frontend Framework",
    iconType: "code",
  },
  {
    id: "2",
    nameId: "Node.js & Express",
    nameEn: "Node.js & Express",
    descriptionId:
      "Backend yang powerful dan scalable dengan JavaScript runtime yang cepat dan ecosystem yang kaya.",
    descriptionEn:
      "Powerful and scalable backend with fast JavaScript runtime and rich ecosystem.",
    categoryId: "Backend Technology",
    categoryEn: "Backend Technology",
    iconType: "settings",
  },
  {
    id: "3",
    nameId: "AWS & Azure",
    nameEn: "AWS & Azure",
    descriptionId:
      "Cloud platform terdepan untuk deployment, scaling, dan management aplikasi dengan uptime 99.9%.",
    descriptionEn:
      "Leading cloud platforms for deployment, scaling, and application management with 99.9% uptime.",
    categoryId: "Cloud Platform",
    categoryEn: "Cloud Platform",
    iconType: "cloud",
  },
  {
    id: "4",
    nameId: "PostgreSQL & MongoDB",
    nameEn: "PostgreSQL & MongoDB",
    descriptionId:
      "Database yang robust untuk relational dan NoSQL data dengan performa tinggi dan reliability.",
    descriptionEn:
      "Robust databases for relational and NoSQL data with high performance and reliability.",
    categoryId: "Database",
    categoryEn: "Database",
    iconType: "database",
  },
];

// Helper function to get icon
const getIconForType = (iconType: string) => {
  const iconMap = {
    globe: <Globe className="w-6 h-6" />,
    smartphone: <Smartphone className="w-6 h-6" />,
    cloud: <Cloud className="w-6 h-6" />,
    database: <Database className="w-6 h-6" />,
    shield: <Shield className="w-6 h-6" />,
    settings: <Settings className="w-6 h-6" />,
    code: <Code className="w-6 h-6" />,
    palette: <Palette className="w-6 h-6" />,
    target: <Target className="w-6 h-6" />,
    zap: <Zap className="w-6 h-6" />,
  };
  return (
    iconMap[iconType as keyof typeof iconMap] || <Wrench className="w-6 h-6" />
  );
};

// Extract fallback data generators
const generateFallbackServices = (locale: string): TransformedService[] =>
  FALLBACK_SERVICES_DATA.map((service) => ({
    id: service.id,
    title: locale === "id" ? service.titleId : service.titleEn,
    description:
      locale === "id" ? service.descriptionId : service.descriptionEn,
    icon: getIconForType(service.iconType),
    category: locale === "id" ? service.categoryId : service.categoryEn,
    rating: 5,
    actionLabel:
      locale === "id" ? service.actionLabelId : service.actionLabelEn,
  }));

const generateFallbackPlatforms = (locale: string): TransformedService[] =>
  FALLBACK_PLATFORMS_DATA.map((platform) => ({
    id: platform.id,
    title: locale === "id" ? platform.nameId : platform.nameEn,
    description:
      locale === "id" ? platform.descriptionId : platform.descriptionEn,
    icon: getIconForType(platform.iconType),
    category: locale === "id" ? platform.categoryId : platform.categoryEn,
    rating: 5,
    actionLabel: locale === "id" ? "Pelajari Teknologi" : "Learn Technology",
  }));

// Extract data transformation functions
const transformApiServices = (
  services: ServiceData[],
  locale: string
): TransformedService[] =>
  services.map((service) => ({
    id: service.id,
    title: (locale === "id" ? service.title_id : service.title_en) || "Service",
    description:
      (locale === "id" ? service.description_id : service.description_en) ||
      "No description",
    icon: <Wrench className="w-6 h-6" />,
    category:
      (locale === "id" ? service.category_id : service.category_en) ||
      (locale === "id" ? "Layanan" : "Service"),
    rating: 5,
    actionLabel: locale === "id" ? "Pelajari Lebih" : "Learn More",
  }));

const transformApiPlatforms = (
  platforms: PlatformData[],
  locale: string
): TransformedService[] =>
  platforms.map((platform) => ({
    id: platform.id,
    title:
      (locale === "id" ? platform.name_id : platform.name_en) || "Platform",
    description:
      (locale === "id" ? platform.description_id : platform.description_en) ||
      "No description",
    icon: <Settings className="w-6 h-6" />,
    category:
      (locale === "id" ? platform.category_id : platform.category_en) ||
      "Platform",
    rating: 5,
    actionLabel: locale === "id" ? "Pelajari Teknologi" : "Learn Technology",
  }));

// Extract loading component
const LoadingState = ({ locale }: { locale: string }) => (
  <section className="relative py-24 px-6">
    <div className="max-w-7xl mx-auto text-center">
      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
      <p className="text-muted-foreground">
        {locale === "id" ? "Memuat layanan..." : "Loading services..."}
      </p>
    </div>
  </section>
);

// Extract header component
const ServicesHeader = ({ locale }: { locale: string }) => (
  <BlurFade delay={0.1}>
    <div className="text-center mb-16">
      <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
        <Wrench className="w-4 h-4 mr-2" />
        {locale === "id" ? "Layanan Kami" : "Our Services"}
      </Badge>

      <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
        {locale === "id"
          ? "Solusi Teknologi Terdepan"
          : "Leading Technology Solutions"}
      </h2>

      <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
        {locale === "id"
          ? "Kami menyediakan berbagai layanan teknologi inovatif untuk membantu bisnis Anda berkembang di era digital. Dari pengembangan aplikasi hingga solusi cloud enterprise."
          : "We provide various innovative technology services to help your business thrive in the digital era. From application development to enterprise cloud solutions."}
      </p>
    </div>
  </BlurFade>
);

// Extract platforms section
const PlatformsSection = ({
  platforms,
  locale,
}: {
  platforms: TransformedService[];
  locale: string;
}) => (
  <div className="mt-24">
    <BlurFade delay={0.1}>
      <div className="text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          {locale === "id"
            ? "Teknologi & Platform"
            : "Technologies & Platforms"}
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {locale === "id"
            ? "Teknologi modern yang kami gunakan untuk memberikan solusi terbaik dan terscale untuk bisnis Anda."
            : "Modern technologies we use to deliver the best and scalable solutions for your business."}
        </p>
      </div>
    </BlurFade>

    <BlurFade delay={0.1}>
      <InteractiveCardGrid columns={3} gap={6}>
        {platforms.slice(0, 4).map((platform) => (
          <InteractiveCard
            key={platform.id}
            title={platform.title}
            description={platform.description}
            icon={platform.icon}
            category={platform.category}
            actionLabel={platform.actionLabel}
            size="md"
            onAction={() => console.log(`Clicked on ${platform.title}`)}
          />
        ))}
      </InteractiveCardGrid>
    </BlurFade>
  </div>
);

export default function ServicesSection() {
  const { locale } = useLanguage();
  const { services, loading: servicesLoading } = useServicesData();
  const { platforms, loading: platformsLoading } = usePlatformsData();

  if (servicesLoading || platformsLoading) {
    return <LoadingState locale={locale} />;
  }

  const transformedServices =
    services.length > 0
      ? transformApiServices(services, locale)
      : generateFallbackServices(locale);

  const transformedPlatforms =
    platforms.length > 0
      ? transformApiPlatforms(platforms, locale)
      : generateFallbackPlatforms(locale);

  return (
    <section className="relative py-24 px-6">
      <AbstractWavePattern
        variant="organic"
        intensity="medium"
        animated={true}
      />

      <div className="max-w-7xl mx-auto relative z-20">
        <ServicesHeader locale={locale} />

        {/* Main Services */}
        <BlurFade delay={0.1}>
          <InteractiveCardGrid columns={3} gap={8}>
            {transformedServices.map((service) => (
              <InteractiveCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                category={service.category}
                rating={service.rating}
                actionLabel={service.actionLabel}
                size="md"
                onAction={() => console.log(`Clicked on ${service.title}`)}
              />
            ))}
          </InteractiveCardGrid>
        </BlurFade>

        {/* Platforms Section */}
        <PlatformsSection platforms={transformedPlatforms} locale={locale} />
      </div>
    </section>
  );
}
