import type { Metadata } from "next";
import { CaseStudyMeta } from "./types";
import { SITE_URL, AUTHOR_DEFAULT } from "@/lib/blog/metadata";

export function generateCaseStudyMetadata(cs: CaseStudyMeta): Metadata {
  const url = `${SITE_URL}/case-studies/${cs.slug}`;
  const ogImage = cs.featuredImage
    ? cs.featuredImage.startsWith("http")
      ? cs.featuredImage
      : `${SITE_URL}${cs.featuredImage}`
    : `${SITE_URL}/og-image.png`;

  return {
    title: `${cs.title} | Technical Case Study by ${AUTHOR_DEFAULT}`,
    description: cs.description,
    authors: [{ name: AUTHOR_DEFAULT }],
    keywords: [cs.industry, cs.category, ...cs.tags, ...cs.techStack],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${cs.title} — Case Study`,
      description: cs.description,
      url,
      siteName: `${AUTHOR_DEFAULT} Engineering Portfolio & Case Studies`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: cs.featuredImageAlt || cs.title,
        },
      ],
      type: "article",
      publishedTime: cs.publishedAt,
      modifiedTime: cs.updatedAt || cs.publishedAt,
      authors: [AUTHOR_DEFAULT],
      tags: cs.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: cs.title,
      description: cs.description,
      images: [ogImage],
    },
  };
}

export function generateCaseStudyJsonLd(cs: CaseStudyMeta) {
  const url = `${SITE_URL}/case-studies/${cs.slug}`;
  const ogImage = cs.featuredImage
    ? cs.featuredImage.startsWith("http")
      ? cs.featuredImage
      : `${SITE_URL}${cs.featuredImage}`
    : `${SITE_URL}/og-image.png`;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: cs.title,
    headline: cs.subtitle || cs.title,
    description: cs.description,
    image: [ogImage],
    datePublished: cs.publishedAt,
    dateModified: cs.updatedAt || cs.publishedAt,
    author: {
      "@type": "Person",
      name: AUTHOR_DEFAULT,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: AUTHOR_DEFAULT,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: [...cs.tags, ...cs.techStack].join(", "),
    about: {
      "@type": "Thing",
      name: cs.industry,
    },
  };
}

export function generateCaseStudyBreadcrumbJsonLd(cs: CaseStudyMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Case Studies",
        item: `${SITE_URL}/case-studies`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cs.title,
        item: `${SITE_URL}/case-studies/${cs.slug}`,
      },
    ],
  };
}
