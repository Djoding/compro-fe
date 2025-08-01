"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Marquee } from "@/components/magicui/marquee";
import { useLanguage } from "@/contexts/language-context";
import { useTestimonialsData } from "@/hooks/use-testimonials-data";
import { Loader2, Quote, Star } from "lucide-react";

interface TestimonialData {
  id: string;
  clientName: string;
  company: string;
  position_id: string;
  position_en: string;
  imageUrl: string | null;
  testimonial_id: string;
  testimonial_en: string;
  createdAt: string;
  updatedAt: string;
  position: string;
  testimonial: string;
}

// Fallback testimonials data
const FALLBACK_TESTIMONIALS = [
  {
    id: "1",
    nameId: "Ahmad Wijaya",
    nameEn: "Ahmad Wijaya",
    companyId: "PT. Maju Bersama",
    companyEn: "PT. Maju Bersama",
    positionId: "CEO",
    positionEn: "CEO",
    contentId:
      "Tim Teknalogi sangat profesional dalam menangani proyek digitalisasi kami. Hasil kerja mereka melampaui ekspektasi dan delivery tepat waktu.",
    contentEn:
      "Teknalogi team is very professional in handling our digitalization project. Their work exceeded expectations and delivered on time.",
    rating: 5,
  },
  {
    id: "2",
    nameId: "Sarah Chen",
    nameEn: "Sarah Chen",
    companyId: "Startup Inovatif",
    companyEn: "Startup Inovatif",
    positionId: "Founder",
    positionEn: "Founder",
    contentId:
      "Berkat bantuan Teknalogi, kami berhasil mengembangkan MVP yang solid dan mendapat funding Series A. Tim mereka memahami kebutuhan startup dengan sangat baik.",
    contentEn:
      "Thanks to Teknalogi's help, we successfully developed a solid MVP and received Series A funding. Their team understands startup needs very well.",
    rating: 5,
  },
  {
    id: "3",
    nameId: "Budi Santoso",
    nameEn: "Budi Santoso",
    companyId: "UMKM Digital",
    companyEn: "UMKM Digital",
    positionId: "Owner",
    positionEn: "Owner",
    contentId:
      "Platform e-commerce yang dikembangkan meningkatkan penjualan kami hingga 300%. Support team yang responsif dan solusi yang tepat sasaran.",
    contentEn:
      "The e-commerce platform developed increased our sales by 300%. Responsive support team and targeted solutions.",
    rating: 4,
  },
  {
    id: "4",
    nameId: "Lisa Rodriguez",
    nameEn: "Lisa Rodriguez",
    companyId: "TechCorp Industries",
    companyEn: "TechCorp Industries",
    positionId: "CTO",
    positionEn: "CTO",
    contentId:
      "Implementasi cloud infrastructure yang sangat impressive. Performa sistem meningkat drastis dan maintenance cost berkurang signifikan.",
    contentEn:
      "Very impressive cloud infrastructure implementation. System performance increased drastically and maintenance costs reduced significantly.",
    rating: 5,
  },
  {
    id: "5",
    nameId: "Michael Kim",
    nameEn: "Michael Kim",
    companyId: "Creative Agency Plus",
    companyEn: "Creative Agency Plus",
    positionId: "Director",
    positionEn: "Director",
    contentId:
      "Website dan sistem manajemen klien yang dikembangkan sangat membantu workflow kami. Interface yang intuitif dan fitur yang lengkap.",
    contentEn:
      "The website and client management system developed greatly helped our workflow. Intuitive interface and complete features.",
    rating: 4,
  },
  {
    id: "6",
    nameId: "Jennifer Wilson",
    nameEn: "Jennifer Wilson",
    companyId: "Global Trading Co",
    companyEn: "Global Trading Co",
    positionId: "Operations Manager",
    positionEn: "Operations Manager",
    contentId:
      "Sistem ERP yang dikembangkan mengintegrasikan semua departemen dengan sempurna. ROI yang terukur dan proses bisnis yang jauh lebih efisien.",
    contentEn:
      "The ERP system developed perfectly integrates all departments. Measurable ROI and much more efficient business processes.",
    rating: 5,
  },
];

// Transform API data to display format
const transformTestimonial = (
  testimonial: TestimonialData,
  locale: string
) => ({
  id: testimonial.id,
  name: testimonial.clientName,
  company: testimonial.company,
  position:
    (locale === "id" ? testimonial.position_id : testimonial.position_en) ||
    (locale === "id" ? "Klien" : "Client"),
  content:
    locale === "id" ? testimonial.testimonial_id : testimonial.testimonial_en,
  rating: 5, // Default rating since backend doesn't provide it
  image: testimonial.imageUrl,
});

