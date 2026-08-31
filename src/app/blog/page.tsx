import type { Metadata } from "next";
import { getAllPosts, getAllCategories, getAllTags } from "@/lib/blog/posts";
import BlogCard from "@/components/blog/BlogCard";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Search, Tag, Layers } from "lucide-react";
import { SITE_URL } from "@/lib/blog/metadata";

export const metadata: Metadata = {
  title: "Blog & Technical Writing | Nazmus Sakib",
  description:
    "In-depth technical articles on backend architecture, database internals, PostgreSQL MVCC, Next.js performance, and modern web development.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "Technical Blog & Engineering Insights | Nazmus Sakib",
    description:
      "In-depth technical articles on backend architecture, database internals, PostgreSQL, and web development.",
    url: `${SITE_URL}/blog`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/about-me.png`,
        width: 1200,
        height: 630,
        alt: "Technical Blog — Nazmus Sakib",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Blog | Nazmus Sakib",
    description:
      "In-depth technical articles on backend architecture, database internals, PostgreSQL, and web development.",
    images: [`${SITE_URL}/about-me.png`],
  },
};

interface BlogIndexPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    tag?: string;
  }>;
}

export default async function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  const resolvedParams = await searchParams;
  const selectedCategory = resolvedParams.category;
  const selectedTag = resolvedParams.tag;
  const searchQuery = resolvedParams.q?.toLowerCase().trim();

  let posts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  // Filter posts based on search params
  if (selectedCategory) {
    posts = posts.filter(
      (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  if (selectedTag) {
    posts = posts.filter((p) =>
      p.tags.map((t) => t.toLowerCase()).includes(selectedTag.toLowerCase())
    );
  }

  if (searchQuery) {
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery) ||
        p.description.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery))
    );
  }

  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const regularPosts = posts.filter((p) => p.slug !== featuredPost?.slug);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Dynamic ambient backgrounds */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-cyan-900/20 via-blue-900/10 to-transparent blur-3xl opacity-70" />
      <div className="pointer-events-none absolute top-1/4 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/3 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      {/* Global Navbar */}
      <Navbar />

      <main className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-36 pb-24 space-y-12">
        {/* Header Hero Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge className="bg-cyan-500/15 text-cyan-300 border-cyan-500/30 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider">
            Technical Blog & Insights
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-100">
            Articles, Guides & Deep Dives
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Exploring database internals, high-performance web systems, frontend architecture, and practical engineering solutions.
          </p>

          {/* Search Bar & Filters */}
          <div className="pt-4">
            <form action="/blog" method="GET" className="relative max-w-md mx-auto">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                name="q"
                defaultValue={resolvedParams.q || ""}
                placeholder="Search articles by title, topic, or tag..."
                className="w-full rounded-xl border border-slate-800 bg-slate-900/80 py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 focus:border-cyan-500/60 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 backdrop-blur-md"
              />
            </form>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            <Link href="/blog">
              <span
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all font-medium ${
                  !selectedCategory && !selectedTag
                    ? "bg-cyan-500 text-slate-950 border-cyan-400 font-semibold"
                    : "bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                All Articles ({getAllPosts().length})
              </span>
            </Link>
            {categories.map((cat) => (
              <Link key={cat} href={`/blog?category=${encodeURIComponent(cat)}`}>
                <span
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all font-medium flex items-center gap-1 ${
                    selectedCategory?.toLowerCase() === cat.toLowerCase()
                      ? "bg-cyan-500 text-slate-950 border-cyan-400 font-semibold"
                      : "bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <Layers className="h-3 w-3" />
                  {cat}
                </span>
              </Link>
            ))}
          </div>

          {/* Active Filter Indicators */}
          {(selectedCategory || selectedTag || searchQuery) && (
            <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
              <span>Active filter:</span>
              {selectedCategory && (
                <Badge className="bg-cyan-950 text-cyan-300 border-cyan-700">Category: {selectedCategory}</Badge>
              )}
              {selectedTag && (
                <Badge className="bg-cyan-950 text-cyan-300 border-cyan-700">Tag: #{selectedTag}</Badge>
              )}
              {searchQuery && (
                <Badge className="bg-cyan-950 text-cyan-300 border-cyan-700">Search: &quot;{searchQuery}&quot;</Badge>
              )}
              <Link href="/blog" className="text-cyan-400 underline hover:text-cyan-300 ml-1">
                Clear Filters
              </Link>
            </div>
          )}
        </section>

        {/* Featured Post Banner (If no filter applied or featured matches) */}
        {!selectedCategory && !selectedTag && !searchQuery && featuredPost && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cyan-400">
              <Sparkles className="h-4 w-4" />
              <span>Featured Article</span>
            </div>
            <BlogCard post={featuredPost} featured />
          </section>
        )}

        {/* Article Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
              <span>All Articles</span>
              <span className="text-xs font-mono text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full">
                {posts.length}
              </span>
            </h2>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {(!selectedCategory && !selectedTag && !searchQuery ? regularPosts : posts).map(
                (post) => (
                  <BlogCard key={post.slug} post={post} />
                )
              )}
            </div>
          ) : (
            <div className="text-center py-16 rounded-2xl border border-dashed border-slate-800 bg-slate-900/30">
              <p className="text-slate-400 text-base">No articles found matching your criteria.</p>
              <Link href="/blog" className="mt-4 inline-block text-sm text-cyan-400 underline hover:text-cyan-300 font-medium">
                View all articles
              </Link>
            </div>
          )}
        </section>

        {/* Tags Cloud */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-md space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-300">
            <Tag className="h-4 w-4 text-cyan-400" />
            <span>Popular Topics & Tags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                <span
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                    selectedTag?.toLowerCase() === tag.toLowerCase()
                      ? "bg-cyan-500 text-slate-950 border-cyan-400 font-bold"
                      : "bg-slate-800/60 text-slate-300 border-slate-700/60 hover:border-cyan-500/50 hover:text-cyan-300"
                  }`}
                >
                  #{tag}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
