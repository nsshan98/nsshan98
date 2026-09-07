import React from "react";
import Image from "next/image";
import { CaseStudyMeta } from "@/lib/case-studies/types";
import { Building2, UserCheck, Briefcase, ExternalLink, Sparkles, Calendar } from "lucide-react";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import CaseStudyMetrics from "./CaseStudyMetrics";
import { Badge } from "@/components/ui/badge";

interface CaseStudyHeaderProps {
  caseStudy: CaseStudyMeta;
}

export default function CaseStudyHeader({ caseStudy }: CaseStudyHeaderProps) {
  const formattedDate = new Date(caseStudy.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  return (
    <header className="mb-12 space-y-8">
      {/* 2-Column Hero Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Meta, Title, Description, Specs */}
        <div className="lg:col-span-7 space-y-5">
          <Breadcrumbs rootName="Case Studies" rootPath="/case-studies" title={caseStudy.title} />

          {/* Pill Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Badge className="bg-cyan-500/15 text-cyan-300 border-cyan-500/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full">
              {caseStudy.industry}
            </Badge>
            <Badge className="bg-blue-500/15 text-blue-300 border-blue-500/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full">
              {caseStudy.category}
            </Badge>
            {caseStudy.featured && (
              <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Featured
              </Badge>
            )}
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-100 leading-[1.15]">
              {caseStudy.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {caseStudy.description || caseStudy.subtitle}
            </p>
          </div>

          {/* Specs Row with rounded circular icon badges */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-xs sm:text-sm text-slate-300 border-t border-slate-800/80 pt-4">
            {caseStudy.client && (
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
                  <Building2 className="h-3.5 w-3.5" />
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Client</span>
                  <span className="font-semibold text-slate-200">{caseStudy.client}</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
                <UserCheck className="h-3.5 w-3.5" />
              </div>
              <div>
                <span className="text-slate-400 text-xs block">My Role</span>
                <span className="font-semibold text-slate-200">{caseStudy.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
                <Briefcase className="h-3.5 w-3.5" />
              </div>
              <div>
                <span className="text-slate-400 text-xs block">Timeline</span>
                <span className="font-semibold text-slate-200">{caseStudy.timeline}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
                <Calendar className="h-3.5 w-3.5" />
              </div>
              <div>
                <span className="text-slate-400 text-xs block">Published</span>
                <span className="font-semibold text-slate-200">{formattedDate}</span>
              </div>
            </div>

            {caseStudy.liveUrl && (
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <ExternalLink className="h-3.5 w-3.5" />
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Live</span>
                  <a
                    href={caseStudy.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-cyan-300 hover:text-cyan-200 hover:underline inline-flex items-center gap-1"
                  >
                    <span>pdfgini.com</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: 3D Floating Perspective Mockup */}
        {caseStudy.featuredImage && (
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-md">
              {/* Ambient backlight glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
              
              <div className="relative overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900 shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={caseStudy.featuredImage}
                    alt={caseStudy.featuredImageAlt || caseStudy.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 450px"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4 Key Metrics Cards in a Horizontal Row */}
      {caseStudy.metrics && caseStudy.metrics.length > 0 && (
        <CaseStudyMetrics metrics={caseStudy.metrics} />
      )}
    </header>
  );
}
