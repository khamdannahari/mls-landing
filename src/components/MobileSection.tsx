"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Smartphone,
  AppWindow,
  Cpu,
  Shield,
  Fingerprint,
  Bell,
  WifiOff,
  Rocket,
  Activity,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface MobileSectionProps {
  className?: string;
}

export default function MobileSection({ className = "" }: MobileSectionProps) {
  const { t, isHydrated } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [screenIndex, setScreenIndex] = useState(0);
  const [isClientHydrated, setIsClientHydrated] = useState(false);

  useEffect(() => {
    setIsClientHydrated(true);
  }, []);

  useEffect(() => {
    if (!isClientHydrated || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.15 }
    );
    const el = document.getElementById("mobile");
    if (el) observer.observe(el);
    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [isClientHydrated]);

  useEffect(() => {
    if (!isVisible) return;
    const id = setInterval(() => {
      setScreenIndex((prev) => (prev + 1) % 3);
    }, 3200);
    return () => clearInterval(id);
  }, [isVisible]);

  const capabilityCards = useMemo(
    () => [
      {
        title: t("mobile.caps.offlineTitle"),
        desc: t("mobile.caps.offlineDesc"),
        icon: <WifiOff className="w-5 h-5 text-blue-700" />,
      },
      {
        title: t("mobile.caps.pushTitle"),
        desc: t("mobile.caps.pushDesc"),
        icon: <Bell className="w-5 h-5 text-blue-700" />,
      },
      {
        title: t("mobile.caps.securityTitle"),
        desc: t("mobile.caps.securityDesc"),
        icon: <Shield className="w-5 h-5 text-blue-700" />,
      },
      {
        title: t("mobile.caps.biometricTitle"),
        desc: t("mobile.caps.biometricDesc"),
        icon: <Fingerprint className="w-5 h-5 text-blue-700" />,
      },
      {
        title: t("mobile.caps.perfTitle"),
        desc: t("mobile.caps.perfDesc"),
        icon: <Activity className="w-5 h-5 text-blue-700" />,
      },
      {
        title: t("mobile.caps.releaseTitle"),
        desc: t("mobile.caps.releaseDesc"),
        icon: <Rocket className="w-5 h-5 text-blue-700" />,
      },
    ],
    [t]
  );

  // tech badges dihilangkan sesuai permintaan

  return (
    <section
      id="mobile"
      className={`relative py-16 bg-gradient-to-b from-white to-blue-50 scroll-mt-24 ${className}`}
    >
      {/* subtle background accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-500/10 rounded-full blur-2xl animate-gradient-shift will-change-transform" />
        <div
          className="absolute -bottom-28 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-2xl animate-gradient-shift will-change-transform"
          style={{ animationDelay: "1.2s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
            <Smartphone className="w-4 h-4 mr-2" /> {t("mobile.pill")}
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
            {t("mobile.title")}
          </h2>
          <p className="mt-4 text-gray-600 text-lg">{t("mobile.desc")}</p>
        </div>

        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
            isVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          {/* Phone mockup */}
          <div className="relative mx-auto">
            <div className="absolute -inset-6 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-[2.5rem] blur-xl animate-gradient-shift" />
            <div className="relative w-[220px] h-[440px] sm:w-[260px] sm:h-[520px] rounded-[2.2rem] bg-gray-900 p-2 shadow-3xl hover-3d">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-black/60 rounded-full" />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1.5 bg-gray-700 rounded-full" />
              <div className="relative h-full rounded-[2rem] bg-white overflow-hidden">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      screenIndex === i ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {i === 0 && (
                      <div className="h-full w-full">
                        <div className="px-5 pt-6 pb-3 border-b border-gray-100 bg-gradient-to-br from-blue-50 to-indigo-50">
                          <div className="h-3 w-1/2 rounded bg-[#d2e5ff]" />
                          <div className="mt-2 h-2 w-1/3 rounded bg-[#e7f0ff]" />
                        </div>
                        <div className="p-5 grid grid-cols-2 gap-3">
                          {Array.from({ length: 4 }).map((_, idx) => (
                            <div
                              key={idx}
                              className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm"
                            >
                              <div className="h-14 rounded-md bg-gradient-to-br from-blue-50 to-indigo-50" />
                              <div className="mt-2 h-2 w-3/5 rounded bg-gray-200" />
                              <div className="mt-1 h-2 w-4/5 rounded bg-gray-100" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {i === 1 && (
                      <div className="h-full w-full">
                        <div className="px-5 pt-6 pb-3 border-b border-gray-100 bg-gradient-to-br from-blue-50 to-indigo-50">
                          <div className="h-3 w-2/5 rounded bg-[#d2e5ff]" />
                          <div className="mt-2 h-2 w-1/3 rounded bg-[#e7f0ff]" />
                        </div>
                        <div className="divide-y divide-gray-100">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3 p-4"
                            >
                              <div className="w-10 h-10 rounded-full bg-blue-100" />
                              <div className="flex-1 min-w-0">
                                <div className="h-2 w-1/2 rounded bg-gray-200" />
                                <div className="mt-2 h-2 w-2/3 rounded bg-gray-100" />
                              </div>
                              <div className="h-2 w-8 rounded bg-gray-100" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {i === 2 && (
                      <div className="h-full w-full p-5">
                        <div className="h-36 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50" />
                        <div className="mt-4 h-3 w-1/2 rounded bg-gray-200" />
                        <div className="mt-2 h-2 w-2/3 rounded bg-gray-100" />
                        <div className="mt-5 grid grid-cols-2 gap-3">
                          {Array.from({ length: 2 }).map((_, idx) => (
                            <div
                              key={idx}
                              className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
                            >
                              <div className="h-10 rounded-md bg-gray-100" />
                              <div className="mt-2 h-2 w-3/5 rounded bg-gray-200" />
                            </div>
                          ))}
                        </div>
                        <div className="mt-5">
                          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-medium">
                            {t("mobile.checkout")}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* floating badges */}
            <div className="hidden sm:block" aria-hidden>
              <div className="absolute -top-6 -right-6 w-12 h-12 rounded-xl bg-white border border-gray-100 shadow-lg flex items-center justify-center animate-float">
                <Cpu className="w-5 h-5 text-blue-700" />
              </div>
              <div
                className="absolute -bottom-6 -left-6 w-12 h-12 rounded-xl bg-white border border-gray-100 shadow-lg flex items-center justify-center animate-float"
                style={{ animationDelay: "0.6s" }}
              >
                <AppWindow className="w-5 h-5 text-blue-700" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              {t("mobile.contentTitle")}
            </h3>
            <p className="mt-4 text-gray-600">{t("mobile.contentDesc")}</p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {capabilityCards.slice(0, 4).map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover-lift"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-700 mb-3">
                    {item.icon}
                  </div>
                  <div className="font-semibold text-gray-900 mb-1">
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-600">{item.desc}</div>
                </div>
              ))}
            </div>

            {/* badges & CTA dihilangkan sesuai permintaan */}
          </div>
        </div>
      </div>
    </section>
  );
}
