import Image from "next/image";
import { cn } from "@/lib/utils";

interface BlogImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "auto";
  className?: string;
}

export default function BlogImage({
  src,
  alt,
  caption,
  width = 1200,
  height = 675,
  priority = false,
  aspectRatio = "16/9",
  className,
}: BlogImageProps) {
  const aspectClasses = {
    "16/9": "aspect-video",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    auto: "",
  };

  return (
    <figure className={cn("my-8 overflow-hidden rounded-xl", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-lg transition-transform duration-300 hover:scale-[1.005]",
          aspectClasses[aspectRatio]
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
          className="h-full w-full object-cover transition-opacity duration-300"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm italic text-slate-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
