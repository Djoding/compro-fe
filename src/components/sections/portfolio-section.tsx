"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A modern, scalable e-commerce solution with advanced analytics and inventory management",
    image: "/api/placeholder/600/400",
    category: "Web Development",
    technologies: ["Next.js", "PostgreSQL", "Stripe", "AWS"],
    features: [
      "Real-time inventory",
      "Advanced analytics",
      "Multi-vendor support",
      "Mobile responsive",
    ],
    link: "#",
    github: "#",
  },
  {
    id: 2,
    title: "Financial Dashboard",
    description:
      "Comprehensive financial management system with real-time data visualization and reporting",
    image: "/api/placeholder/600/400",
    category: "Data Analytics",
    technologies: ["React", "Python", "D3.js", "MongoDB"],
    features: [
      "Real-time dashboards",
      "Predictive analytics",
      "Custom reports",
      "API integration",
    ],
    link: "#",
    github: "#",
  },
  {
    id: 3,
    title: "Healthcare Management System",
    description:
      "Digital transformation solution for healthcare providers with patient management and telemedicine",
    image: "/api/placeholder/600/400",
    category: "Digital Transformation",
    technologies: ["Vue.js", "Node.js", "Socket.io", "Docker"],
    features: [
      "Patient records",
      "Telemedicine",
      "Appointment system",
      "HIPAA compliant",
    ],
    link: "#",
    github: "#",
  },
  {
    id: 4,
    title: "Logistics Optimization App",
    description:
      "Mobile application for supply chain optimization with real-time tracking and route planning",
    image: "/api/placeholder/600/400",
    category: "Mobile Development",
    technologies: ["React Native", "Express.js", "Redis", "Google Maps"],
    features: [
      "Real-time tracking",
      "Route optimization",
      "Driver management",
      "Analytics dashboard",
    ],
    link: "#",
    github: "#",
  },
  {
    id: 5,
    title: "Cloud Infrastructure Migration",
    description:
      "Complete cloud migration strategy and implementation for enterprise-level applications",
    image: "/api/placeholder/600/400",
    category: "Cloud Solutions",
    technologies: ["AWS", "Kubernetes", "Terraform", "Jenkins"],
    features: [
      "Auto-scaling",
      "CI/CD pipeline",
      "Monitoring",
      "Cost optimization",
    ],
    link: "#",
    github: "#",
  },
  {
    id: 6,
    title: "IoT Data Platform",
    description:
      "Industrial IoT platform for monitoring and analyzing sensor data from manufacturing equipment",
    image: "/api/placeholder/600/400",
    category: "Data Solutions",
    technologies: ["Python", "InfluxDB", "Grafana", "MQTT"],
    features: [
      "Real-time monitoring",
      "Predictive maintenance",
      "Alert system",
      "Historical analysis",
    ],
    link: "#",
    github: "#",
  },
];

const categories = [
  "All",
  "Web Development",
  "Mobile Development",
  "Cloud Solutions",
  "Data Analytics",
  "Digital Transformation",
];

export default function PortfolioSection() {
  return (
    <section className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <BlurFade delay={0.2} inView>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
              Our Solutions
            </span>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Proven Success Stories
            </h2>
          </BlurFade>

          <BlurFade delay={0.6} inView>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore our portfolio of successful digital transformation
              projects. Each solution is crafted to meet specific business needs
              and drive measurable results.
            </p>
          </BlurFade>
        </div>

        {/* Filter Tabs */}
        <BlurFade delay={0.8} inView>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
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

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <BlurFade key={project.id} delay={1.0 + index * 0.1} inView>
              <MagicCard className="group overflow-hidden h-full">
                <div className="relative">
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mb-2">
                        <span className="text-2xl">
                          {project.category.charAt(0)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {project.category}
                      </p>
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex space-x-3">
                        <Button size="sm" variant="secondary">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="secondary">
                          <span className="w-4 h-4 text-center">⚡</span>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="text-xs text-muted-foreground space-y-1 mb-4">
                      {project.features.slice(0, 2).map((feature) => (
                        <li key={feature} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </MagicCard>
            </BlurFade>
          ))}
        </div>

        {/* CTA */}
        <BlurFade delay={1.8} inView>
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Have a Project in Mind?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let&apos;s collaborate to bring your vision to life. Our team is
              ready to tackle your next challenge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                View All Projects
              </Button>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
