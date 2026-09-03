import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getRelatedCaseStudies,
  getCaseStudyNavigation,
} from "@/lib/case-studies/case-studies";
import {
  generateCaseStudyMetadata,
  generateCaseStudyJsonLd,
  generateCaseStudyBreadcrumbJsonLd,
} from "@/lib/case-studies/metadata";
import CaseStudyContent from "@/components/case-studies/CaseStudyContent";

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const caseStudies = getAllCaseStudies();
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const csModule = getCaseStudyBySlug(resolvedParams.slug);

  if (!csModule) {
    return {
      title: "Case Study Not Found | Portfolio",
      description: "The requested case study could not be found.",
    };
  }

  return generateCaseStudyMetadata(csModule.caseStudy);
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const resolvedParams = await params;
  const csModule = getCaseStudyBySlug(resolvedParams.slug);

  if (!csModule) {
    notFound();
  }

  const { caseStudy, default: ArticleContent } = csModule;

  const relatedCaseStudies = getRelatedCaseStudies(caseStudy.slug, caseStudy.tags, 2);
  const { prevCaseStudy, nextCaseStudy } = getCaseStudyNavigation(caseStudy.slug);
  const toc = caseStudy.toc || [];

  const caseStudyJsonLd = generateCaseStudyJsonLd(caseStudy);
  const breadcrumbJsonLd = generateCaseStudyBreadcrumbJsonLd(caseStudy);

  return (
    <>
      {/* Structured Data Scripts for Google & AI Crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Render via CaseStudyContent Layout */}
      <CaseStudyContent
        caseStudy={caseStudy}
        toc={toc}
        relatedCaseStudies={relatedCaseStudies}
        prevCaseStudy={prevCaseStudy}
        nextCaseStudy={nextCaseStudy}
      >
        <ArticleContent />
      </CaseStudyContent>
    </>
  );
}
