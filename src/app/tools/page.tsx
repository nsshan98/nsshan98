import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Braces, Image as ImageIcon, Sparkles, ArrowRight, ShieldCheck, Zap, Layers } from "lucide-react";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { SITE_URL } from "@/lib/blog/metadata";
import { generateToolsListJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: "Developer Tools Suite — Fast, Secure & Browser-Based Utilities",
  description:
    "Explore a collection of modern, client-side developer tools including Image Compressor, JSON Toolkit, and Readme & Markdown Viewer. 100% private with zero server uploads.",
  alternates: {
    canonical: `${SITE_URL}/tools`,
  },
  openGraph: {
    title: "Developer Tools Suite | Nazmus Sakib",
    description:
      "A collection of modern, fast, and secure developer utilities. Image Compressor, JSON Toolkit, and README Viewer — running 100% in your browser.",
    url: `${SITE_URL}/tools`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/about-me.png`,
        width: 1200,
        height: 630,
        alt: "Developer Tools Suite — Nazmus Sakib",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Tools Suite | Nazmus Sakib",
    description:
      "Modern, fast, client-side developer utilities: Image Compressor, JSON Toolkit, and Readme Viewer.",
    images: [`${SITE_URL}/about-me.png`],
  },
};

const tools = [
  {
    id: "image-compressor",
    title: "Image Compressor & Optimizer",
    description:
      "Compress, resize, and convert images (JPG, PNG, WebP, AVIF, HEIC, GIF, SVG) 100% in your browser. Features Target Size compression, Before/After slider, EXIF metadata stripping, and batch ZIP export.",
    icon: ImageIcon,
    href: "/tools/image-compressor",
    badge: "Available Now",
    badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    features: [
      "Compress to Target Size (e.g. 500 KB)",
      "Before / After Comparison Slider",
      "EXIF Strip & Orientation Normalizer",
      "Batch Processing & ZIP Download",
    ],
    status: "active",
  },
  {
    id: "readme-viewer",
    title: "README & Markdown Viewer",
    description:
      "A feature-rich, ultra-fast Markdown & Readme file viewer. Supports GitHub code blocks, LaTeX math, Mermaid diagrams, split view, search, workspace folder navigation, and export to PDF/HTML.",
    icon: FileText,
    href: "/tools/readme-viewer",
    badge: "Available Now",
    badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    features: [
      "Drag & Drop, File Picker & Paste",
      "Table of Contents & In-doc Search",
      "Mermaid Graphs & LaTeX Math",
      "Sanitized & Security Hardened",
    ],
    status: "active",
  },
  {
    id: "json-toolkit",
    title: "JSON Toolkit",
    description:
      "Format, validate, minify JSON, and generate TypeScript interfaces/types from JSON with custom root naming, optional/readonly flags, and syntax error position tracking.",
    icon: Braces,
    href: "/tools/json-toolkit",
    badge: "Available Now",
    badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    features: [
      "Formatter (2/4 spaces, Tab, Key Sorting)",
      "Validator with Error Line Location",
      "Minifier with Byte Savings Stats",
      "JSON → TypeScript Type Generator",
    ],
    status: "active",
  },
];

export default function ToolsPage() {
  const toolsListJsonLd = generateToolsListJsonLd();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsListJsonLd) }}
      />
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-cyan-400 text-xs sm:text-sm font-medium backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Developer Productivity Tools</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-white to-cyan-400">
            Developer Toolkit
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            A growing collection of web-based utilities designed for privacy, speed, and beautiful visual workflows. Everything runs client-side in your browser.
          </p>
        </div>

        {/* Feature Badges Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-200">100% Client-Side</h4>
              <p className="text-xs text-slate-400">Your files never leave your browser</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-200">Ultra-Fast & Offline</h4>
              <p className="text-xs text-slate-400">Instant load & responsive UI</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-200">Zero Configuration</h4>
              <p className="text-xs text-slate-400">Drag, paste & inspect instantly</p>
            </div>
          </div>
        </div>

        {/* Tools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isActive = tool.status === "active";

            return (
              <div
                key={tool.id}
                className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-300 p-6 ${
                  isActive
                    ? "bg-slate-900/60 border-slate-800 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/5 hover:-translate-y-1"
                    : "bg-slate-900/20 border-slate-900 opacity-70"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div
                      className={`p-3 rounded-xl ${
                        isActive
                          ? "bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors"
                          : "bg-slate-800/50 text-slate-500"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${tool.badgeColor}`}
                    >
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-cyan-300 transition-colors">
                    {tool.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {tool.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {tool.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/70" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {isActive ? (
                  <Link
                    href={tool.href}
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-sm hover:bg-cyan-400 transition-all shadow-md hover:shadow-cyan-500/20"
                  >
                    <span>Launch Tool</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800/40 text-slate-600 font-medium text-sm cursor-not-allowed text-center"
                  >
                    In Development
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
