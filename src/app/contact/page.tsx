"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Particles } from "@/components/magicui/particles";
import ContactSection from "@/components/sections/contact-section";
import { AbstractWavePattern } from "@/components/ui/abstract-wave-pattern";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { WavySeparator } from "@/components/ui/wavy-separator";
import { useContactData } from "@/hooks/use-contact-data";
import { useFAQData } from "@/hooks/use-faq-data";
import { useTranslations } from "@/hooks/use-translations";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

// Fallback FAQ data
const fallbackFaqs = [
  {
    question: "What is your typical project timeline?",
    answer:
      "Project timelines vary based on complexity and scope. Simple web applications typically take 4-8 weeks, while complex enterprise solutions may take 3-6 months. We provide detailed timelines during our initial consultation.",
  },
  {
    question: "Do you provide ongoing maintenance and support?",
    answer:
      "Yes, we offer comprehensive maintenance and support packages. This includes regular updates, security patches, performance monitoring, and technical support to ensure your solutions remain optimal.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "We specialize in modern web technologies including React, Next.js, Node.js, Python, cloud platforms (AWS, Azure), mobile development (React Native, Flutter), and database solutions (PostgreSQL, MongoDB).",
  },
  {
    question: "How do you ensure project quality?",
    answer:
      "We follow industry best practices including code reviews, automated testing, continuous integration, security audits, and regular client feedback sessions throughout the development process.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "We offer flexible pricing models including fixed-price projects, time and materials, and retainer agreements. Pricing depends on project scope, complexity, and timeline. We provide detailed quotes after initial consultation.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes, we work with clients globally. We have experience collaborating across different time zones and can accommodate various communication preferences and working arrangements.",
  },
];

export default function ContactPage() {
  const { t, locale } = useTranslations();
  const { faqs } = useFAQData();
  const { contactInfo } = useContactData();

  // Prepare FAQ data with fallback
  const faqData =
    faqs && faqs.length > 0
      ? faqs.map((faq) => ({
          question:
            locale === "id"
              ? faq.question_id || faq.question_en || "Question"
              : faq.question_en || faq.question_id || "Question",
          answer:
            locale === "id"
              ? faq.answer_id || faq.answer_en || "Answer"
              : faq.answer_en || faq.answer_id || "Answer",
        }))
      : fallbackFaqs;

  // Prepare contact data with fallback
  const getLocationText = () => {
    if (!contactInfo?.location)
      return "Jl. Teknologi Digital No. 123, Jakarta Selatan 12345";
    return locale === "id" ? contactInfo.location_id : contactInfo.location_en;
  };

  const getOperationHoursText = () => {
    if (!contactInfo?.operationHours) return "Mon - Fri: 9:00 AM - 6:00 PM";
    return locale === "id"
      ? contactInfo.operationHours_id
      : contactInfo.operationHours_en;
  };

  const quickContactData = [
    {
      icon: MapPin,
      title: t("pages.contact.quickContact.visitOffice"),
      primary: t("pages.contact.quickContact.jakartaOffice"),
      secondary: getLocationText(),
      action: t("pages.contact.quickContact.getDirections"),
    },
    {
      icon: Phone,
      title: t("pages.contact.quickContact.callUs"),
      primary: contactInfo?.phone || "+62 21 1234 5678",
      secondary: t("pages.contact.quickContact.availableDuringHours"),
      action: t("pages.contact.quickContact.callNow"),
    },
    {
      icon: Mail,
      title: t("pages.contact.quickContact.emailUs"),
      primary: contactInfo?.email || "info@teknalogi.id",
      secondary: t("pages.contact.quickContact.responseTime"),
      action: t("pages.contact.quickContact.sendEmail"),
    },
    {
      icon: Clock,
      title: t("pages.contact.quickContact.businessHours"),
      primary: getOperationHoursText(),
      secondary: t("pages.contact.quickContact.jakartaTime"),
      action: t("pages.contact.quickContact.viewSchedule"),
    },
  ];
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="absolute inset-0">
          <Particles className="absolute inset-0" color="#8B5CF6" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BlurFade delay={0.1} inView>
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Mail className="w-4 h-4 mr-2" />
              {t("pages.contact.badge")}
            </Badge>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {t("pages.contact.title")}
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t("pages.contact.titleSpan")}
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t("pages.contact.subtitle")}
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Wavy Separator */}
      <WavySeparator className="fill-primary/20" />

      {/* Main Contact Section */}
      <ContactSection />

      {/* FAQ Section */}
      <section className="relative py-24 bg-muted/20">
        <AbstractWavePattern
          variant="fluid"
          intensity="subtle"
          animated={true}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                {t("pages.contact.faq.title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("pages.contact.faq.subtitle")}
              </p>
            </div>
          </BlurFade>

          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <BlurFade key={faq.question} delay={0.4 + index * 0.1} inView>
                <Card className="group">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
