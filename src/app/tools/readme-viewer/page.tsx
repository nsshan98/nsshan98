import type { Metadata } from "next";
import Navbar from "@/components/shared/navbar";
import { MdViewerContainer } from "@/components/tools/md-viewer/md-viewer-container";
import { SITE_URL, TOOLIFY_URL } from "@/lib/blog/metadata";
import { generateSoftwareAppJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: "README & Markdown Viewer",
  description:
    "Fast, private browser Markdown viewer supporting GitHub Flavored Markdown, LaTeX math formulas, and Mermaid diagrams.",
  alternates: {
    canonical: `${TOOLIFY_URL}/readme-viewer`,
  },
  openGraph: {
    title: "README & Markdown Viewer | Nazmus Sakib",
    description:
      "Fast, private browser Markdown viewer supporting GitHub Flavored Markdown, LaTeX math formulas, and Mermaid diagrams.",
    url: `${TOOLIFY_URL}/readme-viewer`,
    siteName: "Nazmus Sakib",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "README & Markdown File Viewer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "README & Markdown Viewer | Nazmus Sakib",
    description:
      "Fast, private browser Markdown viewer supporting GitHub Flavored Markdown, LaTeX math formulas, and Mermaid diagrams.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function ReadmeViewerPage() {
  const appJsonLd = generateSoftwareAppJsonLd({
    name: "README & Markdown File Viewer",
    description:
      "Browser-based Markdown & README file preview engine with syntax highlighting, LaTeX math, Mermaid diagrams, workspace navigation, and PDF/HTML export.",
    url: `${TOOLIFY_URL}/readme-viewer`,
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
