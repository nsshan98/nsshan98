import React from "react";

export interface BlogPostMeta {
  title: string;
  slug: string;
  description: string;
  publishedAt: string; // ISO date string, e.g. "2026-08-29"
  updatedAt?: string;
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  featuredImageAlt?: string;
  readingTime?: string;
  featured?: boolean;
  toc?: TableOfContentsItem[];
}

export interface BlogPostModule {
  post: BlogPostMeta;
  default: React.ComponentType;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface BlogSearchParams {
  q?: string;
  category?: string;
  tag?: string;
}
