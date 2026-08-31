import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import ImageCompressorContainer from "@/components/tools/image-compressor/image-compressor-container";
import { SITE_URL } from "@/lib/blog/metadata";
import { generateSoftwareAppJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: "Online Image Compressor & Converter (JPG, PNG, WebP, AVIF, HEIC)",
  description:
    "Free, fast, client-side image compressor. Compress images to target file size (e.g. <500KB), remove EXIF data, convert WebP, AVIF, JPEG, HEIC, PNG with 100% browser privacy.",
  alternates: {
    canonical: `${SITE_URL}/tools/image-compressor`,
  },
  openGraph: {
    title: "Image Compressor & Optimizer | Browser Developer Tools",
    description:
      "Compress, resize, and convert images directly inside your browser. Target size compression, before/after comparison, EXIF stripping, and batch ZIP export.",
    url: `${SITE_URL}/tools/image-compressor`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/about-me.png`,
        width: 1200,
        height: 630,
        alt: "Browser Image Compressor & Optimizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Compressor & Optimizer | Browser Developer Tools",
    description:
      "Free, private, client-side image compression tool. Convert JPG, PNG, WebP, AVIF, HEIC with zero server uploads.",
    images: [`${SITE_URL}/about-me.png`],
  },
};

export default function ImageCompressorPage() {
  const appJsonLd = generateSoftwareAppJsonLd({
    name: "Image Compressor & Optimizer",
    description:
      "Fast, private, client-side browser image compression & format converter supporting JPG, PNG, WebP, AVIF, HEIC, GIF, and SVG.",
    url: `${SITE_URL}/tools/image-compressor`,
    applicationCategory: "DeveloperApplication",
    featureList: [
      "Target Size Compression",
      "Before/After Comparison Slider",
      "EXIF Strip & Orientation Normalization",
      "Batch Processing & ZIP Download",
      "100% Client-Side Privacy",
    ],
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Developer Tools</span>
          </Link>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-cyan-400 text-xs font-medium backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Ultra-Fast Client-Side Media Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-white to-cyan-400">
            Browser Image Compressor
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Resize, convert, and compress images directly inside your browser. High-quality WebP, AVIF, JPEG & PNG optimization with zero server uploads and 100% privacy.
          </p>
        </div>

        {/* Main Application Interface */}
        <ImageCompressorContainer />
      </main>

      <Footer />
    </div>
  );
}
