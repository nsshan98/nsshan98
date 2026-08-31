"use client";

import React, { useState, useMemo } from "react";
import { List, Search, ChevronRight, X } from "lucide-react";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TocSidebarProps {
  markdown: string;
  activeId?: string;
  isOpen: boolean;
  onClose: () => void;
  onSelectHeading: (id: string) => void;
}

export function extractHeadings(markdown: string): TocItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/[*_~`[\]]/g, "").trim();
    // slugify heading text
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    if (text) {
      items.push({ id, text, level });
    }
  }

  return items;
}

export const TocSidebar: React.FC<TocSidebarProps> = ({
  markdown,
  activeId,
  isOpen,
  onClose,
  onSelectHeading,
}) => {
  const [filterQuery, setFilterQuery] = useState("");

  const headings = useMemo(() => extractHeadings(markdown), [markdown]);

  const filteredHeadings = useMemo(() => {
    if (!filterQuery.trim()) return headings;
    return headings.filter((h) =>
      h.text.toLowerCase().includes(filterQuery.toLowerCase())
    );
  }, [headings, filterQuery]);

  if (!isOpen) return null;

  return (
    <aside className="w-72 border-r border-slate-800 bg-slate-950/95 flex flex-col h-full shrink-0 select-none z-20 transition-all duration-300">
      {/* TOC Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2 text-cyan-400 font-medium text-xs sm:text-sm">
          <List className="w-4 h-4 text-cyan-400" />
          <span>Table of Contents</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
            {headings.length}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          title="Close Table of Contents"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* TOC Filter Search */}
      <div className="p-3 border-b border-slate-800/60">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Filter headings..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
          />
          {filterQuery && (
            <button
              onClick={() => setFilterQuery("")}
              className="absolute right-2.5 top-2 text-slate-500 hover:text-slate-300 text-xs"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Headings List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5 custom-scrollbar">
        {filteredHeadings.length === 0 ? (
          <div className="p-4 text-center text-slate-500 text-xs">
            {headings.length === 0 ? "No headings found in markdown" : "No matching headings"}
          </div>
        ) : (
          filteredHeadings.map((item, index) => {
            const isActive = activeId === item.id;
            const indentClass =
              item.level === 1
                ? "pl-2 font-semibold text-slate-200"
                : item.level === 2
                ? "pl-5 text-slate-300"
                : item.level === 3
                ? "pl-8 text-slate-400 text-[11px]"
                : "pl-11 text-slate-500 text-[10px]";

            return (
              <button
                key={`${item.id}-${index}`}
                onClick={() => onSelectHeading(item.id)}
                className={`w-full flex items-center gap-1.5 py-1.5 pr-2 rounded-lg text-left text-xs transition-all ${indentClass} ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-300 font-medium border-l-2 border-cyan-400"
                    : "hover:bg-slate-900 hover:text-slate-200"
                }`}
              >
                <ChevronRight
                  className={`w-3 h-3 shrink-0 opacity-50 transition-transform ${
                    isActive ? "rotate-90 text-cyan-400 opacity-100" : ""
                  }`}
                />
                <span className="truncate">{item.text}</span>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
};
