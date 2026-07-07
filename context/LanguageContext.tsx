"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Locale } from "@/lib/i18n";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: typeof translations.uz;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "uz",
  setLocale: () => {},
  t: translations.uz,
  mounted: false,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>("uz");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("bitehouse-locale") as Locale;
      if (saved && translations[saved]) {
        setLocaleState(saved);
      } else {
        // Default: o'zbek tili
        setLocaleState("uz");
        localStorage.setItem("bitehouse-locale", "uz");
      }
    } catch {
      setLocaleState("uz");
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem("bitehouse-locale", newLocale);
    } catch {
      // ignore
    }
  };

  return (
<LanguageContext.Provider
  value={{ locale, setLocale, t: translations[locale] as typeof translations.uz, mounted }}
>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
