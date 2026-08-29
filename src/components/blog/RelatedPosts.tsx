import { BlogPostMeta } from "@/lib/blog/types";
import BlogCard from "./BlogCard";
import { Sparkles } from "lucide-react";

interface RelatedPostsProps {
  posts: BlogPostMeta[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-slate-800">
      <div className="flex items-center gap-2 mb-6 text-xl font-bold text-slate-100">
        <Sparkles className="h-5 w-5 text-cyan-400" />
        <h2>Related Articles</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
