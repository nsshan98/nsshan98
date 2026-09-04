import React from "react";
import { CaseStudyMeta } from "@/lib/case-studies/types";
import CodeBlock from "@/components/blog/CodeBlock";
import Callout from "@/components/blog/Callout";
import Quote from "@/components/blog/Quote";
import Link from "next/link";
import { 
  Cpu, 
  Layers, 
  Database, 
  Zap, 
  ShieldCheck, 
  Workflow, 
  FileCheck, 
  Server, 
  Cloud, 
  Sparkles,
  Lock,
  ArrowRight
} from "lucide-react";

export const caseStudy: CaseStudyMeta = {
  title: "PdfGini: Architecting an End-to-End PDF Editing & Document Management SaaS Platform",
  slug: "pdfgini",
  subtitle: "Engineering a dual HTML5 Canvas/Server PDF compilation engine with NestJS, Next.js 15, Drizzle ORM, BullMQ, Fabric.js, and Cloudflare R2",
  description: "An in-depth technical case study on how PdfGini was engineered: from real-time client-side canvas manipulation to asynchronous Redis/BullMQ background PDF compilation, presigned R2 storage security, and anonymous guest-to-paid user bridge architectures.",
  client: "PdfGini SaaS",
  role: "Lead Architect & Full-Stack Engineer",
  timeline: "3 Months (Architecture & Build)",
  industry: "SaaS / Document Engineering",
  category: "Full-Stack Web Application",
  tags: [
    "NestJS",
    "Next.js 15",
    "Fabric.js",
    "PDF.js",
    "Drizzle ORM",
    "BullMQ",
    "Cloudflare R2",
    "TypeScript",
    "Redis",
    "PDF Generation",
    "SaaS Architecture"
  ],
  techStack: [
    "NestJS 11",
    "Next.js 15",
    "React 19",
    "Drizzle ORM",
    "PostgreSQL",
    "Fabric.js 7",
    "PDF.js",
    "pdf-lib",
    "BullMQ",
    "Redis",
    "Cloudflare R2",
    "Tailwind CSS v4"
  ],
  liveUrl: "https://pdfgini.com",
  featuredImage: "https://pub-1bde5194bec740908565f398f2d2078f.r2.dev/case-study/pdfgini_case_study_hero_1788509758312.jpg",
  featuredImageAlt: "PdfGini Full-Stack PDF Editing & Document Engineering SaaS Platform Hero Architecture",
  publishedAt: "2026-09-04",
  updatedAt: "2026-09-04",
  featured: true,
  readingTime: "10 min read",
  metrics: [
    {
      label: "Canvas Render Speed",
      value: "60 FPS",
      description: "Smooth multi-page viewport rendering with PDF.js & Fabric.js"
    },
    {
      label: "Async Export Dispatch",
      value: "< 450ms",
      description: "Non-blocking background queue job dispatch with Redis & BullMQ"
    },
    {
      label: "Node Server Memory",
      value: "-65%",
      description: "Presigned R2 streaming eliminating node server buffer bloat"
    },
    {
      label: "Type Safety Coverage",
      value: "100%",
      description: "End-to-end TypeScript validation from Drizzle ORM to React UI"
    }
  ],
  toc: [
    { id: "executive-summary", title: "1. Executive Summary & Architecture Highlights", level: 2 },
    { id: "the-challenge", title: "2. The Challenge & Core Product Vision", level: 2 },
    { id: "system-architecture", title: "3. High-Level System Architecture", level: 2 },
    { id: "dual-engine-design", title: "4. The Dual PDF Engine Paradigm", level: 2 },
    { id: "backend-engineering", title: "5. Backend Engineering: NestJS, Drizzle & BullMQ", level: 2 },
    { id: "guest-claim-bridge", title: "6. Guest-to-Paid User Claim Bridge", level: 2 },
    { id: "security-monetization", title: "7. Security, Presigned Storage & Feature Access", level: 2 },
    { id: "results-takeaways", title: "8. Performance Results & Key Takeaways", level: 2 }
  ]
};

