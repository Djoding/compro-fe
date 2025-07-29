import { Button } from "@/components/ui/button";
import TeknaLogiIcon from "@/components/ui/teknalogi-icon";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Solutions", href: "/solutions" },
  { name: "Expertise", href: "/expertise" },
  { name: "Contact", href: "/contact" }
];

const services = [
  { name: "Web Development", href: "/expertise#web-development" },
  { name: "Mobile Apps", href: "/expertise#mobile-apps" },
  { name: "Cloud Solutions", href: "/expertise#cloud-solutions" },
  { name: "Digital Transformation", href: "/expertise#digital-transformation" },
  { name: "Consulting", href: "/expertise#consulting" }
];

const socialLinks = [
  { name: "LinkedIn", href: "#", icon: "💼" },
  { name: "Twitter", href: "#", icon: "🐦" },
  { name: "Facebook", href: "#", icon: "�" },
  { name: "Instagram", href: "#", icon: "�" }
];

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <TeknaLogiIcon className="w-10 h-10 text-primary" />
              <span className="text-2xl font-bold text-foreground">Teknalogi</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Accelerating Your Business Through Digital Innovation. We design and build custom technology solutions that
              enhance efficiency and unlock new potential.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(social => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground rounded-lg flex items-center justify-center transition-all duration-200"
                >
                  <span className="text-lg">{social.icon}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                    <span className="group-hover:translate-x-2 transition-transform duration-200">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Our Services</h3>
            <ul className="space-y-3">
              {services.map(service => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                    <span className="group-hover:translate-x-2 transition-transform duration-200">{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Address</p>
                  <p className="text-sm text-muted-foreground">
                    Jl. Teknologi Digital No. 123
                    <br />
                    Jakarta Selatan 12345
                    <br />
                    Indonesia
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Phone</p>
                  <p className="text-sm text-muted-foreground">+62 21 1234 5678</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">info@teknalogi.id</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Stay Updated</h3>
              <p className="text-muted-foreground">
                Subscribe to our newsletter for the latest tech insights and company updates.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent flex-1 lg:w-64"
              />
              <Button className="whitespace-nowrap">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <p className="text-sm text-muted-foreground">© 2024 PT. Teknalogi Transformasi Digital. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
