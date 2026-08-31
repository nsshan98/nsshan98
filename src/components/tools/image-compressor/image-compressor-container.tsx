"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ImageItem, CompressionSettings } from "@/lib/image-compressor/types";
import {
  checkFormatSupport,
  prepareImageSource,
  compressSingleImage,
} from "@/lib/image-compressor/compressor-engine";
import UploadZone from "./upload-zone";
import SettingsPanel from "./settings-panel";
import SinglePreview from "./single-preview";
import BeforeAfterSlider from "./before-after-slider";
import BatchTable from "./batch-table";
import PrivacyBadge from "./privacy-badge";
import { Split, Eye } from "lucide-react";

export default function ImageCompressorContainer() {
  const [items, setItems] = useState<ImageItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"preview" | "slider">("slider");

  const [supportedMap, setSupportedMap] = useState<Record<string, boolean>>({
    "image/webp": true,
    "image/jpeg": true,
    "image/png": true,
    "image/avif": false,
    "image/bmp": true,
    "image/x-icon": true,
  });

  const [settings, setSettings] = useState<CompressionSettings>({
    quality: 80,
    targetSizeKb: null,
    maintainAspectRatio: true,
    width: null,
    height: null,
    preset: "original",
    outputFormat: "image/webp",
    removeMetadata: true,
  });

  // Detect client browser format support on mount
  useEffect(() => {
    checkFormatSupport().then((res) => {
      setSupportedMap(res);
    });
  }, []);

  // Get active image item
  const activeItem = items.find((i) => i.id === activeId) || items[0] || null;

  // Process a single image item through compression pipeline
  const processItem = useCallback(
    async (item: ImageItem, currentSettings: CompressionSettings) => {
      try {
        setItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, status: "processing" } : i))
        );

        const result = await compressSingleImage(item.file, currentSettings, supportedMap);

        const compressedUrl = URL.createObjectURL(result.blob);
        const compressedSize = result.blob.size;
        const savedBytes = Math.max(0, item.originalSize - compressedSize);
        const reductionPercent =
          item.originalSize > 0 ? (savedBytes / item.originalSize) * 100 : 0;

        setItems((prev) =>
          prev.map((i) => {
            if (i.id === item.id) {
              // Revoke old object URL if exists to avoid memory leak
              if (i.compressedUrl) {
                URL.revokeObjectURL(i.compressedUrl);
              }
              return {
                ...i,
                compressedBlob: result.blob,
                compressedUrl: compressedUrl,
                compressedSize: compressedSize,
                compressedWidth: result.width,
                compressedHeight: result.height,
                savedBytes: savedBytes,
                reductionPercent: reductionPercent,
                status: "done",
              };
            }
            return i;
          })
        );
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : "Failed to compress";
        console.error("Compression error for file:", item.originalName, err);
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? { ...i, status: "error", error: errorMsg }
              : i
          )
        );
      }
    },
    [supportedMap]
  );

  // Debounced re-compression trigger whenever settings change or items added
  const settingsTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    if (settingsTimerRef.current) {
      clearTimeout(settingsTimerRef.current);
    }

    settingsTimerRef.current = setTimeout(() => {
      items.forEach((item) => {
        processItem(item, settings);
      });
    }, 150);

    return () => {
      if (settingsTimerRef.current) {
        clearTimeout(settingsTimerRef.current);
      }
    };
  }, [settings, items, processItem]);

  // File upload handler
  const handleFilesSelected = async (files: File[]) => {
    const newItems: ImageItem[] = [];

    for (const file of files) {
      const id = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      const originalUrl = URL.createObjectURL(file);

      let width = 800;
      let height = 600;

      try {
        const prep = await prepareImageSource(file);
        width = prep.width;
        height = prep.height;
      } catch (err) {
        console.warn("Failed to load dimensions for file:", file.name, err);
      }

      const item: ImageItem = {
        id,
        file,
        originalName: file.name,
        originalSize: file.size,
        originalType: file.type || "image/jpeg",
        originalWidth: width,
        originalHeight: height,
        originalUrl,
        compressedUrl: null,
        compressedBlob: null,
        compressedSize: null,
        compressedWidth: null,
        compressedHeight: null,
        status: "idle",
        reductionPercent: null,
        savedBytes: null,
      };

      newItems.push(item);
    }

    setItems((prev) => [...prev, ...newItems]);
    if (!activeId && newItems.length > 0) {
      setActiveId(newItems[0].id);
    }
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => {
      const itemToRemove = prev.find((i) => i.id === id);
      if (itemToRemove) {
        if (itemToRemove.originalUrl) URL.revokeObjectURL(itemToRemove.originalUrl);
        if (itemToRemove.compressedUrl) URL.revokeObjectURL(itemToRemove.compressedUrl);
      }
      const updated = prev.filter((i) => i.id !== id);
      if (activeId === id) {
        setActiveId(updated.length > 0 ? updated[0].id : null);
      }
      return updated;
    });
  };

  const handleClearAll = () => {
    items.forEach((item) => {
      if (item.originalUrl) URL.revokeObjectURL(item.originalUrl);
      if (item.compressedUrl) URL.revokeObjectURL(item.compressedUrl);
    });
    setItems([]);
    setActiveId(null);
  };

  return (
    <div className="w-full space-y-8">
      {/* Privacy Guarantee Header Banner */}
      <PrivacyBadge />

      {/* Upload Zone (Visible when empty or as add button) */}
      {items.length === 0 ? (
        <UploadZone onFilesSelected={handleFilesSelected} />
      ) : (
        <div className="space-y-8">
          {/* Top Bar for Batch Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-100">
                Loaded {items.length} {items.length === 1 ? "Image" : "Images"}
              </span>
              <button
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.multiple = true;
                  input.accept = "image/*,.heic,.heif,.avif,.webp,.svg,.bmp,.tiff,.ico";
                  input.onchange = (e: Event) => {
                    const target = e.target as HTMLInputElement;
                    if (target?.files) {
                      handleFilesSelected(Array.from(target.files));
                    }
                  };
                  input.click();
                }}
                className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-semibold border border-cyan-500/20 transition-all"
              >
                + Add More Files
              </button>
            </div>

            {/* View Mode Switchers for Active Image */}
            {activeItem && activeItem.compressedUrl && (
              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setViewMode("slider")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    viewMode === "slider"
                      ? "bg-cyan-500 text-slate-950 font-bold shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Split className="w-3.5 h-3.5" />
                  <span>Before / After Slider</span>
                </button>

                <button
                  onClick={() => setViewMode("preview")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    viewMode === "preview"
                      ? "bg-cyan-500 text-slate-950 font-bold shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Side-by-Side Stats</span>
                </button>
              </div>
            )}
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Settings Panel & Batch Queue Table */}
            <div className="lg:col-span-5 space-y-6">
              <SettingsPanel
                settings={settings}
                onChange={setSettings}
                originalWidth={activeItem?.originalWidth}
                originalHeight={activeItem?.originalHeight}
                originalSize={activeItem?.originalSize}
                estimatedSize={activeItem?.compressedSize}
                supportedMap={supportedMap}
              />

              {items.length > 1 && (
                <BatchTable
                  items={items}
                  activeId={activeItem?.id || null}
                  onSelectActive={setActiveId}
                  onRemoveItem={handleRemoveItem}
                  onClearAll={handleClearAll}
                />
              )}
            </div>

            {/* Right Column: Visual Preview & Comparison */}
            <div className="lg:col-span-7 space-y-6">
              {activeItem && (
                <div className="space-y-6">
                  {viewMode === "slider" && activeItem.compressedUrl ? (
                    <div className="space-y-6">
                      <BeforeAfterSlider
                        originalUrl={activeItem.originalUrl}
                        compressedUrl={activeItem.compressedUrl}
                      />
                      <SinglePreview item={activeItem} />
                    </div>
                  ) : (
                    <SinglePreview item={activeItem} />
                  )}
                </div>
              )}

              {/* Single item batch table when only 1 item loaded */}
              {items.length === 1 && (
                <BatchTable
                  items={items}
                  activeId={activeItem?.id || null}
                  onSelectActive={setActiveId}
                  onRemoveItem={handleRemoveItem}
                  onClearAll={handleClearAll}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
