"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { AbstractWavePattern } from "@/components/ui/abstract-wave-pattern";
import { Badge } from "@/components/ui/badge";
import {
  InteractiveCard,
  InteractiveCardGrid,
} from "@/components/ui/interactive-card";
import { useLanguage } from "@/contexts/language-context";
import { useProjectsData } from "@/hooks/use-projects-data";
import {
  Code,
  Cpu,
  Database,
  Globe,
  Loader2,
  Rocket,
  Smartphone,
} from "lucide-react";

interface ProjectData {
  id: string;
  title_id: string;
  title_en: string;
  serviceCategory: string;
  imageUrl: string;
  shortDescription_id: string;
  shortDescription_en: string;
  elaboration_id: string;
  elaboration_en: string;
  languages: string[];
  features: string[];
  createdAt: string;
  updatedAt: string;
  title: string;
  shortDescription: string;
  elaboration: string;
}

interface TransformedProject {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  rating: number;
  actionLabel: string;
  image?: string;
  features?: string[];
}

// Extract fallback data constant
const FALLBACK_PROJECTS_DATA = [
  {
    id: "1",
    titleId: "Platform E-Commerce Modern",
    titleEn: "Modern E-Commerce Platform",
    descriptionId:
      "Solusi e-commerce scalable dengan analytics canggih, manajemen inventory real-time, dan integrasi payment gateway yang aman. Mendukung multi-vendor dan mobile responsive.",
    descriptionEn:
      "Scalable e-commerce solution with advanced analytics, real-time inventory management, and secure payment gateway integration. Supports multi-vendor and mobile responsive.",
    categoryId: "Pengembangan Web",
    categoryEn: "Web Development",
    actionLabelId: "Lihat Demo",
    actionLabelEn: "View Demo",
    iconType: "globe",
    technologies: ["Next.js", "PostgreSQL", "Stripe", "AWS"],
  },
  {
    id: "2",
    titleId: "Dashboard Financial Analytics",
    titleEn: "Financial Analytics Dashboard",
    descriptionId:
      "Sistem manajemen keuangan komprehensif dengan visualisasi data real-time, predictive analytics, dan reporting otomatis untuk pengambilan keputusan bisnis yang tepat.",
    descriptionEn:
      "Comprehensive financial management system with real-time data visualization, predictive analytics, and automated reporting for informed business decision making.",
    categoryId: "Analitik Data",
    categoryEn: "Data Analytics",
    actionLabelId: "Eksplorasi",
    actionLabelEn: "Explore",
    iconType: "database",
    technologies: ["React", "Python", "D3.js", "MongoDB"],
  },
  {
    id: "3",
    titleId: "Aplikasi Mobile IoT",
    titleEn: "IoT Mobile Application",
    descriptionId:
      "Aplikasi mobile untuk monitoring dan kontrol perangkat IoT dengan interface intuitif, notifikasi real-time, dan dashboard analytics yang powerful.",
    descriptionEn:
      "Mobile application for monitoring and controlling IoT devices with intuitive interface, real-time notifications, and powerful analytics dashboard.",
    categoryId: "Pengembangan Mobile",
    categoryEn: "Mobile Development",
    actionLabelId: "Download",
    actionLabelEn: "Download",
    iconType: "smartphone",
    technologies: ["React Native", "Node.js", "Firebase", "MQTT"],
  },
  {
    id: "4",
    titleId: "Sistem ERP Cloud",
    titleEn: "Cloud ERP System",
    descriptionId:
      "Solusi ERP terintegrasi berbasis cloud untuk manajemen bisnis end-to-end. Mencakup CRM, inventory, HR, dan financial dengan skalabilitas tinggi.",
    descriptionEn:
      "Integrated cloud-based ERP solution for end-to-end business management. Includes CRM, inventory, HR, and financial modules with high scalability.",
    categoryId: "Sistem Enterprise",
    categoryEn: "Enterprise Systems",
    actionLabelId: "Pelajari",
    actionLabelEn: "Learn More",
    iconType: "cpu",
    technologies: ["Angular", "Spring Boot", "PostgreSQL", "Docker"],
  },
  {
    id: "5",
    titleId: "Platform AI Chatbot",
    titleEn: "AI Chatbot Platform",
    descriptionId:
      "Platform chatbot cerdas dengan NLP yang dapat diintegrasikan ke berbagai channel komunikasi. Mendukung machine learning dan customisasi penuh.",
    descriptionEn:
      "Intelligent chatbot platform with NLP that can be integrated into various communication channels. Supports machine learning and full customization.",
    categoryId: "Artificial Intelligence",
    categoryEn: "Artificial Intelligence",
    actionLabelId: "Coba Sekarang",
    actionLabelEn: "Try Now",
    iconType: "code",
    technologies: ["Python", "TensorFlow", "FastAPI", "Redis"],
  },
  {
    id: "6",
    titleId: "Website Corporate",
    titleEn: "Corporate Website",
    descriptionId:
      "Website corporate dengan CMS headless, performa tinggi, SEO-optimized, dan design responsive. Dilengkapi dengan analytics dan A/B testing.",
    descriptionEn:
      "Corporate website with headless CMS, high performance, SEO-optimized, and responsive design. Equipped with analytics and A/B testing capabilities.",
    categoryId: "Website Korporat",
    categoryEn: "Corporate Website",
    actionLabelId: "Kunjungi",
    actionLabelEn: "Visit",
    iconType: "rocket",
    technologies: ["Next.js", "Strapi", "Vercel", "Google Analytics"],
  },
];

