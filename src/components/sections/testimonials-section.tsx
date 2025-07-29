"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Marquee } from "@/components/magicui/marquee";
import { Quote, Star, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { testimonialsAPI } from "@/lib/api";
import { useLanguage } from "@/contexts/language-context";
import { getImageUrl } from "@/lib/utils";

interface Testimonial {
  id: string;
  name_id: string;
  name_en: string;
  position_id: string;
  position_en: string;
  company_id: string;
  company_en: string;
  content_id: string;
  content_en: string;
  rating: number;
  imageUrl?: string;
}

// Fallback testimonials
const fallbackTestimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    position: "CEO",
    company: "TechStart Solutions",
    content:
      "Teknalogi transformed our outdated systems into a modern, efficient platform. Their expertise in digital transformation is unmatched. The team delivered beyond our expectations.",
    rating: 5,
    avatar: "SJ",
  },
  {
    id: "2",
    name: "Michael Chen",
    position: "CTO",
    company: "InnovateCorp",
    content:
      "Working with Teknalogi was a game-changer for our company. They developed a robust mobile application that increased our customer engagement by 300%. Highly recommended!",
    rating: 5,
    avatar: "MC",
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    position: "Founder",
    company: "GreenTech Innovations",
    content:
      "The cloud migration project was executed flawlessly. Teknalogi's team handled complex requirements with professionalism and delivered a scalable solution on time and within budget.",
    rating: 5,
    avatar: "ER",
  },
  {
    id: "4",
    name: "David Park",
    position: "Operations Director",
    company: "LogiFlow Systems",
    content:
      "Their data analytics platform revolutionized how we understand our business. The insights we gain from their solution have directly contributed to a 25% increase in operational efficiency.",
    rating: 5,
    avatar: "DP",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    position: "Marketing Director",
    company: "BrandMax Agency",
    content:
      "Teknalogi created an amazing e-commerce platform for our client. The user experience is exceptional, and the admin panel makes management incredibly easy. Outstanding work!",
    rating: 5,
    avatar: "LA",
  },
  {
    id: "6",
    name: "Robert Kim",
    position: "IT Manager",
    company: "SecureBank Ltd",
    content:
      "Security is our top priority, and Teknalogi delivered a solution that exceeds industry standards. Their attention to detail and security best practices gave us complete confidence.",
    rating: 5,
    avatar: "RK",
  },
];

const TestimonialCard = ({
  testimonial,
  locale
}: {
  testimonial: Testimonial | (typeof fallbackTestimonials)[0];
  locale: string;
}) => {
  // Check if it's API testimonial or fallback
  const isApiTestimonial = 'name_id' in testimonial;
  
  const name = isApiTestimonial 
    ? (locale === "id" ? testimonial.name_id : testimonial.name_en)
    : testimonial.name;
  
  const position = isApiTestimonial 
    ? (locale === "id" ? testimonial.position_id : testimonial.position_en)
    : testimonial.position;
    
  const company = isApiTestimonial 
    ? (locale === "id" ? testimonial.company_id : testimonial.company_en)
    : testimonial.company;
    
  const content = isApiTestimonial 
    ? (locale === "id" ? testimonial.content_id : testimonial.content_en)
    : testimonial.content;

  const avatar = isApiTestimonial 
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'avatar' in testimonial ? testimonial.avatar : name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="bg-card border border-border rounded-xl p-6 w-80 mx-4 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex items-center mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star
            key={`star-${testimonial.id}-${i}`}
            className="w-4 h-4 text-yellow-400 fill-current"
          />
        ))}
      </div>

      <div className="mb-4">
        <Quote className="w-8 h-8 text-primary/20 mb-2" />
        <p className="text-muted-foreground leading-relaxed">
          {content}
        </p>
      </div>

      <div className="flex items-center">
        {isApiTestimonial && testimonial.imageUrl ? (
          <img 
            src={getImageUrl(testimonial.imageUrl)}
            alt={name}
            className="w-12 h-12 rounded-full object-cover mr-4"
            onError={(e) => {
              // Fallback to avatar initials if image fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={`w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 ${isApiTestimonial && testimonial.imageUrl ? 'hidden' : ''}`}>
          <span className="text-primary font-semibold">{avatar}</span>
        </div>
        <div>
          <h4 className="font-semibold text-foreground">{name}</h4>
          <p className="text-sm text-muted-foreground">
            {position} at {company}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function TestimonialsSection() {
  const { locale } = useLanguage();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);

        const response = await testimonialsAPI.getAll();
        
        if (response.status === "success" && Array.isArray(response.data)) {
          setTestimonials(response.data);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        // Silently fail and use fallback data
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [locale]);

  // Use API data if available, otherwise fallback to static data
  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  if (loading) {
    return (
      <section className="py-24 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading testimonials...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <BlurFade delay={0.2} inView>
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent text-sm font-semibold rounded-full mb-4">
              Client Testimonials
            </span>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              What Our Clients Say
            </h2>
          </BlurFade>

          <BlurFade delay={0.6} inView>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Don&apos;t just take our word for it. Here&apos;s what our clients
              have to say about their experience working with Teknalogi and the
              results we&apos;ve delivered together.
            </p>
          </BlurFade>
        </div>

        {/* Testimonials Marquee */}
        <BlurFade delay={0.8} inView>
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:25s]">
              {displayTestimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  locale={locale}
                />
              ))}
            </Marquee>
            {/* Gradient overlays */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
          </div>
        </BlurFade>

        {/* Stats */}
        <BlurFade delay={1.0} inView>
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                98%
              </div>
              <p className="text-muted-foreground">Client Satisfaction</p>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                {displayTestimonials.length > 10 ? '50+' : '50+'}
              </div>
              <p className="text-muted-foreground">Projects Delivered</p>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                25+
              </div>
              <p className="text-muted-foreground">Happy Clients</p>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                5
              </div>
              <p className="text-muted-foreground">Years Experience</p>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
