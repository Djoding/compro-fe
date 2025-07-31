"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { AbstractWavePattern } from "@/components/ui/abstract-wave-pattern";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { useTeamData } from "@/hooks/use-team-data";
import { Loader2, Mail, Phone, Users } from "lucide-react";
import Image from "next/image";

interface TeamMemberData {
  id?: string | number;
  name?: string;
  position_id?: string;
  position_en?: string;
  department?: string;
  email?: string;
  phone?: string;
  bio_id?: string;
  bio_en?: string;
  image?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  expertise?: string[];
  is_active?: boolean;
  order_position?: number;
}

// Team member card component
const TeamMemberCard = ({
  member,
  locale,
}: {
  member: TeamMemberData;
  locale: string;
}) => {
  const name = member.name || (locale === "id" ? "Anggota Tim" : "Team Member");
  const position =
    (locale === "id" ? member.position_id : member.position_en) ||
    (locale === "id" ? "Anggota Tim" : "Team Member");
  const bio = (locale === "id" ? member.bio_id : member.bio_en) || "";
  const department = member.department || "";

  return (
    <div className="group relative bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
      {/* Photo Section */}
      <div className="relative aspect-square overflow-hidden">
        {member.image ? (
          <Image
            src={member.image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
            <Users className="w-20 h-20 text-primary/60" />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-primary font-medium text-sm">{position}</p>
          {department && (
            <p className="text-muted-foreground text-xs uppercase tracking-wider">
              {department}
            </p>
          )}
        </div>

        {bio && (
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {bio}
          </p>
        )}

        {member.expertise && member.expertise.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-foreground">
              {locale === "id" ? "Keahlian:" : "Expertise:"}
            </p>
            <div className="flex flex-wrap gap-1">
              {member.expertise.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md border border-primary/20"
                >
                  {skill}
                </span>
              ))}
              {member.expertise.length > 3 && (
                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                  +{member.expertise.length - 3}{" "}
                  {locale === "id" ? "lainnya" : "more"}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div className="flex gap-4 pt-4 border-t border-border/50">
          {member.email && (
            <Button
              size="sm"
              variant="ghost"
              className="p-0 h-auto text-muted-foreground hover:text-primary"
              onClick={() => (window.location.href = `mailto:${member.email}`)}
            >
              <Mail className="w-4 h-4 mr-2" />
              <span className="text-xs">Email</span>
            </Button>
          )}
          {member.phone && (
            <Button
              size="sm"
              variant="ghost"
              className="p-0 h-auto text-muted-foreground hover:text-primary"
              onClick={() => (window.location.href = `tel:${member.phone}`)}
            >
              <Phone className="w-4 h-4 mr-2" />
              <span className="text-xs">
                {locale === "id" ? "Telepon" : "Phone"}
              </span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// Extract fallback data constant
const FALLBACK_TEAM_DATA: TeamMemberData[] = [
  {
    id: "1",
    name: "Budi Santoso",
    position_id: "Chief Executive Officer",
    position_en: "Chief Executive Officer",
    department: "Executive",
    bio_id:
      "Pemimpin visioner dengan 15+ tahun pengalaman dalam transformasi digital. Sebelumnya memimpin inisiatif teknologi di perusahaan besar Indonesia.",
    bio_en:
      "Visionary leader with 15+ years in digital transformation. Previously led technology initiatives at major Indonesian corporations.",
    expertise: ["Digital Strategy", "Business Development", "Leadership"],
    email: "budi@teknalogi.id",
    image: "/api/uploads/image-1753202442576-738033191.png",
    linkedin: "https://linkedin.com/in/budisantoso",
    is_active: true,
    order_position: 1,
  },
  {
    id: "2",
    name: "Sarah Wijaya",
    position_id: "Chief Technology Officer",
    position_en: "Chief Technology Officer",
    department: "Technology",
    bio_id:
      "Ahli teknologi yang berspesialisasi dalam arsitektur cloud dan solusi web modern. Mantan arsitek senior di perusahaan teknologi internasional.",
    bio_en:
      "Technology expert specializing in cloud architecture and modern web solutions. Former senior architect at international tech companies.",
    expertise: ["Cloud Architecture", "System Design", "DevOps"],
    email: "sarah@teknalogi.id",
    image: "/api/uploads/image-1753202453451-47468091.png",
    linkedin: "https://linkedin.com/in/sarahwijaya",
    twitter: "https://twitter.com/sarahwijaya",
    is_active: true,
    order_position: 2,
  },
  {
    id: "3",
    name: "Ahmad Rahman",
    position_id: "Head of Engineering",
    position_en: "Head of Engineering",
    department: "Engineering",
    bio_id:
      "Full-stack developer dan team lead dengan keahlian dalam framework JavaScript modern dan sistem backend yang scalable.",
    bio_en:
      "Full-stack developer and team lead with expertise in modern JavaScript frameworks and scalable backend systems.",
    expertise: [
      "Full-Stack Development",
      "Team Leadership",
      "System Architecture",
    ],
    email: "ahmad@teknalogi.id",
    image: "/api/uploads/image-1753202544675-18454993.png",
    linkedin: "https://linkedin.com/in/ahmadrahman",
    is_active: true,
    order_position: 3,
  },
  {
    id: "4",
    name: "Maya Kartika",
    position_id: "Head of Design",
    position_en: "Head of Design",
    department: "Design",
    bio_id:
      "UI/UX designer kreatif dengan passion untuk menciptakan pengalaman digital yang intuitif dan engaging. Berpengalaman dalam design thinking dan user research.",
    bio_en:
      "Creative UI/UX designer with passion for creating intuitive and engaging digital experiences. Experienced in design thinking and user research.",
    expertise: ["UI/UX Design", "Design Systems", "User Research"],
    email: "maya@teknalogi.id",
    image: "/api/uploads/image-1753202624431-917243944.png",
    instagram: "https://instagram.com/mayakartika",
    is_active: true,
    order_position: 4,
  },
  {
    id: "5",
    name: "David Chen",
    position_id: "Security Specialist",
    position_en: "Security Specialist",
    department: "Security",
    bio_id:
      "Ahli keamanan siber dengan sertifikasi internasional. Berpengalaman dalam penetration testing, security audit, dan implementasi standar keamanan enterprise.",
    bio_en:
      "Cybersecurity expert with international certifications. Experienced in penetration testing, security audits, and enterprise security standards implementation.",
    expertise: ["Cybersecurity", "Penetration Testing", "Security Audits"],
    email: "david@teknalogi.id",
    image: "/api/uploads/image-1753845597626-957941750.png",
    linkedin: "https://linkedin.com/in/davidchen",
    is_active: true,
    order_position: 5,
  },
  {
    id: "6",
    name: "Lisa Putri",
    position_id: "Project Manager",
    position_en: "Project Manager",
    department: "Project Management",
    bio_id:
      "Project manager bersertifikat PMP dengan track record mengelola proyek teknologi kompleks. Ahli dalam metodologi Agile dan manajemen stakeholder.",
    bio_en:
      "PMP certified project manager with track record managing complex technology projects. Expert in Agile methodologies and stakeholder management.",
    expertise: ["Project Management", "Agile/Scrum", "Stakeholder Management"],
    email: "lisa@teknalogi.id",
    linkedin: "https://linkedin.com/in/lisaputri",
    twitter: "https://twitter.com/lisaputri",
    is_active: true,
    order_position: 6,
  },
];

// Helper function to sort team members
const sortTeamMembers = (team: TeamMemberData[]): TeamMemberData[] => {
  return team
    .filter((member) => member.is_active !== false)
    .sort((a, b) => {
      const orderA = a.order_position || 999;
      const orderB = b.order_position || 999;
      return orderA - orderB;
    });
};

// Extract loading component
const LoadingState = ({ locale }: { locale: string }) => (
  <section className="relative py-24 px-6">
    <div className="max-w-7xl mx-auto text-center">
      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
      <p className="text-muted-foreground">
        {locale === "id" ? "Memuat tim..." : "Loading team..."}
      </p>
    </div>
  </section>
);

// Extract header component
const TeamHeader = ({ locale }: { locale: string }) => (
  <BlurFade delay={0.1}>
    <div className="text-center mb-16">
      <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
        <Users className="w-4 h-4 mr-2" />
        {locale === "id" ? "Tim Kami" : "Our Team"}
      </Badge>

      <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
        {locale === "id"
          ? "Bertemu Dengan Tim Teknalogi"
          : "Meet The Teknalogi Team"}
      </h2>

      <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
        {locale === "id"
          ? "Tim profesional kami terdiri dari ahli-ahli berpengalaman di bidang teknologi, design, dan manajemen proyek. Setiap anggota berkomitmen memberikan solusi terbaik untuk klien."
          : "Our professional team consists of experienced experts in technology, design, and project management. Every member is committed to delivering the best solutions for our clients."}
      </p>
    </div>
  </BlurFade>
);

// Extract stats component
const TeamStats = ({ locale }: { locale: string }) => (
  <BlurFade delay={0.1}>
    <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      <div className="space-y-2">
        <div className="text-4xl font-bold text-primary">15+</div>
        <div className="text-sm text-muted-foreground uppercase tracking-wider">
          {locale === "id" ? "Anggota Tim" : "Team Members"}
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-4xl font-bold text-primary">50+</div>
        <div className="text-sm text-muted-foreground uppercase tracking-wider">
          {locale === "id"
            ? "Tahun Gabungan Pengalaman"
            : "Combined Years Experience"}
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-4xl font-bold text-primary">25+</div>
        <div className="text-sm text-muted-foreground uppercase tracking-wider">
          {locale === "id"
            ? "Sertifikasi Profesional"
            : "Professional Certifications"}
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-4xl font-bold text-primary">100%</div>
        <div className="text-sm text-muted-foreground uppercase tracking-wider">
          {locale === "id" ? "Tim Dedication" : "Team Dedication"}
        </div>
      </div>
    </div>
  </BlurFade>
);

export default function TeamSection() {
  const { locale } = useLanguage();
  const { team, loading } = useTeamData();

  if (loading) {
    return <LoadingState locale={locale} />;
  }

  // Use API data if available, otherwise fallback data
  const displayTeam =
    team.length > 0
      ? sortTeamMembers(team)
      : sortTeamMembers(FALLBACK_TEAM_DATA);

  return (
    <section className="relative py-24 px-6">
      <AbstractWavePattern
        variant="organic"
        intensity="medium"
        animated={true}
      />

      <div className="max-w-7xl mx-auto relative z-20">
        <TeamHeader locale={locale} />

        <BlurFade delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayTeam.map((member) => (
              <TeamMemberCard
                key={member.id || `team-${Date.now()}-${Math.random()}`}
                member={member}
                locale={locale}
              />
            ))}
          </div>
        </BlurFade>

        <TeamStats locale={locale} />
      </div>
    </section>
  );
}
