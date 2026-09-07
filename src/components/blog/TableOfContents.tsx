"use client";

import React, { useEffect, useState } from "react";
import { TableOfContentsItem } from "@/lib/blog/types";
import { ListOrdered, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  className?: string;
}

interface GroupedTOCItem {
  parent: TableOfContentsItem;
  children: TableOfContentsItem[];
}

export default function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  // Group level 3 items under their preceding level 2 parent
  const groupedItems: GroupedTOCItem[] = React.useMemo(() => {
    if (!items || items.length === 0) return [];

    const grouped: GroupedTOCItem[] = [];
    let currentGroup: GroupedTOCItem | null = null;

    items.forEach((item) => {
      if (item.level === 2) {
        currentGroup = { parent: item, children: [] };
        grouped.push(currentGroup);
      } else if (item.level === 3) {
        if (currentGroup) {
          currentGroup.children.push(item);
        } else {
          grouped.push({ parent: item, children: [] });
        }
      } else {
        grouped.push({ parent: item, children: [] });
      }
    });

    return grouped;
  }, [items]);

  // ScrollSpy with IntersectionObserver
  useEffect(() => {
    if (!items || items.length === 0) return;

    const allIds = items.map((i) => i.id);
    const elements = allIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Set initial active item
    setActiveId(items[0].id);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // Pick the topmost intersecting heading
          visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: [0, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) return null;

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        "rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 sm:p-5 backdrop-blur-md shadow-xl",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 font-semibold text-slate-200 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <ListOrdered className="h-4 w-4 text-cyan-400" />
          <span>On this page</span>
        </div>
        <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
          Live Tracking
        </span>
      </div>

      {/* Accordion Grouped List */}
      <ul className="mt-3.5 space-y-1.5 text-xs sm:text-sm">
        {groupedItems.map((group) => {
          const isParentSelfActive = activeId === group.parent.id;
          const isChildActive = group.children.some((c) => c.id === activeId);
          const isExpanded = isParentSelfActive || isChildActive;

          return (
            <li key={group.parent.id} className="space-y-1">
              {/* Pillar (Level 2) Link */}
              <a
                href={`#${group.parent.id}`}
                onClick={(e) => scrollToSection(e, group.parent.id)}
                className={cn(
                  "group flex items-center justify-between py-1.5 px-2 rounded-lg transition-all leading-snug cursor-pointer",
                  isExpanded
                    ? "text-cyan-300 font-semibold bg-cyan-500/10 border-l-2 border-cyan-400 pl-2.5"
                    : "text-slate-300 hover:text-cyan-400 hover:bg-slate-800/40"
                )}
              >
                <span className="truncate">{group.parent.title}</span>
                {group.children.length > 0 && (
                  <ChevronRight
                    className={cn(
                      "h-3.5 w-3.5 shrink-0 transition-transform duration-200",
                      isExpanded ? "rotate-90 text-cyan-400" : "text-slate-500 group-hover:text-slate-300"
                    )}
                  />
                )}
              </a>

              {/* Subsections (Level 3) - Only shown when active/expanded */}
              {isExpanded && group.children.length > 0 && (
                <ul className="ml-3 pl-2.5 border-l border-slate-800 space-y-1 py-1 transition-all duration-300">
                  {group.children.map((child) => {
                    const isCurrentChild = activeId === child.id;
                    return (
                      <li key={child.id}>
                        <a
                          href={`#${child.id}`}
                          onClick={(e) => scrollToSection(e, child.id)}
                          className={cn(
                            "flex items-center gap-2 py-1 px-2 rounded text-xs transition-colors cursor-pointer",
                            isCurrentChild
                              ? "text-cyan-400 font-semibold bg-cyan-500/10"
                              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                          )}
                        >
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full shrink-0 transition-colors",
                              isCurrentChild ? "bg-cyan-400" : "bg-slate-600"
                            )}
                          />
                          <span className="truncate">{child.title}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