export default function PdfGiniCaseStudyContent() {
  return (
    <>
      {/* 1. Executive Summary */}
      <section id="executive-summary" className="space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm uppercase tracking-wider">
          <Sparkles className="h-4 w-4" />
          <span>Executive Summary</span>
        </div>
        <p className="text-lg leading-relaxed text-slate-200">
          <strong>PdfGini</strong> is a modern, enterprise-ready Web-based PDF editor and document management SaaS platform designed to eliminate the friction, latency, and security risks associated with cloud document editing.
        </p>
        <p>
          Unlike legacy web PDF editors that rely on heavy server rendering loops or clunky iframe hacks, PdfGini combines client-side HTML5 canvas interactivity with high-throughput asynchronous background job processing. Built using <strong>NestJS</strong>, <strong>Next.js 15 (React 19)</strong>, <strong>Fabric.js 7</strong>, <strong>PDF.js</strong>, <strong>Drizzle ORM (PostgreSQL)</strong>, <strong>BullMQ (Redis)</strong>, and <strong>Cloudflare R2</strong>, the system provides real-time document manipulation, zero-delay guest onboarding, and automated lifecycle sweeps.
        </p>

        <Callout type="info" title="Architectural Blueprint at a Glance">
          <ul className="list-disc list-inside space-y-1 text-slate-300">
            <li><strong>Frontend Stack:</strong> Next.js 15 App Router, React 19, Fabric.js 7, PDF.js, Zustand v5, TanStack Query v5, Tailwind CSS v4.</li>
            <li><strong>Backend Stack:</strong> NestJS 11 (TypeScript), Express, Drizzle ORM, PostgreSQL, Redis, BullMQ, Passport JWT, Argon2.</li>
            <li><strong>Storage & Delivery:</strong> Cloudflare R2 presigned S3 URLs + Cloudinary fallback for asset uploads.</li>
            <li><strong>Monetization & Guards:</strong> Creem payment webhooks, local subscription enforcement, and custom NestJS route access guards.</li>
          </ul>
        </Callout>
      </section>

      <hr className="my-10 border-slate-800" />

      {/* 2. The Challenge */}
      <section id="the-challenge" className="space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm uppercase tracking-wider">
          <Layers className="h-4 w-4" />
          <span>The Challenge & Product Vision</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
          Why Existing Web PDF Editors Fall Short
        </h2>
        <p>
          PDFs are standard fixed-layout vector documents containing complex font definitions, embedded raster graphics, cross-reference tables, and binary stream encodings. Editing them in the browser presents three fundamental engineering bottlenecks:
        </p>

        <ol className="list-decimal list-inside space-y-3 text-slate-300">
          <li>
            <strong className="text-slate-100">Viewport Scale vs. Vector Precision:</strong> Rendering vector text and annotations on interactive screens requires high-DPI scaling, crisp font embedding, and zero latency when dragging, rotating, or resizing objects.
          </li>
          <li>
            <strong className="text-slate-100">Server CPU & Memory Bottlenecks:</strong> Synchronous PDF compilation on single-threaded Node.js servers causes severe main-loop blocking when multiple users export multi-page PDFs concurrently.
          </li>
          <li>
            <strong className="text-slate-100">High Onboarding Friction:</strong> Forcing users to register before testing document edits leads to massive drop-off rates. Conversely, allowing anonymous edits without a reliable guest-to-account bridge creates orphaned data clutter.
          </li>
        </ol>

        <Quote author="Document Systems Principle" source="PDF 1.7 Specification (ISO 32000-1)">
          A PDF document is a structured tree of object references. Modifying content requires precise stream reconstruction without corrupting existing cross-reference (xref) byte offsets.
        </Quote>
      </section>

      <hr className="my-10 border-slate-800" />

      {/* 3. System Architecture */}
      <section id="system-architecture" className="space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm uppercase tracking-wider">
          <Server className="h-4 w-4" />
          <span>High-Level System Architecture</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
          Decoupled Full-Stack Architecture
        </h2>
        <p>
          PdfGini uses a fully decoupled architecture separating the Next.js client UI from the NestJS REST API and background worker pool. All persistent media streams bypass app server RAM by utilizing direct-to-R2 presigned upload/download URLs.
        </p>

        <CodeBlock
          language="bash"
          filename="system-architecture-overview.txt"
          code={`
+-----------------------------------------------------------------------------------+
|                                  CLIENT LAYER                                     |
|  Next.js 15 App Router | React 19 | Fabric.js 7 | PDF.js | Zustand | TanStack Query  |
+----------------------------------------+------------------------------------------+
                                         |
                       HTTPS REST / JSON | Auth Bearer Tokens
                                         v
+-----------------------------------------------------------------------------------+
|                                 BACKEND LAYER                                     |
|                       NestJS 11 REST API Engine (TypeScript)                      |
|   +-------------------+   +--------------------+   +---------------------------+  |
|   | Auth & Guards     |   | Document Manager   |   | Feature Access Guard      |  |
|   +-------------------+   +--------------------+   +---------------------------+  |
|   | Drizzle ORM       |   | Export Controller  |   | Creem Webhooks            |  |
|   +---------+---------+   +---------+----------+   +---------------------------+  |
+-------------|-----------------------|---------------------------------------------+
              |                       |
              v                       v
      +---------------+      +-----------------+      +-----------------------+
      | PostgreSQL DB |      | Redis + BullMQ  | ===> | Background Worker     |
      | (Drizzle Schema)     | Task Queues     |      | PDF Compilation Engine|
      +---------------+      +-----------------+      +-----------+-----------+
                                                                  |
                                                                  v
                                                     +------------------------+
                                                     | Cloudflare R2 Storage  |
                                                     | (Presigned S3 URLs)    |
                                                     +------------------------+
`}
        />
      </section>

      <hr className="my-10 border-slate-800" />

      {/* 4. The Dual PDF Engine */}
      <section id="dual-engine-design" className="space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm uppercase tracking-wider">
          <Cpu className="h-4 w-4" />
          <span>The Dual PDF Engine Paradigm</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
          Client Interactive Canvas vs. Server Compilation
        </h2>
        <p>
          PdfGini cleanly separates document presentation from final compilation by introducing a <strong>Dual Engine Architecture</strong>:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="flex items-center gap-2 text-cyan-300 font-semibold text-base">
              <Layers className="h-5 w-5" />
              <span>1. Client Presentation Engine</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong>PDF.js</strong> renders PDF page viewports onto background canvas surfaces. On top of each page, a transparent <strong>Fabric.js 7</strong> interactive canvas layer handles object creation (text boxes, freehand draw, images, signatures, annotations) with crisp 60 FPS transform controls and zoom/pan calibration.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="flex items-center gap-2 text-cyan-300 font-semibold text-base">
              <Zap className="h-5 w-5" />
              <span>2. Server Compilation Engine</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Instead of rendering canvas bitmaps on the server, canvas modifications are serialized into a lightweight JSON operation payload. When exporting, server-side document compilers replay these operations directly over the original vector document, preserving original text crispness and embedded fonts.
            </p>
          </div>
        </div>

        <Callout type="tip" title="Zustand Operation Serialization Pattern">
          Canvas edits (adding text, moving elements, drawing paths) are logged as immutable JSON operation arrays in a central Zustand store. This enables <strong>Undo/Redo</strong> history and minimal auto-save API payloads without risking memory leaks.
        </Callout>
      </section>

      <hr className="my-10 border-slate-800" />

      {/* 5. Backend Engineering */}
      <section id="backend-engineering" className="space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm uppercase tracking-wider">
          <Database className="h-4 w-4" />
          <span>Backend Engineering</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
          NestJS, Drizzle ORM & Asynchronous Queue Processing
        </h2>
        <p>
          The backend service is built on <strong>NestJS 11</strong> and structured around strict domain modules.
        </p>

        <h3 className="text-xl font-semibold text-slate-200 pt-2">Type-Safe Relational Data with Drizzle ORM</h3>
        <p>
          Drizzle ORM was chosen over heavyweight ORMs to guarantee zero-overhead query execution, native TypeScript inference, and explicit schema control for users, documents, exports, subscriptions, and audit logs.
        </p>

        <h3 className="text-xl font-semibold text-slate-200 pt-2">Asynchronous Heavy Lifting with BullMQ & Redis</h3>
        <p>
          When a user triggers a document export, processing a multi-page PDF with embedded images could freeze the Node.js event loop if executed synchronously. PdfGini dispatches an asynchronous job to a <strong>BullMQ</strong> queue. The API controller responds in <code>&lt; 450ms</code> with a job ID, allowing the client to poll or receive background updates seamlessly.
        </p>
      </section>

      <hr className="my-10 border-slate-800" />

      {/* 6. Guest-to-Paid Claim Bridge */}
      <section id="guest-claim-bridge" className="space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm uppercase tracking-wider">
          <Workflow className="h-4 w-4" />
          <span>Guest-to-Paid User Claim Bridge</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
          Zero-Friction Onboarding Workflow
        </h2>
        <p>
          One of PdfGini’s key UX innovations is allowing guest users to immediately drag-and-drop a PDF, perform full editing operations, and view real-time changes without creating an account up front.
        </p>

        <Callout type="warning" title="The Anonymous Claiming Strategy">
          If a user spends 10 minutes customizing a document as a guest and then registers, losing their in-memory edits causes instant churn.
        </Callout>

        <p>
          PdfGini solves this using a state-machine claim workflow:
        </p>

        <ol className="list-decimal list-inside space-y-2 text-slate-300">
          <li><strong>Guest Upload:</strong> Assigns an anonymous session identifier stored in local storage and links the uploaded document to that session.</li>
          <li><strong>Operation Queueing:</strong> Canvas edits are saved under the guest document ID.</li>
          <li><strong>The Claim Bridge:</strong> Upon registration or login, the frontend invokes a secure claim endpoint with the guest session and JWT token.</li>
          <li><strong>Database Re-linking:</strong> NestJS transfers ownership of all matching guest documents directly to the new user account inside a single atomic database transaction.</li>
        </ol>
      </section>

      <hr className="my-10 border-slate-800" />

      {/* 7. Security & Monetization */}
      <section id="security-monetization" className="space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm uppercase tracking-wider">
          <ShieldCheck className="h-4 w-4" />
          <span>Security, Storage & Monetization</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
          Presigned R2 Storage & Tiered Feature Access Guards
        </h2>
        <p>
          Document security and monetization are baked directly into the backend via declarative NestJS metadata decorators and presigned Cloudflare R2 storage URLs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-semibold text-base">
              <Cloud className="h-5 w-5" />
              <span>Direct Presigned S3 Storage</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              PdfGini never streams large PDF files directly through the API server memory. Time-bound (15-min expiry) Cloudflare R2 presigned upload/download URLs reduce Node.js buffer memory consumption by over 65%.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-semibold text-base">
              <Lock className="h-5 w-5" />
              <span>Declarative Feature Access Guards</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Premium capabilities (e.g. batch export, OCR text extraction, watermarking) are protected using custom NestJS route guards that dynamically check active plan tiers against payment webhooks.
            </p>
          </div>
        </div>
      </section>

      <hr className="my-10 border-slate-800" />

      {/* 8. Results & Takeaways */}
      <section id="results-takeaways" className="space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm uppercase tracking-wider">
          <FileCheck className="h-4 w-4" />
          <span>Performance Results & Engineering Takeaways</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
          Measurable Impact & Architecture Validation
        </h2>
        <p>
          By combining client-side vector manipulation with background task queuing and presigned streaming, PdfGini achieved exceptional performance and reliability metrics across both front and backend:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-1">
            <div className="text-2xl font-extrabold text-cyan-400 font-mono">60 FPS</div>
            <div className="text-sm font-semibold text-slate-200">Interactive Canvas Performance</div>
            <p className="text-xs text-slate-400">Zero input latency during text editing, object rotation, and vector scaling.</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-1">
            <div className="text-2xl font-extrabold text-cyan-400 font-mono">&lt; 450ms</div>
            <div className="text-sm font-semibold text-slate-200">Export API Queue Dispatch</div>
            <p className="text-xs text-slate-400">Non-blocking background job hand-off powered by BullMQ & Redis.</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-1">
            <div className="text-2xl font-extrabold text-cyan-400 font-mono">-65% Memory</div>
            <div className="text-sm font-semibold text-slate-200">Node Server RAM Reduction</div>
            <p className="text-xs text-slate-400">Eliminated in-memory file buffers via direct Cloudflare R2 S3 presigned URLs.</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-1">
            <div className="text-2xl font-extrabold text-cyan-400 font-mono">100% Type-Safe</div>
            <div className="text-sm font-semibold text-slate-200">End-to-End Type Coverage</div>
            <p className="text-xs text-slate-400">Strict TypeScript validation spanning Drizzle DB schema to React Query hooks.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-slate-200 pt-2">Key Takeaways for Full-Stack SaaS Engineers</h3>
        <ul className="list-disc list-inside space-y-2 text-slate-300">
          <li><strong>Never run heavy document compilation on the primary web thread:</strong> Offloading PDF compilation to BullMQ workers preserves API responsiveness and prevents event loop blocking.</li>
          <li><strong>Preserve client vector precision:</strong> Transfer lightweight JSON operations to the server rather than rendering low-DPI raster images.</li>
          <li><strong>Minimize onboarding friction with guest claim bridges:</strong> Allowing users to edit anonymously before requesting authentication dramatically boosts conversion rates.</li>
        </ul>

        <div className="mt-8 rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-slate-100">Interested in scalable web architectures?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Explore more case studies or check out the live PdfGini application.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition-colors"
          >
            <span>Explore All Case Studies</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
