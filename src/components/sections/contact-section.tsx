"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { AbstractWavePattern } from "@/components/ui/abstract-wave-pattern";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  InteractiveCard,
  InteractiveCardGrid,
} from "@/components/ui/interactive-card";
import { useLanguage } from "@/contexts/language-context";
import { useContactData } from "@/hooks/use-contact-data";
import {
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

interface ContactData {
  id: string;
  location_id: string;
  location_en: string;
  phone: string;
  email: string;
  operationHours_id: string;
  operationHours_en: string;
  updatedAt: string;
  location: string;
  operationHours: string;
}

interface TransformedContactInfo {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  rating: number;
  actionLabel: string;
}

// Extract fallback data constant
const FALLBACK_CONTACT_DATA = [
  {
    id: "1",
    titleId: "Email Kami",
    titleEn: "Email Us",
    descriptionId:
      "Kirim email kapan saja, kami akan merespons dalam 24 jam. Tim support kami siap membantu menjawab pertanyaan dan kebutuhan bisnis Anda.",
    descriptionEn:
      "Send us an email anytime, we'll respond within 24 hours. Our support team is ready to help answer your questions and business needs.",
    categoryId: "info@teknalogi.id",
    categoryEn: "info@teknalogi.id",
    actionLabelId: "Kirim Email",
    actionLabelEn: "Send Email",
    iconType: "mail",
  },
  {
    id: "2",
    titleId: "Telepon Kami",
    titleEn: "Call Us",
    descriptionId:
      "Hubungi langsung tim kami untuk konsultasi gratis. Tersedia Senin-Jumat 09:00-18:00 WIB. Dapatkan jawaban cepat untuk kebutuhan proyek Anda.",
    descriptionEn:
      "Call our team directly for free consultation. Available Monday-Friday 09:00-18:00 WIB. Get quick answers for your project needs.",
    categoryId: "+62 21 1234 5678",
    categoryEn: "+62 21 1234 5678",
    actionLabelId: "Hubungi Sekarang",
    actionLabelEn: "Call Now",
    iconType: "phone",
  },
  {
    id: "3",
    titleId: "Kunjungi Kantor",
    titleEn: "Visit Our Office",
    descriptionId:
      "Datang langsung ke kantor kami untuk meeting dan diskusi proyek. Lokasi strategis di Jakarta Selatan dengan akses mudah transportasi umum.",
    descriptionEn:
      "Come directly to our office for meetings and project discussions. Strategic location in South Jakarta with easy public transportation access.",
    categoryId: "Jl. Teknologi Digital No. 123, Jakarta Selatan 12345",
    categoryEn: "Jl. Teknologi Digital No. 123, South Jakarta 12345",
    actionLabelId: "Lihat Peta",
    actionLabelEn: "View Map",
    iconType: "map",
  },
  {
    id: "4",
    titleId: "Jam Operasional",
    titleEn: "Operating Hours",
    descriptionId:
      "Senin - Jumat: 09:00 - 18:00 WIB. Sabtu: 09:00 - 15:00 WIB. Minggu: Tutup. Untuk keperluan urgent di luar jam kerja, silakan email kami.",
    descriptionEn:
      "Monday - Friday: 09:00 - 18:00 WIB. Saturday: 09:00 - 15:00 WIB. Sunday: Closed. For urgent matters outside working hours, please email us.",
    categoryId: "Senin - Jumat: 09:00 - 18:00",
    categoryEn: "Monday - Friday: 09:00 - 18:00",
    actionLabelId: "Jadwalkan Meeting",
    actionLabelEn: "Schedule Meeting",
    iconType: "clock",
  },
];

// Helper function to get icon
const getIconForType = (iconType: string) => {
  const iconMap = {
    mail: <Mail className="w-6 h-6" />,
    phone: <Phone className="w-6 h-6" />,
    map: <MapPin className="w-6 h-6" />,
    clock: <Clock className="w-6 h-6" />,
  };
  return (
    iconMap[iconType as keyof typeof iconMap] || (
      <MessageCircle className="w-6 h-6" />
    )
  );
};

// Extract fallback data generator
const generateFallbackContact = (locale: string): TransformedContactInfo[] =>
  FALLBACK_CONTACT_DATA.map((item) => ({
    id: item.id,
    title: locale === "id" ? item.titleId : item.titleEn,
    description: locale === "id" ? item.descriptionId : item.descriptionEn,
    icon: getIconForType(item.iconType),
    category: locale === "id" ? item.categoryId : item.categoryEn,
    rating: 5,
    actionLabel: locale === "id" ? item.actionLabelId : item.actionLabelEn,
  }));

// Extract data transformation function
const transformApiContact = (
  contact: ContactData,
  locale: string
): TransformedContactInfo[] =>
  generateFallbackContact(locale)
    .filter((item) => {
      if (item.id === "1" && contact.email) return true;
      if (item.id === "2" && contact.phone) return true;
      if (item.id === "3" && (contact.location_id || contact.location_en))
        return true;
      return false;
    })
    .map((item) => {
      if (item.id === "1" && contact.email) {
        return { ...item, category: contact.email };
      }
      if (item.id === "2") {
        return { ...item, category: contact.phone || item.category };
      }
      if (item.id === "3") {
        const location =
          locale === "id" ? contact.location_id : contact.location_en;
        return { ...item, category: location || item.category };
      }
      return item;
    });

// Extract loading component
const LoadingState = ({ locale }: { locale: string }) => (
  <section className="relative py-24 px-6">
    <div className="max-w-7xl mx-auto text-center">
      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
      <p className="text-muted-foreground">
        {locale === "id"
          ? "Memuat informasi kontak..."
          : "Loading contact information..."}
      </p>
    </div>
  </section>
);

// Extract header component
const ContactHeader = ({ locale }: { locale: string }) => (
  <BlurFade delay={0.25}>
    <div className="text-center mb-16">
      <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
        <MessageCircle className="w-4 h-4 mr-2" />
        {locale === "id" ? "Hubungi Kami" : "Contact Us"}
      </Badge>

      <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
        {locale === "id" ? "Mari Berkolaborasi" : "Let's Collaborate"}
      </h2>

      <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
        {locale === "id"
          ? "Siap memulai proyek teknologi Anda? Tim ahli kami siap membantu mewujudkan visi digital Anda. Hubungi kami untuk konsultasi gratis dan diskusi solusi terbaik."
          : "Ready to start your technology project? Our expert team is ready to help realize your digital vision. Contact us for free consultation and discussion of the best solutions."}
      </p>
    </div>
  </BlurFade>
);

// CTA section
const ContactCTA = ({ locale }: { locale: string }) => (
  <BlurFade delay={0.1}>
    <div className="mt-16 text-center bg-card p-8 rounded-lg border">
      <h3 className="text-2xl font-semibold mb-4">
        {locale === "id"
          ? "Siap Memulai Proyek Anda?"
          : "Ready to Start Your Project?"}
      </h3>
      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
        {locale === "id"
          ? "Konsultasi gratis dengan tim ahli kami. Kami akan membantu menganalisis kebutuhan dan memberikan solusi terbaik untuk bisnis Anda."
          : "Free consultation with our expert team. We will help analyze your needs and provide the best solutions for your business."}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          size="lg"
          onClick={() => (window.location.href = "mailto:info@teknalogi.id")}
        >
          <Send className="w-4 h-4 mr-2" />
          {locale === "id" ? "Mulai Konsultasi" : "Start Consultation"}
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => (window.location.href = "tel:+6221234567")}
        >
          <Phone className="w-4 h-4 mr-2" />
          {locale === "id" ? "Hubungi Langsung" : "Call Directly"}
        </Button>
      </div>
    </div>
  </BlurFade>
);

