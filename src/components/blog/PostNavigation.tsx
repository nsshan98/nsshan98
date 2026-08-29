import Link from "next/link";
import { BlogPostMeta } from "@/lib/blog/types";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PostNavigationProps {
  prevPost: BlogPostMeta | null;
  nextPost: BlogPostMeta | null;
}

export default function PostNavigation({ prevPost, nextPost }: PostNavigationProps) {
  if (!prevPost && !nextPost) return null;

  return (
    <nav
      aria-label="Post navigation"
      className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {/* Previous Post */}
      {prevPost ? (
        <Link
          href={`/blog/${prevPost.slug}`}
          className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/40 p-4 transition-all hover:border-cyan-500/40 hover:bg-slate-900/80"
        >
          <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-cyan-400">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Previous Article
          </span>
          <span className="mt-2 text-sm font-bold text-slate-200 group-hover:text-cyan-300 line-clamp-2">
            {prevPost.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {/* Next Post */}
      {nextPost ? (
        <Link
          href={`/blog/${nextPost.slug}`}
          className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-right transition-all hover:border-cyan-500/40 hover:bg-slate-900/80 sm:col-start-2"
        >
          <span className="flex items-center justify-end gap-1 text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-cyan-400">
            Next Article
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
          <span className="mt-2 text-sm font-bold text-slate-200 group-hover:text-cyan-300 line-clamp-2">
            {nextPost.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
