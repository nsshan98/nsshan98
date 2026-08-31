"use client";

import React from "react";
import { TsGeneratorOptions } from "@/lib/tools/json-to-ts";
import { Settings2, Code, FileCode } from "lucide-react";

interface TsOptionsBarProps {
  options: TsGeneratorOptions;
  onChange: (newOpts: TsGeneratorOptions) => void;
}

export const TsOptionsBar: React.FC<TsOptionsBarProps> = ({ options, onChange }) => {
  return (
    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3.5 text-xs text-slate-300 select-none">
      <div className="flex items-center gap-2 text-cyan-400 font-semibold border-b border-slate-800 pb-2">
        <Settings2 className="w-4 h-4 text-cyan-400" />
        <span>TypeScript Generator Options</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Type Style Selector */}
        <div className="space-y-1.5">
          <label className="text-slate-400 font-medium text-[11px] block">Type Declaration Style</label>
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => onChange({ ...options, style: "interface" })}
              className={`flex-1 flex items-center justify-center gap-1 py-1 rounded-md text-xs font-medium transition-all ${
                options.style === "interface"
                  ? "bg-cyan-500 text-slate-950 font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>interface</span>
            </button>
            <button
              onClick={() => onChange({ ...options, style: "type" })}
              className={`flex-1 flex items-center justify-center gap-1 py-1 rounded-md text-xs font-medium transition-all ${
                options.style === "type"
                  ? "bg-cyan-500 text-slate-950 font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>type</span>
            </button>
          </div>
        </div>

        {/* Root Type Name */}
        <div className="space-y-1.5">
          <label className="text-slate-400 font-medium text-[11px] block">Root Type Name</label>
          <input
            type="text"
            value={options.rootName}
            onChange={(e) => onChange({ ...options, rootName: e.target.value })}
            placeholder="Root"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500/60"
          />
        </div>

        {/* Checkbox Options Column 1 */}
        <div className="space-y-2 pt-1">
          <label className="flex items-center gap-2 cursor-pointer hover:text-slate-100">
            <input
              type="checkbox"
              checked={options.exportTypes}
              onChange={(e) => onChange({ ...options, exportTypes: e.target.checked })}
              className="accent-cyan-500 rounded cursor-pointer"
            />
            <span>Export types (`export`)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer hover:text-slate-100">
            <input
              type="checkbox"
              checked={options.generateNested}
              onChange={(e) => onChange({ ...options, generateNested: e.target.checked })}
              className="accent-cyan-500 rounded cursor-pointer"
            />
            <span>Generate nested interfaces</span>
          </label>
        </div>

        {/* Checkbox Options Column 2 */}
        <div className="space-y-2 pt-1">
          <label className="flex items-center gap-2 cursor-pointer hover:text-slate-100">
            <input
              type="checkbox"
              checked={options.optionalProps}
              onChange={(e) => onChange({ ...options, optionalProps: e.target.checked })}
              className="accent-cyan-500 rounded cursor-pointer"
            />
            <span>Optional properties (`key?`)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer hover:text-slate-100">
            <input
              type="checkbox"
              checked={options.readonlyProps}
              onChange={(e) => onChange({ ...options, readonlyProps: e.target.checked })}
              className="accent-cyan-500 rounded cursor-pointer"
            />
            <span>Readonly properties (`readonly`)</span>
          </label>
        </div>
      </div>
    </div>
  );
};
