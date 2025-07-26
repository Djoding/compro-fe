"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentLocale,
  setStoredLocale,
  type Locale,
  defaultLocale,
} from "@/lib/i18n";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize locale on mount
  useEffect(() => {
    const currentLocale = getCurrentLocale();
    setLocaleState(currentLocale);
    setIsLoading(false);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setStoredLocale(newLocale);

    // Trigger page refresh to update all API calls with new language
    window.location.reload();
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
