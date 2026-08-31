import type { Metadata } from "next";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { JsonToolkitContainer } from "@/components/tools/json-toolkit/json-toolkit-container";
import { SITE_URL } from "@/lib/blog/metadata";
import { generateSoftwareAppJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: "JSON Toolkit — Formatter, Validator, Minifier & TypeScript Generator",
  description:
    "Free, fast, client-side JSON toolkit to format, validate, minify JSON, and generate clean TypeScript types and interfaces from JSON payloads instantly.",
  alternates: {
    canonical: `${SITE_URL}/tools/json-toolkit`,
  },
  openGraph: {
    title: "JSON Toolkit — Formatter, Validator & TypeScript Generator",
    description:
      "Format, validate, minify JSON, and generate clean TypeScript interfaces with error line tracking and custom root naming.",
    url: `${SITE_URL}/tools/json-toolkit`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/about-me.png`,
        width: 1200,
        height: 630,
        alt: "JSON Toolkit Developer Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Toolkit — Formatter, Validator & TypeScript Generator",
    description:
      "Format, validate, minify JSON, and convert JSON payloads to TypeScript types directly in your browser.",
    images: [`${SITE_URL}/about-me.png`],
  },
};

export default function JsonToolkitPage() {
  const appJsonLd = generateSoftwareAppJsonLd({
    name: "JSON Toolkit",
    description:
      "Client-side JSON developer toolkit for formatting, syntax validation, minification, and JSON to TypeScript code generation.",
    url: `${SITE_URL}/tools/json-toolkit`,
    applicationCategory: "DeveloperApplication",
    featureList: [
      "JSON Formatter (2/4 spaces, Tab, Key Sorting)",
      "JSON Validator with Line & Column Error Tracking",
      "JSON Minifier with Byte Savings Statistics",
      "JSON to TypeScript Type & Interface Generator",
    ],
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <Navbar />

      <main className="pt-24 pb-16 flex-1 flex flex-col">
        <JsonToolkitContainer />
      </main>

      <Footer />
    </div>
  );
}
