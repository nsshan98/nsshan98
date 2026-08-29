import { BlogPostMeta } from "./types";

export function validateBlogPostMeta(meta: BlogPostMeta): void {
  if (!meta.title || meta.title.trim() === "") {
    throw new Error(`[Blog Validation] Article metadata missing title.`);
  }

  if (!meta.slug || meta.slug.trim() === "") {
    throw new Error(`[Blog Validation] Article "${meta.title}" missing slug.`);
  }

  // Slug format check: lowercase, hyphens, numbers, letters only
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(meta.slug)) {
    throw new Error(
      `[Blog Validation] Slug "${meta.slug}" in "${meta.title}" must be lowercase and hyphen-separated (e.g. "postgresql-mvcc").`
    );
  }

  if (!meta.description || meta.description.trim() === "") {
    throw new Error(`[Blog Validation] Article "${meta.title}" missing description.`);
  }

  if (!meta.publishedAt || isNaN(Date.parse(meta.publishedAt))) {
    throw new Error(
      `[Blog Validation] Article "${meta.title}" has invalid publishedAt date: "${meta.publishedAt}".`
    );
  }

  if (meta.updatedAt && isNaN(Date.parse(meta.updatedAt))) {
    throw new Error(
      `[Blog Validation] Article "${meta.title}" has invalid updatedAt date: "${meta.updatedAt}".`
    );
  }

  if (!meta.author || meta.author.trim() === "") {
    throw new Error(`[Blog Validation] Article "${meta.title}" missing author.`);
  }

  if (!meta.category || meta.category.trim() === "") {
    throw new Error(`[Blog Validation] Article "${meta.title}" missing category.`);
  }

  if (!Array.isArray(meta.tags) || meta.tags.length === 0) {
    throw new Error(`[Blog Validation] Article "${meta.title}" must have at least one tag.`);
  }

  if (meta.featuredImage && !meta.featuredImageAlt) {
    throw new Error(
      `[Blog Validation] Article "${meta.title}" specifies featuredImage but missing featuredImageAlt.`
    );
  }
}

export function validateAllPosts(posts: BlogPostMeta[]): void {
  const seenSlugs = new Set<string>();

  for (const post of posts) {
    validateBlogPostMeta(post);
    if (seenSlugs.has(post.slug)) {
      throw new Error(`[Blog Validation] Duplicate slug found: "${post.slug}". Slugs must be unique.`);
    }
    seenSlugs.add(post.slug);
  }
}
