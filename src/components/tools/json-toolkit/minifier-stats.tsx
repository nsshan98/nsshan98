"use client";

import React from "react";
import { ArrowDownRight, Zap, HardDrive } from "lucide-react";

interface MinifierStatsProps {
  originalBytes: number;
  minifiedBytes: number;
}

export const MinifierStats: React.FC<MinifierStatsProps> = ({
  originalBytes,
  minifiedBytes,
}) => {
  if (originalBytes === 0) return null;

  const savedBytes = Math.max(0, originalBytes - minifiedBytes);
  const percentage = originalBytes > 0 ? ((savedBytes / originalBytes) * 100).toFixed(1) : "0";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs select-none">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-slate-400">
          <HardDrive className="w-3.5 h-3.5 text-slate-500" />
          <span>Original:</span>
          <span className="font-mono text-slate-200 font-semibold">{formatBytes(originalBytes)}</span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-400">
          <ArrowDownRight className="w-3.5 h-3.5 text-cyan-400" />
          <span>Minified:</span>
          <span className="font-mono text-cyan-300 font-semibold">{formatBytes(minifiedBytes)}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium">
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <span>Saved {formatBytes(savedBytes)} ({percentage}%)</span>
        </div>
      </div>
    </div>
  );
};

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
