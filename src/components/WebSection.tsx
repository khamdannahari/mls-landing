"use client";

import { useEffect, useState } from "react";
import { Monitor, Code2, Globe, Sparkles } from "lucide-react";
import ResponsivePreview from "./ResponsivePreview";
import { useLanguage } from "@/i18n/LanguageContext";

interface WebSectionProps {
  className?: string;
}

export default function WebSection({ className = "" }: WebSectionProps) {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.15 }
    );
    const el = document.getElementById("web");
    if (el) observer.observe(el);
    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, []);

  const features = [
    {
      icon: <Code2 className="w-5 h-5 text-white" />,
      title: t("web.features.customTitle"),
      desc: t("web.features.customDesc"),
      bg: "from-blue-600 to-indigo-600",
    },
    {
      icon: <Globe className="w-5 h-5 text-white" />,
      title: t("web.features.seoTitle"),
      desc: t("web.features.seoDesc"),
      bg: "from-sky-500 to-blue-600",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-white" />,
      title: t("web.features.uiTitle"),
      desc: t("web.features.uiDesc"),
      bg: "from-cyan-500 to-blue-500",
    },
  ];

  return (
    <section id="web" className={`py-24 bg-white scroll-mt-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
            isVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
              <Monitor className="w-4 h-4 mr-2" /> {t("web.pill")}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {t("web.title")}
            </h2>
            <p className="text-lg text-gray-600 mb-10">{t("web.desc")}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover-lift"
                >
                  <div
                    className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${f.bg} mb-3`}
                  >
                    {f.icon}
                  </div>
                  <div className="font-semibold text-gray-900 mb-1">
                    {f.title}
                  </div>
                  <div className="text-sm text-gray-600">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-3xl blur animate-gradient-shift" />
            <div className="relative bg-white rounded-3xl border border-gray-100 shadow-3xl p-6 hover-3d">
              <ResponsivePreview />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
