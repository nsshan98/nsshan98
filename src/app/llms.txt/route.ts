import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog/posts";
import { getAllCaseStudies } from "@/lib/case-studies/case-studies";
import { SITE_URL } from "@/lib/blog/metadata";

export async function GET() {
  const posts = getAllPosts();
  const caseStudies = getAllCaseStudies();

  const caseStudySection =
    caseStudies.length > 0
      ? caseStudies
          .map((cs) => `- [${cs.title}](${SITE_URL}/case-studies/${cs.slug}): ${cs.description}`)
          .join("\n")
      : "Real-world technical case studies detailing backend architecture decisions, performance optimizations, and business outcomes.";

  const blogSection =
    posts.length > 0
      ? posts
          .map((post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.description}`)
          .join("\n")
      : "In-depth technical writing focusing on system design, database internals, and performance.";

  const content = `# Nazmus Sakib — Full-Stack Engineer & Technical Blog

> Portfolio, technical blog, and privacy-first browser-based developer utilities built by Nazmus Sakib.

## About Author
- Name: Nazmus Sakib
- Role: Full-Stack Software Engineer & Software Architect
- Website: [${SITE_URL}](${SITE_URL})
- GitHub: [https://github.com/nsshan98](https://github.com/nsshan98)
- Expertise: Backend Architecture, PostgreSQL MVCC & Performance, Next.js, React, TypeScript, Client-side Browser Engines.

## Developer Tools Suite (/tools)
All developer utilities are 100% client-side, running directly inside the user's browser with zero server uploads for complete data privacy.

- [Image Compressor & Optimizer](${SITE_URL}/tools/image-compressor):
  - Compress, resize, and convert images (JPG, PNG, WebP, AVIF, HEIC, GIF, SVG).
  - Target size compression (e.g. compress to < 500 KB).
  - EXIF metadata removal & orientation normalization.
  - Batch ZIP archive generation.

- [JSON Toolkit](${SITE_URL}/tools/json-toolkit):
  - JSON Formatter (2/4 space indentation, Tab, key sorting).
  - JSON Validator with exact line & column error highlighting.
  - JSON Minifier with instant byte savings statistics.
  - JSON to TypeScript Type & Interface Generator.

- [README & Markdown Viewer](${SITE_URL}/tools/readme-viewer):
  - Ultra-fast Markdown and Readme preview engine.
  - GitHub-flavored Markdown, LaTeX math rendering, Mermaid diagram visualizer.
  - Split view, live editing, table of contents, in-doc search, workspace navigation, PDF/HTML export.

## Engineering Case Studies (/case-studies)
${caseStudySection}

## Technical Blog (/blog)
${blogSection}

## Contact & Links
- [Website](${SITE_URL})
- [Contact Form](${SITE_URL}/#contact)
- [Case Studies Hub](${SITE_URL}/case-studies)
- [Blog Index](${SITE_URL}/blog)
- [Tools Hub](${SITE_URL}/tools)
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
