"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { languages, type Locale } from "@/lib/i18n";
import { ChevronDown, Globe } from "lucide-react";
import { useState } from "react";

export function LanguageSwitcher() {
  const { locale, setLocale, isLoading } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <Globe className="w-4 h-4" />
      </Button>
    );
  }

  const currentLanguage = languages[locale];

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm">{currentLanguage.flag}</span>
        <span className="hidden sm:block text-sm">
          {currentLanguage.code.toUpperCase()}
        </span>
        <ChevronDown className="w-3 h-3" />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
            <div className="p-2">
              {Object.entries(languages).map(([key, lang]) => (
                <button
                  key={key}
                  onClick={() => {
                    setLocale(key as Locale);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors
                    ${
                      locale === key
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span>{lang.name}</span>
                  {locale === key && (
                    <div className="ml-auto w-2 h-2 bg-current rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
