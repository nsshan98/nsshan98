import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog/posts";
import { getAllCaseStudies } from "@/lib/case-studies/case-studies";
import { SITE_URL, AUTHOR_DEFAULT } from "@/lib/blog/metadata";

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}

export async function GET() {
  const posts = getAllPosts();
  const caseStudies = getAllCaseStudies();

  const itemsXml = [
    ...posts.map((post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author>hello@bysakib.com (${escapeXml(post.author || AUTHOR_DEFAULT)})</author>
      <category>${escapeXml(post.category)}</category>
    </item>`),
    ...caseStudies.map((cs) => `
    <item>
      <title>${escapeXml(cs.title)}</title>
      <link>${SITE_URL}/case-studies/${cs.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/case-studies/${cs.slug}</guid>
      <description>${escapeXml(cs.description)}</description>
      <pubDate>${new Date(cs.publishedAt || "2026-11-01").toUTCString()}</pubDate>
      <author>hello@bysakib.com (${escapeXml(AUTHOR_DEFAULT)})</author>
      <category>${escapeXml(cs.category)}</category>
    </item>`),
  ].join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${AUTHOR_DEFAULT} — Technical Blog & Engineering Case Studies`)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml("In-depth technical articles, system architecture, database performance, and browser developer utilities by Nazmus Sakib.")}</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