// Transform fallback data
const transformFallbackTestimonial = (
  testimonial: (typeof FALLBACK_TESTIMONIALS)[0],
  locale: string
) => ({
  id: testimonial.id,
  name: locale === "id" ? testimonial.nameId : testimonial.nameEn,
  company: locale === "id" ? testimonial.companyId : testimonial.companyEn,
  position: locale === "id" ? testimonial.positionId : testimonial.positionEn,
  content: locale === "id" ? testimonial.contentId : testimonial.contentEn,
  rating: testimonial.rating,
});

// Testimonial type
interface TransformedTestimonial {
  id: string;
  name: string;
  company: string;
  position: string;
  content: string;
  rating: number;
}

// Testimonial card component
const TestimonialCard = ({
  testimonial,
}: {
  testimonial: TransformedTestimonial;
}) => (
  <div className="relative bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50 shadow-lg max-w-xl">
    <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
      <Quote className="w-4 h-4 text-primary" />
    </div>

    <div className="flex items-center mb-4">
      {[...Array(5)].map((_, i) => (
        <Star
          key={`${testimonial.id}-star-${i}`}
          className={`w-4 h-4 ${
            i < testimonial.rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>

    <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-4">
      "{testimonial.content}"
    </p>

    <div className="border-t border-border/50 pt-4">
      <p className="font-semibold text-foreground text-sm">
        {testimonial.name}
      </p>
      <p className="text-xs text-muted-foreground">{testimonial.position}</p>
      <p className="text-xs text-primary font-medium">{testimonial.company}</p>
    </div>
  </div>
);

// Loading component
const LoadingState = ({ locale }: { locale: string }) => (
  <section className="relative py-24 px-6">
    <div className="max-w-7xl mx-auto text-center">
      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
      <p className="text-muted-foreground">
        {locale === "id" ? "Memuat testimoni..." : "Loading testimonials..."}
      </p>
    </div>
  </section>
);

// Stats component

// Stats component
const StatsSection = ({ locale }: { locale: string }) => (
  <BlurFade delay={0.1}>
    <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      <div className="space-y-2">
        <div className="text-4xl font-bold text-primary">150+</div>
        <div className="text-sm text-muted-foreground uppercase tracking-wider">
          {locale === "id" ? "Proyek Selesai" : "Projects Completed"}
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-4xl font-bold text-primary">98%</div>
        <div className="text-sm text-muted-foreground uppercase tracking-wider">
          {locale === "id" ? "Kepuasan Klien" : "Client Satisfaction"}
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-4xl font-bold text-primary">5+</div>
        <div className="text-sm text-muted-foreground uppercase tracking-wider">
          {locale === "id" ? "Tahun Pengalaman" : "Years Experience"}
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-4xl font-bold text-primary">24/7</div>
        <div className="text-sm text-muted-foreground uppercase tracking-wider">
          {locale === "id" ? "Support Tersedia" : "Support Available"}
        </div>
      </div>
    </div>
  </BlurFade>
);

export default function TestimonialsSection() {
  const { locale } = useLanguage();
  const { testimonials, loading } = useTestimonialsData();

  if (loading) {
    return <LoadingState locale={locale} />;
  }

  // Use API data if available, otherwise fallback data
  const displayTestimonials =
    testimonials.length > 0
      ? testimonials.map((t) => transformTestimonial(t, locale))
      : FALLBACK_TESTIMONIALS.map((t) =>
          transformFallbackTestimonial(t, locale)
        );

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <BlurFade delay={0.1} inView>
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent text-sm font-semibold rounded-full mb-4">
              Client Testimonials
            </span>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              What Our Clients Say
            </h2>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Don&apos;t just take our word for it. Here&apos;s what our clients
              have to say about their experience working with Teknalogi and the
              results we&apos;ve delivered together.
            </p>
          </BlurFade>
        </div>

        {/* Testimonials Marquee */}
        <BlurFade delay={0.1} inView>
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:25s]">
              {displayTestimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))}
            </Marquee>
            {/* Gradient overlays */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-background" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-background" />
          </div>
        </BlurFade>

        <StatsSection locale={locale} />
      </div>
    </section>
  );
}
