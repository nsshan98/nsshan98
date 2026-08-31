"use client";

import React, { useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

interface JsonEditorProps {
  value: string;
  onChange?: (val: string) => void;
  readOnly?: boolean;
  language?: "json" | "typescript";
  errorLine?: number;
  placeholder?: string;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({
  value,
  onChange,
  readOnly = false,
  language = "json",
  placeholder = "Paste JSON payload here...",
}) => {
  const extensions = useMemo(() => {
    return language === "json" ? [json()] : [javascript({ typescript: true })];
  }, [language]);

  return (
    <div className="w-full h-full min-h-[350px] sm:min-h-[450px] rounded-xl border border-slate-800 bg-[#282c34] overflow-hidden flex flex-col relative font-mono text-xs sm:text-sm">
      <CodeMirror
        value={value}
        height="100%"
        className="h-full flex-1 overflow-auto [&_.cm-editor]:h-full [&_.cm-scroller]:overflow-auto text-xs sm:text-sm"
        theme={oneDark}
        extensions={extensions}
        editable={!readOnly}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={(val) => onChange && onChange(val)}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          history: true,
          foldGutter: true,
          drawSelection: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          syntaxHighlighting: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          searchKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }}
      />
    </div>
  );
};
