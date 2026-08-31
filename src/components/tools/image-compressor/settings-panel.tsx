"use client";

import React from "react";
import { CompressionSettings, FormatOption } from "@/lib/image-compressor/types";
import { formatBytes } from "@/lib/image-compressor/compressor-engine";
import { Sliders, Maximize2, FileType, Info, Check, Target } from "lucide-react";

interface SettingsPanelProps {
  settings: CompressionSettings;
  onChange: (newSettings: CompressionSettings) => void;
  originalWidth?: number;
  originalHeight?: number;
  originalSize?: number;
  estimatedSize?: number | null;
  supportedMap: Record<string, boolean>;
}

export default function SettingsPanel({
  settings,
  onChange,
  originalWidth,
  originalHeight,
  estimatedSize,
  supportedMap,
}: SettingsPanelProps) {
  const formatOptions: FormatOption[] = [
    {
      mime: "image/webp",
      label: "WebP",
      ext: ".webp",
      description: "Best web standard, high compression",
      isSupported: supportedMap["image/webp"] ?? true,
    },
    {
      mime: "original",
      label: "Original",
      ext: "same",
      description: "Keep source container format",
      isSupported: true,
    },
    {
      mime: "image/jpeg",
      label: "JPG / JPEG",
      ext: ".jpg",
      description: "Universal photo compatibility",
      isSupported: supportedMap["image/jpeg"] ?? true,
    },
    {
      mime: "image/png",
      label: "PNG",
      ext: ".png",
      description: "Lossless transparency",
      isSupported: supportedMap["image/png"] ?? true,
    },
    {
      mime: "image/avif",
      label: "AVIF",
      ext: ".avif",
      description: "Next-gen ultra efficient format",
      isSupported: supportedMap["image/avif"] ?? false,
    },
    {
      mime: "image/bmp",
      label: "BMP",
      ext: ".bmp",
      description: "Uncompressed bitmap graphics",
      isSupported: supportedMap["image/bmp"] ?? true,
    },
    {
      mime: "image/x-icon",
      label: "ICO",
      ext: ".ico",
      description: "Icon & favicon format",
      isSupported: supportedMap["image/x-icon"] ?? true,
    },
  ];

  const presets = [
    { label: "Original", value: "original" },
    { label: "4096 px", value: "4096" },
    { label: "2048 px", value: "2048" },
    { label: "1920 px", value: "1920" },
    { label: "1280 px", value: "1280" },
    { label: "1024 px", value: "1024" },
    { label: "800 px", value: "800" },
  ];

  const handleWidthChange = (w: number | null) => {
    let h = settings.height;
    if (w && settings.maintainAspectRatio && originalWidth && originalHeight) {
      h = Math.round((originalHeight * w) / originalWidth);
    }
    onChange({ ...settings, width: w, height: h, preset: "custom" });
  };

  const handleHeightChange = (h: number | null) => {
    let w = settings.width;
    if (h && settings.maintainAspectRatio && originalWidth && originalHeight) {
      w = Math.round((originalWidth * h) / originalHeight);
    }
    onChange({ ...settings, width: w, height: h, preset: "custom" });
  };

  const handlePresetSelect = (presetVal: string) => {
    if (presetVal === "original") {
      onChange({
        ...settings,
        preset: "original",
        width: originalWidth || null,
        height: originalHeight || null,
      });
    } else {
      const presetW = parseInt(presetVal, 10);
      let presetH = null;
      if (originalWidth && originalHeight && !isNaN(presetW)) {
        presetH = Math.round((originalHeight * presetW) / originalWidth);
      }
      onChange({
        ...settings,
        preset: presetVal,
        width: presetW,
        height: presetH,
      });
    }
  };

  return (
    <div className="w-full rounded-2xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 space-y-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <Sliders className="w-5 h-5 text-cyan-400" />
          <h3 className="text-base font-bold text-slate-100">Compression Settings</h3>
        </div>
        <span className="text-xs text-slate-400 font-mono">Real-time update</span>
      </div>

      {/* Mode Switch: Quality vs Target File Size */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold text-slate-200">
              Compress to Target File Size
            </span>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.targetSizeKb !== null}
              onChange={(e) => {
                const enable = e.target.checked;
                onChange({
                  ...settings,
                  targetSizeKb: enable ? 500 : null,
                });
              }}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
          </label>
        </div>

        {settings.targetSizeKb !== null ? (
          <div className="space-y-2 pt-2 border-t border-slate-800/80 animate-in fade-in">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Target size:</span>
              <div className="relative flex-1 max-w-[180px]">
                <input
                  type="number"
                  min="10"
                  max="100000"
                  value={settings.targetSizeKb}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    onChange({
                      ...settings,
                      targetSizeKb: isNaN(val) ? 500 : Math.max(10, val),
                    });
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 font-mono text-sm focus:border-cyan-400 focus:outline-none pr-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                  KB
                </span>
              </div>
            </div>

            <p className="text-[11px] text-amber-400/90 leading-relaxed bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
              ⭐ <strong>Best-Effort Iteration:</strong> Automatically adjusts quality parameters (and resolution scaling if necessary) to compress your image to under ~{settings.targetSizeKb} KB.
            </p>
          </div>
        ) : (
          /* Standard Quality Slider */
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-300">Encoder Quality</label>
              <span className="font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                {settings.quality}%
              </span>
            </div>

            <input
              type="range"
              min="1"
              max="100"
              value={settings.quality}
              onChange={(e) =>
                onChange({ ...settings, quality: parseInt(e.target.value, 10) })
              }
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />

            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>0% (Lowest)</span>
              <span>80% (Default)</span>
              <span>100% (Lossless / High)</span>
            </div>

            <div className="flex items-start gap-1.5 text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-800">
              <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>Note:</strong> Quality = encoder parameter (not linear file size reduction %).
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Resize Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Maximize2 className="w-4 h-4 text-purple-400" />
            <h4 className="text-sm font-semibold text-slate-200">Resize Dimensions</h4>
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.maintainAspectRatio}
              onChange={(e) =>
                onChange({ ...settings, maintainAspectRatio: e.target.checked })
              }
              className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
            />
            <span>Maintain aspect ratio</span>
          </label>
        </div>

        {/* Presets Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          {presets.map((p) => {
            const isSelected = settings.preset === p.value;
            return (
              <button
                key={p.value}
                onClick={() => handlePresetSelect(p.value)}
                className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all ${
                  isSelected
                    ? "bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-sm"
                    : "bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Custom Width / Height Inputs */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Width (px)</label>
            <input
              type="number"
              min="1"
              placeholder={originalWidth ? `${originalWidth}` : "2000"}
              value={settings.width || ""}
              onChange={(e) =>
                handleWidthChange(e.target.value ? parseInt(e.target.value, 10) : null)
              }
              className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:border-purple-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Height (px)</label>
            <input
              type="number"
              min="1"
              placeholder={originalHeight ? `${originalHeight}` : "1500"}
              value={settings.height || ""}
              onChange={(e) =>
                handleHeightChange(e.target.value ? parseInt(e.target.value, 10) : null)
              }
              className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:border-purple-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Output Format Selector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileType className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-semibold text-slate-200">Output Format</h4>
          </div>

          {estimatedSize && (
            <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              ~ Estimated {formatBytes(estimatedSize)}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {formatOptions.map((opt) => {
            const isSelected = settings.outputFormat === opt.mime;
            return (
              <button
                key={opt.mime}
                disabled={!opt.isSupported}
                onClick={() => onChange({ ...settings, outputFormat: opt.mime })}
                className={`flex flex-col items-start p-2.5 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? "bg-cyan-500/15 border-cyan-500/60 shadow-md shadow-cyan-500/10"
                    : opt.isSupported
                    ? "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                    : "bg-slate-950/30 border-slate-900 opacity-40 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold text-slate-100">{opt.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                  {opt.isSupported ? opt.description : "Unsupported in browser"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* EXIF Metadata Toggle */}
      <div className="pt-2 border-t border-slate-800">
        <label className="flex items-center justify-between cursor-pointer p-2 rounded-xl hover:bg-slate-950/40 transition-colors">
          <div className="flex items-center gap-2.5">
            <input
              type="checkbox"
              checked={settings.removeMetadata}
              onChange={(e) =>
                onChange({ ...settings, removeMetadata: e.target.checked })
              }
              className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
            />
            <div>
              <span className="text-xs font-semibold text-slate-200">Remove EXIF Metadata</span>
              <p className="text-[11px] text-slate-400">
                Strips GPS, camera info & date/time while preserving orientation
              </p>
            </div>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
            Default ON
          </span>
        </label>
      </div>
    </div>
  );
}
