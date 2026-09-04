import Link from "next/link";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 pt-32 pb-20 max-w-3xl mx-auto">
        <div className="h-20 w-20 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 shadow-lg shadow-cyan-500/10">
          <FileQuestion className="h-10 w-10" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100 mb-4">
          404 <span className="text-cyan-400">— Page Not Found</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed mb-8">
          The requested page or technical resource could not be found. It may have been moved, renamed, or is under development.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition-colors shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>Explore Case Studies</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
