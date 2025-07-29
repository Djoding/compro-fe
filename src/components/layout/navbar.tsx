// src/components/layout/navbar.tsx (update existing)
"use client";

import TeknaLogiIcon from "@/components/ui/teknalogi-icon";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useTranslations } from "@/hooks/use-translations";

export default function Navbar() {
  const { t } = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const navigation = [
    { name: t("nav.home"), href: "/" },
    {
      name: t("nav.about"),
      href: "/about",
      submenu: [
        { name: "Company Overview", href: "/about" },
        { name: "Vision & Mission", href: "/about#vision-mission" },
        { name: t("nav.team"), href: "/team" },
        { name: "Company Journey", href: "/about#journey" },
        { name: t("nav.certificates"), href: "/certificates" },
      ],
    },
    { name: t("nav.solutions"), href: "/solutions" },
    { name: t("nav.expertise"), href: "/expertise" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownToggle = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 w-dvw z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-background/20 lg:bg-transparent lg:backdrop-blur-none lg:border-none backdrop-blur-sm border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center space-x-3">
              <TeknaLogiIcon className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-foreground">
                Teknalogi
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={cn(
                        "flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-200",
                        pathname.startsWith(item.href) ||
                          (pathname === "/team" && item.name === "About Us") ||
                          (pathname === "/certificates" &&
                            item.name === "About Us")
                          ? "text-primary"
                          : "text-foreground hover:text-primary"
                      )}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
                        >
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-3 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "px-3 py-2 text-sm font-medium transition-colors duration-200",
                        pathname === item.href
                          ? "text-primary"
                          : "text-foreground hover:text-primary"
                      )}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                )}
              </div>
            ))}
            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground hover:text-primary transition-colors duration-200"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-border"
            >
              <div className="py-4 space-y-2">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.submenu ? (
                      <div>
                        <button
                          onClick={() => handleDropdownToggle(item.name)}
                          className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
                        >
                          {item.name}
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform duration-200",
                              activeDropdown === item.name && "rotate-180"
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-4 space-y-1"
                            >
                              {item.submenu.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  onClick={() => setIsOpen(false)}
                                  className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "block px-4 py-2 text-sm font-medium transition-colors duration-200",
                          pathname === item.href
                            ? "text-primary"
                            : "text-foreground hover:text-primary"
                        )}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                {/* Mobile Language Switcher */}
                <div className="px-4 py-2">
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
