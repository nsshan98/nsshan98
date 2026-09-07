import React from "react";
import { CaseStudyMeta, TableOfContentsItem } from "@/lib/case-studies/types";
import CaseStudyHeader from "./CaseStudyHeader";
import CaseStudyCTA from "./CaseStudyCTA";
import CaseStudyCard from "./CaseStudyCard";
import TableOfContents from "@/components/blog/TableOfContents";
import PostNavigation from "@/components/blog/PostNavigation";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import Link from "next/link";
import { User, ArrowRight } from "lucide-react";

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
    <div className="min-h-screen bg-slate-950 text-slate-100 relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Ambient background glow (contained in its own overflow container so vertical sticky works) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-cyan-900/20 via-blue-950/15 to-transparent blur-3xl opacity-70" />
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Global Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-20">
        {/* Case Study Hero Header */}
        <CaseStudyHeader caseStudy={caseStudy} />

        {/* Content Layout: TOC Sidebar + Article Body */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Table of Contents - Desktop Sticky Sidebar */}
          {toc.length > 0 && (
            <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 lg:order-2 sticky top-28 self-start space-y-5 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1 pb-4 scrollbar-none z-20">
              <TableOfContents items={toc} />

              {/* Sidebar Mini CTA */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-3 backdrop-blur-md">
                <h4 className="text-sm font-bold text-slate-100">
                  Interested in building something similar?
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Let&apos;s discuss your project and turn your ideas into reality.
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02]"
                >
                  <span>Let&apos;s Talk</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </aside>
          )}

          {/* Article Body Container */}
          <div
            className={
              toc.length > 0 ? "lg:col-span-8 xl:col-span-9 lg:order-1" : "lg:col-span-12"
            }
          >
            {/* Mobile TOC */}
            {toc.length > 0 && (
              <div className="block lg:hidden mb-8">
                <TableOfContents items={toc} />
              </div>
            )}

            {/* Article Content */}
            <div className="w-full text-slate-300 leading-relaxed space-y-12">
              {children}
            </div>

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
              <section className="mt-14 pt-8 border-t border-slate-800">
                <div className="flex items-center justify-between mb-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-100">Related Case Studies</h3>
                    <p className="text-xs text-slate-400">More projects you might find interesting</p>
                  </div>
                  <Link
                    href="/case-studies"
                    className="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>View All Case Studies</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
