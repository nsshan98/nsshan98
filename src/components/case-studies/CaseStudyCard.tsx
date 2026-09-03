import Link from "next/link";
import Image from "next/image";
import { CaseStudyMeta } from "@/lib/case-studies/types";
import { Calendar, ArrowUpRight, TrendingUp, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CaseStudyCardProps {
  caseStudy: CaseStudyMeta;
  featured?: boolean;
  className?: string;
}

export default function CaseStudyCard({ caseStudy, featured = false, className }: CaseStudyCardProps) {
  const formattedDate = new Date(caseStudy.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10",
        featured ? "md:grid md:grid-cols-12 md:gap-6" : "",
        className
      )}
    >
      {/* Featured Image */}
      {caseStudy.featuredImage && (
        <div
          className={cn(
            "relative overflow-hidden bg-slate-950",
            featured ? "md:col-span-6 h-64 md:h-full" : "h-52 w-full"
          )}
        >
          <Image
            src={caseStudy.featuredImage}
            alt={caseStudy.featuredImageAlt || caseStudy.title}
            fill
            sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          
          {caseStudy.client && (
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-medium text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
              <Building2 className="h-3 w-3" />
              {caseStudy.client}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div
        className={cn(
          "flex flex-1 flex-col justify-between p-5 sm:p-6",
          featured ? "md:col-span-6" : ""
        )}
      >
        <div className="space-y-3">
          {/* Industry & Date */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-cyan-500/15 text-cyan-300 border-cyan-500/30 text-xs px-2.5 py-0.5 font-medium uppercase tracking-wider">
                {caseStudy.industry}
              </Badge>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <Calendar className="h-3.5 w-3.5 text-slate-500" />
              {formattedDate}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold tracking-tight text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-2">
            <Link href={`/case-studies/${caseStudy.slug}`} className="focus:outline-none">
              <span className="absolute inset-0 z-10" />
              {caseStudy.title}
            </Link>
          </h3>

          {/* Subtitle / Description */}
          <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed">
            {caseStudy.description}
          </p>

          {/* Key Metrics Highlight Badges */}
          {caseStudy.metrics && caseStudy.metrics.length > 0 && (
            <div className="pt-2 grid grid-cols-2 gap-2">
              {caseStudy.metrics.slice(0, 2).map((m, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-lg bg-slate-950/60 p-2 border border-slate-800/80"
                >
                  <TrendingUp className="h-4 w-4 text-emerald-400 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-100 truncate">{m.value}</div>
                    <div className="text-[10px] text-slate-400 truncate">{m.label}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tech Stack Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-1.5">
            {caseStudy.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded bg-slate-800/80 px-2 py-0.5 text-[11px] font-mono text-cyan-200/80 border border-slate-700/50"
              >
                {tech}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1 font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
            View Case Study
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
