import { CaseStudyMeta } from "@/lib/case-studies/types";
import { Calendar, Building2, UserCheck, Briefcase, ExternalLink, Github } from "lucide-react";
import BlogImage from "@/components/blog/BlogImage";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import CaseStudyMetrics from "./CaseStudyMetrics";
import { Badge } from "@/components/ui/badge";

interface CaseStudyHeaderProps {
  caseStudy: CaseStudyMeta;
}

export default function CaseStudyHeader({ caseStudy }: CaseStudyHeaderProps) {
  const formattedDate = new Date(caseStudy.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="mb-10 space-y-6">
      <Breadcrumbs category="Case Studies" title={caseStudy.title} />

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <Badge className="bg-cyan-500/15 text-cyan-300 border-cyan-500/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
          {caseStudy.industry}
        </Badge>
        <Badge className="bg-slate-800 text-slate-300 border-slate-700 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
          {caseStudy.category}
        </Badge>
        {caseStudy.featured && (
          <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            Featured Case Study
          </Badge>
        )}
      </div>

      {/* Main Title & Subtitle */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-100 leading-[1.15]">
          {caseStudy.title}
        </h1>
        {caseStudy.subtitle && (
          <p className="text-lg sm:text-xl text-cyan-200/90 font-medium leading-relaxed">
            {caseStudy.subtitle}
          </p>
        )}
      </div>

      {/* Description */}
      <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
        {caseStudy.description}
      </p>

      {/* Project Specs Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-xs sm:text-sm backdrop-blur-md">
        {caseStudy.client && (
          <div>
            <div className="flex items-center gap-1.5 text-slate-400 font-medium mb-1">
              <Building2 className="h-3.5 w-3.5 text-cyan-400" />
              Client / Project
            </div>
            <div className="font-semibold text-slate-200">{caseStudy.client}</div>
          </div>
        )}

        <div>
          <div className="flex items-center gap-1.5 text-slate-400 font-medium mb-1">
            <UserCheck className="h-3.5 w-3.5 text-cyan-400" />
            My Role
          </div>
          <div className="font-semibold text-slate-200">{caseStudy.role}</div>
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-slate-400 font-medium mb-1">
            <Briefcase className="h-3.5 w-3.5 text-cyan-400" />
            Timeline
          </div>
          <div className="font-semibold text-slate-200">{caseStudy.timeline}</div>
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-slate-400 font-medium mb-1">
            <Calendar className="h-3.5 w-3.5 text-cyan-400" />
            Published
          </div>
          <div className="font-semibold text-slate-200 font-mono">{formattedDate}</div>
        </div>
      </div>

      {/* Tech Stack & External Action Links */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider mr-1">
            Tech Stack:
          </span>
          {caseStudy.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs text-cyan-300 bg-slate-950 border border-slate-800 rounded-md px-2.5 py-1 font-mono"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {caseStudy.githubUrl && (
            <a
              href={caseStudy.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <Github className="h-3.5 w-3.5" />
              Source Code
            </a>
          )}
          {caseStudy.liveUrl && (
            <a
              href={caseStudy.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live Demo
            </a>
          )}
        </div>
      </div>

      {/* Metrics Banner */}
      {caseStudy.metrics && caseStudy.metrics.length > 0 && (
        <CaseStudyMetrics metrics={caseStudy.metrics} />
      )}

      {/* Featured Cover Image */}
      {caseStudy.featuredImage && (
        <BlogImage
          src={caseStudy.featuredImage}
          alt={caseStudy.featuredImageAlt || caseStudy.title}
          priority
          aspectRatio="16/9"
        />
      )}
    </header>
  );
}
