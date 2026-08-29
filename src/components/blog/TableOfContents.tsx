import { TableOfContentsItem } from "@/lib/blog/types";
import { ListOrdered } from "lucide-react";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  className?: string;
}

export default function TableOfContents({ items, className }: TableOfContentsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        "rounded-xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 backdrop-blur-md",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 font-semibold text-slate-200 text-sm">
        <ListOrdered className="h-4 w-4 text-cyan-400" />
        <span>Table of Contents</span>
      </div>
      <ul className="mt-3 space-y-2 text-xs sm:text-sm">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(
              "transition-colors hover:text-cyan-400",
              item.level === 3 ? "ml-4 text-slate-400" : "text-slate-300 font-medium"
            )}
          >
            <a
              href={`#${item.id}`}
              className="block py-1 leading-snug hover:underline focus:outline-none focus:text-cyan-400"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
