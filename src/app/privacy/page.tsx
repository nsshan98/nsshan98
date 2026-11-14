import type { Metadata } from "next";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, Server, AlertCircle } from "lucide-react";
import { SITE_URL } from "@/lib/blog/metadata";

export const metadata: Metadata = {
  title: "Privacy Policy & Terms",
  description:
    "Privacy policy and data guarantee for Nazmus Sakib's portfolio and browser developer tools: zero server storage.",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
  openGraph: {
    title: "Privacy Policy & Terms | Nazmus Sakib",
    description:
      "Privacy policy and data guarantee for Nazmus Sakib's portfolio and browser developer tools: zero server storage.",
    url: `${SITE_URL}/privacy`,
    siteName: "Nazmus Sakib",
    type: "website",
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />

      <main className="container mx-auto max-w-4xl px-4 sm:px-6 pt-32 pb-24 flex-1">
        {/* Header */}
        <div className="mb-12 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400 mb-4">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Transparency & Trust</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Privacy Policy & Terms of Use
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Last updated: November 13, 2026 · Effective immediately
          </p>
        </div>

        {/* Content sections */}
        <div className="space-y-12 text-slate-300 leading-relaxed">
          {/* Section 1: Developer Tools Guarantee */}
          <section className="space-y-4 rounded-2xl border border-cyan-500/20 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 text-cyan-400">
              <Server className="h-6 w-6" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                1. Developer Tools & Zero-Server-Storage Guarantee
              </h2>
            </div>
            <p>
              All utilities hosted under <strong className="text-slate-100">toolify.bysakib.com</strong> (including the <em>Image Compressor & Optimizer</em>, <em>JSON Toolkit</em>, and <em>README & Markdown Viewer</em>) are engineered as <strong>100% client-side web applications</strong>.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-slate-300">
              <li>
                <strong>No Server Uploads:</strong> When you select, drag-and-drop, or paste files (such as images, markdown documents, or JSON payloads), they are processed strictly inside your device&apos;s browser memory using WebAssembly, HTML5 Canvas, and modern Web APIs.
              </li>
              <li>
                <strong>Zero Data Retention:</strong> We do not log, upload, inspect, or retain your files, documents, or data on any external server or database.
              </li>
              <li>
                <strong>Clipy Relay:</strong> Real-time device synchronization through Clipy uses ephemeral in-memory WebSockets with zero persistent cloud storage. Data packets are purged from memory immediately upon delivery.
              </li>
            </ul>
          </section>

          {/* Section 2: Analytics & Cookies */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-cyan-400">
              <Eye className="h-6 w-6" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                2. Analytics & Cookies
              </h2>
            </div>
            <p>
              This website uses <strong>Google Analytics (gtag.js)</strong> to measure aggregate visitor metrics (such as page views, referral sources, operating systems, and session duration). This helps us understand which technical articles and developer utilities are most helpful.
            </p>
            <p className="text-sm text-slate-400">
              Google Analytics sets anonymous first-party cookies. We do not sell, rent, or monetize your analytics data. You may disable cookies or use browser privacy extensions (such as uBlock Origin or Privacy Badger) without affecting site functionality or access to any developer tools.
            </p>
          </section>

          {/* Section 3: Communications */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-cyan-400">
              <Lock className="h-6 w-6" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                3. Communications & Contact Inquiries
              </h2>
            </div>
            <p>
              When you send an inquiry via the website contact form, your name, email address, and message are securely transmitted via EmailJS directly to Nazmus Sakib.
            </p>
            <p>
              Your contact details are used solely to reply to your inquiry or discuss software engineering collaborations. They are never shared, sold, or added to automated marketing newsletters.
            </p>
          </section>

          {/* Section 4: Terms of Use & Disclaimer */}
          <section className="space-y-4 border-t border-slate-800 pt-8">
            <div className="flex items-center gap-3 text-amber-400">
              <AlertCircle className="h-6 w-6" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                4. Terms of Use & Software Disclaimer
              </h2>
            </div>
            <p className="text-sm sm:text-base">
              The technical articles, architectural guides, code snippets, and browser-based developer utilities published on this website are provided on an <strong>&ldquo;as is&rdquo; and &ldquo;as available&rdquo;</strong> basis without warranty of any kind, whether express or implied.
            </p>
            <p className="text-sm text-slate-400">
              While every effort is made to ensure the accuracy and security of scripts, configuration guides, and tools, Nazmus Sakib shall not be held liable for any damages, downtime, or data loss arising from your deployment or reliance on information or utilities found here.
            </p>
          </section>

          {/* Section 5: Contact */}
          <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-white">Questions or Feedback?</h3>
              <p className="text-sm text-slate-400">
                Feel free to get in touch regarding privacy practices or technical tools.
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition-colors shrink-0"
            >
              <span>Contact Nazmus Sakib</span>
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

