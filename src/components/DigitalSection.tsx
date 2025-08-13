"use client";

import { useEffect, useState } from "react";
import {
  Settings2,
  Workflow,
  BarChart3,
  Brain,
  Webhook,
  Map,
  PencilRuler,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StepNode {
  x: number;
  y: number;
  n: number;
  title: string;
  desc: string;
  icon: LucideIcon;
}
import { useLanguage } from "@/i18n/LanguageContext";

interface DigitalSectionProps {
  className?: string;
}

export default function DigitalSection({
  className = "",
}: DigitalSectionProps) {
  const { t } = useLanguage();
  const splitIntoTwoLines = (text: string, maxCharsPerLine = 28) => {
    const normalized = text.trim();
    if (normalized.length <= maxCharsPerLine) {
      return { line1: normalized, line2: undefined as string | undefined };
    }
    const breakAt = (str: string, limit: number) => {
      if (str.length <= limit) return { head: str, tail: "" };
      const idx = str.lastIndexOf(" ", limit);
      if (idx === -1)
        return { head: str.slice(0, limit), tail: str.slice(limit) };
      return { head: str.slice(0, idx), tail: str.slice(idx + 1) };
    };
    const first = breakAt(normalized, maxCharsPerLine);
    if (!first.tail) {
      return { line1: first.head, line2: undefined as string | undefined };
    }
    const second = breakAt(first.tail.trim(), maxCharsPerLine);
    const line2 = second.tail ? `${second.head}…` : second.head;
    return { line1: first.head, line2 };
  };
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
    const el = document.getElementById("digital");
    if (el) observer.observe(el);
    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [isClientHydrated]);

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08, delayChildren: 0.08 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 14, scale: 1 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 20 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const steps: StepNode[] = [
    {
      x: 80,
      y: 150,
      n: 1,
      title: t("digital.steps.mapTitle"),
      desc: t("digital.steps.mapDesc"),
      icon: Map,
    },
    {
      x: 220,
      y: 90,
      n: 2,
      title: t("digital.steps.designTitle"),
      desc: t("digital.steps.designDesc"),
      icon: PencilRuler,
    },
    {
      x: 380,
      y: 210,
      n: 3,
      title: t("digital.steps.automateTitle"),
      desc: t("digital.steps.automateDesc"),
      icon: Settings2,
    },
    {
      x: 520,
      y: 150,
      n: 4,
      title: t("digital.steps.orchestrateTitle"),
      desc: t("digital.steps.orchestrateDesc"),
      icon: Workflow,
    },
  ];

  return (
    <section
      id="digital"
      className={`py-28 bg-white scroll-mt-24 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left: Copy & Feature grid */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={isVisible ? "show" : "hidden"}
          >
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
            <motion.div
              className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4"
              variants={container}
              initial="hidden"
              animate={isVisible ? "show" : "hidden"}
            >
              {/* AI Assist - tampil hanya di mobile */}
              <motion.div
                variants={item}
                className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover-lift hover-3d sm:hidden"
              >
                <Brain className="w-5 h-5 text-blue-600 mb-2" aria-hidden />
                <div className="font-semibold text-gray-900 mb-1">
                  {t("digital.features.aiAssistTitle")}
                </div>
                <div className="text-sm text-gray-600">
                  {t("digital.features.aiAssistDesc")}
                </div>
              </motion.div>
              <motion.div
                variants={item}
                className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover-lift hover-3d"
              >
                <Workflow className="w-5 h-5 text-blue-600 mb-2" aria-hidden />
                <div className="font-semibold text-gray-900 mb-1">
                  {t("digital.features.automationTitle")}
                </div>
                <div className="text-sm text-gray-600">
                  {t("digital.features.automationDesc")}
                </div>
              </motion.div>
              <motion.div
                variants={item}
                className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover-lift hover-3d"
              >
                <Webhook className="w-5 h-5 text-blue-600 mb-2" aria-hidden />
                <div className="font-semibold text-gray-900 mb-1">
                  {t("digital.features.integrationTitle")}
                </div>
                <div className="text-sm text-gray-600">
                  {t("digital.features.integrationDesc")}
                </div>
              </motion.div>
              <motion.div
                variants={item}
                className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover-lift hover-3d"
              >
                <BarChart3 className="w-5 h-5 text-blue-600 mb-2" aria-hidden />
                <div className="font-semibold text-gray-900 mb-1">
                  {t("digital.features.analyticsTitle")}
                </div>
                <div className="text-sm text-gray-600">
                  {t("digital.features.analyticsDesc")}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: Illustration (md+) and Mobile Timeline (sm) */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={isVisible ? "show" : "hidden"}
          >
            {/* Mobile timeline (better readability) */}
            <div className="md:hidden">
              <div className="relative bg-white rounded-3xl border border-gray-100 shadow-3xl p-5">
                <motion.ul
                  variants={container}
                  initial="hidden"
                  animate={isVisible ? "show" : "hidden"}
                  className="space-y-4"
                >
                  {steps.map((step, index) => {
                    const IconComp = step.icon;
                    return (
                      <motion.li
                        key={step.n}
                        variants={item}
                        className="flex items-stretch gap-3"
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-blue-100 animate-pulse" />
                          {index < steps.length - 1 && (
                            <div className="w-px flex-1 bg-blue-100 mt-1 mb-1" />
                          )}
                        </div>
                        <div className="flex-1 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                          <div className="flex items-center gap-2">
                            <IconComp className="w-5 h-5 text-blue-600" />
                            <div className="text-gray-900 font-semibold text-base">
                              {step.title}
                            </div>
                          </div>
                          <div className="text-gray-600 text-sm mt-1">
                            {step.desc}
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </div>
            </div>

            {/* Desktop/Tablet SVG illustration */}
            <div className="hidden md:block">
              <div className="relative bg-white rounded-3xl border border-gray-100 shadow-3xl p-6 hover-3d">
                <div className="h-80 gradient-light rounded-xl relative overflow-hidden">
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 600 300"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        id="flow"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
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
                    {steps.map((s) => (
                      <g key={s.n}>
                        <circle
                          cx={s.x}
                          cy={s.y}
                          r="18"
                          className="node-glow"
                        />
                        {(() => {
                          const Icon = s.icon;
                          return (
                            <g transform={`translate(${s.x - 8}, ${s.y - 8})`}>
                              <Icon width={16} height={16} color="#1f2937" />
                            </g>
                          );
                        })()}
                        <text
                          x={s.x}
                          y={s.y + 34}
                          textAnchor="middle"
                          className="node-label"
                          fontWeight="600"
                        >
                          {s.title}
                        </text>
                        {(() => {
                          const { line1, line2 } = splitIntoTwoLines(s.desc);
                          return (
                            <text
                              x={s.x}
                              y={s.y + 48}
                              textAnchor="middle"
                              className="node-label"
                              fill="#6b7280"
                            >
                              <tspan x={s.x}>{line1}</tspan>
                              {line2 && (
                                <tspan x={s.x} dy="14">
                                  {line2}
                                </tspan>
                              )}
                            </text>
                          );
                        })()}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