// Helper function to get icon
const getIconForType = (iconType: string) => {
  const iconMap = {
    globe: <Globe className="w-6 h-6" />,
    smartphone: <Smartphone className="w-6 h-6" />,
    rocket: <Rocket className="w-6 h-6" />,
    database: <Database className="w-6 h-6" />,
    cpu: <Cpu className="w-6 h-6" />,
    code: <Code className="w-6 h-6" />,
  };
  return (
    iconMap[iconType as keyof typeof iconMap] || <Code className="w-6 h-6" />
  );
};

// Helper function for project icons based on category
const getProjectIcon = (category: string) => {
  const lowerCategory = category.toLowerCase();
  if (lowerCategory.includes("web") || lowerCategory.includes("development")) {
    return <Globe className="w-6 h-6" />;
  }
  if (lowerCategory.includes("mobile") || lowerCategory.includes("app")) {
    return <Smartphone className="w-6 h-6" />;
  }
  if (
    lowerCategory.includes("e-commerce") ||
    lowerCategory.includes("ecommerce")
  ) {
    return <Rocket className="w-6 h-6" />;
  }
  if (lowerCategory.includes("data") || lowerCategory.includes("analytics")) {
    return <Database className="w-6 h-6" />;
  }
  return <Code className="w-6 h-6" />;
}; // Extract fallback data generator
const generateFallbackProjects = (locale: string): TransformedProject[] =>
  FALLBACK_PROJECTS_DATA.map((item) => ({
    id: item.id,
    title: locale === "id" ? item.titleId : item.titleEn,
    description: locale === "id" ? item.descriptionId : item.descriptionEn,
    icon: getIconForType(item.iconType),
    category: locale === "id" ? item.categoryId : item.categoryEn,
    rating: 5, // Default high rating for projects
    actionLabel: locale === "id" ? item.actionLabelId : item.actionLabelEn,
  }));

// Extract data transformation function
const transformApiProjects = (
  projects: ProjectData[],
  locale: string
): TransformedProject[] =>
  projects.map((project) => ({
    id: project.id,
    title: (locale === "id" ? project.title_id : project.title_en) || "Project",
    description:
      (locale === "id"
        ? project.shortDescription_id
        : project.shortDescription_en) || "No description",
    icon: getProjectIcon(project.serviceCategory),
    category:
      project.serviceCategory || (locale === "id" ? "Proyek" : "Project"),
    rating: 5,
    actionLabel: locale === "id" ? "Lihat Detail" : "View Details",
    image: project.imageUrl,
    features: project.features || [],
  })); // Extract loading component
const LoadingState = ({ locale }: { locale: string }) => (
  <section className="relative py-24 px-6">
    <div className="max-w-7xl mx-auto text-center">
      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
      <p className="text-muted-foreground">
        {locale === "id" ? "Memuat portfolio..." : "Loading portfolio..."}
      </p>
    </div>
  </section>
);

// Extract header component
const PortfolioHeader = ({ locale }: { locale: string }) => (
  <BlurFade delay={0.1}>
    <div className="text-center mb-16">
      <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
        <Rocket className="w-4 h-4 mr-2" />
        {locale === "id" ? "Portfolio Kami" : "Our Portfolio"}
      </Badge>

      <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
        {locale === "id"
          ? "Proyek Yang Telah Kami Kerjakan"
          : "Projects We Have Delivered"}
      </h2>

      <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
        {locale === "id"
          ? "Jelajahi portfolio solusi teknologi inovatif yang telah kami bangun untuk berbagai klien. Setiap proyek menunjukkan komitmen kami terhadap kualitas dan inovasi."
          : "Explore our portfolio of innovative technology solutions built for various clients. Each project demonstrates our commitment to quality and innovation."}
      </p>
    </div>
  </BlurFade>
);

export default function PortfolioSection() {
  const { locale } = useLanguage();
  const { projects, loading } = useProjectsData();

  if (loading) {
    return <LoadingState locale={locale} />;
  }

  const transformedProjects =
    projects.length > 0
      ? transformApiProjects(projects, locale)
      : generateFallbackProjects(locale);

  return (
    <section className="relative py-24 px-6">
      <AbstractWavePattern variant="fluid" intensity="medium" animated={true} />

      <div className="max-w-7xl mx-auto relative z-20">
        <PortfolioHeader locale={locale} />

        <BlurFade delay={0.1}>
          <InteractiveCardGrid columns={3} gap={8}>
            {transformedProjects.map((project) => (
              <InteractiveCard
                key={project.id}
                title={project.title}
                description={project.description}
                icon={project.icon}
                image={project.image}
                category={project.category}
                features={project.features}
                actionLabel={project.actionLabel}
                size="md"
                className="h-full"
                onAction={() => console.log(`Clicked on ${project.title}`)}
              />
            ))}
          </InteractiveCardGrid>
        </BlurFade>
      </div>
    </section>
  );
}
