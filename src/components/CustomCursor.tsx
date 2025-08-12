"use client";

import { useEffect, useRef, useState } from "react";

function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") return;

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return; // Jangan render pada perangkat touch

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId = 0;

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    const setTransform = (el: HTMLDivElement, x: number, y: number) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setTransform(dot, mouseX, mouseY);
    };

    const animate = () => {
      const follow = prefersReducedMotion ? 1 : 0.18;
      ringX = lerp(ringX, mouseX, follow);
      ringY = lerp(ringY, mouseY, follow);
      setTransform(ring, ringX, ringY);
      rafId = requestAnimationFrame(animate);
    };

    const onMouseDown = () => {
      ring.classList.add("cursor-active");
      dot.classList.add("cursor-active");
    };
    const onMouseUp = () => {
      ring.classList.remove("cursor-active");
      dot.classList.remove("cursor-active");
    };
    const onMouseEnter = () => {
      ring.classList.remove("cursor-hidden");
      dot.classList.remove("cursor-hidden");
    };
    const onMouseLeave = () => {
      ring.classList.add("cursor-hidden");
      dot.classList.add("cursor-hidden");
    };

    const interactiveSelector =
      "a, button, [role=button], input, textarea, select, summary, label";
    const onPointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest(interactiveSelector);
      if (isInteractive) {
        ring.classList.add("cursor-hover");
      } else {
        ring.classList.remove("cursor-hover");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseover", onPointerOver, { passive: true });

    // Start state
    setTransform(dot, mouseX, mouseY);
    setTransform(ring, ringX, ringY);
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseover", onPointerOver);
    };
  }, [isHydrated]);

  // Jangan render cursor sampai hydration selesai
  if (!isHydrated) {
    return null;
  }

  // Render dua layer untuk dot dan ring
  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}
