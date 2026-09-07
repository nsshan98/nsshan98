import { CaseStudyMetric } from "@/lib/case-studies/types";
import { Zap, Clock, Cpu, ShieldCheck } from "lucide-react";

interface CaseStudyMetricsProps {
  metrics: CaseStudyMetric[];
}

const metricConfig = [
  {
    icon: Zap,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    icon: Clock,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: Cpu,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    icon: ShieldCheck,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
];

export default function CaseStudyMetrics({ metrics }: CaseStudyMetricsProps) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
      {metrics.map((metric, index) => {
        const conf = metricConfig[index % metricConfig.length];
        const Icon = conf.icon;
        return (
          <div
            key={index}
            className="flex items-center gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 sm:p-5 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/80"
          >
            <div className={`rounded-xl ${conf.bg} ${conf.border} border p-3 ${conf.color} shrink-0`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-100 font-mono tracking-tight">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-400 mt-0.5">
                {metric.description || metric.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
