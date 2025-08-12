"use client";

import { useEffect, useState } from "react";
import { Cpu, Database } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiVercel,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiKubernetes,
  SiAmazon,
  SiGooglecloud,
  SiSupabase,
  SiAndroid,
  SiApple,
  SiFlutter,
  SiHeroku,
  SiKotlin,
  SiSwift,
  SiN8N,
  SiOllama,
} from "react-icons/si";

interface TechSectionProps {
  className?: string;
}

export default function TechSection({ className = "" }: TechSectionProps) {
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
    const el = document.getElementById("tech");
    if (el) observer.observe(el);
    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [isClientHydrated]);

  const techStacks = [
    // Mobile first
    { name: "Android", Icon: SiAndroid },
    { name: "iOS", Icon: SiApple },
    { name: "Flutter", Icon: SiFlutter },
    { name: "React Native", Icon: SiReact },
    { name: "Kotlin", Icon: SiKotlin },
    { name: "Swift", Icon: SiSwift },

    // Web / UI
    { name: "TypeScript", Icon: SiTypescript },
    { name: "Next.js", Icon: SiNextdotjs },
    { name: "React", Icon: SiReact },
    { name: "Tailwind CSS", Icon: SiTailwindcss },

    // Backend / Runtime
    { name: "Node.js", Icon: SiNodedotjs },

    // Cloud / Hosting / CDN
    { name: "Vercel", Icon: SiVercel },
    { name: "Heroku", Icon: SiHeroku },
    { name: "AWS", Icon: SiAmazon },
    { name: "Google Cloud", Icon: SiGooglecloud },

    // Database / ORM / Platform Data
    { name: "PostgreSQL", Icon: SiPostgresql },
    { name: "MongoDB", Icon: SiMongodb },
    { name: "Supabase", Icon: SiSupabase },
    { name: "Neon", Icon: Database },
    { name: "Prisma", Icon: SiPrisma },

    // Container / Orchestration
    { name: "Docker", Icon: SiDocker },
    { name: "Kubernetes", Icon: SiKubernetes },

    // Automation / AI
    { name: "n8n", Icon: SiN8N },
    { name: "LlamaIndex", Icon: SiOllama },
  ];

  return (
    <section
      id="tech"
      className={`relative py-24 bg-gradient-to-b from-white to-blue-50 scroll-mt-24 ${className}`}
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
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
            <Cpu className="w-4 h-4 mr-2" /> {t("tech.pill")}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            {t("tech.title")}
          </h2>
          <p className="mt-4 text-gray-600 text-lg">{t("tech.desc")}</p>
        </div>

        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 ${
            isVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          {techStacks.map(({ name, Icon }) => (
            <div
              key={name}
              className="group bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover-lift flex flex-col items-center justify-center text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                <Icon className="w-7 h-7 text-gray-700 group-hover:text-blue-700 transition-colors" />
              </div>
              <div className="text-sm font-medium text-gray-800">{name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