export default function ContactSection() {
  const { locale } = useLanguage();
  const { contactInfo, loading } = useContactData();

  if (loading) {
    return <LoadingState locale={locale} />;
  }

  const transformedContact = contactInfo
    ? transformApiContact(contactInfo, locale)
    : generateFallbackContact(locale);

  return (
    <section className="relative py-24 px-6">
      <AbstractWavePattern
        variant="flowing"
        intensity="subtle"
        animated={true}
      />

      <div className="max-w-7xl mx-auto relative z-20">
        <ContactHeader locale={locale} />

        <BlurFade delay={0.1}>
          <InteractiveCardGrid
            columns={2}
            gap={8}
            className="grid grid-cols-1 md:grid-cols-3 items-stretch"
          >
            {transformedContact.map((contact) => (
              <InteractiveCard
                key={contact.id}
                title={contact.title}
                description={contact.description}
                icon={contact.icon}
                category={contact.category}
                actionLabel={contact.actionLabel}
                size="md"
                className="flex flex-col h-full min-h-[300px]"
                onAction={() => {
                  if (contact.id === "1") {
                    window.location.href = `mailto:${contact.category}`;
                  } else if (contact.id === "2") {
                    window.location.href = `tel:${contact.category}`;
                  } else {
                    console.log(`Clicked on ${contact.title}`);
                  }
                }}
              />
            ))}
          </InteractiveCardGrid>
        </BlurFade>

        <ContactCTA locale={locale} />
      </div>
    </section>
  );
}
