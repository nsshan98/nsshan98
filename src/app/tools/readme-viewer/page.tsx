import type { Metadata } from "next";
import Navbar from "@/components/shared/navbar";
import { MdViewerContainer } from "@/components/tools/md-viewer/md-viewer-container";
import { SITE_URL } from "@/lib/blog/metadata";
import { generateSoftwareAppJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: "README & Markdown File Viewer | GitHub Style & Math Support",
  description:
    "Free, secure, ultra-fast online Markdown and Readme file viewer. Supports GitHub-style code blocks, LaTeX math formulas, Mermaid graphs, split view, search, workspace folder explorer, and PDF/HTML export.",
  alternates: {
    canonical: `${SITE_URL}/tools/readme-viewer`,
  },
  openGraph: {
    title: "README & Markdown File Viewer | Developer Tools",
    description:
      "Ultra-fast online Markdown & Readme file viewer with GitHub code blocks, LaTeX math formulas, Mermaid diagram visualizer, split view, and PDF/HTML export.",
    url: `${SITE_URL}/tools/readme-viewer`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/about-me.png`,
        width: 1200,
        height: 630,
        alt: "README & Markdown File Viewer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "README & Markdown File Viewer | Developer Tools",
    description:
      "Ultra-fast online Markdown viewer with LaTeX math, Mermaid diagrams, split view, search, and PDF export.",
    images: [`${SITE_URL}/about-me.png`],
  },
};

export default function ReadmeViewerPage() {
  const appJsonLd = generateSoftwareAppJsonLd({
    name: "README & Markdown File Viewer",
    description:
      "Browser-based Markdown & README file preview engine with syntax highlighting, LaTeX math, Mermaid diagrams, workspace navigation, and PDF/HTML export.",
    url: `${SITE_URL}/tools/readme-viewer`,
    applicationCategory: "DeveloperApplication",
    featureList: [
      "Drag & Drop File Picker & Paste Input",
      "GitHub Flavored Markdown & Code Highlighting",
      "LaTeX Math Formulas & Mermaid Diagram Visualizer",
      "Table of Contents & In-Document Search",
      "PDF & HTML Export Capabilities",
    ],
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <Navbar />

      <div className="pt-20 flex-1 flex flex-col">
        <MdViewerContainer />
      </div>
    </div>
  );
}
