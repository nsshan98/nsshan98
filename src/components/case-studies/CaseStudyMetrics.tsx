import { CaseStudyMetric } from "@/lib/case-studies/types";
import { TrendingUp, Zap, Target, Award } from "lucide-react";

interface CaseStudyMetricsProps {
  metrics: CaseStudyMetric[];
}

const icons = [TrendingUp, Zap, Target, Award];

export default function CaseStudyMetrics({ metrics }: CaseStudyMetricsProps) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <section className="my-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/90 via-cyan-950/20 to-slate-900/90 p-6 backdrop-blur-xl shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-cyan-400" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">
          Key Impact & Metrics Achieved
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = icons[index % icons.length];
          return (
            <div
              key={index}
              className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-4 transition-all duration-300 hover:border-cyan-500/40 hover:bg-slate-900/80"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 font-mono">
                  {metric.value}
                </span>
                <div className="rounded-lg bg-cyan-500/10 p-2 text-cyan-400 border border-cyan-500/20">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-sm font-bold text-slate-100">{metric.label}</div>
                {metric.description && (
                  <div className="text-xs text-slate-400 mt-1 leading-snug">
                    {metric.description}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
