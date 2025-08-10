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
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

function getInitialLang(): SupportedLanguage {
  if (typeof document !== "undefined") {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("lang="));
    const value = cookie?.split("=")[1];
    if (value === "en" || value === "id") return value;
  }
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<SupportedLanguage>(getInitialLang);

  const setLang = useCallback((next: SupportedLanguage) => {
    setLangState(next);
    // Simpan 1 tahun
    document.cookie = `lang=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
    // Update <html lang="...">
    if (typeof document !== "undefined") {
      document.documentElement.lang = next === "en" ? "en" : "id";
    }
  }, []);

  useEffect(() => {
    // sinkronkan atribut html saat mount
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang === "en" ? "en" : "id";
    }
  }, [lang]);

  const t = useCallback(
    (key: string) => getFromPath(translations[lang], key),
    [lang]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t }),
    [lang, setLang, t]
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
