import {
  InteractiveCard,
  InteractiveCardGrid,
} from "@/components/ui/interactive-card";
import {
  Award,
  Cloud,
  Code,
  HeartHandshake,
  Palette,
  Shield,
  Smartphone,
  Target,
  Zap,
} from "lucide-react";

export function CardShowcase() {
  const serviceCards = [
    {
      title: "Web Development",
      description:
        "Membangun aplikasi web modern dengan teknologi terdepan dan desain responsif yang optimal.",
      icon: <Code className="w-6 h-6" />,
      category: "Development",
      features: ["React & Next.js", "Node.js Backend", "Database Integration"],
      price: "Rp 15.000.000",
      rating: 5,
      actionLabel: "Konsultasi Gratis",
    },
    {
      title: "UI/UX Design",
      description:
        "Menciptakan pengalaman pengguna yang intuitif dan desain interface yang menarik untuk produk digital.",
      icon: <Palette className="w-6 h-6" />,
      category: "Design",
      features: ["User Research", "Prototyping", "Design System"],
      price: "Rp 8.000.000",
      rating: 5,
      actionLabel: "Lihat Portfolio",
    },
    {
      title: "Digital Marketing",
      description:
        "Strategi pemasaran digital yang efektif untuk meningkatkan brand awareness dan konversi.",
      icon: <Target className="w-6 h-6" />,
      category: "Marketing",
      features: ["SEO Optimization", "Social Media", "Content Strategy"],
      price: "Rp 5.000.000",
      rating: 4,
      actionLabel: "Mulai Campaign",
    },
    {
      title: "Mobile App Development",
      description:
        "Pengembangan aplikasi mobile native dan cross-platform dengan performa tinggi.",
      icon: <Smartphone className="w-6 h-6" />,
      category: "Development",
      features: ["React Native", "iOS & Android", "App Store Optimization"],
      price: "Rp 20.000.000",
      rating: 5,
      actionLabel: "Diskusi Proyek",
    },
    {
      title: "Cloud Solutions",
      description:
        "Implementasi solusi cloud yang scalable dan secure untuk infrastruktur modern.",
      icon: <Cloud className="w-6 h-6" />,
      category: "Infrastructure",
      features: ["AWS/Azure/GCP", "DevOps", "Monitoring"],
      price: "Rp 12.000.000",
      rating: 4,
      actionLabel: "Konsultasi Cloud",
    },
    {
      title: "Cybersecurity",
      description:
        "Perlindungan komprehensif terhadap ancaman cyber dan audit keamanan sistem.",
      icon: <Shield className="w-6 h-6" />,
      category: "Security",
      features: ["Penetration Testing", "Security Audit", "Compliance"],
      price: "Rp 18.000.000",
      rating: 5,
      actionLabel: "Security Audit",
    },
  ];

  const teamCards = [
    {
      title: "Andi Pratama",
      description:
        "Lead Developer dengan 8+ tahun pengalaman dalam pengembangan aplikasi enterprise dan startup.",
      image: "/placeholder.png",
      category: "Lead Developer",
      features: [
        "Full Stack Development",
        "System Architecture",
        "Team Leadership",
      ],
      rating: 5,
      actionLabel: "Lihat Profil",
    },
    {
      title: "Sarah Dewi",
      description:
        "Senior UI/UX Designer yang telah menangani 100+ proyek desain untuk berbagai industri.",
      image: "/placeholder.png",
      category: "Senior Designer",
      features: ["User Experience", "Visual Design", "Design Research"],
      rating: 5,
      actionLabel: "Lihat Portfolio",
    },
    {
      title: "Budi Santoso",
      description:
        "DevOps Engineer expert dalam cloud infrastructure dan automation untuk scalability.",
      image: "/placeholder.png",
      category: "DevOps Engineer",
      features: [
        "Cloud Architecture",
        "CI/CD Pipeline",
        "Infrastructure as Code",
      ],
      rating: 4,
      actionLabel: "Hubungi",
    },
  ];

  const testimonialCards = [
    {
      title: "PT. Maju Bersama",
      description:
        "Tim Teknalogi sangat profesional dalam menangani proyek digitalisasi kami. Hasil kerja mereka melampaui ekspektasi dan delivery tepat waktu.",
      icon: <Award className="w-6 h-6" />,
      category: "Enterprise Client",
      rating: 5,
      actionLabel: "Baca Selengkapnya",
    },
    {
      title: "Startup Inovatif",
      description:
        "Berkat bantuan Teknalogi, kami berhasil mengembangkan MVP yang solid dan mendapat funding Series A. Highly recommended!",
      icon: <Zap className="w-6 h-6" />,
      category: "Startup Client",
      rating: 5,
      actionLabel: "Lihat Case Study",
    },
    {
      title: "UMKM Digital",
      description:
        "Platform e-commerce yang dikembangkan meningkatkan penjualan kami hingga 300%. Tim yang sangat memahami kebutuhan bisnis.",
      icon: <HeartHandshake className="w-6 h-6" />,
      category: "SME Client",
      rating: 4,
      actionLabel: "Pelajari Lebih Lanjut",
    },
  ];

  return (
    <div className="space-y-16">
      {/* Services Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Layanan Unggulan Kami
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Solusi teknologi terdepan untuk mengakselerasi transformasi digital
            bisnis Anda
          </p>
        </div>

        <InteractiveCardGrid columns={3} gap={8}>
          {serviceCards.map((card) => (
            <InteractiveCard
              key={`service-${card.title.replace(/\s+/g, "-").toLowerCase()}`}
              {...card}
              onAction={() => console.log(`Clicked on ${card.title}`)}
            />
          ))}
        </InteractiveCardGrid>
      </section>

      {/* Team Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Tim Expert Kami
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Profesional berpengalaman yang siap mewujudkan visi teknologi Anda
          </p>
        </div>

        <InteractiveCardGrid columns={3} gap={8}>
          {teamCards.map((card) => (
            <InteractiveCard
              key={`team-${card.title.replace(/\s+/g, "-").toLowerCase()}`}
              {...card}
              onAction={() => console.log(`Clicked on ${card.title}`)}
            />
          ))}
        </InteractiveCardGrid>
      </section>

      {/* Testimonials Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Testimoni Klien
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kepercayaan dan kepuasan klien adalah prioritas utama kami
          </p>
        </div>

        <InteractiveCardGrid columns={3} gap={8}>
          {testimonialCards.map((card) => (
            <InteractiveCard
              key={`testimonial-${card.title
                .replace(/\s+/g, "-")
                .toLowerCase()}`}
              {...card}
              size="lg"
              onAction={() => console.log(`Clicked on ${card.title}`)}
            />
          ))}
        </InteractiveCardGrid>
      </section>
    </div>
  );
}
