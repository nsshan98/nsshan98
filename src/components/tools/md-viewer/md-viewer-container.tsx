"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSanitize from "rehype-sanitize";
import "katex/dist/katex.min.css";

import { safeSanitizeSchema, sanitizeHTML } from "./md-sanitizer";
import { CodeBlock } from "./code-block";
import { MermaidRenderer } from "./mermaid-renderer";
import { TocSidebar } from "./toc-sidebar";
import { WorkspaceSidebar, WorkspaceFile } from "./workspace-sidebar";
import { Toolbar, ViewMode } from "./toolbar";
import { UploadCloud } from "lucide-react";
import { toast } from "sonner";

const SAMPLE_MARKDOWN = `# 🚀 Welcome to the README & Markdown File Viewer

A modern, fast, and security-hardened Markdown reader built with **Next.js**, **React 19**, and **Tailwind CSS**.

---

## 🌟 Key Features

- 🛡️ **Hardened Security Pipeline**: Full sanitization preventing XSS attacks while allowing rich elements.
- 🎨 **GitHub-Style Code Blocks**: Syntax highlighting with copy buttons.
- 📊 **Mermaid Diagrams**: Dynamic flowchart and diagram rendering.
- 📐 **LaTeX Math Equations**: Inline and block math formulas.
- 📑 **Interactive Table of Contents**: Jump directly to any section.
- 🔍 **In-Document Search**: Highlighting matching terms instantly.
- 📂 **Workspace & Folder Support**: Open multiple files or local folders seamlessly.
- ↔️ **Split View & Raw Editor**: Edit raw Markdown while previewing live.
- 📋 **Copy & Paste & Drag-and-Drop**: Load Markdown from anywhere instantly.
- 📤 **Export Capabilities**: Export to styled HTML or PDF.

---

## 📊 Mermaid Diagram Example

\`\`\`mermaid
graph TD
    A[Raw Markdown Input] -->|Parser| B[AST Node Tree]
    B -->|Rehype Pipeline| C[Sanitizer Schema]
    C -->|Sanitized AST| D[React UI Components]
    D -->|Render| E[Safe Beautiful Output]
\`\`\`

---

## 📐 LaTeX Math Equations

Inline equation: $E = mc^2$ or Pythagorean theorem: $a^2 + b^2 = c^2$.

Block equation:

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

---

## 💻 GitHub Code Block Example

\`\`\`typescript
interface UserProfile {
  id: string;
  name: string;
  role: "admin" | "developer";
  createdAt: Date;
}

export function greetUser(user: UserProfile): string {
  return \`Welcome back, \${user.name}! Role: \${user.role}\`;
}
\`\`\`

---

## 📋 GFM Table Example

| Feature | Support | Description |
| :--- | :---: | :--- |
| GFM Task Lists | ✅ | Interactive task checkboxes |
| Code Highlighting | ✅ | GitHub dark theme prism syntax |
| Security Sanitizer | ✅ | XSS prevention via rehype-sanitize |
| PDF Export | ✅ | Print-friendly CSS layout |

---

> [!NOTE]
> You can drag and drop any \`.md\` file onto this window, paste Markdown directly via \`Ctrl+V\`, or click **Open File** in the toolbar above!
`;

