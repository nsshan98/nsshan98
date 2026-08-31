import { SITE_URL, AUTHOR_DEFAULT } from "@/lib/blog/metadata";

export function generatePersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR_DEFAULT,
    url: SITE_URL,
    jobTitle: "Full-Stack Engineer & Software Architect",
    sameAs: [
      "https://github.com/nsshan98",
      "https://linkedin.com/in/nsshan98",
      "https://twitter.com/nsshan98",
    ],
    knowsAbout: [
      "Backend Architecture",
      "PostgreSQL",
      "Next.js",
      "React",
      "TypeScript",
      "System Design",
      "Web Performance",
    ],
  };
}

export function generateWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${AUTHOR_DEFAULT} | Portfolio & Technical Blog`,
    url: SITE_URL,
    description:
      "Portfolio, technical engineering blog, and privacy-first browser-based developer tools by Nazmus Sakib.",
    publisher: {
      "@type": "Person",
      name: AUTHOR_DEFAULT,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export interface SoftwareAppDetails {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem?: string;
  featureList?: string[];
}

export function generateSoftwareAppJsonLd(app: SoftwareAppDetails) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.description,
    url: app.url,
    applicationCategory: app.applicationCategory,
    operatingSystem: app.operatingSystem || "All (Web Browser)",
    browserRequirements: "Requires HTML5, WebAssembly, modern JavaScript browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    author: {
      "@type": "Person",
      name: AUTHOR_DEFAULT,
      url: SITE_URL,
    },
    featureList: app.featureList || [],
  };
}

export function generateToolsListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Developer Tools Suite by Nazmus Sakib",
    description:
      "A collection of ultra-fast, 100% client-side browser developer tools including Image Compressor, JSON Toolkit, and Readme Viewer.",
    url: `${SITE_URL}/tools`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Image Compressor & Optimizer",
        url: `${SITE_URL}/tools/image-compressor`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "JSON Toolkit",
        url: `${SITE_URL}/tools/json-toolkit`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "README & Markdown Viewer",
        url: `${SITE_URL}/tools/readme-viewer`,
      },
    ],
  };
}
