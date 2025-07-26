"use client";

import { useLanguage } from "@/contexts/language-context";
import { translations } from "@/lib/translations";

export function useTranslations() {
  const { locale } = useLanguage();

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: Record<string, unknown> | string = translations[locale];

    for (const k of keys) {
      if (typeof value === 'string') {
        console.warn(
          `Translation missing for key: ${key} in locale: ${locale}`
        );
        return key; // Return key if translation not found
      }
      const nextValue = value?.[k];
      if (nextValue === undefined) {
        console.warn(
          `Translation missing for key: ${key} in locale: ${locale}`
        );
        return key; // Return key if translation not found
      }
      if (typeof nextValue !== 'string' && typeof nextValue !== 'object') {
        console.warn(
          `Translation missing for key: ${key} in locale: ${locale}`
        );
        return key; // Return key if translation not found
      }
      value = nextValue as Record<string, unknown> | string;
    }

    return typeof value === 'string' ? value : key;
  };

  return { t, locale };
}
