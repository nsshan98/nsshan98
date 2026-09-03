import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog/posts";
import { getAllCaseStudies } from "@/lib/case-studies/case-studies";
import { SITE_URL } from "@/lib/blog/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const caseStudies = getAllCaseStudies();

  const blogPostEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${SITE_URL}/case-studies/${cs.slug}`,
    lastModified: new Date(cs.updatedAt || cs.publishedAt),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/case-studies`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/image-compressor`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/tools/json-toolkit`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/tools/readme-viewer`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  return [...staticPages, ...caseStudyEntries, ...blogPostEntries];
}
