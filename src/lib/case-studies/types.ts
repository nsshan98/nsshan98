import React from "react";

export interface CaseStudyMetric {
  label: string;
  value: string;
  description?: string;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface CaseStudyMeta {
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  client?: string;
  role: string;
  timeline: string;
  industry: string;
  category: string;
  tags: string[];
  techStack: string[];
  featuredImage?: string;
  featuredImageAlt?: string;
  githubUrl?: string;
  liveUrl?: string;
  publishedAt: string;
  updatedAt?: string;
  featured?: boolean;
  readingTime?: string;
  metrics: CaseStudyMetric[];
  toc?: TableOfContentsItem[];
}

export interface CaseStudyModule {
  caseStudy: CaseStudyMeta;
  default: React.ComponentType;
}

export interface CaseStudySearchParams {
  q?: string;
  industry?: string;
  tech?: string;
  category?: string;
}
