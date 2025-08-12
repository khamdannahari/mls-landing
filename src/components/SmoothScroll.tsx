"use client";

import { useEffect, type PropsWithChildren, useState } from "react";
import CustomCursor from "@/components/CustomCursor";
import Lenis from "lenis";

export default function SmoothScroll({ children }: PropsWithChildren) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") return;

    const lenis = new Lenis({
      // Best practice: gunakan duration + easing (ease-out expo)
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.1,
      touchInertiaExponent: 28,
      wheelMultiplier: 1.8,
      touchMultiplier: 1.35,
      gestureOrientation: "vertical",
      allowNestedScroll: true,
      overscroll: false,
      anchors: false,
      prevent: (node) => {
        const tag = (node.tagName || "").toLowerCase();
        return (
          tag === "input" ||
          tag === "textarea" ||
          (node as HTMLElement).isContentEditable ||
          node.hasAttribute("data-lenis-prevent")
        );
      },
      virtualScroll: (data) => {
        // Clamp delta agar input tidak terlalu agresif
        const clamp = (v: number, min: number, max: number) =>
          Math.max(min, Math.min(max, v));
        const clampedY = clamp(data.deltaY, -240, 240);
        const clampedX = clamp(data.deltaX, -240, 240);
        if (clampedY !== data.deltaY) data.deltaY = clampedY;
        if (clampedX !== data.deltaX) data.deltaX = clampedX;
        return true;
      },
    });

    // Ekspos ke window agar bisa dipakai komponen lain (mis. Header anchor scroll)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).lenis = lenis;

    // Helper untuk navigasi halus ke target
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).navigateLenis = (
      target: number | string | HTMLElement,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options?: any
    ) => {
      const resolvedTarget = (() => {
        if (typeof target === "string") {
          const id = target.startsWith("#") ? target.slice(1) : target;
          return (document.getElementById(id) as HTMLElement) ?? target;
        }
        return target;
      })();

      const duration = options?.duration ?? 1.6;

      lenis.scrollTo(resolvedTarget, {
        immediate: false,
        duration,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        offset: options?.offset ?? 0,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        force: (options as any)?.force ?? true,
      });
    };

    // Auto-scroll ke hash saat initial load (deep link)
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const targetEl = document.getElementById(id);
      if (targetEl) {
        // slight delay menunggu layout stabil
        setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).navigateLenis(targetEl, {
            offset: -0,
            duration: 1.2,
          });
        }, 50);
      }
    }

    // Pause animasi berat saat scrolling aktif untuk menghindari stutter
    const root = document.documentElement;
    let scrollEndTimeout: number | null = null;
    const onLenisScroll = () => {
      if (!root.classList.contains("is-scrolling")) {
        root.classList.add("is-scrolling");
      }
      if (scrollEndTimeout) window.clearTimeout(scrollEndTimeout);
      scrollEndTimeout = window.setTimeout(() => {
        root.classList.remove("is-scrolling");
      }, 240);
    };
    lenis.on("scroll", onLenisScroll);

    // Gunakan RAF manual sesuai contoh resmi Lenis
    let rafId = 0 as number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      root.classList.remove("is-scrolling");
      lenis.off("scroll", onLenisScroll as never);
      lenis.destroy();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).navigateLenis;
    };
  }, [isHydrated]);

  return (
    <>
      {children}
      <CustomCursor />
    </>
  );
}
