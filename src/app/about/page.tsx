// src/app/about/page.tsx
import AboutSection from "@/components/sections/about-section";
import { BlurFade } from "@/components/magicui/blur-fade";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, Target, Heart, Zap } from "lucide-react";

const visionMission = [
  {
    icon: Eye,
    title: "Vision",
    content:
      "To become Indonesia's leading digital transformation partner, empowering businesses of all sizes to thrive in the digital era through innovative technology solutions that create lasting competitive advantages.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Target,
    title: "Mission",
    content:
      "To accelerate business growth through innovative digital solutions, ensuring your business not only survives but excels by providing flexible and scalable architectures in an ever-evolving digital world.",
    color: "from-purple-500 to-pink-500",
  },
];

const coreValues = [
  {
    icon: Heart,
    title: "Passion for Excellence",
    description:
      "We are driven by an unwavering commitment to delivering exceptional results that exceed expectations.",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Innovation First",
    description:
      "We embrace cutting-edge technologies and creative solutions to solve complex business challenges.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Target,
    title: "Client Success Focus",
    description:
      "Your success is our success. We work as true partners invested in your long-term growth.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Eye,
    title: "Transparency & Trust",
    description:
      "We build lasting relationships through honest communication and reliable delivery.",
    color: "from-indigo-500 to-purple-500",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BlurFade delay={0.2} inView>
            <Badge variant="outline" className="mb-6">
              About Teknalogi
            </Badge>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Leading Digital Innovation
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Since 2019
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.6} inView>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              PT. Teknalogi Transformasi Digital has been at the forefront of
              digital innovation, helping businesses transform and thrive in the
              digital era through cutting-edge technology solutions.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.2} inView>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Our Vision & Mission
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Guiding principles that drive everything we do
              </p>
            </div>
          </BlurFade>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {visionMission.map((item, index) => {
              const Icon = item.icon;
              return (
                <BlurFade key={item.title} delay={0.4 + index * 0.2} inView>
                  <div
                    className={`relative p-8 rounded-2xl bg-gradient-to-br ${item.color} text-white overflow-hidden`}
                  >
                    <div className="relative z-10">
                      <Icon className="w-12 h-12 mb-4" />
                      <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                      <p className="text-lg leading-relaxed opacity-90">
                        {item.content}
                      </p>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
                  </div>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>

      {/* Scrolling Values Text */}
      <section className="py-12 bg-muted/20 overflow-hidden">
        <VelocityScroll
          defaultVelocity={1}
          className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-primary/20 drop-shadow-sm"
        >
          Excellence • Innovation • Partnership • Trust • Growth • Excellence •
          Innovation • Partnership • Trust • Growth •
        </VelocityScroll>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.2} inView>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Our Core Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                The principles that guide our decisions and shape our culture
              </p>
            </div>
          </BlurFade>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <BlurFade key={value.title} delay={0.4 + index * 0.1} inView>
                  <div className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 h-full">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${value.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section (existing) */}
      <AboutSection />

      {/* Company Journey */}
      <section className="py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.2} inView>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Our Journey
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                From humble beginnings to becoming a trusted digital innovation
                partner
              </p>
            </div>
          </BlurFade>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-0.5 bg-gradient-to-b from-primary via-accent to-primary"></div>

            <div className="space-y-12">
              {[
                {
                  year: "2019",
                  title: "Foundation & Vision",
                  description:
                    "Teknalogi was founded with a bold vision to democratize digital transformation for businesses of all sizes across Indonesia.",
                  achievement: "First office established in Jakarta",
                  side: "left",
                },
                {
                  year: "2020",
                  title: "First Major Breakthrough",
                  description:
                    "Successfully delivered our first enterprise-level digital transformation project, setting the stage for exponential growth.",
                  achievement: "5 major clients onboarded",
                  side: "right",
                },
                {
                  year: "2021",
                  title: "Team Expansion & Expertise",
                  description:
                    "Expanded our team of experts and opened our first dedicated development center, bringing world-class talent together.",
                  achievement: "Team grew to 10+ specialists",
                  side: "left",
                },
                {
                  year: "2022",
                  title: "Cloud Innovation Leader",
                  description:
                    "Launched comprehensive cloud migration and infrastructure services, helping clients modernize their legacy systems.",
                  achievement: "20+ cloud projects completed",
                  side: "right",
                },
                {
                  year: "2023",
                  title: "AI & Machine Learning Integration",
                  description:
                    "Integrated cutting-edge AI and machine learning capabilities into our service offerings, staying ahead of technology trends.",
                  achievement: "AI solutions for 15+ clients",
                  side: "left",
                },
                {
                  year: "2024",
                  title: "Milestone Achievement",
                  description:
                    "Celebrated delivering over 50 successful projects and serving clients across various industries, from startups to enterprises.",
                  achievement: "50+ projects, 25+ happy clients",
                  side: "right",
                },
                {
                  year: "2025",
                  title: "Future Vision",
                  description:
                    "Expanding our services globally while maintaining our commitment to excellence and innovation in digital transformation.",
                  achievement: "International expansion planned",
                  side: "left",
                },
              ].map((milestone, index) => (
                <BlurFade key={milestone.year} delay={0.4 + index * 0.1} inView>
                  <div
                    className={`flex items-center ${
                      milestone.side === "right" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-1/2 ${
                        milestone.side === "right" ? "pl-8" : "pr-8"
                      }`}
                    >
                      <div
                        className={`${
                          milestone.side === "right"
                            ? "text-left"
                            : "text-right"
                        }`}
                      >
                        <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-primary font-bold text-sm">
                                {milestone.year}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-foreground">
                              {milestone.title}
                            </h3>
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                            {milestone.description}
                          </p>
                          <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                            {milestone.achievement}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Timeline dot */}
                    <div className="relative">
                      <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"></div>
                    </div>

                    <div className="w-1/2"></div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BlurFade delay={0.2} inView>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to Start Your Digital Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the growing number of businesses that trust Teknalogi to
              accelerate their digital transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                Learn More About Us
              </Button>
            </div>
          </BlurFade>
        </div>
      </section>
    </div>
  );
}
