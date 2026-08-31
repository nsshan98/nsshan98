"use client";

import React, { useState } from "react";
import { ImageItem } from "@/lib/image-compressor/types";
import { formatBytes } from "@/lib/image-compressor/compressor-engine";
import { createBatchZip, triggerBlobDownload } from "@/lib/image-compressor/zip-utils";
import { Download, Trash2, Archive, CheckCircle2, Loader2, Sparkles } from "lucide-react";

interface BatchTableProps {
  items: ImageItem[];
  activeId: string | null;
  onSelectActive: (id: string) => void;
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
}

export default function BatchTable({
  items,
  activeId,
  onSelectActive,
  onRemoveItem,
  onClearAll,
}: BatchTableProps) {
  const [isZipping, setIsZipping] = useState(false);

  const completedItems = items.filter((i) => i.status === "done" && i.compressedBlob);
  const totalOriginalBytes = items.reduce((acc, curr) => acc + curr.originalSize, 0);
  const totalCompressedBytes = completedItems.reduce(
    (acc, curr) => acc + (curr.compressedSize || 0),
    0
  );
  const totalSavedBytes = Math.max(0, totalOriginalBytes - totalCompressedBytes);
  const totalSavedPercent =
    totalOriginalBytes > 0 ? (totalSavedBytes / totalOriginalBytes) * 100 : 0;

  const handleDownloadAllZip = async () => {
    if (completedItems.length === 0) return;
    setIsZipping(true);
    try {
      const zipBlob = await createBatchZip(completedItems);
      triggerBlobDownload(zipBlob, "compressed_images.zip");
    } catch (err) {
      console.error("Failed to generate ZIP archive:", err);
    } finally {
      setIsZipping(false);
    }
  };

  const handleDownloadSingle = (e: React.MouseEvent, item: ImageItem) => {
    e.stopPropagation();
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
    <div className="w-full rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-4 shadow-xl backdrop-blur-md">
      {/* Header bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-slate-100 leading-tight">
              Batch Queue ({items.length} {items.length === 1 ? "Image" : "Images"})
            </h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
              {completedItems.length} Processed
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Click any row to preview comparison & edit settings
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onClearAll}
            className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors border border-slate-700/60 whitespace-nowrap"
          >
            Clear All
          </button>

          <button
            disabled={completedItems.length === 0 || isZipping}
            onClick={handleDownloadAllZip}
            className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/10 flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            {isZipping ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Archive className="w-4 h-4" />
            )}
            <span>Download All (ZIP)</span>
          </button>
        </div>
      </div>

      {/* Batch Stats Summary Banner */}
      {completedItems.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs font-mono">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-slate-500 text-[10px] block">TOTAL ORIGINAL</span>
              <span className="font-semibold text-slate-300">{formatBytes(totalOriginalBytes)}</span>
            </div>
            <span>→</span>
            <div>
              <span className="text-slate-500 text-[10px] block">TOTAL COMPRESSED</span>
              <span className="font-semibold text-cyan-400">{formatBytes(totalCompressedBytes)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-lg border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              Total Saved: <strong>{formatBytes(totalSavedBytes)}</strong> ({totalSavedPercent.toFixed(1)}%)
            </span>
          </div>
        </div>
      )}

      {/* Table List */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="py-3 px-4">Image Name</th>
              <th className="py-3 px-4">Original</th>
              <th className="py-3 px-4">Compressed</th>
              <th className="py-3 px-4">Saved</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {items.map((item) => {
              const isActive = item.id === activeId;
              const isItemDone = item.status === "done";
              const isProcessing = item.status === "processing";

              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectActive(item.id)}
                  className={`cursor-pointer transition-colors ${
                    isActive
                      ? "bg-cyan-500/10 text-slate-100 font-medium"
                      : "hover:bg-slate-900/50 text-slate-300"
                  }`}
                >
                  <td className="py-3 px-4 max-w-[180px] sm:max-w-[240px] truncate">
                    <div className="flex items-center gap-2">
                      {isItemDone ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : isProcessing ? (
                        <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin shrink-0" />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0" />
                      )}
                      <span className="truncate">{item.originalName}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono text-slate-400">
                    {formatBytes(item.originalSize)}
                  </td>

                  <td className="py-3 px-4 font-mono">
                    {isItemDone && item.compressedSize ? (
                      <span className="text-cyan-400 font-semibold">
                        {formatBytes(item.compressedSize)}
                      </span>
                    ) : isProcessing ? (
                      <span className="text-cyan-400/80 animate-pulse">Processing...</span>
                    ) : (
                      <span className="text-slate-500">--</span>
                    )}
                  </td>

                  <td className="py-3 px-4 font-mono">
                    {isItemDone && item.reductionPercent !== null ? (
                      <span className="text-emerald-400 font-bold">
                        {item.reductionPercent > 0
                          ? `${item.reductionPercent.toFixed(1)}%`
                          : "0%"}
                      </span>
                    ) : (
                      <span className="text-slate-500">--</span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {isItemDone && (
                        <button
                          onClick={(e) => handleDownloadSingle(e, item)}
                          className="p-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 transition-colors"
                          title="Download single file"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveItem(item.id);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                        title="Remove image from queue"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
