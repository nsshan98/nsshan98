import type { Metadata } from "next";
import {
  getAllCaseStudies,
  getAllIndustries,
  getAllTechStack,
} from "@/lib/case-studies/case-studies";
import CaseStudyCard from "@/components/case-studies/CaseStudyCard";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Search, Layers, Cpu } from "lucide-react";
import { SITE_URL } from "@/lib/blog/metadata";

export const metadata: Metadata = {
  title: "Engineering Case Studies | Nazmus Sakib",
  description:
    "Real-world technical case studies showcasing backend architecture, high-throughput systems, database optimization, and full-stack project executions with measurable results.",
  alternates: {
    canonical: `${SITE_URL}/case-studies`,
  },
  openGraph: {
    title: "Engineering Case Studies & System Architecture | Nazmus Sakib",
    description:
      "Real-world technical case studies detailing architecture decisions, performance metrics, and business outcomes.",
    url: `${SITE_URL}/case-studies`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/about-me.png`,
        width: 1200,
        height: 630,
        alt: "Technical Case Studies — Nazmus Sakib",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Case Studies | Nazmus Sakib",
    description:
      "Real-world technical case studies detailing architecture decisions, performance metrics, and business outcomes.",
    images: [`${SITE_URL}/about-me.png`],
  },
};

interface CaseStudiesIndexPageProps {
  searchParams: Promise<{
    q?: string;
    industry?: string;
    tech?: string;
  }>;
}

export default async function CaseStudiesIndexPage({ searchParams }: CaseStudiesIndexPageProps) {
  const resolvedParams = await searchParams;
  const selectedIndustry = resolvedParams.industry;
  const selectedTech = resolvedParams.tech;
  const searchQuery = resolvedParams.q?.toLowerCase().trim();

  let caseStudies = getAllCaseStudies();
  const industries = getAllIndustries();
  const techStackList = getAllTechStack();

  // Filter case studies
  if (selectedIndustry) {
    caseStudies = caseStudies.filter(
      (cs) => cs.industry.toLowerCase() === selectedIndustry.toLowerCase()
    );
  }

  if (selectedTech) {
    caseStudies = caseStudies.filter((cs) =>
      cs.techStack.map((t) => t.toLowerCase()).includes(selectedTech.toLowerCase())
    );
  }

  if (searchQuery) {
    caseStudies = caseStudies.filter(
      (cs) =>
        cs.title.toLowerCase().includes(searchQuery) ||
        cs.description.toLowerCase().includes(searchQuery) ||
        cs.industry.toLowerCase().includes(searchQuery) ||
        (cs.client && cs.client.toLowerCase().includes(searchQuery)) ||
        cs.techStack.some((t) => t.toLowerCase().includes(searchQuery)) ||
        cs.tags.some((t) => t.toLowerCase().includes(searchQuery))
    );
  }

  const featuredCaseStudy = caseStudies.find((cs) => cs.featured) || caseStudies[0];
  const regularCaseStudies = caseStudies.filter((cs) => cs.slug !== featuredCaseStudy?.slug);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-cyan-900/20 via-blue-900/10 to-transparent blur-3xl opacity-70" />
      <div className="pointer-events-none absolute top-1/4 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/3 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      {/* Global Navigation */}
      <Navbar />

      <main className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-36 pb-24 space-y-12">
        {/* Header Hero Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge className="bg-cyan-500/15 text-cyan-300 border-cyan-500/30 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider">
            Engineering Case Studies
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-100">
            Real-World Architecture & Results
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            In-depth breakdowns of system architectures, performance optimizations, database scaling, and technical deliverables with concrete metrics.
          </p>

          {/* Search Bar */}
          <div className="pt-4">
            <form action="/case-studies" method="GET" className="relative max-w-md mx-auto">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                name="q"
                defaultValue={resolvedParams.q || ""}
                placeholder="Search case studies by tech, client, industry..."
                className="w-full rounded-xl border border-slate-800 bg-slate-900/80 py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 focus:border-cyan-500/60 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 backdrop-blur-md"
              />
            </form>
          </div>

          {/* Industry Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            <Link href="/case-studies">
              <span
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all font-medium ${
                  !selectedIndustry && !selectedTech
                    ? "bg-cyan-500 text-slate-950 border-cyan-400 font-semibold"
                    : "bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                All Projects ({getAllCaseStudies().length})
              </span>
            </Link>
            {industries.map((ind) => (
              <Link key={ind} href={`/case-studies?industry=${encodeURIComponent(ind)}`}>
                <span
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all font-medium flex items-center gap-1 ${
                    selectedIndustry?.toLowerCase() === ind.toLowerCase()
                      ? "bg-cyan-500 text-slate-950 border-cyan-400 font-semibold"
                      : "bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <Layers className="h-3 w-3" />
                  {ind}
                </span>
              </Link>
            ))}
          </div>

          {/* Active Filter Indicators */}
          {(selectedIndustry || selectedTech || searchQuery) && (
            <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
              <span>Active filter:</span>
              {selectedIndustry && (
                <Badge className="bg-cyan-950 text-cyan-300 border-cyan-700">Industry: {selectedIndustry}</Badge>
              )}
              {selectedTech && (
                <Badge className="bg-cyan-950 text-cyan-300 border-cyan-700">Tech: {selectedTech}</Badge>
              )}
              {searchQuery && (
                <Badge className="bg-cyan-950 text-cyan-300 border-cyan-700">Search: &quot;{searchQuery}&quot;</Badge>
              )}
              <Link href="/case-studies" className="text-cyan-400 underline hover:text-cyan-300 ml-1">
                Clear Filters
              </Link>
            </div>
          )}
        </section>

        {/* Featured Case Study Hero */}
        {!selectedIndustry && !selectedTech && !searchQuery && featuredCaseStudy && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cyan-400">
              <Sparkles className="h-4 w-4" />
              <span>Featured Engineering Case Study</span>
            </div>
            <CaseStudyCard caseStudy={featuredCaseStudy} featured />
          </section>
        )}

        {/* Case Studies Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
              <span>All Case Studies</span>
              <span className="text-xs font-mono text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full">
                {caseStudies.length}
              </span>
            </h2>
          </div>

          {caseStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {(!selectedIndustry && !selectedTech && !searchQuery ? regularCaseStudies : caseStudies).map(
                (cs) => (
                  <CaseStudyCard key={cs.slug} caseStudy={cs} />
                )
              )}
            </div>
          ) : (
            <div className="text-center py-16 rounded-2xl border border-dashed border-slate-800 bg-slate-900/30">
              <p className="text-slate-400 text-base">No case studies found matching your criteria.</p>
              <Link href="/case-studies" className="mt-4 inline-block text-sm text-cyan-400 underline hover:text-cyan-300 font-medium">
                View all case studies
              </Link>
            </div>
          )}
        </section>

        {/* Tech Stack Cloud */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-md space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-300">
            <Cpu className="h-4 w-4 text-cyan-400" />
            <span>Technologies & Frameworks Utilized</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {techStackList.map((t) => (
              <Link key={t} href={`/case-studies?tech=${encodeURIComponent(t)}`}>
                <span
                  className={`text-xs px-3 py-1.5 rounded-lg border font-mono transition-all ${
                    selectedTech?.toLowerCase() === t.toLowerCase()
                      ? "bg-cyan-500 text-slate-950 border-cyan-400 font-bold"
                      : "bg-slate-800/60 text-cyan-300 border-slate-700/60 hover:border-cyan-500/50 hover:text-cyan-200"
                  }`}
                >
                  {t}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
