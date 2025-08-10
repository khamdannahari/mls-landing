"use client";

import { useEffect, useState } from "react";
import { Settings2, Workflow, BarChart3, Brain, Webhook } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface DigitalSectionProps {
  className?: string;
}

export default function DigitalSection({
  className = "",
}: DigitalSectionProps) {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.15 }
    );
    const el = document.getElementById("digital");
    if (el) observer.observe(el);
    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, []);

  return (
    <section
      id="digital"
      className={`py-28 bg-white scroll-mt-24 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left: Copy & Feature grid */}
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
              <Settings2 className="w-4 h-4 mr-2" aria-hidden />{" "}
              {t("digital.pill")}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {t("digital.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              {t("digital.desc")}
            </p>

            {/* Langkah divisualisasikan pada ilustrasi di sisi kanan */}

            {/* Fitur utama */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover-lift hover-3d">
                <Workflow className="w-5 h-5 text-blue-600 mb-2" aria-hidden />
                <div className="font-semibold text-gray-900 mb-1">
                  {t("digital.features.automationTitle")}
                </div>
                <div className="text-sm text-gray-600">
                  {t("digital.features.automationDesc")}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover-lift hover-3d">
                <Brain className="w-5 h-5 text-blue-600 mb-2" aria-hidden />
                <div className="font-semibold text-gray-900 mb-1">
                  {t("digital.features.aiAssistTitle")}
                </div>
                <div className="text-sm text-gray-600">
                  {t("digital.features.aiAssistDesc")}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover-lift hover-3d">
                <Webhook className="w-5 h-5 text-blue-600 mb-2" aria-hidden />
                <div className="font-semibold text-gray-900 mb-1">
                  {t("digital.features.integrationTitle")}
                </div>
                <div className="text-sm text-gray-600">
                  {t("digital.features.integrationDesc")}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover-lift hover-3d">
                <BarChart3 className="w-5 h-5 text-blue-600 mb-2" aria-hidden />
                <div className="font-semibold text-gray-900 mb-1">
                  {t("digital.features.analyticsTitle")}
                </div>
                <div className="text-sm text-gray-600">
                  {t("digital.features.analyticsDesc")}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Animated network illustration */}
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`}>
            <div className="relative bg-white rounded-3xl border border-gray-100 shadow-3xl p-6 hover-3d">
              <div className="h-80 gradient-light rounded-xl relative overflow-hidden">
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 600 300"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="flow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                  </defs>
                  {/* Path alur langkah */}
                  <path
                    d="M80,150 C140,90 260,90 300,150 S460,210 520,150"
                    stroke="url(#flow)"
                    strokeWidth="3"
                    fill="none"
                    className="animate-dash"
                  />

                  {/* Step nodes */}
                  {[
                    {
                      x: 80,
                      y: 150,
                      n: 1,
                      title: t("digital.steps.mapTitle"),
                      desc: t("digital.steps.mapDesc"),
                    },
                    {
                      x: 220,
                      y: 90,
                      n: 2,
                      title: t("digital.steps.designTitle"),
                      desc: t("digital.steps.designDesc"),
                    },
                    {
                      x: 380,
                      y: 210,
                      n: 3,
                      title: t("digital.steps.automateTitle"),
                      desc: t("digital.steps.automateDesc"),
                    },
                    {
                      x: 520,
                      y: 150,
                      n: 4,
                      title: t("digital.steps.orchestrateTitle"),
                      desc: t("digital.steps.orchestrateDesc"),
                    },
                  ].map((s) => (
                    <g key={s.n}>
                      <circle cx={s.x} cy={s.y} r="18" className="node-glow" />
                      <text
                        x={s.x}
                        y={s.y + 3}
                        textAnchor="middle"
                        fontSize="10"
                        fill="#1f2937"
                      >
                        {s.n}
                      </text>
                      <text
                        x={s.x}
                        y={s.y + 34}
                        textAnchor="middle"
                        className="node-label"
                        fontWeight="600"
                      >
                        {s.title}
                      </text>
                      <text
                        x={s.x}
                        y={s.y + 48}
                        textAnchor="middle"
                        className="node-label"
                        fill="#6b7280"
                      >
                        {s.desc}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              <div className="absolute -right-4 -top-4 w-20 h-20 bg-blue-200/40 rounded-full animate-float" />
              <div
                className="absolute -left-6 -bottom-6 w-28 h-28 bg-indigo-200/40 rounded-full animate-float"
                style={{ animationDelay: "1s" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
