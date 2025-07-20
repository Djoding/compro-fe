"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    content: "info@teknalogi.id",
    description: "Send us an email anytime",
  },
  {
    icon: Phone,
    title: "Call Us",
    content: "+62 21 1234 5678",
    description: "Mon-Fri from 9am to 6pm",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    content: "Jl. Teknologi Digital No. 123, Jakarta Selatan 12345",
    description: "Come say hello at our office",
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", company: "", message: "" });

    // Reset success state after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <BlurFade delay={0.2} inView>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
              Get In Touch
            </span>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Let&apos;s Start Your Project
            </h2>
          </BlurFade>

          <BlurFade delay={0.6} inView>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ready to transform your business? Get in touch with our team to
              discuss your project requirements and discover how we can help you
              achieve your digital goals.
            </p>
          </BlurFade>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <BlurFade delay={0.8} inView>
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  Get In Touch
                </h3>
                <p className="text-muted-foreground mb-8">
                  We&apos;d love to hear from you. Choose the most convenient
                  way to reach out to us.
                </p>
              </div>
            </BlurFade>

            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <BlurFade key={info.title} delay={1.0 + index * 0.1} inView>
                    <div className="flex items-start space-x-4 p-4 bg-card rounded-lg border border-border hover:shadow-md transition-all duration-300">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">
                          {info.title}
                        </h4>
                        <p className="text-foreground font-medium mb-1">
                          {info.content}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </BlurFade>
                );
              })}
            </div>

            <BlurFade delay={1.4} inView>
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6">
                <h4 className="font-semibold text-foreground mb-2">
                  Response Time
                </h4>
                <p className="text-muted-foreground text-sm">
                  We typically respond to all inquiries within 24 hours during
                  business days. For urgent matters, please call us directly.
                </p>
              </div>
            </BlurFade>
          </div>

          {/* Contact Form */}
          <BlurFade delay={1.0} inView>
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Send us a message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your project requirements..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full"
                  size="lg"
                >
                  {(() => {
                    if (isSubmitting) {
                      return (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full mr-2"
                          />
                          Sending...
                        </>
                      );
                    }

                    if (isSubmitted) {
                      return (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Message Sent!
                        </>
                      );
                    }

                    return (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    );
                  })()}
                </Button>
              </form>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
