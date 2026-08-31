"use client";

import React, { useState } from "react";
import { ShieldCheck, Cpu, Zap, Lock, ChevronDown, ChevronUp } from "lucide-react";

export default function PrivacyBadge() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="w-full rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md p-4 sm:p-5 mb-8 shadow-lg shadow-cyan-950/20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-100">
                100% Client-Side Privacy Guarantee
              </h3>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Zero Uploads
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Your images are resized & compressed directly in your browser. Files never leave your device.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-medium transition-colors border border-slate-700/60"
        >
          <span>{showDetails ? "Hide Architecture" : "View Architecture"}</span>
          {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {showDetails && (
        <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3 animate-in fade-in duration-200">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs font-mono text-cyan-300/90 overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max text-slate-400">
              <span className="px-2 py-1 rounded bg-slate-800 text-cyan-400 font-sans font-medium">User Browser</span>
              <span>→</span>
              <span className="px-2 py-1 rounded bg-slate-800 text-slate-200 font-sans">Image File</span>
              <span>→</span>
              <span className="px-2 py-1 rounded bg-slate-800 text-amber-300 font-sans">Canvas / ImageBitmap</span>
              <span>→</span>
              <span className="px-2 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-sans">Compression Engine</span>
              <span>→</span>
              <span className="px-2 py-1 rounded bg-slate-800 text-emerald-400 font-sans">Blob</span>
              <span>→</span>
              <span className="px-2 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-sans">Download</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/40 text-slate-300 border border-slate-800/60">
              <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Complete Data Privacy</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/40 text-slate-300 border border-slate-800/60">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Zero Network Latency</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/40 text-slate-300 border border-slate-800/60">
              <Cpu className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Multi-threaded Offloading</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
