import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import ImageCompressorContainer from "@/components/tools/image-compressor/image-compressor-container";

export const metadata = {
  title: "Image Compressor & Optimizer | Nazmus Sakib",
  description:
    "Fast, private, client-side image compression & resize tool. Convert JPG, PNG, WebP, AVIF, HEIC, and GIF directly in your browser.",
};

export default function ImageCompressorPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
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
