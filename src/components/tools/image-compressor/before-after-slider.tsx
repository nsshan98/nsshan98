"use client";

import React, { useState, useRef, useCallback } from "react";
import { MoveHorizontal } from "lucide-react";

interface BeforeAfterSliderProps {
  originalUrl: string;
  compressedUrl: string;
  originalLabel?: string;
  compressedLabel?: string;
}

export default function BeforeAfterSlider({
  originalUrl,
  compressedUrl,
  originalLabel = "ORIGINAL",
  compressedLabel = "COMPRESSED",
}: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs font-semibold px-1">
        <span className="text-slate-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-slate-400" />
          {originalLabel}
        </span>
        <span className="text-cyan-400 font-mono text-[11px]">
          Drag slider to compare ({Math.round(sliderPos)}%)
        </span>
        <span className="text-cyan-400 flex items-center gap-1.5">
          {compressedLabel}
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
        </span>
      </div>

      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[320px] sm:h-[420px] rounded-2xl overflow-hidden select-none cursor-ew-resize bg-slate-950 border border-slate-800 shadow-2xl"
      >
        {/* Compressed Background Image (Right / Bottom layer) */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-checkerboard">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={compressedUrl}
            alt="Compressed Preview"
            className="w-full h-full object-contain pointer-events-none"
          />
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur border border-slate-700/60 text-[10px] font-bold text-cyan-400 shadow">
            {compressedLabel}
          </div>
        </div>

        {/* Original Foreground Image (Left layer clipped by slider position) */}
        <div
          className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden bg-checkerboard"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={originalUrl}
            alt="Original Preview"
            className="w-full h-full object-contain pointer-events-none"
          />
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur border border-slate-700/60 text-[10px] font-bold text-slate-300 shadow">
            {originalLabel}
          </div>
        </div>

        {/* Central Divider Bar & Drag Button */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/80 backdrop-blur shadow-[0_0_12px_rgba(255,255,255,0.8)] pointer-events-none transition-all"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900 border-2 border-white shadow-xl flex items-center justify-center text-cyan-400">
            <MoveHorizontal className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
