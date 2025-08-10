"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const SECTION_IDS = ["home", "web", "mobile", "digital", "tech"] as const;
type SectionId = (typeof SECTION_IDS)[number];

interface NavigateLenisOptions {
  offset?: number;
  duration?: number;
  force?: boolean;
  lock?: boolean;
}

interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<SectionId>("home");

  useEffect(() => {
    // Tidak perlu nama, kita simpan active by section id
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const shouldBeScrolled = window.scrollY > 20;
        setScrolled((prev) =>
          prev !== shouldBeScrolled ? shouldBeScrolled : prev
        );

        // Hitung active section berbasis posisi header + posisi scroll
        const headerOffset = getHeaderOffset();
        const anchorY = headerOffset + 4; // titik referensi di bawah header

        const doc = document.documentElement;
        const atBottom =
          window.innerHeight + window.scrollY >= doc.scrollHeight - 2;

        if (atBottom) {
          const last: SectionId = SECTION_IDS[SECTION_IDS.length - 1];
          setActiveMenu((prev) => (prev !== last ? last : prev));
          ticking = false;
          return;
        }

        let found: SectionId | null = null;
        let closestAbove: { id: SectionId; dist: number } | null = null;
        for (const id of SECTION_IDS) {
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          const top = rect.top;
          const bottom = rect.bottom;

          // Jika anchor berada di dalam section ini
          if (top <= anchorY && bottom > anchorY) {
            found = id;
            break;
          }
          // Simpan kandidat terdekat yang berada di atas anchor
          const delta = top - anchorY;
          if (delta <= 0) {
            const dist = Math.abs(delta);
            if (!closestAbove || dist < closestAbove.dist) {
              closestAbove = { id, dist };
            }
          }
        }

        const nextId: SectionId =
          found ?? (closestAbove?.id as SectionId) ?? "home";
        setActiveMenu((prev) => (prev !== nextId ? nextId : prev));
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // initial compute
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const menuItems: Array<{ id: SectionId; href: string; label: string }> = [
    { id: "home", href: "#home", label: t("header.home") },
    { id: "web", href: "#web", label: t("header.web") },
    { id: "mobile", href: "#mobile", label: t("header.mobile") },
    { id: "digital", href: "#digital", label: t("header.digital") },
    { id: "tech", href: "#tech", label: t("header.tech") },
  ];

  const getHeaderOffset = () => {
    // Perkiraan tinggi header untuk offset agar section tidak ketutup header fixed
    const header = document.querySelector("header");
    const height = header ? (header as HTMLElement).offsetHeight : 80;
    return height + 8; // tambahan margin kecil
  };

  const handleMenuClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    targetHash: string,
    itemId: SectionId
  ) => {
    e.preventDefault();
    setActiveMenu(itemId);

    const id = targetHash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    // Gunakan helper navigateLenis bila tersedia, agar offset header dihormati
    const navigateLenis = (
      window as unknown as {
        navigateLenis?: (
          target: number | string | HTMLElement,
          options?: NavigateLenisOptions
        ) => void;
      }
    ).navigateLenis;
    if (typeof navigateLenis === "function") {
      navigateLenis(el, { offset: -getHeaderOffset(), duration: 1.1 });
    } else {
      // Fallback native smooth scroll
      const rectTop = el.getBoundingClientRect().top + window.scrollY;
      const top = rectTop - getHeaderOffset();
      window.scrollTo({ top, behavior: "smooth" });
    }

    // Update hash di URL (tanpa memicu lompatan)
    window.history.pushState(null, "", targetHash);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 pt-2 md:pt-3 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg"
          : "bg-transparent"
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with Animation */}
          <div className="flex items-center group cursor-pointer">
            <h1 className="text-2xl font-bold text-gray-900 font-archia flex items-center transition-all duration-300 group-hover:scale-105">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MegaLS
              </span>
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full ml-2 animate-pulse group-hover:animate-bounce"></div>
            </h1>
          </div>

          {/* Desktop Navigation with Hover Effects */}
          <nav className="hidden md:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleMenuClick(e, item.href, item.id)}
                className={`relative px-4 py-2 rounded-lg font-medium font-archia transition-all duration-300 group overflow-hidden ${
                  activeMenu === item.id
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                {activeMenu === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
                )}
              </a>
            ))}
          </nav>

          {/* Desktop Right Controls */}
          <div className="hidden md:flex items-center">
            <LanguageSwitcher className="mr-3" />
            <button className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium font-archia transition-all duration-300 hover:scale-105 hover:shadow-lg group overflow-hidden cursor-pointer">
              <span className="relative z-10">{t("header.contact")}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors group"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
                  }`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation with Slide Animation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-100">
            {menuItems.map((item, index) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  handleMenuClick(e, item.href, item.id);
                  setIsMenuOpen(false);
                }}
                className={`block px-4 py-3 rounded-lg font-medium font-archia transition-all duration-300 transform ${
                  activeMenu === item.id
                    ? "text-blue-600 bg-blue-50 scale-105"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  transform: isMenuOpen ? "translateX(0)" : "translateX(-20px)",
                  opacity: isMenuOpen ? 1 : 0,
                }}
              >
                {item.label}
              </a>
            ))}
            <div className="px-4 pt-2">
              <LanguageSwitcher />
            </div>
            <div className="pt-4">
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-medium font-archia transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                {t("header.contact")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
