"use client";

import React, { useState, useMemo, useCallback } from "react";
import { JsonEditor } from "./json-editor";
import { MinifierStats } from "./minifier-stats";
import { TsOptionsBar } from "./ts-options-bar";
import { validateJson, JsonValidationResult } from "@/lib/tools/json-validator";
import { jsonToTypeScript, DEFAULT_TS_OPTIONS, TsGeneratorOptions } from "@/lib/tools/json-to-ts";
import {
  AlignLeft,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Download,
  Trash2,
  Sparkles,
  Zap,
  Code2,
  FileJson,
  Check,
} from "lucide-react";
import { toast } from "sonner";

export type ToolkitTab = "formatter" | "validator" | "minifier" | "typescript";

const SAMPLE_JSON = `{
  "id": 101,
  "name": "Nazmus Sakib",
  "email": "sakib@example.com",
  "role": "admin",
  "active": true,
  "roles": ["admin", "developer", "creator"],
  "stats": {
    "projects": 12,
    "rating": 4.9,
    "contributions": 340
  },
  "preferences": {
    "theme": "dark",
    "notifications": true,
    "language": "en"
  },
  "lastLogin": null
}`;

export function JsonToolkitContainer() {
  const [activeTab, setActiveTab] = useState<ToolkitTab>("formatter");
  const [inputJson, setInputJson] = useState<string>(SAMPLE_JSON);
  const [indentSpacing, setIndentSpacing] = useState<number | "tab">(2);
  const [sortKeys, setSortKeys] = useState<boolean>(false);
  const [tsOptions, setTsOptions] = useState<TsGeneratorOptions>(DEFAULT_TS_OPTIONS);
  const [copied, setCopied] = useState<boolean>(false);

  // Real-time JSON validation
  const validation: JsonValidationResult = useMemo(() => {
    return validateJson(inputJson);
  }, [inputJson]);

  // Format Helper
  const formattedOutput = useMemo(() => {
    if (!inputJson.trim()) return "";
    if (!validation.isValid || validation.parsedData === undefined) return inputJson;

    try {
      const parsed = validation.parsedData;
      const space = indentSpacing === "tab" ? "\t" : indentSpacing;

      if (sortKeys && parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        const sorted = sortJsonObjectKeys(parsed);
        return JSON.stringify(sorted, null, space);
      }

      return JSON.stringify(parsed, null, space);
    } catch {
      return inputJson;
    }
  }, [inputJson, validation.isValid, validation.parsedData, indentSpacing, sortKeys]);

  // Minified Helper
  const minifiedOutput = useMemo(() => {
    if (!inputJson.trim()) return "";
    if (!validation.isValid || validation.parsedData === undefined) return inputJson;

    try {
      return JSON.stringify(validation.parsedData);
    } catch {
      return inputJson;
    }
  }, [inputJson, validation.isValid, validation.parsedData]);

  // TypeScript Code Generator Output
  const typescriptOutput = useMemo(() => {
    if (!inputJson.trim()) return "// Paste JSON to generate TypeScript definitions";
    if (!validation.isValid) return `// Error: Invalid JSON input\n// ${validation.error?.message}`;

    try {
      return jsonToTypeScript(validation.parsedData || inputJson, tsOptions);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to generate TypeScript types";
      return `// Error generating TypeScript:\n// ${msg}`;
    }
  }, [inputJson, validation.isValid, validation.parsedData, validation.error, tsOptions]);

  // Active Output Panel Content
  const outputContent = useMemo(() => {
    switch (activeTab) {
      case "formatter":
        return formattedOutput;
      case "validator":
        return validation.isValid
          ? `// ✓ Valid ${
              validation.formatDetected === "firestore_dump"
                ? "Firestore Dump (Converted to JSON)"
                : validation.formatDetected === "devtools_dump"
                ? "DevTools Object Dump (Converted to JSON)"
                : "JSON Payload"
            }\n\n${formattedOutput}`
          : `// ✕ Invalid JSON Payload\n// ${validation.error?.message}\n\n${inputJson}`;
      case "minifier":
        return minifiedOutput;
      case "typescript":
        return typescriptOutput;
      default:
        return formattedOutput;
    }
  }, [activeTab, formattedOutput, minifiedOutput, typescriptOutput, validation, inputJson]);

  // Actions
  const handleClear = () => {
    setInputJson("");
    toast.info("Editor cleared");
  };

  const handleLoadSample = () => {
    setInputJson(SAMPLE_JSON);
    toast.success("Loaded sample JSON");
  };

  const handleCopyOutput = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(outputContent);
      setCopied(true);
      toast.success("Output copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy output");
    }
  }, [outputContent]);

  const handleDownloadOutput = () => {
    const isTs = activeTab === "typescript";
    const extension = isTs ? ".ts" : ".json";
    const mimeType = isTs ? "text/typescript" : "application/json";

    const blob = new Blob([outputContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `output${extension}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded output${extension}`);
  };

  // Minifier Stats Calculation
  const originalBytes = useMemo(() => new Blob([inputJson]).size, [inputJson]);
  const minifiedBytes = useMemo(() => new Blob([minifiedOutput]).size, [minifiedOutput]);

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      {/* Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <FileJson className="w-6 h-6 text-cyan-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-white to-cyan-400">
              JSON Toolkit
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Format, validate, minify JSON, and generate TypeScript interfaces in real time.
          </p>
        </div>

        {/* Global Toolbar Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleLoadSample}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-all border border-slate-700/50"
            title="Load sample JSON"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Load Sample</span>
          </button>

          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-red-500/20 hover:text-red-300 text-slate-300 text-xs font-medium transition-all border border-slate-700/50"
            title="Clear editor"
          >
            <Trash2 className="w-3.5 h-3.5 text-slate-400 hover:text-red-400" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Primary Module Tabs */}
      <div className="flex items-center bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab("formatter")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
            activeTab === "formatter"
              ? "bg-cyan-500 text-slate-950 shadow-md"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <AlignLeft className="w-4 h-4" />
          <span>Formatter</span>
        </button>

        <button
          onClick={() => setActiveTab("validator")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
            activeTab === "validator"
              ? "bg-cyan-500 text-slate-950 shadow-md"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Validator</span>
        </button>

        <button
          onClick={() => setActiveTab("minifier")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
            activeTab === "minifier"
              ? "bg-cyan-500 text-slate-950 shadow-md"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Minifier</span>
        </button>

        <button
          onClick={() => setActiveTab("typescript")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
            activeTab === "typescript"
              ? "bg-cyan-500 text-slate-950 shadow-md"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>TypeScript Generator</span>
        </button>
      </div>

      {/* Tab Specific Option Controls */}
      {activeTab === "formatter" && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-medium">Indentation:</span>
            <select
              value={indentSpacing}
              onChange={(e) => {
                const val = e.target.value;
                setIndentSpacing(val === "tab" ? "tab" : parseInt(val, 10));
              }}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 outline-none focus:border-cyan-500/60"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value="tab">Tab</option>
            </select>
          </div>

          <label className="flex items-center gap-2 cursor-pointer hover:text-slate-100">
            <input
              type="checkbox"
              checked={sortKeys}
              onChange={(e) => setSortKeys(e.target.checked)}
              className="accent-cyan-500 rounded cursor-pointer"
            />
            <span>Sort keys alphabetically</span>
          </label>
        </div>
      )}

      {activeTab === "minifier" && (
        <MinifierStats originalBytes={originalBytes} minifiedBytes={minifiedBytes} />
      )}

      {activeTab === "typescript" && (
        <TsOptionsBar options={tsOptions} onChange={setTsOptions} />
      )}

      {/* Main Split Editor Panel (Desktop: Side-by-Side, Mobile: Stacked) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* INPUT PANEL */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              INPUT JSON
            </span>

            {/* Validation Badge */}
            {inputJson.trim() && (
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                  validation.isValid
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    : "bg-red-500/10 text-red-400 border-red-500/30"
                }`}
              >
                {validation.isValid ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>
                      {validation.formatDetected === "firestore_dump"
                        ? "Firestore Dump (Converted)"
                        : validation.formatDetected === "devtools_dump"
                        ? "DevTools JS Object (Converted)"
                        : "Valid JSON"}
                    </span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    <span>Invalid JSON</span>
                  </>
                )}
              </div>
            )}
          </div>

          <JsonEditor
            value={inputJson}
            onChange={setInputJson}
            language="json"
            errorLine={validation.error?.line}
            placeholder="Paste your JSON snippet here..."
          />

          {/* Validation Error Banner */}
          {!validation.isValid && validation.error && (
            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-200">JSON Syntax Error</p>
                <p className="font-mono text-[11px] mt-0.5 opacity-90">{validation.error.message}</p>
              </div>
            </div>
          )}
        </div>

        {/* OUTPUT PANEL */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              {activeTab === "typescript" ? "TYPESCRIPT OUTPUT" : "PROCESSED OUTPUT"}
            </span>

            {/* Output Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyOutput}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-cyan-300 transition-all"
                title="Copy Output"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadOutput}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-cyan-300 transition-all"
                title="Download Output File"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Download</span>
              </button>
            </div>
          </div>

          <JsonEditor
            value={outputContent}
            readOnly={true}
            language={activeTab === "typescript" ? "typescript" : "json"}
            placeholder="Processed output will appear here..."
          />
        </div>
      </div>
    </div>
  );
}

function sortJsonObjectKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(sortJsonObjectKeys);
  }
  if (obj !== null && typeof obj === "object") {
    return Object.keys(obj)
      .sort()
      .reduce((acc: Record<string, unknown>, key: string) => {
        acc[key] = sortJsonObjectKeys((obj as Record<string, unknown>)[key]);
        return acc;
      }, {});
  }
  return obj;
}
