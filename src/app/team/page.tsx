// src/app/team/page.tsx
"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Particles } from "@/components/magicui/particles";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { useTeamData } from "@/hooks/use-team-data";
import { getImageUrl } from "@/lib/utils";
import {
  Github,
  Globe,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  Phone,
  Twitter,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface SocialMedia {
  id: string;
  platform: string;
  url: string;
  teamMemberId: string;
}

interface TeamMemberData {
  id: string;
  name: string;
  position_id: string;
  position_en: string;
  imageUrl: string;
  roleCategory: string;
  createdAt: string;
  updatedAt: string;
  socialMedia: SocialMedia[];
  position: string;
  // Fallback fields for compatibility
  department?: string;
  email?: string;
  phone?: string;
  bio_id?: string;
  bio_en?: string;
  expertise?: string[];
  is_active?: boolean;
  order_position?: number;
}

// Enhanced fallback team data with backend structure
const FALLBACK_TEAM_DATA: TeamMemberData[] = [
  {
    id: "fallback-1",
    name: "Budi Santoso",
    position_id: "Chief Executive Officer",
    position_en: "Chief Executive Officer",
    position: "Chief Executive Officer",
    imageUrl: "/api/uploads/image-1753202442576-738033191.png",
    roleCategory: "Management",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    socialMedia: [
      {
        id: "social-1",
        platform: "LinkedIn",
        url: "https://linkedin.com/in/budisantoso",
        teamMemberId: "fallback-1",
      },
    ],
    department: "Executive",
    bio_id:
      "Pemimpin visioner dengan 15+ tahun pengalaman dalam transformasi digital. Memimpin tim untuk menciptakan solusi teknologi inovatif yang mengubah cara bisnis beroperasi.",
    bio_en:
      "Visionary leader with 15+ years in digital transformation. Leading the team to create innovative technology solutions that transform how businesses operate.",
    expertise: [
      "Digital Strategy",
      "Business Development",
      "Leadership",
      "Innovation",
    ],
    email: "budi@teknalogi.id",
    phone: "+62 21 1234 5678",
    is_active: true,
    order_position: 1,
  },
  {
    id: "fallback-2",
    name: "Sarah Wijaya",
    position_id: "Chief Technology Officer",
    position_en: "Chief Technology Officer",
    position: "Chief Technology Officer",
    imageUrl: "/api/uploads/image-1753202453451-47468091.png",
    roleCategory: "Management",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    socialMedia: [
      {
        id: "social-2",
        platform: "LinkedIn",
        url: "https://linkedin.com/in/sarahwijaya",
        teamMemberId: "fallback-2",
      },
      {
        id: "social-3",
        platform: "Twitter",
        url: "https://twitter.com/sarahwijaya",
        teamMemberId: "fallback-2",
      },
    ],
    department: "Technology",
    bio_id:
      "Ahli teknologi yang mengkhususkan diri dalam arsitektur cloud dan solusi web modern. Berpengalaman membangun sistem yang scalable dan reliable.",
    bio_en:
      "Technology expert specializing in cloud architecture and modern web solutions. Experienced in building scalable and reliable systems.",
    expertise: ["Cloud Architecture", "System Design", "DevOps", "AI/ML"],
    email: "sarah@teknalogi.id",
    phone: "+62 21 1234 5679",
    is_active: true,
    order_position: 2,
  },
  {
    id: "fallback-3",
    name: "Ahmad Rahman",
    position_id: "Head of Engineering",
    position_en: "Head of Engineering",
    position: "Head of Engineering",
    imageUrl: "/api/uploads/image-1753202544675-18454993.png",
    roleCategory: "Developer",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    socialMedia: [
      {
        id: "social-4",
        platform: "LinkedIn",
        url: "https://linkedin.com/in/ahmadrahman",
        teamMemberId: "fallback-3",
      },
      {
        id: "social-5",
        platform: "GitHub",
        url: "https://github.com/ahmadrahman",
        teamMemberId: "fallback-3",
      },
    ],
    department: "Engineering",
    bio_id:
      "Full-stack developer dan team lead dengan keahlian dalam framework JavaScript modern. Berpengalaman membangun aplikasi web yang complex dan performant.",
    bio_en:
      "Full-stack developer and team lead with expertise in modern JavaScript frameworks. Experienced in building complex and performant web applications.",
    expertise: [
      "Full-Stack Development",
      "Team Leadership",
      "React",
      "Node.js",
    ],
    email: "ahmad@teknalogi.id",
    phone: "+62 21 1234 5680",
    is_active: true,
    order_position: 3,
  },
];

// Departments for filtering
const departments = [
  "All",
  "Executive",
  "Technology",
  "Engineering",
  "Design",
  "Security",
  "Project Management",
];

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
  const department = member.department || member.roleCategory || "";

  // Get social media icons
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "linkedin":
        return <Linkedin className="w-4 h-4" />;
      case "github":
      case "git":
        return <Github className="w-4 h-4" />;
      case "twitter":
        return <Twitter className="w-4 h-4" />;
      case "instagram":
        return <Instagram className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <div className="group relative bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
      {/* Photo Section */}
      <div className="relative aspect-square overflow-hidden">
        {member.imageUrl ? (
          <Image
            src={getImageUrl(member.imageUrl)}
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

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-primary font-medium text-sm">{position}</p>
          {department && (
            <Badge variant="outline" className="text-xs">
              {department}
            </Badge>
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

        {/* Contact Info and Social Media */}
        <div className="flex gap-2 pt-4 border-t border-border/50">
          {member.email && (
            <Button
              size="sm"
              variant="ghost"
              className="p-2 h-auto text-muted-foreground hover:text-primary"
              onClick={() => (window.location.href = `mailto:${member.email}`)}
            >
              <Mail className="w-4 h-4" />
            </Button>
          )}
          {member.phone && (
            <Button
              size="sm"
              variant="ghost"
              className="p-2 h-auto text-muted-foreground hover:text-primary"
              onClick={() => (window.location.href = `tel:${member.phone}`)}
            >
              <Phone className="w-4 h-4" />
            </Button>
          )}
          {member.socialMedia?.map((social) => (
            <Button
              key={social.id}
              size="sm"
              variant="ghost"
              className="p-2 h-auto text-muted-foreground hover:text-primary"
              onClick={() => window.open(social.url, "_blank")}
              title={`${social.platform}: ${social.url}`}
            >
              {getSocialIcon(social.platform)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

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

export default function TeamPage() {
  const { locale } = useLanguage();
  const { team, loading } = useTeamData();
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">
            {locale === "id"
              ? "Memuat informasi tim..."
              : "Loading team information..."}
          </p>
        </div>
      </div>
    );
  }

  // Use API data if available, otherwise fallback data
  const displayTeam =
    team.length > 0
      ? sortTeamMembers(team)
      : sortTeamMembers(FALLBACK_TEAM_DATA);

  // Filter team by department
  const filteredTeam =
    selectedDepartment === "All"
      ? displayTeam
      : displayTeam.filter(
          (member) => member.department === selectedDepartment
        );

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Particles
            className="absolute inset-0"
            quantity={100}
            size={0.8}
            color="#8B5CF6"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
          <BlurFade delay={0.1} inView>
            <Badge variant="outline" className="mb-6">
              <Users className="w-4 h-4 mr-2" />
              {locale === "id" ? "Tim Kami" : "Our Team"}
            </Badge>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {locale === "id" ? "Bertemu Dengan Tim" : "Meet the Minds Behind"}
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {locale === "id" ? "Teknalogi" : "Teknalogi Innovation"}
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {locale === "id"
                ? "Tim profesional kami terdiri dari ahli-ahli berpengalaman di bidang teknologi, design, dan manajemen proyek. Setiap anggota berkomitmen memberikan solusi terbaik untuk klien."
                : "Our diverse team of experts brings together decades of experience in technology, design, and business strategy to deliver exceptional digital solutions."}
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Organization Chart */}
      <section className="py-16 bg-background">
        <div className="absolute">
          <Particles
            className="absolute"
            quantity={100}
            size={0.8}
            color="#8B5CF6"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                {locale === "id"
                  ? "Struktur Organisasi"
                  : "Organization Structure"}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {locale === "id"
                  ? "Hierarki kepemimpinan dan struktur tim yang mendukung kesuksesan setiap proyek"
                  : "Leadership hierarchy and team structure that supports the success of every project"}
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <div className="relative">
              {/* CEO Level */}
              <div className="flex justify-center mb-8">
                <div className="bg-primary/10 border-2 border-primary/20 rounded-lg p-6 text-center min-w-[200px]">
                  <div className="text-sm font-medium text-primary mb-1">
                    {locale === "id"
                      ? "Direktur Utama"
                      : "Chief Executive Officer"}
                  </div>
                  <div className="text-xs text-muted-foreground">CEO</div>
                </div>
              </div>

              {/* Management Level */}
              <div className="flex justify-center gap-8 mb-8 flex-wrap">
                <div className="bg-card border border-border rounded-lg p-4 text-center min-w-[160px]">
                  <div className="text-sm font-medium text-foreground mb-1">
                    {locale === "id"
                      ? "Direktur Teknologi"
                      : "Chief Technology Officer"}
                  </div>
                  <div className="text-xs text-muted-foreground">CTO</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-4 text-center min-w-[160px]">
                  <div className="text-sm font-medium text-foreground mb-1">
                    {locale === "id"
                      ? "Direktur Operasional"
                      : "Chief Operating Officer"}
                  </div>
                  <div className="text-xs text-muted-foreground">COO</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-4 text-center min-w-[160px]">
                  <div className="text-sm font-medium text-foreground mb-1">
                    {locale === "id"
                      ? "Direktur Keuangan"
                      : "Chief Financial Officer"}
                  </div>
                  <div className="text-xs text-muted-foreground">CFO</div>
                </div>
              </div>

              {/* Department Level */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted/50 border border-border rounded-lg p-3 text-center">
                  <div className="text-sm font-medium text-foreground mb-1">
                    {locale === "id" ? "Pengembangan" : "Development"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {locale === "id" ? "Tim Engineering" : "Engineering Team"}
                  </div>
                </div>
                <div className="bg-muted/50 border border-border rounded-lg p-3 text-center">
                  <div className="text-sm font-medium text-foreground mb-1">
                    {locale === "id" ? "Desain" : "Design"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {locale === "id" ? "Tim UI/UX" : "UI/UX Team"}
                  </div>
                </div>
                <div className="bg-muted/50 border border-border rounded-lg p-3 text-center">
                  <div className="text-sm font-medium text-foreground mb-1">
                    {locale === "id" ? "Pemasaran" : "Marketing"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {locale === "id" ? "Tim Digital" : "Digital Team"}
                  </div>
                </div>
                <div className="bg-muted/50 border border-border rounded-lg p-3 text-center">
                  <div className="text-sm font-medium text-foreground mb-1">
                    {locale === "id" ? "Operasional" : "Operations"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {locale === "id" ? "Tim Support" : "Support Team"}
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-muted/20">
        <div className="absolute">
          <Particles
            className="absolute"
            quantity={100}
            size={0.8}
            color="#8B5CF6"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.1} inView>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {departments.map((dept) => {
                let displayName = dept;
                if (dept === "All") {
                  displayName = locale === "id" ? "Semua" : "All";
                }

                return (
                  <Button
                    key={dept}
                    variant={
                      dept === selectedDepartment ? "default" : "outline"
                    }
                    size="sm"
                    className="transition-all duration-200"
                    onClick={() => setSelectedDepartment(dept)}
                  >
                    {displayName}
                  </Button>
                );
              })}
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 bg-muted/20">
        <div className="absolute">
          <Particles
            className="absolute"
            quantity={100}
            size={0.8}
            color="#8B5CF6"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTeam.map((member, index) => (
              <BlurFade
                key={member.id || `team-${index}`}
                delay={1.0 + index * 0.1}
                inView
              >
                <TeamMemberCard member={member} locale={locale} />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-24 bg-background">
        <div className="absolute">
          <Particles
            className="absolute"
            quantity={100}
            size={0.8}
            color="#8B5CF6"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                {locale === "id" ? "Statistik Tim" : "Team Statistics"}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {locale === "id"
                  ? "Angka-angka yang menunjukkan kekuatan dan pengalaman tim kami"
                  : "Numbers that showcase our team strength and experience"}
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">
                  {displayTeam.length}+
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                  {locale === "id" ? "Anggota Tim" : "Team Members"}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                  {locale === "id" ? "Tahun Pengalaman" : "Years Experience"}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">25+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                  {locale === "id" ? "Sertifikasi" : "Certifications"}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                  {locale === "id" ? "Dedikasi" : "Dedication"}
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BlurFade delay={0.1} inView>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              {locale === "id"
                ? "Ingin Bergabung dengan Tim Kami?"
                : "Want to Join Our Team?"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {locale === "id"
                ? "Kami selalu mencari talenta terbaik untuk bergabung dalam misi menciptakan solusi teknologi yang inovatif."
                : "We are always looking for top talent to join our mission of creating innovative technology solutions."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() =>
                  (window.location.href = "mailto:careers@teknalogi.id")
                }
              >
                <Mail className="w-4 h-4 mr-2" />
                {locale === "id" ? "Kirim Lamaran" : "Send Application"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => (window.location.href = "/contact")}
              >
                {locale === "id" ? "Hubungi Kami" : "Contact Us"}
              </Button>
            </div>
          </BlurFade>
        </div>
      </section>
    </div>
  );
}
