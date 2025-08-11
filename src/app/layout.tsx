import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { LanguageProvider } from "@/i18n/LanguageContext";

const archia = Archivo({
  subsets: ["latin"],
  variable: "--font-archia",
});

export const metadata: Metadata = {
  title: "MegaLS - Modern Solutions",
  description:
    "Technology partner for modern solutions: web, mobile, and digital transformation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archia.variable} antialiased`}>
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
