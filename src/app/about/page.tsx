import AboutSection from "@/components/sections/about-section";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";

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
              PT. Teknalogi Transformasi Digital has been at the forefront of digital innovation, 
              helping businesses transform and thrive in the digital era through cutting-edge technology solutions.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* About Section */}
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
                From humble beginnings to becoming a trusted digital innovation partner
              </p>
            </div>
          </BlurFade>

          <div className="space-y-12">
            {[
              {
                year: "2019",
                title: "Foundation",
                description: "Teknalogi was founded with a vision to democratize digital transformation for businesses of all sizes."
              },
              {
                year: "2020",
                title: "First Major Client",
                description: "Successfully delivered our first enterprise-level digital transformation project, setting the stage for future growth."
              },
              {
                year: "2021",
                title: "Team Expansion",
                description: "Expanded our team of experts and opened our first dedicated development center in Jakarta."
              },
              {
                year: "2022",
                title: "Cloud Solutions",
                description: "Launched comprehensive cloud migration and infrastructure services, helping clients modernize their systems."
              },
              {
                year: "2023",
                title: "AI Integration",
                description: "Integrated AI and machine learning capabilities into our service offerings, staying ahead of technology trends."
              },
              {
                year: "2024",
                title: "50+ Projects",
                description: "Celebrated delivering over 50 successful projects and serving clients across various industries."
              }
            ].map((milestone, index) => (
              <BlurFade key={milestone.year} delay={0.4 + index * 0.1} inView>
                <div className="flex flex-col md:flex-row items-start gap-6 p-6 bg-card rounded-xl border border-border">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">{milestone.year}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
