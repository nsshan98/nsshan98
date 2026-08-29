import { BlogPostMeta } from "@/lib/blog/types";
import { Calendar, Clock, User, Tag } from "lucide-react";
import BlogImage from "./BlogImage";
import Breadcrumbs from "./Breadcrumbs";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface BlogHeaderProps {
  post: BlogPostMeta;
}

export default function BlogHeader({ post }: BlogHeaderProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedUpdateDate = post.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <header className="mb-10 space-y-6">
      <Breadcrumbs category={post.category} title={post.title} />

      {/* Category & Featured tag */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <Link href={`/blog?category=${encodeURIComponent(post.category)}`}>
          <Badge className="bg-cyan-500/15 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/25 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            {post.category}
          </Badge>
        </Link>
        {post.featured && (
          <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            Featured
          </Badge>
        )}
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-100 leading-[1.15]">
        {post.title}
      </h1>

      {/* Description */}
      <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
        {post.description}
      </p>

      {/* Author & Meta Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-slate-800 py-4 text-xs sm:text-sm text-slate-400">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-800 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold">
            {post.authorAvatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.authorAvatar} alt={post.author} className="h-full w-full object-cover" />
            ) : (
              <User className="h-5 w-5" />
            )}
          </div>
          <div>
            <div className="font-semibold text-slate-200">{post.author}</div>
            {post.authorRole && <div className="text-xs text-slate-400">{post.authorRole}</div>}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-cyan-400" />
            <time dateTime={post.publishedAt}>{formattedDate}</time>
            {formattedUpdateDate && (
              <span className="text-slate-500 text-xs ml-1">(Updated {formattedUpdateDate})</span>
            )}
          </div>
          {post.readingTime && (
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-cyan-400" />
              <span>{post.readingTime}</span>
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <Tag className="h-3.5 w-3.5 text-slate-500" />
          {post.tags.map((tag) => (
            <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
              <span className="text-xs text-slate-400 hover:text-cyan-400 bg-slate-800/60 border border-slate-700/60 rounded-md px-2.5 py-1 transition-colors">
                #{tag}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Featured Image */}
      {post.featuredImage && (
        <BlogImage
          src={post.featuredImage}
          alt={post.featuredImageAlt || post.title}
          priority
          aspectRatio="16/9"
        />
      )}
    </header>
  );
}
