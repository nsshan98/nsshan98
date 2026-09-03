import Link from "next/link";
import { MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CaseStudyCTA() {
  return (
    <section className="my-12 relative overflow-hidden rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            Engineering Collaboration
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
            Have a complex technical challenge or high-scale system to build?
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            I specialize in full-stack architecture, high-throughput backend design, and high-performance frontend applications. Let&apos;s build something exceptional together.
          </p>
        </div>

        <div className="shrink-0">
          <Link href="/#contact">
            <Button className="bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 shadow-lg shadow-cyan-500/20 px-6 py-5 text-sm gap-2">
              <MessageSquare className="h-4 w-4" />
              Get In Touch
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
