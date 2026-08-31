import { defaultSchema } from "rehype-sanitize";

/**
 * Custom Rehype-Sanitize Schema
 * Hardens markdown against XSS while allowing KaTeX, Mermaid, GitHub tables, and code blocks.
 */
export const safeSanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    "*": [
      ...(defaultSchema.attributes?.["*"] || []),
      "className",
      "class",
      "id",
      "style",
      "ariaHidden",
      "ariaLabel",
      "role",
    ],
    a: [
      "href",
      "target",
      "rel",
      "title",
    ],
    img: ["src", "alt", "title", "width", "height", "loading"],
    code: ["className", "class"],
    span: ["className", "class", "style", "ariaHidden"],
    div: ["className", "class", "style", "data*"],
    td: ["align", "valign", "colSpan", "rowSpan", "style", "className"],
    th: ["align", "valign", "colSpan", "rowSpan", "style", "className"],
  },
  protocols: {
    ...defaultSchema.protocols,
    href: ["http", "https", "mailto", "#"],
    src: ["http", "https", "data"],
  },
  tagNames: [
    ...(defaultSchema.tagNames || []),
    "mark",
    "details",
    "summary",
    "figure",
    "figcaption",
    "ins",
    "del",
    "sub",
    "sup",
    "abbr",
    "kbd",
    "code",
    "pre",
    "math",
    "semantics",
    "mrow",
    "msub",
    "msup",
    "mi",
    "mo",
    "mn",
    "annotation",
  ],
};

/**
 * DOMPurify HTML sanitizer fallback for exported HTML or raw string rendering
 */
export function sanitizeHTML(dirtyHtml: string): string {
  if (typeof window === "undefined") return dirtyHtml;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const DOMPurify = require("dompurify");
  return DOMPurify.sanitize(dirtyHtml, {
    ADD_TAGS: ["iframe"], // Allow safe embedded video frames if explicitly sanitized
    ADD_ATTR: ["target", "rel", "allowfullscreen", "frameborder"],
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|ftp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  });
}
