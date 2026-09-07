import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CaseStudyCTA() {
  return (
    <section className="my-14 relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-blue-950/30 to-slate-900 p-8 sm:p-10 backdrop-blur-xl shadow-2xl">
      <div className="absolute top-0 right-0 -mt-8 -mr-8 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Ready to build something amazing?
          </h3>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Let&apos;s discuss how we can bring your idea to life with modern technology and scalable architecture.
          </p>
        </div>

        <div className="shrink-0 w-full sm:w-auto">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.02]"
          >
            <span>Let&apos;s Talk About Your Project</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
