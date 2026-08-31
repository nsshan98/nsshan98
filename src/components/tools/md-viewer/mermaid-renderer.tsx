"use client";

import React, { useEffect, useRef, useState, useId } from "react";
import mermaid from "mermaid";
import { AlertCircle, Eye, Code2 } from "lucide-react";

interface MermaidRendererProps {
  chart: string;
  theme?: "dark" | "default";
}

export const MermaidRenderer: React.FC<MermaidRendererProps> = ({
  chart,
  theme = "dark",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniqueId = useId().replace(/:/g, "m_");
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showCode, setShowCode] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    mermaid.initialize({
      startOnLoad: false,
      theme: theme === "dark" ? "dark" : "default",
      securityLevel: "loose",
      fontFamily: "inherit",
    });

    const renderChart = async () => {
      try {
        setError(null);
        const cleanChart = chart.trim();
        if (!cleanChart) return;

        const { svg } = await mermaid.render(`mermaid_${uniqueId}`, cleanChart);
        if (isMounted) {
          setSvg(svg);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const errMsg = err instanceof Error ? err.message : "Failed to render Mermaid diagram";
          setError(errMsg);
        }
      }
    };

    renderChart();

    return () => {
      isMounted = false;
    };
  }, [chart, theme, uniqueId]);

  return (
    <div className="my-6 rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg overflow-hidden">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400 mb-3">
        <div className="flex items-center gap-2 text-cyan-400 font-semibold">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Mermaid Diagram</span>
        </div>

        <button
          onClick={() => setShowCode(!showCode)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-xs"
        >
          {showCode ? (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span>Diagram</span>
            </>
          ) : (
            <>
              <Code2 className="w-3.5 h-3.5" />
              <span>Source</span>
            </>
          )}
        </button>
      </div>

      {showCode ? (
        <pre className="p-3 rounded bg-slate-950 text-slate-300 font-mono text-xs overflow-x-auto">
          {chart}
        </pre>
      ) : error ? (
        <div className="p-4 rounded-lg bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold mb-1">Mermaid Syntax Error</p>
            <p className="font-mono text-[11px] opacity-80">{error}</p>
          </div>
        </div>
      ) : (
        <div
          ref={containerRef}
          className="flex justify-center items-center overflow-x-auto py-2 [&_svg]:max-w-full [&_svg]:h-auto"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}
    </div>
  );
};
