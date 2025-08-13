"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Globe, Code, Zap, Shield } from "lucide-react";
import ResponsivePreview from "@/components/ResponsivePreview";
import { motion } from "framer-motion";

interface WebSectionProps {
  className?: string;
}

export default function WebSection({ className = "" }: WebSectionProps) {
  const { t, isHydrated } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
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
    const el = document.getElementById("web");
    if (el) observer.observe(el);
    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [isClientHydrated]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 160, damping: 20 },
    },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -32 },
    show: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 140, damping: 18 },
    },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 32 },
    show: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 140, damping: 18 },
    },
  };

  const features = [
    {
      icon: <Code className="w-5 h-5 text-white" />,
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
      icon: <Zap className="w-5 h-5 text-white" />,
      title: t("web.features.uiTitle"),
      desc: t("web.features.uiDesc"),
      bg: "from-cyan-500 to-blue-500",
    },
  ];

  return (
    <section id="web" className={`py-24 bg-white scroll-mt-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          variants={container}
        >
          <motion.div variants={fadeLeft}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
              <Shield className="w-4 h-4 mr-2" /> {t("web.pill")}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {t("web.title")}
            </h2>
            <p className="text-lg text-gray-600 mb-10">{t("web.desc")}</p>

            <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  variants={item}
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
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="relative" variants={fadeRight}>
            <div className="absolute -inset-6 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-3xl blur animate-gradient-shift" />
            <div className="relative bg-white rounded-3xl border border-gray-100 shadow-3xl p-6 hover-3d">
              <ResponsivePreview />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
