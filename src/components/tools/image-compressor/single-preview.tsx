"use client";

import React from "react";
import { ImageItem } from "@/lib/image-compressor/types";
import { formatBytes } from "@/lib/image-compressor/compressor-engine";
import { triggerBlobDownload } from "@/lib/image-compressor/zip-utils";
import { Download, Sparkles } from "lucide-react";

interface SinglePreviewProps {
  item: ImageItem;
}

export default function SinglePreview({ item }: SinglePreviewProps) {
  const isDone = item.status === "done" && item.compressedBlob;
  const hasCompressedImage = Boolean(item.compressedUrl && item.compressedBlob);

  const handleDownload = () => {
    if (item.compressedBlob) {
      const baseNameWithoutExt = item.originalName.replace(/\.[^/.]+$/, "");
      const mime = item.compressedBlob.type || "image/jpeg";
      let ext = ".jpg";
      if (mime === "image/webp") ext = ".webp";
      else if (mime === "image/png") ext = ".png";
      else if (mime === "image/avif") ext = ".avif";
      else if (mime === "image/bmp") ext = ".bmp";
      else if (mime === "image/x-icon") ext = ".ico";

      triggerBlobDownload(item.compressedBlob, `${baseNameWithoutExt}_compressed${ext}`);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Side-by-Side Original vs Compressed Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Original Card */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Original Image
            </span>
            <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
              {item.originalType.replace("image/", "").toUpperCase()}
            </span>
          </div>

          <div className="h-48 sm:h-56 rounded-xl bg-slate-950 border border-slate-800/80 overflow-hidden flex items-center justify-center relative p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.originalUrl}
              alt="Original"
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-300 pt-1">
            <div>
              <span className="text-slate-500 block text-[10px]">FILE SIZE</span>
              <span className="font-bold text-slate-200">{formatBytes(item.originalSize)}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block text-[10px]">RESOLUTION</span>
              <span className="font-bold text-slate-200">
                {item.originalWidth} × {item.originalHeight} px
              </span>
            </div>
          </div>
        </div>

        {/* Compressed Card */}
        <div className="rounded-2xl bg-slate-900/60 border border-cyan-500/30 p-4 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Compressed Output
            </span>
            {item.compressedBlob && (
              <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                {item.compressedBlob.type.replace("image/", "").toUpperCase()}
              </span>
            )}
          </div>

          <div className="h-48 sm:h-56 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center relative p-2">
            {hasCompressedImage ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.compressedUrl || ""}
                  alt="Compressed"
                  className="max-h-full max-w-full object-contain"
                />
                {item.status === "processing" && (
                  <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[1px] flex flex-col items-center justify-center space-y-2">
                    <div className="w-7 h-7 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                    <span className="text-xs text-cyan-400 font-medium">Updating...</span>
                  </div>
                )}
              </>
            ) : item.status === "processing" ? (
              <div className="flex flex-col items-center space-y-2">
                <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                <span className="text-xs text-cyan-400 font-medium">Compressing...</span>
              </div>
            ) : (
              <span className="text-xs text-slate-500">Waiting for processing...</span>
            )}
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-300 pt-1">
            <div>
              <span className="text-slate-500 block text-[10px]">FILE SIZE</span>
              <span className="font-bold text-cyan-400">
                {item.compressedSize ? formatBytes(item.compressedSize) : "--"}
              </span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block text-[10px]">RESOLUTION</span>
              <span className="font-bold text-slate-200">
                {item.compressedWidth && item.compressedHeight
                  ? `${item.compressedWidth} × ${item.compressedHeight} px`
                  : "--"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reduction Statistics Summary Banner */}
      {isDone && item.compressedSize !== null && item.savedBytes !== null && (
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-lg space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Original
              </span>
              <span className="text-base font-bold font-mono text-slate-200">
                {formatBytes(item.originalSize)}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Compressed
              </span>
              <span className="text-base font-bold font-mono text-cyan-400">
                {formatBytes(item.compressedSize)}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Saved Size
              </span>
              <span className="text-base font-bold font-mono text-emerald-400">
                {formatBytes(item.savedBytes)}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider block">
                Reduction
              </span>
              <span className="text-lg font-black font-mono text-emerald-400">
                {item.reductionPercent?.toFixed(1)}%
              </span>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-sm hover:from-cyan-400 hover:to-emerald-400 transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            <span>Download Compressed Image</span>
          </button>
        </div>
      )}
    </div>
  );
}
