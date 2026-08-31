import type { Metadata } from "next";
import { BlogPostMeta } from "./types";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bysakib.com";

export const AUTHOR_DEFAULT = "Nazmus Sakib";

export function generateBlogMetadata(post: BlogPostMeta): Metadata {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const ogImage = post.featuredImage
    ? post.featuredImage.startsWith("http")
      ? post.featuredImage
      : `${SITE_URL}${post.featuredImage}`
    : `${SITE_URL}/og-image.png`;

  return {
    title: `${post.title} | ${post.author || AUTHOR_DEFAULT}`,
    description: post.description,
    authors: [{ name: post.author || AUTHOR_DEFAULT }],
    keywords: [post.category, ...post.tags],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: `${AUTHOR_DEFAULT} Portfolio & Technical Blog`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.featuredImageAlt || post.title,
        },
      ],
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author || AUTHOR_DEFAULT],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

export function generateArticleJsonLd(post: BlogPostMeta) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const ogImage = post.featuredImage
    ? post.featuredImage.startsWith("http")
      ? post.featuredImage
      : `${SITE_URL}${post.featuredImage}`
    : `${SITE_URL}/og-image.png`;

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.description,
    image: [ogImage],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author || AUTHOR_DEFAULT,
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
    articleSection: post.category,
    keywords: post.tags.join(", "),
  };
}

export function generateBreadcrumbJsonLd(post: BlogPostMeta) {
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
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };
}
