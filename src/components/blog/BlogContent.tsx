import React from "react";
import { cn } from "@/lib/utils";

interface BlogContentProps {
  children: React.ReactNode;
  className?: string;
}

export default function BlogContent({ children, className }: BlogContentProps) {
  return (
    <article
      className={cn(
        "prose prose-invert max-w-none space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed",
        // Heading styles
        "[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-slate-100 [&_h2]:border-b [&_h2]:border-slate-800/80 [&_h2]:pb-3 [&_h2]:scroll-mt-24",
        "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:sm:text-2xl [&_h3]:font-semibold [&_h3]:text-slate-200 [&_h3]:scroll-mt-24",
        "[&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-slate-200 [&_h4]:scroll-mt-24",
        // Text elements
        "[&_p]:mb-5 [&_p]:leading-relaxed [&_p]:text-slate-300",
        "[&_strong]:font-semibold [&_strong]:text-slate-100",
        "[&_em]:italic [&_em]:text-slate-200",
        "[&_a]:text-cyan-400 [&_a]:underline [&_a]:decoration-cyan-400/40 [&_a]:underline-offset-4 [&_a]:transition-colors hover:[&_a]:text-cyan-300 hover:[&_a]:decoration-cyan-300",
        // Lists
        "[&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:text-slate-300",
        "[&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:text-slate-300",
        "[&_li]:leading-relaxed",
        // Inline code (not CodeBlock)
        "[&_:not(pre)>code]:rounded-md [&_:not(pre)>code]:bg-slate-800/80 [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-xs [&_:not(pre)>code]:sm:text-sm [&_:not(pre)>code]:text-cyan-300 [&_:not(pre)>code]:border [&_:not(pre)>code]:border-slate-700/50",
        // Tables
        "[&_table]:my-8 [&_table]:w-full [&_table]:border-collapse [&_table]:overflow-hidden [&_table]:rounded-xl [&_table]:border [&_table]:border-slate-800 [&_table]:text-sm",
        "[&_thead]:bg-slate-900/90 [&_thead]:border-b [&_thead]:border-slate-800",
        "[&_th]:p-3 [&_th]:sm:p-4 [&_th]:text-left [&_th]:font-semibold [&_th]:text-slate-200",
        "[&_td]:p-3 [&_td]:sm:p-4 [&_td]:border-b [&_td]:border-slate-800/60 [&_td]:text-slate-300",
        "[&_tr:last-child_td]:border-b-0",
        "[&_tr:nth-child(even)]:bg-slate-900/30",
        className
      )}
    >
      {children}
    </article>
  );
}
