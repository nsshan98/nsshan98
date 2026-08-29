import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  getPostNavigation,
} from "@/lib/blog/posts";
import {
  generateBlogMetadata,
  generateArticleJsonLd,
  generateBreadcrumbJsonLd,
} from "@/lib/blog/metadata";
import BlogPost from "@/components/blog/BlogPost";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 1. Static Generation Params
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 2. SEO Dynamic Metadata Generator
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const postModule = getPostBySlug(resolvedParams.slug);

  if (!postModule) {
    return {
      title: "Article Not Found | Portfolio",
      description: "The requested blog article could not be found.",
    };
  }

  return generateBlogMetadata(postModule.post);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const postModule = getPostBySlug(resolvedParams.slug);

  if (!postModule) {
    notFound();
  }

  const { post, default: ArticleContent } = postModule;

  const relatedPosts = getRelatedPosts(post.slug, post.tags, 2);
  const { prevPost, nextPost } = getPostNavigation(post.slug);
  const toc = post.toc || [];

  const articleJsonLd = generateArticleJsonLd(post);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(post);

  return (
    <>
      {/* Article Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Render via Global Reusable BlogPost Layout */}
      <BlogPost
        post={post}
        toc={toc}
        relatedPosts={relatedPosts}
        prevPost={prevPost}
        nextPost={nextPost}
      >
        <ArticleContent />
      </BlogPost>
    </>
  );
}
