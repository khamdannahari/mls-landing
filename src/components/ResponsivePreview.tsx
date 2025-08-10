"use client";

import { useState } from "react";
import { Monitor, Tablet, Smartphone } from "lucide-react";

interface ResponsivePreviewProps {
  className?: string;
}

type Viewport = "desktop" | "tablet" | "mobile";

export default function ResponsivePreview({
  className = "",
}: ResponsivePreviewProps) {
  const [viewport, setViewport] = useState<Viewport>("desktop");

  // Konsistensi tinggi canvas; lebar akan menyesuaikan per viewport
  const CANVAS_HEIGHT_CLASS = "h-[420px]";
  const viewportWidthClass = {
    desktop: "w-full",
    tablet: "w-[768px] max-w-full",
    mobile: "w-[360px] max-w-full",
  } as const;

  const ReusableCard = ({ title }: { title: string }) => (
    <div className="relative bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow overflow-hidden min-w-0">
      <div className="h-24 rounded-md bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="h-4 w-10 rounded-full bg-[#d2e5ff]" />
      </div>
      <div className="mt-3 h-3 w-2/5 max-w-full rounded bg-gray-200" />
      <div className="mt-2 h-2 w-3/5 max-w-full rounded bg-gray-100" />
      <div className="mt-4 flex gap-2 gap-y-2 items-center flex-wrap">
        <button className="shrink-0 inline-flex items-center justify-center px-3 py-1 text-xs font-medium rounded-md bg-blue-600 text-white hover:brightness-110">
          Button
        </button>
        <button className="shrink-0 inline-flex items-center justify-center px-3 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-700 border border-gray-200 hover:bg-white">
          Ghost
        </button>
      </div>
      <div className="sr-only">{title}</div>
    </div>
  );

  const renderCards = (count: number) =>
    Array.from({ length: count }).map((_, i) => (
      <ReusableCard key={i} title={`Card ${i + 1}`} />
    ));

  const Desktop = () => (
    <div className="grid grid-cols-12 gap-x-4 gap-y-4">
      <main className="col-span-12 min-w-0">
        <div className="grid grid-cols-3 gap-x-3 gap-y-3">
          {renderCards(12)}
        </div>
      </main>
    </div>
  );

  const TabletView = () => (
    <div className="grid grid-cols-6 gap-4">
      <main className="col-span-6">
        <div className="grid grid-cols-2 gap-4">{renderCards(8)}</div>
      </main>
    </div>
  );

  const MobileView = () => (
    <div className="grid grid-cols-1 gap-4">{renderCards(10)}</div>
  );

  return (
    <div className={className}>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-100">
          <button
            onClick={() => setViewport("desktop")}
            className={`cursor-pointer flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition ${
              viewport === "desktop"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-white"
            }`}
          >
            <Monitor className="w-4 h-4" /> Desktop
          </button>
          <button
            onClick={() => setViewport("tablet")}
            className={`cursor-pointer flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition ${
              viewport === "tablet"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-white"
            }`}
          >
            <Tablet className="w-4 h-4" /> Tablet
          </button>
          <button
            onClick={() => setViewport("mobile")}
            className={`cursor-pointer flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition ${
              viewport === "mobile"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-white"
            }`}
          >
            <Smartphone className="w-4 h-4" /> Mobile
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div
        className={`rounded-2xl border border-gray-100 bg-white p-4 shadow-3xl ${CANVAS_HEIGHT_CLASS} flex items-stretch justify-center`}
      >
        <div
          className={`${viewportWidthClass[viewport]} h-full overflow-y-auto`}
        >
          <div className="min-h-full px-3 md:px-4 pb-4">
            {viewport === "desktop" && <Desktop />}
            {viewport === "tablet" && <TabletView />}
            {viewport === "mobile" && <MobileView />}
          </div>
        </div>
      </div>
    </div>
  );
}
