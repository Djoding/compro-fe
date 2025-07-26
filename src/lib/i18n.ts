// src/lib/i18n.ts
export const defaultLocale = "id" as const;
export const locales = ["id", "en"] as const;

export type Locale = (typeof locales)[number];

// Language configuration
export const languages = {
  id: {
    name: "Bahasa Indonesia",
    flag: "🇮🇩",
    code: "id",
  },
  en: {
    name: "English",
    flag: "🇺🇸",
    code: "en",
  },
} as const;

// Helper function to validate locale
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Get browser language preference
export function getBrowserLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;

  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("en")) return "en";
  if (browserLang.startsWith("id")) return "id";

  return defaultLocale;
}

// Store locale in localStorage
export function setStoredLocale(locale: Locale) {
  if (typeof window !== "undefined") {
    localStorage.setItem("locale", locale);
  }
}

// Get stored locale
export function getStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem("locale");
  return stored && isValidLocale(stored) ? stored : null;
}

// Get current locale (priority: stored > browser > default)
export function getCurrentLocale(): Locale {
  return getStoredLocale() || getBrowserLocale() || defaultLocale;
}
