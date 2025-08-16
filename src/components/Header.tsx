"use client";

import { useState, useEffect, useRef } from "react";
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
  const { t, isHydrated } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<SectionId>("home");
  const [isClientHydrated, setIsClientHydrated] = useState(false);
  const topBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsClientHydrated(true);
  }, []);

  useEffect(() => {
    if (!isClientHydrated || typeof window === "undefined") return;

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
  }, [isClientHydrated]);

  const menuItems: Array<{ id: SectionId; href: string; label: string }> = [
    { id: "home", href: "#home", label: t("header.home") },
    { id: "web", href: "#web", label: t("header.web") },
    { id: "mobile", href: "#mobile", label: t("header.mobile") },
    { id: "digital", href: "#digital", label: t("header.digital") },
    { id: "tech", href: "#tech", label: t("header.tech") },
  ];

  const getHeaderOffset = () => {
    // Gunakan tinggi bar atas saja agar offset konsisten saat menu mobile expand/collapse
    const height = topBarRef.current ? topBarRef.current.offsetHeight : 80;
    const isMobileViewport =
      typeof window !== "undefined" ? window.innerWidth < 768 : false;
    const extraSpacing = isMobileViewport ? 12 : 8; // beri ruang ekstra sedikit di mobile
    return height + extraSpacing;
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

  // Jangan render sampai hydration selesai
  if (!isHydrated || !isClientHydrated) {
    return (
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 pt-2 md:pt-3 bg-transparent ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 font-archia flex items-center">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MegaLS
                </span>
              </h1>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 pt-2 md:pt-3 w-full transform-gpu will-change-transform ${
        scrolled || isMenuOpen
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg"
          : "bg-transparent"
      } ${className}`}
      style={{
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={topBarRef} className="flex justify-between items-center h-20">
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
            <button
              onClick={() => {
                const phoneNumber = "62859106948201";
                const message = t("header.whatsappMessage");
                window.open(
                  `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                    message
                  )}`,
                  "_blank"
                );
              }}
              className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium font-archia transition-all duration-300 hover:scale-105 hover:shadow-lg group overflow-hidden cursor-pointer flex items-center gap-2"
            >
              {/* WhatsApp Icon */}
              <svg
                className="relative z-10 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
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
              <button
                onClick={() => {
                  const phoneNumber = "6281234567890"; // Ganti dengan nomor WhatsApp yang diinginkan
                  const message = t("header.whatsappMessage");
                  window.open(
                    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                      message
                    )}`,
                    "_blank"
                  );
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-medium font-archia transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                {/* WhatsApp Icon */}
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                <span>{t("header.contact")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
