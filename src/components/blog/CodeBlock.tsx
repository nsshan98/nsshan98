"use client";

import { useState } from "react";
import { Check, Copy, Code2 } from "lucide-react";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export default function CodeBlock({
  code,
  language = "typescript",
  filename,
  showLineNumbers = false,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const cleanCode = code.trim();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const getHighlightedHtml = () => {
    const lang = language.toLowerCase();
    const grammar = Prism.languages[lang] || Prism.languages.javascript || Prism.languages.clike;
    try {
      return Prism.highlight(cleanCode, grammar, lang);
    } catch {
      return cleanCode;
    }
  };

  const highlightedHtml = getHighlightedHtml();
  const lines = cleanCode.split("\n");

  return (
    <div
      className={cn(
        "group relative my-6 overflow-hidden rounded-xl border border-slate-700/60 bg-slate-900/90 shadow-xl font-mono text-sm leading-relaxed text-slate-100",
        className
      )}
    >
      {/* Header bar with filename/language and copy button */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 py-2.5 text-xs text-slate-400">
        <div className="flex items-center gap-2 font-mono">
          <Code2 className="h-4 w-4 text-cyan-400" />
          {filename ? (
            <span className="font-medium text-slate-300">{filename}</span>
          ) : (
            <span className="uppercase tracking-wider text-slate-400">{language}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          type="button"
          aria-label={copied ? "Copied code" : "Copy code"}
          className="flex items-center gap-1.5 rounded-md border border-slate-700/50 bg-slate-800/60 px-2.5 py-1 text-xs text-slate-300 transition-all hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-sans">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-200" />
              <span className="font-sans">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code body */}
      <div className="overflow-x-auto p-4 sm:p-5 scrollbar-thin scrollbar-thumb-slate-700">
        <pre className="flex">
          {showLineNumbers && (
            <div className="mr-4 select-none text-right font-mono text-xs text-slate-600">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          )}
          <code
            className={cn(`language-${language}`, "flex-1 whitespace-pre font-mono")}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        </pre>
      </div>
    </div>
  );
}
