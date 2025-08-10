"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import Image from "next/image";
import { Brain, Zap, Rocket } from "lucide-react";

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className = "" }: HeroSectionProps) {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const measureHeader = () => {
      const header = document.querySelector("header") as HTMLElement | null;
      setHeaderHeight(header ? header.offsetHeight : 0);
    };
    measureHeader();
    window.addEventListener("resize", measureHeader);
    return () => window.removeEventListener("resize", measureHeader);
  }, []);

  const heroCards = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=1200&fit=crop&crop=center",
      overlayText: "Web",
      overlayPosition: "left",
      gradient: "from-blue-500/20 to-purple-600/20",
      description: t("hero.cards.webDesc"),
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=1200&fit=crop&crop=center",
      overlayText: "Mobile",
      overlayPosition: "left",
      gradient: "from-emerald-500/20 to-teal-600/20",
      description: t("hero.cards.mobileDesc"),
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=1200&fit=crop&crop=center",
      overlayText: "Digital",
      overlayPosition: "left",
      gradient: "from-orange-500/20 to-red-600/20",
      description: t("hero.cards.digitalDesc"),
    },
  ];

  // Function to determine flex value for each card
  const getCardFlex = (cardId: number) => {
    if (hoveredCard === cardId) {
      return "flex-[4]"; // Hovered card expands more
    } else if (hoveredCard !== null) {
      return "flex-[0.8]"; // Other cards shrink more when one is hovered
    } else {
      // Default state: first card expands, others are normal
      return cardId === 1 ? "flex-[3]" : "flex-[1]";
    }
  };

  return (
    <section
      id="home"
      className={`flex items-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-[100svh] lg:h-[100svh] pb-16 sm:pb-20 md:pb-24 lg:pb-0 ${className}`}
      style={{
        boxSizing: "border-box",
        paddingTop: headerHeight,
        scrollMarginTop: headerHeight,
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-2xl animate-pulse will-change-transform"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-2xl animate-pulse will-change-transform"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-2xl animate-pulse will-change-transform"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 xl:gap-20 items-center">
          {/* Left Content */}
          <div
            className={`space-y-10 lg:col-span-1 ${
              isVisible ? "animate-fade-in" : "opacity-0"
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-archia overflow-visible">
              <span
                className="block bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                {t("hero.build")}
              </span>
              <span
                className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                {t("hero.innovate")}
              </span>
              <span
                className="block bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent animate-fade-in-up whitespace-nowrap"
                style={{ animationDelay: "0.6s" }}
              >
                {t("hero.transform")}
              </span>
            </h1>

            {/* Search Input and Button */}
            <div
              className="flex items-center space-x-4 max-w-md animate-fade-in-up"
              style={{ animationDelay: "1s" }}
            >
              <div className="flex-1 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <input
                  type="email"
                  placeholder={t("hero.emailPlaceholder")}
                  className="relative w-full px-6 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 font-archia shadow-lg"
                />
              </div>
              <button className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-archia shadow-lg transform hover:scale-105 hover:shadow-xl cursor-pointer group overflow-hidden">
                <span className="relative z-10">{t("header.contact")}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Features */}
            <div
              className="flex items-center space-x-6 pt-4 animate-fade-in-up"
              style={{ animationDelay: "1.2s" }}
            >
              <div className="text-center group">
                <div className="flex justify-center mb-2">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {t("hero.features.aiTop")}
                </div>
                <div className="text-xs text-gray-600">
                  {t("hero.features.aiBottom")}
                </div>
              </div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="text-center group">
                <div className="flex justify-center mb-2">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {t("hero.features.smartTop")}
                </div>
                <div className="text-xs text-gray-600">
                  {t("hero.features.smartBottom")}
                </div>
              </div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="text-center group">
                <div className="flex justify-center mb-2">
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Rocket className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {t("hero.features.futureTop")}
                </div>
                <div className="text-xs text-gray-600">
                  {t("hero.features.futureBottom")}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Image Cards */}
          <div
            className={`relative lg:col-span-2 ${
              isVisible ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex space-x-6 h-[44vh] sm:h-[48vh] md:h-[52vh] lg:h-[54vh] xl:h-[56vh] 2xl:h-[58vh] max-h-[700px]">
              {heroCards.map((card, index) => (
                <div
                  key={card.id}
                  className={`relative rounded-3xl overflow-hidden transition-all duration-700 ease-out cursor-pointer shadow-2xl hover:shadow-3xl ${getCardFlex(
                    card.id
                  )}`}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    transform:
                      hoveredCard === card.id
                        ? `perspective(1000px) rotateY(${
                            (mousePosition.x - window.innerWidth / 2) * 0.01
                          }deg) rotateX(${
                            (mousePosition.y - window.innerHeight / 2) * 0.01
                          }deg)`
                        : "perspective(1000px) rotateY(0deg) rotateX(0deg)",
                    transition: "all 0.3s ease-out",
                  }}
                >
                  {/* Background Image */}
                  <div className="w-full h-full relative">
                    <Image
                      src={card.image}
                      alt={card.overlayText}
                      fill
                      className="object-cover transition-transform duration-700 ease-out"
                      style={{
                        transform:
                          hoveredCard === card.id ? "scale(1.1)" : "scale(1)",
                      }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index === 0}
                    />

                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${card.gradient} opacity-60`}
                    ></div>

                    {/* Floating Elements */}
                    <div className="absolute top-6 right-6">
                      <div className="w-3 h-3 bg-white/30 rounded-full animate-ping"></div>
                    </div>

                    {/* Animated Vertical/Horizontal Overlay Text */}
                    {card.overlayPosition === "left" && (
                      <>
                        {/* Vertical Text (hidden when hovered) */}
                        <div
                          className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-12 bg-gradient-to-b from-white/30 to-transparent backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-700 ease-out ${
                            hoveredCard === card.id
                              ? "opacity-0 scale-95 -translate-x-full"
                              : "opacity-100 scale-100 translate-x-0"
                          }`}
                          style={{ height: "120px" }}
                        >
                          <div className="text-white/90 text-base font-bold transform -rotate-90 whitespace-nowrap font-archia tracking-wider">
                            {card.overlayText}
                          </div>
                        </div>

                        {/* Horizontal Text (shown when hovered) */}
                        <div
                          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 transition-all duration-700 ease-out ${
                            hoveredCard === card.id
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-full"
                          }`}
                        >
                          <div className="text-white text-center space-y-2">
                            <div className="text-2xl font-bold font-archia">
                              {card.overlayText}
                            </div>
                            <div className="text-sm text-blue-100 font-archia">
                              {card.description}
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {card.overlayPosition === "right" && (
                      <>
                        {/* Vertical Text (hidden when hovered) */}
                        <div
                          className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-12 bg-gradient-to-b from-white/30 to-transparent backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-700 ease-out ${
                            hoveredCard === card.id
                              ? "opacity-0 scale-95 translate-x-full"
                              : "opacity-100 scale-100 translate-x-0"
                          }`}
                          style={{ height: "120px" }}
                        >
                          <div className="text-white/90 text-base font-bold transform -rotate-90 whitespace-nowrap font-archia tracking-wider">
                            {card.overlayText}
                          </div>
                        </div>

                        {/* Horizontal Text (shown when hovered) */}
                        <div
                          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 transition-all duration-700 ease-out ${
                            hoveredCard === card.id
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-full"
                          }`}
                        >
                          <div className="text-white text-center space-y-2">
                            <div className="text-2xl font-bold font-archia">
                              {card.overlayText}
                            </div>
                            <div className="text-sm text-blue-100 font-archia">
                              {card.description}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
