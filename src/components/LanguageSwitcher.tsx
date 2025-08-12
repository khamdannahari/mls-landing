"use client";

import { useLanguage } from "@/i18n/LanguageContext";

export default function LanguageSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const { lang, setLang, isHydrated } = useLanguage();

  // Jangan render sampai hydration selesai
  if (!isHydrated) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="px-2 py-1 rounded-md text-sm font-medium text-gray-600 bg-gray-50">
          EN
        </div>
        <span className="text-gray-300">|</span>
        <div className="px-2 py-1 rounded-md text-sm font-medium text-gray-600">
          ID
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        aria-label="Switch to English"
        onClick={() => setLang("en")}
        className={`px-2 py-1 rounded-md text-sm font-medium transition-colors ${
          lang === "en"
            ? "text-blue-600 bg-blue-50"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        EN
      </button>
      <span className="text-gray-300">|</span>
      <button
        aria-label="Ganti ke Bahasa Indonesia"
        onClick={() => setLang("id")}
        className={`px-2 py-1 rounded-md text-sm font-medium transition-colors ${
          lang === "id"
            ? "text-blue-600 bg-blue-50"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        ID
      </button>
    </div>
  );
}
