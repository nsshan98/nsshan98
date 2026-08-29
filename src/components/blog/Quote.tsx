import React from "react";
import { Quote as QuoteIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuoteProps {
  children: React.ReactNode;
  author?: string;
  source?: string;
  className?: string;
}

export default function Quote({ children, author, source, className }: QuoteProps) {
  return (
    <figure
      className={cn(
        "my-8 relative rounded-r-xl border-l-4 border-cyan-400 bg-slate-800/40 p-5 sm:p-6 shadow-inner backdrop-blur-xs",
        className
      )}
    >
      <QuoteIcon className="absolute top-4 right-4 h-8 w-8 text-cyan-500/10" />
      <blockquote className="relative z-10 text-base sm:text-lg italic text-slate-200 leading-relaxed">
        {children}
      </blockquote>
      {(author || source) && (
        <figcaption className="mt-3 flex items-center gap-2 text-xs sm:text-sm font-medium text-cyan-400">
          — <span>{author}</span>
          {source && <span className="text-slate-400 font-normal">({source})</span>}
        </figcaption>
      )}
    </figure>
  );
}
