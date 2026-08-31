"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy, Terminal } from "lucide-react";
import { toast } from "sonner";

interface CodeBlockProps {
  language?: string;
  value: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language = "text", value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success("Code copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy code");
    }
  };

  const cleanLang = language ? language.replace("language-", "") : "text";

  return (
    <div className="relative my-4 rounded-xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-lg group">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-950/80 border-b border-slate-800/80 text-xs text-slate-400 select-none">
        <div className="flex items-center gap-2 font-mono text-cyan-400">
          <Terminal className="w-3.5 h-3.5" />
          <span className="uppercase tracking-wider font-semibold">{cleanLang}</span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-300 transition-all border border-slate-700/60 active:scale-95 text-xs"
          title="Copy code to clipboard"
          aria-label="Copy code block"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <div className="text-xs sm:text-sm font-mono overflow-x-auto p-1 bg-[#1e1e1e]">
        <SyntaxHighlighter
          language={cleanLang}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "1rem",
            background: "transparent",
            fontSize: "0.875rem",
            lineHeight: "1.5",
          }}
          codeTagProps={{
            style: { fontFamily: 'var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace)' },
          }}
        >
          {value.replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
