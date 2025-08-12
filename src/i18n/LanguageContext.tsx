"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  SupportedLanguage,
  translations,
  getFromPath,
} from "@/i18n/translations";

type LanguageContextValue = {
  lang: SupportedLanguage;
  setLang: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
  isHydrated: boolean;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

function getInitialLang(): SupportedLanguage {
  // Default ke "en" untuk server-side rendering
  if (typeof document === "undefined") {
    return "en";
  }

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("lang="));
  const value = cookie?.split("=")[1];
  if (value === "en" || value === "id") return value;
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<SupportedLanguage>("en");
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize language after hydration
  useEffect(() => {
    const initialLang = getInitialLang();
    setLangState(initialLang);
    setIsHydrated(true);

    // Update HTML lang attribute
    document.documentElement.lang = initialLang === "en" ? "en" : "id";
  }, []);

  const setLang = useCallback((next: SupportedLanguage) => {
    setLangState(next);
    // Simpan 1 tahun
    if (typeof document !== "undefined") {
      document.cookie = `lang=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
      // Update <html lang="...">
      document.documentElement.lang = next === "en" ? "en" : "id";
    }
  }, []);

  const t = useCallback(
    (key: string) => getFromPath(translations[lang], key),
    [lang]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t, isHydrated }),
    [lang, setLang, t, isHydrated]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
