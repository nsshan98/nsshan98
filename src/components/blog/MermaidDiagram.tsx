"use client";

import dynamic from "next/dynamic";
import React from "react";
import { cn } from "@/lib/utils";

const MermaidRenderer = dynamic(
  () =>
    import("@/components/tools/md-viewer/mermaid-renderer").then(
      (mod) => mod.MermaidRenderer
    ),
  {
    ssr: false,
    loading: () => (
      <div className="my-6 flex h-48 w-full items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-xs text-slate-500 animate-pulse">
        Loading architecture diagram...
      </div>
    ),
  }
);

interface MermaidDiagramProps {
  chart: string;
  caption?: string;
  className?: string;
}

export default function MermaidDiagram({
  chart,
  caption,
  className,
}: MermaidDiagramProps) {
  return (
    <figure className={cn("my-8 overflow-hidden rounded-xl", className)}>
      <MermaidRenderer chart={chart} theme="dark" />
      {caption && (
        <figcaption className="mt-2 text-center text-xs sm:text-sm italic text-slate-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

