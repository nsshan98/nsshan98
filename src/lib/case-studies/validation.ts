import { CaseStudyMeta } from "./types";

export function validateCaseStudyMeta(meta: CaseStudyMeta): void {
  if (!meta.title || meta.title.trim() === "") {
    throw new Error(`[Case Study Validation] Case study metadata missing title.`);
  }

  if (!meta.slug || meta.slug.trim() === "") {
    throw new Error(`[Case Study Validation] Case study "${meta.title}" missing slug.`);
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(meta.slug)) {
    throw new Error(
      `[Case Study Validation] Slug "${meta.slug}" in "${meta.title}" must be lowercase and hyphen-separated.`
    );
  }

  if (!meta.description || meta.description.trim() === "") {
    throw new Error(`[Case Study Validation] Case study "${meta.title}" missing description.`);
  }

  if (!meta.publishedAt || isNaN(Date.parse(meta.publishedAt))) {
    throw new Error(
      `[Case Study Validation] Case study "${meta.title}" has invalid publishedAt date: "${meta.publishedAt}".`
    );
  }

  if (meta.updatedAt && isNaN(Date.parse(meta.updatedAt))) {
    throw new Error(
      `[Case Study Validation] Case study "${meta.title}" has invalid updatedAt date: "${meta.updatedAt}".`
    );
  }

  if (!meta.role || meta.role.trim() === "") {
    throw new Error(`[Case Study Validation] Case study "${meta.title}" missing role.`);
  }

  if (!meta.industry || meta.industry.trim() === "") {
    throw new Error(`[Case Study Validation] Case study "${meta.title}" missing industry.`);
  }

  if (!Array.isArray(meta.tags) || meta.tags.length === 0) {
    throw new Error(`[Case Study Validation] Case study "${meta.title}" must have at least one tag.`);
  }

  if (!Array.isArray(meta.techStack) || meta.techStack.length === 0) {
    throw new Error(`[Case Study Validation] Case study "${meta.title}" must have at least one tech stack item.`);
  }

  if (!Array.isArray(meta.metrics)) {
    throw new Error(`[Case Study Validation] Case study "${meta.title}" must have a metrics array.`);
  }

  if (meta.featuredImage && !meta.featuredImageAlt) {
    throw new Error(
      `[Case Study Validation] Case study "${meta.title}" specifies featuredImage but missing featuredImageAlt.`
    );
  }
}

export function validateAllCaseStudies(caseStudies: CaseStudyMeta[]): void {
  const seenSlugs = new Set<string>();

  for (const cs of caseStudies) {
    validateCaseStudyMeta(cs);
    if (seenSlugs.has(cs.slug)) {
      throw new Error(`[Case Study Validation] Duplicate slug found: "${cs.slug}". Slugs must be unique.`);
    }
    seenSlugs.add(cs.slug);
  }
}
