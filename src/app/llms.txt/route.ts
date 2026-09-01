import { NextResponse } from "next/server";

export async function GET() {
  const content = `# Nazmus Sakib — Full-Stack Engineer & Technical Blog

> Portfolio, technical blog, and privacy-first browser-based developer utilities built by Nazmus Sakib.

## About Author
- Name: Nazmus Sakib
- Role: Full-Stack Software Engineer & Software Architect
- Website: [https://bysakib.com](https://bysakib.com)
- GitHub: [https://github.com/nsshan98](https://github.com/nsshan98)
- Expertise: Backend Architecture, PostgreSQL MVCC & Performance, Next.js, React, TypeScript, Client-side Browser Engines.

## Developer Tools Suite (/tools)
All developer utilities are 100% client-side, running directly inside the user's browser with zero server uploads for complete data privacy.

- [Image Compressor & Optimizer](https://bysakib.com/tools/image-compressor):
  - Compress, resize, and convert images (JPG, PNG, WebP, AVIF, HEIC, GIF, SVG).
  - Target size compression (e.g. compress to < 500 KB).
  - EXIF metadata removal & orientation normalization.
  - Batch ZIP archive generation.

- [JSON Toolkit](https://bysakib.com/tools/json-toolkit):
  - JSON Formatter (2/4 space indentation, Tab, key sorting).
  - JSON Validator with exact line & column error highlighting.
  - JSON Minifier with instant byte savings statistics.
  - JSON to TypeScript Type & Interface Generator.

- [README & Markdown Viewer](https://bysakib.com/tools/readme-viewer):
  - Ultra-fast Markdown and Readme preview engine.
  - GitHub-flavored Markdown, LaTeX math rendering, Mermaid diagram visualizer.
  - Split view, live editing, table of contents, in-doc search, workspace navigation, PDF/HTML export.

## Technical Blog (/blog)
In-depth technical writing focusing on system design, database internals, and performance:
- [PostgreSQL MVCC, vacuuming, indexing, and lock contention](https://bysakib.com/blog)
- [Next.js App Router performance, caching, and server components](https://bysakib.com/blog)
- [Frontend state management and client-side browser storage engines](https://bysakib.com/blog)

## Contact & Links
- [Website](https://bysakib.com)
- [Contact Form](https://bysakib.com/#contact)
- [Blog Index](https://bysakib.com/blog)
- [Tools Hub](https://bysakib.com/tools)
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
