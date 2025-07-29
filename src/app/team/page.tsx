// src/app/team/page.tsx
"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Twitter } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";
import { useTeamData } from "@/hooks/use-team-data";
import { getImageUrl } from "@/lib/utils";

// Fallback team data
const fallbackLeadership = [
  {
    name: "Budi Santoso",
    position: "Chief Executive Officer",
    department: "Executive",
    bio:
      "Visionary leader with 15+ years in digital transformation. Previously led technology initiatives at major Indonesian corporations.",
    expertise: ["Digital Strategy", "Business Development", "Leadership"],
    avatar: "BS",
    image: undefined as string | undefined,
    social: {
      linkedin: "#",
      email: "budi@teknalogi.id"
    }
  },
  {
    name: "Sarah Wijaya",
    position: "Chief Technology Officer",
    department: "Technology",
    bio:
      "Technology expert specializing in cloud architecture and modern web solutions. Former senior architect at international tech companies.",
    expertise: ["Cloud Architecture", "System Design", "DevOps"],
    avatar: "SW",
    image: undefined as string | undefined,
    social: {
      linkedin: "#",
      twitter: "#",
      email: "sarah@teknalogi.id"
    }
  },
  {
    name: "Ahmad Rahman",
    position: "Head of Engineering",
    department: "Engineering",
    bio: "Full-stack developer and team lead with expertise in modern JavaScript frameworks and scalable backend systems.",
    expertise: ["Full-Stack Development", "Team Leadership", "Architecture"],
    avatar: "AR",
    image: undefined as string | undefined,
    social: {
      linkedin: "#",
      email: "ahmad@teknalogi.id"
    }
  },
  {
    name: "Diana Kusuma",
    position: "Head of Design",
    department: "Design",
    bio:
      "Creative director focused on user-centered design and brand identity. Expert in creating compelling digital experiences.",
    expertise: ["UI/UX Design", "Brand Identity", "User Research"],
    avatar: "DK",
    image: undefined as string | undefined,
    social: {
      linkedin: "#",
      email: "diana@teknalogi.id"
    }
  },
  {
    name: "Michael Chen",
    position: "Head of Operations",
    department: "Operations",
    bio:
      "Operations specialist ensuring smooth project delivery and client satisfaction. Expert in agile methodologies and process optimization.",
    expertise: ["Project Management", "Agile", "Process Optimization"],
    avatar: "MC",
    image: undefined as string | undefined,
    social: {
      linkedin: "#",
      email: "michael@teknalogi.id"
    }
  },
  {
    name: "Rina Sari",
    position: "Head of Business Development",
    department: "Business",
    bio:
      "Strategic business developer building partnerships and driving growth. Specialized in client relations and market expansion.",
    expertise: ["Business Strategy", "Partnership", "Market Analysis"],
    avatar: "RS",
    image: undefined as string | undefined,
    social: {
      linkedin: "#",
      email: "rina@teknalogi.id"
    }
  }
];

const departments = ["All", "Executive", "Technology", "Engineering", "Design", "Operations", "Business"];

export default function TeamPage() {
  const { locale } = useTranslations();
  const { team, loading } = useTeamData();

  // Prepare team data with fallback
  const leadership =
    team && team.length > 0
      ? team.map(member => ({
          name: member.name || "Team Member",
          position:
            locale === "id"
              ? member.position_id || member.position_en || "Position"
              : member.position_en || member.position_id || "Position",
          department: member.department || "Team",
          bio:
            locale === "id"
              ? member.bio_id || member.bio_en || "Team member bio"
              : member.bio_en || member.bio_id || "Team member bio",
          expertise: member.expertise || ["Technology"],
          avatar: member.name
            ? member.name
                .split(" ")
                .map(n => n[0])
                .join("")
            : "TM",
          image: member.image,
          social: {
            linkedin: member.linkedin || "#",
            twitter: member.twitter || "#",
            email: member.email || "info@teknalogi.id"
          }
        }))
      : fallbackLeadership;

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading team information...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BlurFade delay={0.2} inView>
            <Badge variant="outline" className="mb-6">
              Our Leadership Team
            </Badge>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Meet the Minds Behind
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Teknalogi Innovation
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.6} inView>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our diverse team of experts brings together decades of experience in technology, design, and business strategy to
              deliver exceptional digital solutions.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.8} inView>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {departments.map(dept => (
                <Button
                  key={dept}
                  variant={dept === "All" ? "default" : "outline"}
                  size="sm"
                  className="transition-all duration-200"
                >
                  {dept}
                </Button>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((member, index) => (
              <BlurFade key={member.name} delay={1.0 + index * 0.1} inView>
                <MagicCard className="group h-full">
                  <div className="p-6 text-center">
                    {/* Avatar */}
                    <div className="w-24 h-24 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                      {member.image ? (
                        <img
                          src={getImageUrl(member.image)}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.currentTarget;
                            const fallback = target.parentElement?.querySelector('.fallback-avatar') as HTMLElement;
                            target.style.display = 'none';
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <span 
                        className="fallback-avatar text-2xl font-bold text-white"
                        style={{ display: member.image ? 'none' : 'flex' }}
                      >
                        {member.avatar}
                      </span>
                    </div>

                    {/* Basic Info */}
                    <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">{member.position}</p>
                    <Badge variant="outline" className="mb-4">
                      {member.department}
                    </Badge>

                    {/* Bio */}
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{member.bio}</p>

                    {/* Expertise */}
                    <div className="flex flex-wrap gap-1 mb-4 justify-center">
                      {member.expertise.map(skill => (
                        <span key={skill} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-3">
                      <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                        <Mail className="w-4 h-4" />
                      </Button>
                      {member.social.linkedin && (
                        <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                          <Linkedin className="w-4 h-4" />
                        </Button>
                      )}
                      {member.social.twitter && (
                        <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                          <Twitter className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Organization Chart */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.2} inView>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Organization Structure</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our flat organizational structure promotes collaboration, innovation, and rapid decision-making
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <div className="bg-card border border-border rounded-xl p-8">
              {/* CEO at top */}
              <div className="text-center mb-12">
                <div className="inline-block bg-primary/10 border-2 border-primary rounded-lg p-4">
                  <h3 className="font-semibold text-foreground">Chief Executive Officer</h3>
                  <p className="text-sm text-muted-foreground">Budi Santoso</p>
                </div>
              </div>

              {/* Department Heads */}
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                {leadership.slice(1).map(member => (
                  <div key={member.name} className="text-center">
                    <div className="bg-accent/10 border border-accent rounded-lg p-4">
                      <h4 className="font-medium text-foreground text-sm mb-1">{member.position.replace("Head of ", "")}</h4>
                      <p className="text-xs text-muted-foreground">{member.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BlurFade>
        </div>
      </section>
    </div>
  );
}
