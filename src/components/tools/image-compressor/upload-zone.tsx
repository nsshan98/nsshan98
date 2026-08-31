"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, Sparkles } from "lucide-react";

interface UploadZoneProps {
  onFilesSelected: (files: File[]) => void;
  isProcessing?: boolean;
}

export default function UploadZone({ onFilesSelected }: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);
      onFilesSelected(filesArray);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      onFilesSelected(filesArray);
      // Reset input value so re-selecting same file works
      e.target.value = "";
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`relative group cursor-pointer w-full rounded-2xl border-2 border-dashed transition-all duration-300 p-8 sm:p-12 text-center flex flex-col items-center justify-center overflow-hidden ${
        isDragOver
          ? "border-cyan-400 bg-cyan-500/10 shadow-2xl shadow-cyan-500/20 scale-[1.01]"
          : "border-slate-800 bg-slate-900/40 hover:border-cyan-500/50 hover:bg-slate-900/70 shadow-lg shadow-slate-950/40"
      }`}
    >
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,.heic,.heif,.avif,.webp,.svg,.bmp,.tiff,.ico"
        onChange={handleFileInputChange}
        className="hidden"
      />

      <div className="relative z-10 flex flex-col items-center space-y-4">
        {/* Animated Icon Container */}
        <div
          className={`p-4 rounded-2xl transition-all duration-300 ${
            isDragOver
              ? "bg-cyan-500 text-slate-950 scale-110 rotate-6"
              : "bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 group-hover:scale-105"
          }`}
        >
          <UploadCloud className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
            Drop images here
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            or{" "}
            <span className="text-cyan-400 font-semibold underline underline-offset-4 group-hover:text-cyan-300">
              Browse Files
            </span>{" "}
            from your computer
          </p>
        </div>

        {/* Format Badges */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 max-w-xl">
          {[
            "JPG",
            "PNG",
            "WebP",
            "AVIF",
            "HEIC (iPhone)",
            "GIF",
            "SVG",
            "BMP",
            "ICO",
            "TIFF",
          ].map((fmt) => (
            <span
              key={fmt}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-400 border border-slate-700/50 group-hover:border-slate-700 transition-colors"
            >
              {fmt}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Batch upload supported • Multi-core processing • Zero file size limit</span>
        </div>
      </div>
    </div>
  );
}
