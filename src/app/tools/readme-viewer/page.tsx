import { Metadata } from "next";
import Navbar from "@/components/shared/navbar";
import { MdViewerContainer } from "@/components/tools/md-viewer/md-viewer-container";

export const metadata: Metadata = {
  title: "README & Markdown File Viewer | Developer Tools",
  description:
    "Free, secure, ultra-fast online Markdown and Readme file viewer. Supports GitHub-style code blocks, LaTeX math formulas, Mermaid graphs, split view, search, workspace folder explorer, and PDF/HTML export.",
};

export default function ReadmeViewerPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <div className="pt-20 flex-1 flex flex-col">
        <MdViewerContainer />
      </div>
    </div>
  );
}
