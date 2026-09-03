import { CaseStudyMeta, CaseStudyModule } from "./types";
import { validateAllCaseStudies } from "./validation";
import caseStudiesMap from "@/content/case-studies/index";

export function getAllCaseStudies(): CaseStudyMeta[] {
  const caseStudies = (Object.values(caseStudiesMap) as CaseStudyModule[]).map(
    (module) => module.caseStudy
  );
  validateAllCaseStudies(caseStudies);

  // Sort descending by publication date
  return caseStudies.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getCaseStudyBySlug(slug: string): CaseStudyModule | null {
  const all = getAllCaseStudies();
  const exists = all.some((cs) => cs.slug === slug);
  if (!exists) return null;

  const csModule = caseStudiesMap[slug];
  if (!csModule) return null;
  return csModule;
}

export function getFeaturedCaseStudies(): CaseStudyMeta[] {
  return getAllCaseStudies().filter((cs) => cs.featured);
}

export function getRelatedCaseStudies(
  currentSlug: string,
  tags: string[],
  limit = 2
): CaseStudyMeta[] {
  const all = getAllCaseStudies().filter((cs) => cs.slug !== currentSlug);

  const scored = all.map((cs) => {
    let score = 0;
    cs.tags.forEach((tag) => {
      if (tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())) {
        score += 2;
      }
    });
    return { cs, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.cs);
}

export function getCaseStudyNavigation(currentSlug: string): {
  prevCaseStudy: CaseStudyMeta | null;
  nextCaseStudy: CaseStudyMeta | null;
} {
  const all = getAllCaseStudies();
  const index = all.findIndex((cs) => cs.slug === currentSlug);

  if (index === -1) return { prevCaseStudy: null, nextCaseStudy: null };

  const nextCaseStudy = index > 0 ? all[index - 1] : null;
  const prevCaseStudy = index < all.length - 1 ? all[index + 1] : null;

  return { prevCaseStudy, nextCaseStudy };
}

export function getAllIndustries(): string[] {
  const all = getAllCaseStudies();
  const industries = new Set(all.map((cs) => cs.industry));
  return Array.from(industries);
}

export function getAllTechStack(): string[] {
  const all = getAllCaseStudies();
  const techSet = new Set<string>();
  all.forEach((cs) => cs.techStack.forEach((t) => techSet.add(t)));
  return Array.from(techSet);
}
