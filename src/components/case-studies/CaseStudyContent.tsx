import React from "react";
import { CaseStudyMeta, TableOfContentsItem } from "@/lib/case-studies/types";
import CaseStudyHeader from "./CaseStudyHeader";
import CaseStudyCTA from "./CaseStudyCTA";
import CaseStudyCard from "./CaseStudyCard";
import BlogContent from "@/components/blog/BlogContent";
import TableOfContents from "@/components/blog/TableOfContents";
import PostNavigation from "@/components/blog/PostNavigation";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { User, Sparkles } from "lucide-react";

interface CaseStudyContentProps {
  caseStudy: CaseStudyMeta;
  toc?: TableOfContentsItem[];
  relatedCaseStudies?: CaseStudyMeta[];
  prevCaseStudy?: CaseStudyMeta | null;
  nextCaseStudy?: CaseStudyMeta | null;
  children: React.ReactNode;
}

export default function CaseStudyContent({
  caseStudy,
  toc = [],
  relatedCaseStudies = [],
  prevCaseStudy = null,
  nextCaseStudy = null,
  children,
}: CaseStudyContentProps) {
  // Convert prev/next case study meta to BlogPostMeta compatible format for PostNavigation component
  const prevNav = prevCaseStudy
    ? {
        title: prevCaseStudy.title,
        slug: `case-studies/${prevCaseStudy.slug}`,
        description: prevCaseStudy.description,
        publishedAt: prevCaseStudy.publishedAt,
        author: "Nazmus Sakib",
        category: prevCaseStudy.industry,
        tags: prevCaseStudy.tags,
      }
    : null;

  const nextNav = nextCaseStudy
    ? {
        title: nextCaseStudy.title,
        slug: `case-studies/${nextCaseStudy.slug}`,
        description: nextCaseStudy.description,
        publishedAt: nextCaseStudy.publishedAt,
        author: "Nazmus Sakib",
        category: nextCaseStudy.industry,
        tags: nextCaseStudy.tags,
      }
    : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-cyan-900/20 via-blue-950/15 to-transparent blur-3xl opacity-70" />
      <div className="pointer-events-none absolute top-1/3 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      {/* Global Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 pt-28 sm:pt-36 pb-20">
        {/* Case Study Hero Header */}
        <CaseStudyHeader caseStudy={caseStudy} />

        {/* Content Layout: TOC Sidebar + Article Body */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Table of Contents - Desktop Sticky Sidebar */}
          {toc.length > 0 && (
            <aside className="hidden lg:block lg:col-span-4 lg:order-2">
              <div className="sticky top-28 space-y-6">
                <TableOfContents items={toc} />
              </div>
            </aside>
          )}

          {/* Article Body Container */}
          <div
            className={
              toc.length > 0 ? "lg:col-span-8 lg:order-1" : "lg:col-span-12"
            }
          >
            {/* Mobile TOC */}
            {toc.length > 0 && (
              <div className="block lg:hidden mb-8">
                <TableOfContents items={toc} />
              </div>
            )}

            {/* Article Content */}
            <BlogContent>{children}</BlogContent>

            {/* Conversion CTA Box */}
            <CaseStudyCTA />

            {/* Author Bio Box */}
            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-slate-800 border-2 border-cyan-500/50 flex items-center justify-center text-cyan-400 font-bold">
                <User className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-slate-100">Nazmus Sakib</h4>
                  <span className="text-xs text-cyan-400 font-medium">(Lead Architect & Engineer)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Designing scalable distributed systems, database query engines, browser engines, and high-performance Web applications.
                </p>
              </div>
            </div>

            {/* Previous / Next Case Study Navigation */}
            <PostNavigation prevPost={prevNav} nextPost={nextNav} />

            {/* Related Case Studies Grid */}
            {relatedCaseStudies.length > 0 && (
              <section className="mt-12 pt-8 border-t border-slate-800">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                  <h3 className="text-xl font-bold text-slate-100">More Technical Case Studies</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedCaseStudies.map((rel) => (
                    <CaseStudyCard key={rel.slug} caseStudy={rel} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
