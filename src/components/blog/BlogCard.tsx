import Link from "next/link";
import Image from "next/image";
import { BlogPostMeta } from "@/lib/blog/types";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPostMeta;
  featured?: boolean;
  className?: string;
}

export default function BlogCard({ post, featured = false, className }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10",
        featured ? "md:grid md:grid-cols-12 md:gap-6" : "",
        className
      )}
    >
      {/* Thumbnail */}
      {post.featuredImage && (
        <div
          className={cn(
            "relative overflow-hidden bg-slate-950",
            featured ? "md:col-span-6 h-56 md:h-full" : "h-48 w-full"
          )}
        >
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt || post.title}
            fill
            sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60" />
        </div>
      )}

      {/* Content */}
      <div
        className={cn(
          "flex flex-1 flex-col justify-between p-5 sm:p-6",
          featured ? "md:col-span-6" : ""
        )}
      >
        <div className="space-y-3">
          {/* Category & Date badge */}
          <div className="flex items-center justify-between gap-2">
            <Badge className="bg-cyan-500/15 text-cyan-300 border-cyan-500/30 text-xs px-2.5 py-0.5 font-medium uppercase tracking-wider">
              {post.category}
            </Badge>
            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-slate-500" />
                {formattedDate}
              </span>
              {post.readingTime && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-slate-500" />
                  {post.readingTime}
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold tracking-tight text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-2">
            <Link href={`/blog/${post.slug}`} className="focus:outline-none">
              <span className="absolute inset-0 z-10" />
              {post.title}
            </Link>
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed">
            {post.description}
          </p>
        </div>

        {/* Footer info: tags & read article link */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-slate-500">
                #{tag}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1 font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
            Read Article
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
