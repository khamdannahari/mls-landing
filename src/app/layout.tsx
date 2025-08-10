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
  title: "Skillex - Watch. Learn. Grow.",
  description:
    "Unlimited access to 100+ instructors. Get the skills you need for a job that is in demand.",
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
