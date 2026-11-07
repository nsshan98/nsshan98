"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import mermaid from "mermaid";
import {
  AlertCircle,
  Eye,
  Code2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  X,
  Move,
} from "lucide-react";

interface MermaidRendererProps {
  chart: string;
  theme?: "dark" | "default";
}

export const MermaidRenderer: React.FC<MermaidRendererProps> = ({
  chart,
  theme = "dark",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showCode, setShowCode] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // Modal / Lightbox zoom & pan state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalScale, setModalScale] = useState<number>(1);
  const [modalPan, setModalPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mermaid render logic
  useEffect(() => {
    let isMountedLocal = true;

    mermaid.initialize({
      startOnLoad: false,
      theme: theme === "dark" ? "dark" : "default",
      securityLevel: "loose",
      fontFamily: "inherit",
    });

    const renderChart = async () => {
      let renderId = "";
      try {
        setError(null);
        const cleanChart = chart.trim();
        if (!cleanChart) return;

        // Fresh unique render ID per render pass to avoid DOM collisions
        renderId = `mermaid_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        const existing = document.getElementById(renderId);
        if (existing) existing.remove();

        const { svg } = await mermaid.render(renderId, cleanChart);
        if (isMountedLocal) {
          setSvg(svg);
        }
      } catch (err: unknown) {
        if (isMountedLocal) {
          if (renderId) {
            const stray = document.getElementById(renderId) || document.getElementById(`d${renderId}`);
            if (stray) stray.remove();
          }
          const errMsg = err instanceof Error ? err.message : "Failed to render Mermaid diagram";
          setError(errMsg);
        }
      }
    };

    renderChart();

    return () => {
      isMountedLocal = false;
    };
  }, [chart, theme]);

  // Modal Keyboard shortcuts (Esc to close, + / - to zoom)
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      } else if (e.key === "+" || e.key === "=") {
        setModalScale((prev) => Math.min(prev + 0.25, 4));
      } else if (e.key === "-" || e.key === "_") {
        setModalScale((prev) => Math.max(prev - 0.25, 0.4));
      } else if (e.key === "0") {
        setModalScale(1);
        setModalPan({ x: 0, y: 0 });
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  // Modal Pan & Zoom Event Handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - modalPan.x, y: e.clientY - modalPan.y });
  }, [modalPan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setModalPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? -0.15 : 0.15;
    setModalScale((prev) => Math.min(Math.max(prev + zoomFactor, 0.4), 4.0));
  }, []);

  const handleResetModal = useCallback(() => {
    setModalScale(1);
    setModalPan({ x: 0, y: 0 });
  }, []);

  // Touch handlers for mobile
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setTouchStart({ x: touch.clientX - modalPan.x, y: touch.clientY - modalPan.y });
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && touchStart && e.touches.length === 1) {
      const touch = e.touches[0];
      setModalPan({
        x: touch.clientX - touchStart.x,
        y: touch.clientY - touchStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTouchStart(null);
  };

  const openModal = () => {
    setModalScale(1);
    setModalPan({ x: 0, y: 0 });
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="my-6 rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg overflow-hidden">
        {/* Header Toolbar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400 mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Mermaid Diagram</span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Click to expand button */}
            {!showCode && !error && svg && (
              <button
                type="button"
                onClick={openModal}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition-colors text-xs font-medium"
                title="Open fullscreen interactive zoom & pan"
              >
                <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Zoom / Fullscreen</span>
              </button>
            )}

            {/* Toggle Source Code */}
            <button
              type="button"
              onClick={() => setShowCode(!showCode)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-xs"
              title={showCode ? "Show Diagram" : "Show Mermaid Code"}
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
        </div>

        {/* Content Area */}
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
            onClick={openModal}
            className="group relative flex justify-center items-center overflow-x-auto py-3 cursor-zoom-in rounded-lg bg-slate-950/40 hover:bg-slate-950/70 transition-colors [&_svg]:max-w-full [&_svg]:h-auto"
            title="Click diagram to open interactive fullscreen zoom & pan view"
          >
            <div dangerouslySetInnerHTML={{ __html: svg }} />

            {/* Subtle floating click-to-zoom badge on hover */}
            <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-700/80 text-[11px] text-slate-300 opacity-60 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow-md pointer-events-none">
              <ZoomIn className="w-3 h-3 text-cyan-400" />
              <span>Click to zoom & pan</span>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isModalOpen && mounted && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-200"
        >
          {/* Modal Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-800 bg-slate-900/80 backdrop-blur text-xs sm:text-sm text-slate-300 select-none">
            <div className="flex items-center gap-2 font-semibold text-slate-100">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Interactive Architecture Diagram</span>
            </div>

            {/* Hint in center */}
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
              <Move className="w-3.5 h-3.5 text-cyan-400" />
              <span>Drag to Pan</span>
              <span>•</span>
              <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
              <span>Scroll / Keys (+ / -) to Zoom</span>
              <span>•</span>
              <span>Double-click to Reset</span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setModalScale((s) => Math.max(s - 0.25, 0.4))}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Zoom Out (-)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <span className="font-mono text-xs text-cyan-400 w-14 text-center px-1 py-1 rounded bg-slate-950/80 border border-slate-800">
                {Math.round(modalScale * 100)}%
              </span>

              <button
                type="button"
                onClick={() => setModalScale((s) => Math.min(s + 0.25, 4.0))}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Zoom In (+)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleResetModal}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Reset View (0)"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="w-[1px] h-5 bg-slate-800 mx-1" />

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 border border-red-800/60 text-red-200 transition-colors text-xs font-semibold"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Close</span>
              </button>
            </div>
          </div>

          {/* Modal Canvas (Pan & Zoom Viewport) */}
          <div
            className="relative flex-1 overflow-hidden select-none touch-none"
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onDoubleClick={handleResetModal}
          >
            <div
              style={{
                transform: `translate(${modalPan.x}px, ${modalPan.y}px) scale(${modalScale})`,
                transformOrigin: "center center",
                transition: isDragging ? "none" : "transform 0.08s ease-out",
              }}
              className="w-full h-full flex items-center justify-center p-8 [&_svg]:max-w-none [&_svg]:max-h-none pointer-events-none"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </div>

          {/* Bottom Mobile Instructions */}
          <div className="md:hidden flex items-center justify-center py-2 px-4 border-t border-slate-900 bg-slate-950/80 text-[11px] text-slate-400 gap-2">
            <span>Pinch / Drag to explore • Tap Close or Esc to exit</span>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
