"use client";

import React, { useState } from "react";
import {
  FileText,
  FolderOpen,
  Clipboard,
  Columns,
  Eye,
  Edit3,
  List,
  Search,
  RefreshCw,
  Download,
  Printer,
  HelpCircle,
  X,
} from "lucide-react";

export type ViewMode = "preview" | "split" | "editor";

interface ToolbarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onOpenFile: () => void;
  onOpenFolder: () => void;
  onPasteClipboard: () => void;
  isTocOpen: boolean;
  onToggleToc: () => void;
  isWorkspaceOpen: boolean;
  onToggleWorkspace: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  autoReload: boolean;
  onToggleAutoReload: () => void;
  onExportHtml: () => void;
  onExportPdf: () => void;
  onExportMd: () => void;
  fileName?: string;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  viewMode,
  onViewModeChange,
  onOpenFile,
  onOpenFolder,
  onPasteClipboard,
  isTocOpen,
  onToggleToc,
  isWorkspaceOpen,
  onToggleWorkspace,
  searchQuery,
  onSearchChange,
  autoReload,
  onToggleAutoReload,
  onExportHtml,
  onExportPdf,
  onExportMd,
  fileName = "Untitled.md",
}) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <>
      <header className="bg-slate-950/90 border-b border-slate-800/90 backdrop-blur-md sticky top-0 z-30 px-3 sm:px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-slate-200">
        {/* Left Section: File Info & Explorer Toggles */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleWorkspace}
            className={`p-2 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${
              isWorkspaceOpen
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
            title="Toggle Workspace Sidebar"
          >
            <FolderOpen className="w-4 h-4 text-cyan-400" />
            <span className="hidden md:inline">Files</span>
          </button>

          <button
            onClick={onToggleToc}
            className={`p-2 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${
              isTocOpen
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
            title="Toggle Table of Contents"
          >
            <List className="w-4 h-4 text-cyan-400" />
            <span className="hidden md:inline">TOC</span>
          </button>

          <div className="h-5 w-px bg-slate-800 mx-1 hidden sm:block" />

          {/* Active File Name Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 max-w-[200px] sm:max-w-xs truncate">
            <FileText className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs font-medium text-slate-200 truncate">{fileName}</span>
          </div>
        </div>

        {/* Center Section: View Mode Selector */}
        <div className="flex items-center bg-slate-900/90 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => onViewModeChange("preview")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === "preview"
                ? "bg-cyan-500 text-slate-950 shadow font-semibold"
                : "text-slate-400 hover:text-slate-200"
            }`}
            title="Preview Mode"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Preview</span>
          </button>

          <button
            onClick={() => onViewModeChange("split")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === "split"
                ? "bg-cyan-500 text-slate-950 shadow font-semibold"
                : "text-slate-400 hover:text-slate-200"
            }`}
            title="Split Mode (Editor + Preview)"
          >
            <Columns className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Split View</span>
          </button>

          <button
            onClick={() => onViewModeChange("editor")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === "editor"
                ? "bg-cyan-500 text-slate-950 shadow font-semibold"
                : "text-slate-400 hover:text-slate-200"
            }`}
            title="Editor Mode"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Raw Editor</span>
          </button>
        </div>

        {/* Right Section: Actions & Utilities */}
        <div className="flex items-center gap-2">
          {/* Quick Input Actions */}
          <button
            onClick={onOpenFile}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-cyan-400 transition-all text-xs font-medium hidden lg:flex items-center gap-1.5"
            title="Open Markdown File (Ctrl+O)"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Open File</span>
          </button>

          <button
            onClick={onOpenFolder}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-cyan-400 transition-all text-xs font-medium hidden lg:flex items-center gap-1.5"
            title="Open Folder"
          >
            <FolderOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Open Folder</span>
          </button>

          <button
            onClick={onPasteClipboard}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-cyan-400 transition-all text-xs font-medium hidden lg:flex items-center gap-1.5"
            title="Paste Markdown from Clipboard"
          >
            <Clipboard className="w-3.5 h-3.5 text-cyan-400" />
            <span>Paste</span>
          </button>

          {/* Search Toggle */}
          <div className="relative">
            {showSearchInput ? (
              <div className="flex items-center bg-slate-900 border border-cyan-500/60 rounded-lg px-2 py-1">
                <Search className="w-3.5 h-3.5 text-cyan-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search in markdown..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  className="bg-transparent text-xs text-slate-200 outline-none w-36 sm:w-48 placeholder-slate-500"
                />
                <button
                  onClick={() => {
                    onSearchChange("");
                    setShowSearchInput(false);
                  }}
                  className="text-slate-400 hover:text-slate-200 ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                className={`p-2 rounded-lg border text-xs font-medium transition-all ${
                  searchQuery
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
                title="Search Text (Ctrl+F)"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Auto-Reload Toggle */}
          <button
            onClick={onToggleAutoReload}
            className={`p-2 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${
              autoReload
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
            title={autoReload ? "Auto-Reload Active" : "Enable Auto-Reload on file changes"}
          >
            <RefreshCw className={`w-4 h-4 ${autoReload ? "animate-spin text-emerald-400" : ""}`} />
            <span className="hidden xl:inline text-[11px]">Auto-Reload</span>
          </button>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-medium text-xs flex items-center gap-1.5 transition-all"
              title="Export Options"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export</span>
            </button>

            {showExportMenu && (
              <div
                className="absolute right-0 mt-2 w-44 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-1.5 z-50 text-xs space-y-1 animate-in fade-in zoom-in-95"
                onClick={() => setShowExportMenu(false)}
              >
                <button
                  onClick={onExportHtml}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 text-left transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Export to HTML</span>
                </button>
                <button
                  onClick={onExportPdf}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 text-left transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-400" />
                  <span>Export to PDF</span>
                </button>
                <button
                  onClick={onExportMd}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 text-left transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Download .md</span>
                </button>
              </div>
            )}
          </div>

          {/* Shortcuts Help */}
          <button
            onClick={() => setShowHelpModal(true)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            title="Keyboard Shortcuts"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Keyboard Shortcuts Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-cyan-400" />
                <span>Keyboard Shortcuts</span>
              </h3>
              <button
                onClick={() => setShowHelpModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span>Open File Picker</span>
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-[11px] font-mono">
                  Ctrl + O
                </kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span>Paste from Clipboard</span>
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-[11px] font-mono">
                  Ctrl + V
                </kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span>Search in Document</span>
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-[11px] font-mono">
                  Ctrl + F
                </kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span>Toggle View Modes</span>
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-[11px] font-mono">
                  Ctrl + Shift + P
                </kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span>Toggle Table of Contents</span>
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-[11px] font-mono">
                  Ctrl + B
                </kbd>
              </div>
            </div>

            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full py-2 bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-cyan-400 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
