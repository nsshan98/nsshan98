import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbsProps {
  category?: string;
  title: string;
  className?: string;
}

export default function Breadcrumbs({ category, title, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-xs text-slate-400", className)}>
      <ol className="flex items-center space-x-1.5 sm:space-x-2 flex-wrap">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Home</span>
          </Link>
        </li>
        <li className="flex items-center">
          <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
        </li>
        <li>
          <Link href="/blog" className="hover:text-cyan-400 transition-colors">
            Blog
          </Link>
        </li>
        {category && (
          <>
            <li className="flex items-center">
              <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            </li>
            <li>
              <Link
                href={`/blog?category=${encodeURIComponent(category)}`}
                className="hover:text-cyan-400 transition-colors text-slate-300"
              >
                {category}
              </Link>
            </li>
          </>
        )}
        <li className="flex items-center">
          <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
        </li>
        <li className="truncate max-w-[200px] sm:max-w-[350px] font-medium text-slate-200" aria-current="page">
          {title}
        </li>
      </ol>
    </nav>
  );
}
