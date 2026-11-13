import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog/posts";
import { getAllCaseStudies } from "@/lib/case-studies/case-studies";
import { SITE_URL, TOOLIFY_URL } from "@/lib/blog/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const caseStudies = getAllCaseStudies();

  // Find latest content modification date to maintain genuine lastmod integrity
  const latestPostDate =
    posts.length > 0
      ? new Date(posts[0].updatedAt || posts[0].publishedAt)
      : new Date("2026-11-07");

  const blogPostEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${SITE_URL}/case-studies/${cs.slug}`,
    lastModified: new Date(cs.updatedAt || cs.publishedAt),
  }));

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: latestPostDate,
    },
    {
      url: `${SITE_URL}/case-studies`,
      lastModified: latestPostDate,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: latestPostDate,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date("2026-11-13"),
    },
    {
      url: `${SITE_URL}/tools`,
      lastModified: latestPostDate,
    },
    {
      url: `${TOOLIFY_URL}/image-compressor`,
      lastModified: latestPostDate,
    },
    {
      url: `${TOOLIFY_URL}/json-toolkit`,
      lastModified: latestPostDate,
    },
    {
      url: `${TOOLIFY_URL}/readme-viewer`,
      lastModified: latestPostDate,
    },
  ];

  return [...staticPages, ...caseStudyEntries, ...blogPostEntries];
}
