import React from "react";
import { BlogPostMeta, TableOfContentsItem } from "@/lib/blog/types";
import BlogHeader from "./BlogHeader";
import BlogContent from "./BlogContent";
import TableOfContents from "./TableOfContents";
import RelatedPosts from "./RelatedPosts";
import PostNavigation from "./PostNavigation";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { User } from "lucide-react";

interface BlogPostProps {
  post: BlogPostMeta;
  toc?: TableOfContentsItem[];
  relatedPosts?: BlogPostMeta[];
  prevPost?: BlogPostMeta | null;
  nextPost?: BlogPostMeta | null;
  children: React.ReactNode;
}

export default function BlogPost({
  post,
  toc = [],
  relatedPosts = [],
  prevPost = null,
  nextPost = null,
  children,
}: BlogPostProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background radial gradients */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-cyan-900/15 via-blue-900/10 to-transparent blur-3xl opacity-60" />
      <div className="pointer-events-none absolute top-1/3 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      {/* Global Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 pt-28 sm:pt-36 pb-20">
        {/* Article Header */}
        <BlogHeader post={post} />

        {/* Article Content Layout: Sidebar + Main Body */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Table of Contents - Desktop Sticky Sidebar */}
          {toc.length > 0 && (
            <aside className="hidden lg:block lg:col-span-4 lg:order-2">
              <div className="sticky top-28 space-y-6">
                <TableOfContents items={toc} />
              </div>
            </aside>
          )}

          {/* Article Body */}
          <div
            className={
              toc.length > 0 ? "lg:col-span-8 lg:order-1" : "lg:col-span-12"
            }
          >
            {/* Mobile TOC */}
            {toc.length > 0 && (
              <div className="block lg:hidden mb-8">
                <TableOfContents items={toc} />
              </div>
            )}

            {/* Content wrapped in BlogContent */}
            <BlogContent>{children}</BlogContent>

            {/* Author Bio Box */}
            <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-slate-800 border-2 border-cyan-500/50 flex items-center justify-center text-cyan-400">
                {post.authorAvatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.authorAvatar} alt={post.author} className="h-full w-full object-cover" />
                ) : (
                  <User className="h-7 w-7" />
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-slate-100">{post.author}</h4>
                  {post.authorRole && (
                    <span className="text-xs text-cyan-400 font-medium">({post.authorRole})</span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Exploring systems architecture, Linux tooling, frontend patterns, and modern web development.
                </p>
              </div>
            </div>

            {/* Post Navigation (Prev / Next) */}
            <PostNavigation prevPost={prevPost} nextPost={nextPost} />

            {/* Related Posts */}
            <RelatedPosts posts={relatedPosts} />
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
