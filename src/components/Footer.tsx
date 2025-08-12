"use client";

import { useState, useEffect } from "react";
import { Mail, MessageCircle, Linkedin, Instagram } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  const { t, isHydrated } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);
  const [year, setYear] = useState(2024); // Default year untuk server-side

  useEffect(() => {
    // Update year setelah hydration
    setYear(new Date().getFullYear());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      setShowError(false);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  // Footer navigation removed as requested

  return (
    <footer className={`relative text-gray-300 bg-black ${className}`}>
      {/* Decorative subtle background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-16 w-72 h-72 bg-blue-400/10 rounded-full blur-2xl animate-pulse will-change-transform" />
        <div
          className="absolute -bottom-28 -left-20 w-80 h-80 bg-indigo-400/10 rounded-full blur-2xl animate-pulse will-change-transform"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">
              PT Mega Lentera Solusi
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              {t("footer.companyDesc")}
            </p>

            {/* Navigation removed */}
            <div className="mb-2" />

            {/* Newsletter */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-3">
                {t("footer.newsletterTitle")}
              </h4>
              <p className="text-gray-400 mb-4">{t("footer.newsletterDesc")}</p>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-2"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footer.emailPlaceholder")}
                  autoComplete="off"
                  className="flex-1 px-4 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors"
                >
                  {t("footer.send")}
                </button>
              </form>

              {/* Success/Error Messages */}
              {isSubmitted && (
                <p className="text-green-600 text-sm mt-2 animate-fade-in">
                  {t("footer.success")}
                </p>
              )}
              {showError && (
                <p className="text-red-600 text-sm mt-2 animate-fade-in">
                  {t("footer.error")}
                </p>
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 text-white mr-3">
                  <Mail className="w-4 h-4" />
                </span>
                <a
                  href="mailto:hello@megalenterasolusi.id"
                  className="hover:text-white transition-colors"
                >
                  hello@megalenterasolusi.id
                </a>
              </li>
              <li className="flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 text-white mr-3">
                  <MessageCircle className="w-4 h-4" />
                </span>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  +62 812 3456 7890
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              {t("footer.social")}
            </h4>
            <p className="text-gray-400 mb-4">{t("footer.followUs")}</p>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="LinkedIn"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {year} PT Mega Lentera Solusi. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {t("footer.privacy")}
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {t("footer.terms")}
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {t("footer.cookie")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
