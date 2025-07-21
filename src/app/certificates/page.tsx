// src/app/certificates/page.tsx
import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Award,
  Calendar,
  ExternalLink,
  Shield,
  Star,
  CheckCircle,
} from "lucide-react";

const certificates = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    category: "Cloud Computing",
    level: "Professional",
    date: "2023-08-15",
    expiryDate: "2026-08-15",
    description:
      "Advanced certification demonstrating expertise in designing distributed applications and systems on AWS platform.",
    skills: [
      "Cloud Architecture",
      "AWS Services",
      "Security",
      "Cost Optimization",
    ],
    credentialId: "AWS-CSA-12345678",
    verificationUrl: "#",
    image: "aws-logo",
  },
  {
    id: 2,
    title: "Microsoft Azure DevOps Engineer Expert",
    issuer: "Microsoft",
    category: "DevOps",
    level: "Expert",
    date: "2023-06-20",
    expiryDate: "2025-06-20",
    description:
      "Expert-level certification in implementing DevOps practices using Microsoft Azure technologies.",
    skills: ["CI/CD", "Azure DevOps", "Infrastructure as Code", "Monitoring"],
    credentialId: "MSFT-AZ400-87654321",
    verificationUrl: "#",
    image: "azure-logo",
  },
  {
    id: 3,
    title: "Google Cloud Professional Cloud Architect",
    issuer: "Google Cloud",
    category: "Cloud Computing",
    level: "Professional",
    date: "2023-09-10",
    expiryDate: "2025-09-10",
    description:
      "Professional certification in designing and managing robust, secure, scalable, and dynamic solutions on GCP.",
    skills: ["GCP Services", "System Design", "Security", "Migration"],
    credentialId: "GCP-PCA-11223344",
    verificationUrl: "#",
    image: "gcp-logo",
  },
  {
    id: 4,
    title: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation",
    category: "Container Orchestration",
    level: "Professional",
    date: "2023-07-05",
    expiryDate: "2026-07-05",
    description:
      "Hands-on certification demonstrating skills in Kubernetes administration and cluster management.",
    skills: [
      "Kubernetes",
      "Container Management",
      "Cluster Administration",
      "Troubleshooting",
    ],
    credentialId: "CKA-2023-55667788",
    verificationUrl: "#",
    image: "k8s-logo",
  },
  {
    id: 5,
    title: "Certified Information Security Manager (CISM)",
    issuer: "ISACA",
    category: "Cybersecurity",
    level: "Expert",
    date: "2023-05-15",
    expiryDate: "2026-05-15",
    description:
      "Advanced certification for information security management and governance professionals.",
    skills: [
      "Security Management",
      "Risk Assessment",
      "Incident Response",
      "Governance",
    ],
    credentialId: "CISM-2023-99887766",
    verificationUrl: "#",
    image: "isaca-logo",
  },
  {
    id: 6,
    title: "Scrum Master Certified (SMC)",
    issuer: "Scrum Alliance",
    category: "Agile Methodology",
    level: "Professional",
    date: "2023-04-12",
    expiryDate: "2025-04-12",
    description:
      "Certification demonstrating expertise in Scrum framework and agile project management.",
    skills: [
      "Scrum Framework",
      "Agile Coaching",
      "Team Leadership",
      "Sprint Planning",
    ],
    credentialId: "SMC-2023-44556677",
    verificationUrl: "#",
    image: "scrum-logo",
  },
];

const categories = [
  "All",
  "Cloud Computing",
  "DevOps",
  "Cybersecurity",
  "Container Orchestration",
  "Agile Methodology",
];

const companyAchievements = [
  {
    icon: Shield,
    title: "ISO 27001 Certified",
    description: "Information security management system certification",
    year: "2023",
  },
  {
    icon: Star,
    title: "Google Partner",
    description: "Certified Google Cloud Partner status",
    year: "2023",
  },
  {
    icon: Award,
    title: "AWS Advanced Consulting Partner",
    description: "Advanced tier partnership with Amazon Web Services",
    year: "2024",
  },
  {
    icon: CheckCircle,
    title: "Microsoft Gold Partner",
    description: "Gold competency in Cloud Platform solutions",
    year: "2024",
  },
];

export default function CertificatesPage() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    return expiry <= sixMonthsFromNow;
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-accent/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BlurFade delay={0.2} inView>
            <Badge variant="outline" className="mb-6">
              Certifications & Credentials
            </Badge>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Proven Expertise &
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Industry Recognition
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.6} inView>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our team holds industry-leading certifications and credentials,
              ensuring we deliver solutions using the latest technologies and
              best practices.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Company Achievements */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.2} inView>
            <h2 className="text-2xl font-bold text-foreground text-center mb-12">
              Company Certifications & Partnerships
            </h2>
          </BlurFade>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {companyAchievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <BlurFade
                  key={achievement.title}
                  delay={0.4 + index * 0.1}
                  inView
                >
                  <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300">
                    <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {achievement.description}
                    </p>
                    <Badge variant="outline">{achievement.year}</Badge>
                  </div>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-8 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.2} inView>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                  className="transition-all duration-200"
                >
                  {category}
                </Button>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Certificates Grid */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert, index) => (
              <BlurFade key={cert.id} delay={0.4 + index * 0.1} inView>
                <MagicCard className="h-full">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {cert.category}
                          </Badge>
                          <Badge
                            className={`text-xs ${
                              cert.level === "Expert"
                                ? "bg-red-100 text-red-800"
                                : cert.level === "Professional"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {cert.level}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-foreground text-lg mb-1">
                          {cert.title}
                        </h3>
                        <p className="text-primary font-medium text-sm mb-2">
                          {cert.issuer}
                        </p>
                      </div>
                      <Award className="w-6 h-6 text-primary flex-shrink-0" />
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {cert.description}
                    </p>

                    {/* Skills */}
                    <div className="mb-4">
                      <p className="text-xs font-medium text-foreground mb-2">
                        Key Skills:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                      <div>
                        <p className="text-muted-foreground">Issued:</p>
                        <p className="font-medium text-foreground">
                          {formatDate(cert.date)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Expires:</p>
                        <p
                          className={`font-medium ${
                            isExpiringSoon(cert.expiryDate)
                              ? "text-orange-600"
                              : "text-foreground"
                          }`}
                        >
                          {formatDate(cert.expiryDate)}
                        </p>
                      </div>
                    </div>

                    {/* Credential ID */}
                    <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">
                        Credential ID:
                      </p>
                      <p className="text-xs font-mono text-foreground">
                        {cert.credentialId}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Verify
                      </Button>
                      <Button size="sm" className="flex-1">
                        <Calendar className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                    </div>
                  </div>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BlurFade delay={0.2} inView>
            <h2 className="text-3xl font-bold text-foreground mb-12">
              Certification Statistics
            </h2>
          </BlurFade>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "15+",
                label: "Active Certifications",
                description: "Across multiple technologies",
              },
              {
                number: "5",
                label: "Cloud Platforms",
                description: "AWS, Azure, GCP expertise",
              },
              {
                number: "100%",
                label: "Up-to-Date",
                description: "All certifications current",
              },
              {
                number: "4",
                label: "Partnership Levels",
                description: "Elite tier partnerships",
              },
            ].map((stat, index) => (
              <BlurFade key={stat.label} delay={0.4 + index * 0.1} inView>
                <div>
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                    {stat.number}
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
        </div>
      </section>
    </div>
  );
}
