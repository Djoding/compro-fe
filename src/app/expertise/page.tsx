import ServicesSection from "@/components/sections/services-section";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Database,
  Cloud,
  Shield,
  Smartphone,
  Globe,
  Users,
  Zap,
} from "lucide-react";
import { Particles } from "@/components/magicui/particles";
import { WavySeparator } from "@/components/ui/wavy-separator";

const expertiseAreas = [
  {
    icon: Code,
    title: "Full-Stack Development",
    description:
      "End-to-end web application development using modern frameworks and best practices.",
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Python",
      "Java",
    ],
    projects: "25+ Projects",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "Native and cross-platform mobile applications for iOS and Android platforms.",
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Ionic"],
    projects: "15+ Apps",
  },
  {
    icon: Cloud,
    title: "Cloud Architecture",
    description:
      "Scalable cloud infrastructure design and deployment on major cloud platforms.",
    technologies: [
      "AWS",
      "Azure",
      "Google Cloud",
      "Docker",
      "Kubernetes",
      "Terraform",
    ],
    projects: "20+ Migrations",
  },
  {
    icon: Database,
    title: "Data Engineering",
    description:
      "Big data processing, analytics, and business intelligence solutions.",
    technologies: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Elasticsearch",
      "Apache Spark",
    ],
    projects: "10+ Solutions",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description:
      "Comprehensive security audits, penetration testing, and compliance solutions.",
    technologies: [
      "OWASP",
      "SIEM",
      "Penetration Testing",
      "Compliance",
      "Security Audits",
    ],
    projects: "30+ Audits",
  },
  {
    icon: Globe,
    title: "API Development",
    description:
      "RESTful and GraphQL API design, development, and documentation.",
    technologies: [
      "REST",
      "GraphQL",
      "OpenAPI",
      "Microservices",
      "API Gateway",
    ],
    projects: "40+ APIs",
  },
];

const platforms = [
  {
    name: "Amazon Web Services",
    description: "Certified cloud solutions partner",
    level: "Advanced",
  },
  {
    name: "Microsoft Azure",
    description: "Enterprise cloud deployments",
    level: "Intermediate",
  },
  {
    name: "Google Cloud Platform",
    description: "Machine learning and analytics",
    level: "Intermediate",
  },
  {
    name: "Vercel",
    description: "Modern web application hosting",
    level: "Expert",
  },
  {
    name: "MongoDB Atlas",
    description: "Database as a service solutions",
    level: "Advanced",
  },
  {
    name: "Stripe",
    description: "Payment processing integration",
    level: "Expert",
  },
];

export default function ExpertisePage() {
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
              Our Expertise
            </Badge>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Technical Excellence
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Across Technologies
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our team of experts brings deep technical knowledge across a wide
              range of technologies and platforms to deliver exceptional digital
              solutions.
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
                Core Competencies
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Deep expertise across the full technology stack
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
                Platform Partners
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Certified partnerships with leading technology platforms
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