export function MdViewerContainer() {
  const [markdown, setMarkdown] = useState<string>(SAMPLE_MARKDOWN);
  const [fileName, setFileName] = useState<string>("README.md");
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [isTocOpen, setIsTocOpen] = useState<boolean>(true);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeHeadingId, setActiveHeadingId] = useState<string>("");
  const [autoReload, setAutoReload] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Workspace Files
  const [workspaceFiles, setWorkspaceFiles] = useState<WorkspaceFile[]>([
    {
      name: "README.md",
      path: "/README.md",
      content: SAMPLE_MARKDOWN,
    },
  ]);
  const [activeFileIndex, setActiveFileIndex] = useState<number>(0);
  const activeFileHandleRef = useRef<FileSystemFileHandle | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // File Picker trigger
  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const loadFileContent = (file: File, handle?: FileSystemFileHandle) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (typeof content === "string") {
        setMarkdown(content);
        setFileName(file.name);
        if (handle) {
          activeFileHandleRef.current = handle;
        }

        // Add to workspace files if not existing
        setWorkspaceFiles((prev) => {
          const existsIndex = prev.findIndex((f) => f.name === file.name);
          if (existsIndex >= 0) {
            const updated = [...prev];
            updated[existsIndex] = { name: file.name, path: file.name, content, handle };
            setActiveFileIndex(existsIndex);
            return updated;
          } else {
            const updated = [...prev, { name: file.name, path: file.name, content, handle }];
            setActiveFileIndex(updated.length - 1);
            return updated;
          }
        });

        toast.success(`Loaded "${file.name}"`);
      }
    };
    reader.readAsText(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      loadFileContent(file);
    }
  };

  // Folder Explorer using File System Access API
  const handleOpenFolder = async () => {
    if (typeof window !== "undefined" && "showDirectoryPicker" in window) {
      try {
        const dirHandle = await (window as unknown as { showDirectoryPicker: () => Promise<FileSystemDirectoryHandle> }).showDirectoryPicker();
        const loadedFiles: WorkspaceFile[] = [];

        for await (const entry of (dirHandle as unknown as AsyncIterable<FileSystemHandle>)) {
          if (entry.kind === "file" && entry.name.endsWith(".md")) {
            const fileHandle = entry as FileSystemFileHandle;
            const file = await fileHandle.getFile();
            const content = await file.text();
            loadedFiles.push({
              name: file.name,
              path: `/${dirHandle.name}/${file.name}`,
              content,
              handle: fileHandle,
            });
          }
        }

        if (loadedFiles.length > 0) {
          setWorkspaceFiles(loadedFiles);
          setActiveFileIndex(0);
          setMarkdown(loadedFiles[0].content);
          setFileName(loadedFiles[0].name);
          activeFileHandleRef.current = loadedFiles[0].handle || null;
          setIsWorkspaceOpen(true);
          toast.success(`Loaded workspace with ${loadedFiles.length} Markdown files!`);
        } else {
          toast.info("No .md files found in selected folder.");
        }
      } catch (err: unknown) {
        if ((err as Error).name !== "AbortError") {
          toast.error("Failed to open directory");
        }
      }
    } else {
      toast.info("Folder picker isn't supported in this browser. You can drag and drop multiple files.");
      handleOpenFilePicker();
    }
  };

  // Clipboard Paste Support
  const handlePasteClipboard = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text.trim()) {
        setMarkdown(text);
        setFileName("Pasted_Content.md");
        toast.success("Markdown pasted from clipboard!");
      } else {
        toast.info("Clipboard is empty or contains non-text content.");
      }
    } catch {
      toast.error("Failed to read from clipboard. Please allow clipboard permissions.");
    }
  }, []);

  // Global Drag and Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const mdFile = files.find((f) => f.name.endsWith(".md") || f.type.includes("text"));

    if (mdFile) {
      loadFileContent(mdFile);
    } else {
      toast.error("Please drop a valid .md or text file.");
    }
  };

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "o") {
        e.preventDefault();
        handleOpenFilePicker();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setIsTocOpen((prev) => !prev);
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "p") {
        e.preventDefault();
        setViewMode((prev) => (prev === "preview" ? "split" : prev === "split" ? "editor" : "preview"));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-Reload file modification polling
  useEffect(() => {
    if (!autoReload || !activeFileHandleRef.current) return;

    let lastModTime = 0;
    const interval = setInterval(async () => {
      try {
        if (activeFileHandleRef.current) {
          const file = await activeFileHandleRef.current.getFile();
          if (lastModTime > 0 && file.lastModified > lastModTime) {
            const text = await file.text();
            setMarkdown(text);
            toast.info(`Auto-reloaded "${file.name}"`);
          }
          lastModTime = file.lastModified;
        }
      } catch {
        // file permission or handle error
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [autoReload]);

  // Heading scroll handler
  const handleSelectHeading = (id: string) => {
    setActiveHeadingId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Workspace file selection
  const handleSelectWorkspaceFile = (index: number) => {
    const file = workspaceFiles[index];
    if (file) {
      setActiveFileIndex(index);
      setMarkdown(file.content);
      setFileName(file.name);
      activeFileHandleRef.current = file.handle || null;
    }
  };

  // Export to HTML
  const handleExportHtml = () => {
    const previewContainer = document.getElementById("md-preview-content");
    const rawHtml = previewContainer ? previewContainer.innerHTML : "";
    const cleanHtml = sanitizeHTML(rawHtml);

    const fullDoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${fileName} - Exported Document</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #e2e8f0; background: #090d16; padding: 2rem; max-w: 900px; margin: 0 auto; }
    h1, h2, h3, h4 { color: #f8fafc; border-bottom: 1px solid #334155; padding-bottom: 0.3em; }
    pre { background: #1e293b; padding: 1rem; rounded: 8px; overflow-x: auto; color: #f8fafc; }
    code { font-family: monospace; background: #1e293b; padding: 0.2em 0.4em; border-radius: 4px; color: #38bdf8; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
    th, td { border: 1px solid #334155; padding: 8px 12px; text-align: left; }
    th { background: #1e293b; }
    blockquote { border-left: 4px solid #38bdf8; padding-left: 1rem; color: #94a3b8; margin: 1rem 0; }
    a { color: #38bdf8; text-decoration: none; }
  </style>
</head>
<body>
  ${cleanHtml}
</body>
</html>`;

    const blob = new Blob([fullDoc], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName.replace(/\.md$/, "") + ".html";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported HTML document!");
  };

  // Export to PDF via print window
  const handleExportPdf = () => {
    window.print();
  };

  // Download raw MD
  const handleExportMd = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded Markdown file!");
  };

  return (
    <div
      className="flex flex-col h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 relative overflow-hidden select-none"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept=".md,.markdown,.txt"
        className="hidden"
      />

      {/* Drag and Drop Canvas Overlay */}
      {isDragging && (
        <div className="absolute inset-0 bg-slate-950/90 border-4 border-dashed border-cyan-400 z-50 flex flex-col items-center justify-center backdrop-blur-md animate-in fade-in">
          <UploadCloud className="w-16 h-16 text-cyan-400 animate-bounce mb-4" />
          <h2 className="text-2xl font-bold text-slate-100 mb-2">Drop your .md file here</h2>
          <p className="text-sm text-slate-400">Release to open and render Markdown instantly</p>
        </div>
      )}

      {/* Main Toolbar Header */}
      <Toolbar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onOpenFile={handleOpenFilePicker}
        onOpenFolder={handleOpenFolder}
        onPasteClipboard={handlePasteClipboard}
        isTocOpen={isTocOpen}
        onToggleToc={() => setIsTocOpen(!isTocOpen)}
        isWorkspaceOpen={isWorkspaceOpen}
        onToggleWorkspace={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        autoReload={autoReload}
        onToggleAutoReload={() => setAutoReload(!autoReload)}
        onExportHtml={handleExportHtml}
        onExportPdf={handleExportPdf}
        onExportMd={handleExportMd}
        fileName={fileName}
      />

      {/* App Workspace Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Workspace Files Sidebar */}
        <WorkspaceSidebar
          files={workspaceFiles}
          activeFileIndex={activeFileIndex}
          isOpen={isWorkspaceOpen}
          onClose={() => setIsWorkspaceOpen(false)}
          onSelectFile={handleSelectWorkspaceFile}
          onOpenFolder={handleOpenFolder}
          onOpenFile={handleOpenFilePicker}
        />

        {/* Table of Contents Sidebar */}
        <TocSidebar
          markdown={markdown}
          activeId={activeHeadingId}
          isOpen={isTocOpen}
          onClose={() => setIsTocOpen(false)}
          onSelectHeading={handleSelectHeading}
        />

        {/* Content Container (Split View / Preview / Editor) */}
        <main className="flex-1 flex overflow-hidden bg-slate-950">
          {/* Raw Editor Panel (Visible in 'editor' or 'split' mode) */}
          {(viewMode === "editor" || viewMode === "split") && (
            <div
              className={`flex flex-col h-full border-r border-slate-800/80 bg-slate-950 ${
                viewMode === "split" ? "w-1/2" : "w-full"
              }`}
            >
              <div className="flex items-center justify-between px-4 py-2 bg-slate-900/60 border-b border-slate-800 text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  RAW MARKDOWN EDITOR
                </span>
                <span>{markdown.length} characters</span>
              </div>
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Type or paste Markdown here..."
                className="flex-1 w-full bg-slate-950 p-4 sm:p-6 text-xs sm:text-sm font-mono text-slate-200 outline-none resize-none leading-relaxed custom-scrollbar selection:bg-cyan-500 selection:text-slate-950"
              />
            </div>
          )}

          {/* Rendered Preview Panel (Visible in 'preview' or 'split' mode) */}
          {(viewMode === "preview" || viewMode === "split") && (
            <div
              className={`flex-1 h-full overflow-y-auto p-4 sm:p-8 lg:p-12 custom-scrollbar bg-slate-950 select-text print:p-0 print:bg-white print:text-black ${
                viewMode === "split" ? "w-1/2" : "w-full max-w-4xl mx-auto"
              }`}
            >
              <div
                id="md-preview-content"
                className="markdown-body prose prose-invert max-w-none prose-slate prose-headings:scroll-mt-20 prose-headings:font-bold prose-headings:text-slate-100 prose-h1:text-2xl sm:prose-h1:text-3xl prose-h1:border-b prose-h1:border-slate-800 prose-h1:pb-3 prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:border-b prose-h2:border-slate-800/60 prose-h2:pb-2 prose-a:text-cyan-400 hover:prose-a:underline prose-code:text-cyan-300 prose-code:bg-slate-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:p-0 prose-pre:bg-transparent prose-img:rounded-xl prose-img:border prose-img:border-slate-800 prose-table:border-collapse prose-th:bg-slate-900 prose-th:text-slate-200 prose-td:border prose-td:border-slate-800 prose-td:p-2"
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[[rehypeSanitize, safeSanitizeSchema], rehypeKatex]}
                  components={{
                    // Custom Code Block Renderer
                    code({ className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      const isInline = !match && !String(children).includes("\n");

                      if (isInline) {
                        return (
                          <code className="bg-slate-900 text-cyan-300 px-1.5 py-0.5 rounded font-mono text-xs" {...props}>
                            {children}
                          </code>
                        );
                      }

                      const lang = match ? match[1] : "";
                      const codeContent = String(children).replace(/\n$/, "");

                      if (lang === "mermaid") {
                        return <MermaidRenderer chart={codeContent} />;
                      }

                      return <CodeBlock language={lang} value={codeContent} />;
                    },

                    // Heading ID Generator for TOC navigation
                    h1: ({ children }) => {
                      const text = String(children).replace(/[*_~`[\]]/g, "").trim();
                      const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
                      return (
                        <h1 id={id} className="group relative text-2xl sm:text-3xl font-extrabold text-slate-100 border-b border-slate-800 pb-3 mt-8 mb-4 flex items-center gap-2">
                          {children}
                        </h1>
                      );
                    },
                    h2: ({ children }) => {
                      const text = String(children).replace(/[*_~`[\]]/g, "").trim();
                      const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
                      return (
                        <h2 id={id} className="text-xl sm:text-2xl font-bold text-slate-100 border-b border-slate-800/60 pb-2 mt-6 mb-3">
                          {children}
                        </h2>
                      );
                    },
                    h3: ({ children }) => {
                      const text = String(children).replace(/[*_~`[\]]/g, "").trim();
                      const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
                      return (
                        <h3 id={id} className="text-lg font-semibold text-slate-200 mt-5 mb-2">
                          {children}
                        </h3>
                      );
                    },
                    // Safe External Links
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 font-medium transition-colors"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {markdown}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
