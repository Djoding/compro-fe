"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Cloud,
  Database,
  Globe,
  Settings,
  Shield,
  Smartphone,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Custom web applications built with modern frameworks and technologies",
    features: [
      "React & Next.js",
      "Progressive Web Apps",
      "E-commerce Solutions",
      "CMS Development",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "Native and cross-platform mobile applications for iOS and Android",
    features: [
      "React Native",
      "Flutter",
      "Native iOS/Android",
      "App Store Optimization",
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and deployment strategies",
    features: [
      "AWS & Azure",
      "DevOps & CI/CD",
      "Microservices",
      "Container Orchestration",
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Database,
    title: "Data Solutions",
    description:
      "Database design, analytics, and business intelligence systems",
    features: [
      "Database Design",
      "Data Analytics",
      "Business Intelligence",
      "API Development",
    ],
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Shield,
    title: "Security Solutions",
    description: "Comprehensive cybersecurity and data protection services",
    features: [
      "Security Audits",
      "Penetration Testing",
      "Compliance",
      "Threat Monitoring",
    ],
    color: "from-gray-500 to-slate-500",
  },
  {
    icon: Settings,
    title: "Digital Transformation",
    description: "End-to-end digital transformation and process optimization",
    features: [
      "Process Automation",
      "Legacy Modernization",
      "Digital Strategy",
      "Change Management",
    ],
    color: "from-indigo-500 to-purple-500",
  },
];

const technologies = [
  { name: "React", logo: "⚛️" },
  { name: "Next.js", logo: "▲" },
  { name: "Node.js", logo: "🟢" },
  { name: "Python", logo: "🐍" },
  { name: "AWS", logo: "☁️" },
  { name: "Docker", logo: "🐳" },
  { name: "TypeScript", logo: "📘" },
  { name: "PostgreSQL", logo: "🐘" },
];

export default function ServicesSection() {
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Comprehensive Digital Solutions
            </h2>
          </BlurFade>

          <BlurFade delay={0.6} inView>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From web development to cloud solutions, we offer a full spectrum
              of digital services to help your business thrive in the modern
              technological landscape.
            </p>
          </BlurFade>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <BlurFade key={service.title} delay={0.8 + index * 0.1} inView>
                <MagicCard className="group h-full">
                  <div className="p-6 h-full flex flex-col">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center mb-4`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 flex-grow">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center text-sm text-muted-foreground"
                        >
                          <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

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

        {/* Technologies */}
        <BlurFade delay={1.4} inView>
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-8">
              Technologies We Work With
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="flex flex-col items-center p-4 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <span className="text-3xl mb-2">{tech.logo}</span>
                  <span className="text-sm font-medium text-foreground">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* CTA */}
        <BlurFade delay={1.6} inView>
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 lg:p-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Ready to Transform Your Business?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let&apos;s discuss how our expertise can help you achieve your
                digital transformation goals.
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
