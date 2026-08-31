"use client";

import React, { useState } from "react";
import { FolderOpen, FileText, Folder, ChevronDown, ChevronRight, Search, X, Plus } from "lucide-react";

export interface WorkspaceFile {
  name: string;
  path: string;
  content: string;
  handle?: FileSystemFileHandle;
}

interface WorkspaceSidebarProps {
  files: WorkspaceFile[];
  activeFileIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectFile: (index: number) => void;
  onOpenFolder: () => void;
  onOpenFile: () => void;
}

export const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({
  files,
  activeFileIndex,
  isOpen,
  onClose,
  onSelectFile,
  onOpenFolder,
  onOpenFile,
}) => {
  const [filterQuery, setFilterQuery] = useState("");
  const [isFolderExpanded, setIsFolderExpanded] = useState(true);

  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <aside className="w-72 border-r border-slate-800 bg-slate-950/95 flex flex-col h-full shrink-0 select-none z-20 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2 text-cyan-400 font-medium text-xs sm:text-sm">
          <FolderOpen className="w-4 h-4 text-cyan-400" />
          <span>Workspace Explorer</span>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          title="Close Workspace Explorer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Folder Action Buttons */}
      <div className="p-3 border-b border-slate-800/60 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onOpenFile}
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-all border border-slate-700/50"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" />
            <span>Open File</span>
          </button>

          <button
            onClick={onOpenFolder}
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-medium transition-all border border-cyan-500/30"
          >
            <FolderOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Open Folder</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative pt-1">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search workspace files..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
          />
        </div>
      </div>

      {/* Files Tree */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
        {files.length > 0 && (
          <button
            onClick={() => setIsFolderExpanded(!isFolderExpanded)}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-slate-400 hover:text-slate-200 text-xs font-medium rounded-lg hover:bg-slate-900/60"
          >
            {isFolderExpanded ? (
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            )}
            <Folder className="w-4 h-4 text-amber-400" />
            <span className="truncate">Loaded Workspace</span>
            <span className="ml-auto text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded-full">
              {files.length}
            </span>
          </button>
        )}

        {isFolderExpanded && (
          <div className="space-y-0.5 pl-3">
            {filteredFiles.length === 0 ? (
              <div className="p-4 text-center text-slate-500 text-xs">
                {files.length === 0 ? "No files loaded. Drag files or open a folder." : "No matching files"}
              </div>
            ) : (
              filteredFiles.map((file) => {
                const originalIndex = files.findIndex((f) => f.path === file.path);
                const isActive = activeFileIndex === originalIndex;

                return (
                  <button
                    key={file.path}
                    onClick={() => onSelectFile(originalIndex)}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left text-xs transition-all ${
                      isActive
                        ? "bg-cyan-500/10 text-cyan-300 font-medium border-l-2 border-cyan-400"
                        : "text-slate-300 hover:bg-slate-900 hover:text-slate-100"
                    }`}
                  >
                    <FileText className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-cyan-400" : "text-slate-500"}`} />
                    <span className="truncate">{file.name}</span>
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
