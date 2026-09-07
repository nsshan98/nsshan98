import React from "react";
import { CaseStudyMeta } from "@/lib/case-studies/types";
import DeepDiveTabs from "@/components/case-studies/DeepDiveTabs";
import { 
  FolderGit2, 
  AlertTriangle, 
  Target, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Sparkles,
  Layers,
  Server,
  Database,
  Cloud,
  Check
} from "lucide-react";

export const caseStudy: CaseStudyMeta = {
  title: "PDFGini: Architecting an End-to-End PDF Editing & Document Management SaaS Platform",
  slug: "pdfgini",
  subtitle: "Engineering a dual HTML5 Canvas/Server PDF compilation engine with NestJS, Next.js 15, Drizzle ORM, BullMQ, Fabric.js, and Cloudflare R2",
  description: "From browser-based PDF editing to AI-powered content extraction, PDFGini is a complete document intelligence platform built for speed, security, and scale.",
  client: "PDFGini",
  role: "Full-stack Engineer",
  timeline: "Jan 2024 - Apr 2024",
  industry: "SaaS Platform",
  category: "Document Processing",
  tags: [
    "Next.js 15",
    "NestJS",
    "Fabric.js",
    "PDF.js",
    "Drizzle ORM",
    "BullMQ",
    "Cloudflare R2",
    "TypeScript",
    "Redis"
  ],
  techStack: [
    "Next.js 15",
    "React 19",
    "NestJS 11",
    "Drizzle ORM",
    "PostgreSQL",
    "Fabric.js 7",
    "PDF.js",
    "BullMQ",
    "Redis",
    "Cloudflare R2",
    "Tailwind CSS v4"
  ],
  liveUrl: "https://pdfgini.com",
  featuredImage: "https://pub-eb03da332faf4d8aa56044bbdb214f25.r2.dev/case-study/case-study_pdfgini_case_study_hero.jpg",
  featuredImageAlt: "PDFGini SaaS Platform Hero Mockup Interface",
  publishedAt: "2026-09-04",
  updatedAt: "2026-09-07",
  featured: true,
  readingTime: "10 min read",
  metrics: [
    {
      label: "Smooth Canvas Rendering",
      value: "60 FPS",
      description: "Smooth Canvas Rendering"
    },
    {
      label: "API Response Time",
      value: "< 450ms",
      description: "API Response Time"
    },
    {
      label: "Memory Usage",
      value: "-65%",
      description: "Memory Usage"
    },
    {
      label: "Uptime & Reliability",
      value: "99.9%",
      description: "Uptime & Reliability"
    }
  ],
  toc: [
    { id: "executive-summary", title: "01. Executive Summary", level: 2 },
    { id: "problem-space", title: "02. Problem Space & Objectives", level: 2 },
    { id: "project-context", title: "Project Context", level: 3 },
    { id: "the-challenge", title: "The Challenge", level: 3 },
    { id: "goals-success-criteria", title: "Goals & Success Criteria", level: 3 },
    { id: "system-architecture", title: "03. System Architecture & Decisions", level: 2 },
    { id: "high-level-architecture", title: "High-Level Architecture", level: 3 },
    { id: "tech-stack-decisions", title: "Key Decisions", level: 3 },
    { id: "deep-dive-engineering", title: "04. Deep-Dive Engineering", level: 2 },
    { id: "core-innovations", title: "Core Innovations", level: 3 },
    { id: "backend-data-flow", title: "Backend & Data Flow", level: 3 },
    { id: "production-hardening", title: "05. Production Hardening", level: 2 },
    { id: "security", title: "Security", level: 3 },
    { id: "performance", title: "Performance", level: 3 },
    { id: "observability", title: "Reliability & Observability", level: 3 },
    { id: "results-takeaways", title: "06. Results & Takeaways", level: 2 },
    { id: "performance-improvements", title: "Impact & Results", level: 3 },
    { id: "key-takeaways", title: "Key Takeaways", level: 3 }
  ]
};

export default function PdfGiniCaseStudyContent() {
  return (
    <div className="space-y-16 sm:space-y-20">
      {/* ========================================================================= */}
      {/* 01. EXECUTIVE SUMMARY */}
      {/* ========================================================================= */}
      <section id="executive-summary" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Marker */}
        <div className="lg:col-span-3 space-y-2">
          <div className="text-3xl font-mono font-black text-cyan-400">01</div>
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-200">
            Executive Summary
          </h2>
          <div className="h-0.5 w-10 bg-cyan-500 rounded-full" />
        </div>

        {/* Right Content */}
        <div className="lg:col-span-9 space-y-6">
          <div className="space-y-3">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
              A modern PDF platform for the AI era.
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              PDFGini is a feature-rich SaaS platform that enables users to edit, convert, compress, and extract data from PDF documents — all in the browser. It combines a high-performance canvas editor, AI-powered document intelligence, and a scalable backend infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Key Highlights Card */}
            <div className="md:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md space-y-4">
              <h4 className="text-sm font-bold text-slate-100">Key Highlights</h4>
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                  <span>Complete PDF editing suite (edit, annotate, convert, compress)</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                  <span>Dual-engine architecture combining Fabric.js canvas and server compilation</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                  <span>Scalable architecture supporting thousands of concurrent users with BullMQ</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                  <span>Secure file handling with Cloudflare R2 storage and presigned URLs</span>
                </div>
              </div>
            </div>

            {/* 4 Stat Counters */}
            <div className="md:col-span-5 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">12+</div>
                <div className="text-xs text-slate-400 font-medium">Core Features</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">50K+</div>
                <div className="text-xs text-slate-400 font-medium">Monthly Users</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-blue-400 font-mono">1M+</div>
                <div className="text-xs text-slate-400 font-medium">Documents Processed</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-purple-400 font-mono">4.9/5</div>
                <div className="text-xs text-slate-400 font-medium">User Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-slate-800/80" />

      {/* ========================================================================= */}
      {/* 02. PROBLEM SPACE & OBJECTIVES */}
      {/* ========================================================================= */}
      <section id="problem-space" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Marker */}
        <div className="lg:col-span-3 space-y-2">
          <div className="text-3xl font-mono font-black text-cyan-400">02</div>
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-200">
            Problem Space & Objectives
          </h2>
          <div className="h-0.5 w-10 bg-cyan-500 rounded-full" />
        </div>

        {/* Right Content */}
        <div className="lg:col-span-9 space-y-6">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
            Solving real-world document workflow challenges.
          </h3>

          {/* 3-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Project Context */}
            <div id="project-context" className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 backdrop-blur-md flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <FolderGit2 className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold text-slate-100">Project Context</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Businesses and individuals needed a fast, secure, and easy-to-use PDF tool that works entirely in the browser without requiring local desktop software installation.
                </p>
              </div>
            </div>

            {/* Card 2: Key Challenges */}
            <div id="the-challenge" className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 backdrop-blur-md flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold text-slate-100">Key Challenges</h4>
                <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                    <span className="leading-snug">Large file processing in browser</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                    <span className="leading-snug">Maintaining document vector fidelity</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                    <span className="leading-snug">High memory usage in rendering</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                    <span className="leading-snug">Secure file storage & access control</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                    <span className="leading-snug">Scalable for global concurrent users</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Goals & Success Criteria */}
            <div id="goals-success-criteria" className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 backdrop-blur-md flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Target className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold text-slate-100">Goals & Success Criteria</h4>
                <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-start gap-2 text-emerald-300 font-medium">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">&lt; 500ms API response time</span>
                  </div>
                  <div className="flex items-start gap-2 text-emerald-300 font-medium">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">Smooth 60 FPS editing experience</span>
                  </div>
                  <div className="flex items-start gap-2 text-emerald-300 font-medium">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">50%+ reduction in server memory</span>
                  </div>
                  <div className="flex items-start gap-2 text-emerald-300 font-medium">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">Zero guest-to-user document loss</span>
                  </div>
                  <div className="flex items-start gap-2 text-emerald-300 font-medium">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">100% end-to-end type safety</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-slate-800/80" />

      {/* ========================================================================= */}
      {/* 03. SYSTEM ARCHITECTURE & DECISIONS */}
      {/* ========================================================================= */}
      <section id="system-architecture" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Marker */}
        <div className="lg:col-span-3 space-y-2">
          <div className="text-3xl font-mono font-black text-cyan-400">03</div>
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-200">
            System Architecture & Decisions
          </h2>
          <div className="h-0.5 w-10 bg-cyan-500 rounded-full" />
        </div>

        {/* Right Content */}
        <div className="lg:col-span-9 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
              A scalable and modular architecture.
            </h3>
            <span className="text-xs text-slate-400 font-mono">High-Level Topology</span>
          </div>

          {/* Visual Architecture Card */}
          <div id="high-level-architecture" className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Client Box */}
              <div className="md:col-span-4 rounded-xl border border-cyan-500/30 bg-slate-950 p-4 space-y-2">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5" />
                  Client (Next.js 15)
                </div>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="rounded bg-slate-900 px-2.5 py-1.5 border border-slate-800">PDF Editor (Fabric.js)</div>
                  <div className="rounded bg-slate-900 px-2.5 py-1.5 border border-slate-800">Direct Presigned Upload</div>
                  <div className="rounded bg-slate-900 px-2.5 py-1.5 border border-slate-800">User Dashboard (Zustand)</div>
                </div>
              </div>

              {/* Arrow Connector */}
              <div className="md:col-span-4 flex flex-col items-center justify-center space-y-2 text-center py-2">
                <div className="text-[10px] text-slate-400 font-mono">HTTPS REST / Auth Bearer</div>
                <div className="w-full flex items-center justify-center">
                  <div className="h-0.5 w-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded" />
                </div>
                <div className="rounded-xl border border-blue-500/30 bg-blue-950/40 px-3 py-1.5 text-xs font-bold text-blue-300">
                  API Gateway (NestJS 11)
                </div>
              </div>

              {/* Workers & Storage */}
              <div className="md:col-span-4 space-y-2.5">
                <div className="rounded-xl border border-purple-500/30 bg-purple-950/30 p-2.5 text-xs font-semibold text-purple-300 flex items-center justify-between">
                  <span>Worker Queue (BullMQ)</span>
                  <Server className="h-3.5 w-3.5" />
                </div>
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-2.5 text-xs font-semibold text-emerald-300 flex items-center justify-between">
                  <span>Storage (Cloudflare R2)</span>
                  <Cloud className="h-3.5 w-3.5" />
                </div>
                <div className="rounded-xl border border-amber-500/30 bg-amber-950/30 p-2.5 text-xs font-semibold text-amber-300 flex items-center justify-between">
                  <span>Database (PostgreSQL + Drizzle)</span>
                  <Database className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Key Architectural Decisions Grid */}
          <div id="tech-stack-decisions" className="space-y-3 pt-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Key Architectural Decisions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xs font-bold">
                    N
                  </div>
                  <span className="font-semibold text-slate-200 text-sm">Next.js 15 (Frontend)</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  For performance, App Router streaming, and zero-latency client reactivity with React 19.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 text-xs font-bold">
                    N
                  </div>
                  <span className="font-semibold text-slate-200 text-sm">NestJS 11 (Backend)</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Modular, enterprise-grade architecture with dependency injection and strict TypeScript boundaries.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xs font-bold">
                    P
                  </div>
                  <span className="font-semibold text-slate-200 text-sm">PostgreSQL + Drizzle</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Zero cold-start overhead, complete relational type safety, and atomic transaction locks.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xs font-bold">
                    R2
                  </div>
                  <span className="font-semibold text-slate-200 text-sm">Cloudflare R2</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Zero egress fees, S3 compatibility, and direct presigned streaming bypassing server RAM.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-slate-800/80" />

      {/* ========================================================================= */}
      {/* 04. DEEP-DIVE ENGINEERING */}
      {/* ========================================================================= */}
      <section id="deep-dive-engineering" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Marker */}
        <div className="lg:col-span-3 space-y-2">
          <div className="text-3xl font-mono font-black text-cyan-400">04</div>
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-200">
            Deep-Dive Engineering
          </h2>
          <div className="h-0.5 w-10 bg-cyan-500 rounded-full" />
        </div>

        {/* Right Content */}
        <div className="lg:col-span-9 space-y-6">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
            Key innovations and technical implementation.
          </h3>

          {/* Interactive Tab Switcher Component */}
          <DeepDiveTabs />
        </div>
      </section>

      <hr className="border-slate-800/80" />

      {/* ========================================================================= */}
      {/* 05. PRODUCTION HARDENING */}
      {/* ========================================================================= */}
      <section id="production-hardening" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Marker */}
        <div className="lg:col-span-3 space-y-2">
          <div className="text-3xl font-mono font-black text-cyan-400">05</div>
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-200">
            Production Hardening
          </h2>
          <div className="h-0.5 w-10 bg-cyan-500 rounded-full" />
        </div>

        {/* Right Content */}
        <div className="lg:col-span-9 space-y-6">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
            Built for security, performance, and reliability.
          </h3>

          {/* 3 Columns for Security, Performance, and Observability */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Security */}
            <div id="security" className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 backdrop-blur-md flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold text-slate-100">Security</h4>
                <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">JWT authentication & Argon2</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">Role-based access control (RBAC)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">Presigned 15-min Cloudflare R2 URLs</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">Input validation & sanitization</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Performance */}
            <div id="performance" className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 backdrop-blur-md flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Zap className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold text-slate-100">Performance</h4>
                <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">Database compound indexing</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">File streaming bypassing node RAM</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">In-memory task queues with Redis</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">Optimized 60 FPS canvas rendering</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Observability */}
            <div id="observability" className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 backdrop-blur-md flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold text-slate-100">Observability</h4>
                <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">Error tracking & Sentry alerts</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">BullMQ worker saturation metrics</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">24h cron storage cleanup sweeps</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">Structured JSON application logs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-slate-800/80" />

      {/* ========================================================================= */}
      {/* 06. RESULTS & TAKEAWAYS */}
      {/* ========================================================================= */}
      <section id="results-takeaways" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Marker */}
        <div className="lg:col-span-3 space-y-2">
          <div className="text-3xl font-mono font-black text-cyan-400">06</div>
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-200">
            Results & Takeaways
          </h2>
          <div className="h-0.5 w-10 bg-cyan-500 rounded-full" />
        </div>

        {/* Right Content */}
        <div className="lg:col-span-9 space-y-6">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
            Measurable impact and key learnings.
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left: Performance Improvements Table */}
            <div id="performance-improvements" className="md:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md space-y-4">
              <h4 className="text-sm font-bold text-slate-100">Performance Improvements</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="pb-2.5">Metric</th>
                      <th className="pb-2.5">Before</th>
                      <th className="pb-2.5">After</th>
                      <th className="pb-2.5 text-right">Improvement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    <tr>
                      <td className="py-2.5 font-sans font-medium text-slate-200">API Response Time</td>
                      <td className="py-2.5 text-slate-400">1.8s</td>
                      <td className="py-2.5 text-slate-200">420ms</td>
                      <td className="py-2.5 text-right text-emerald-400 font-bold">-76%</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-sans font-medium text-slate-200">Memory Usage</td>
                      <td className="py-2.5 text-slate-400">1.2GB</td>
                      <td className="py-2.5 text-slate-200">420MB</td>
                      <td className="py-2.5 text-right text-emerald-400 font-bold">-65%</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-sans font-medium text-slate-200">Rendering FPS</td>
                      <td className="py-2.5 text-slate-400">32 FPS</td>
                      <td className="py-2.5 text-slate-200">60 FPS</td>
                      <td className="py-2.5 text-right text-emerald-400 font-bold">+87%</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-sans font-medium text-slate-200">File Processing Time</td>
                      <td className="py-2.5 text-slate-400">45s</td>
                      <td className="py-2.5 text-slate-200">12s</td>
                      <td className="py-2.5 text-right text-emerald-400 font-bold">-73%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Key Takeaways Card */}
            <div id="key-takeaways" className="md:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md space-y-4">
              <h4 className="text-sm font-bold text-slate-100">Key Takeaways</h4>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <div className="h-6 w-6 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <p className="leading-relaxed">Early performance testing saves time and attracts more clients.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="h-6 w-6 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <Server className="h-3.5 w-3.5" />
                  </div>
                  <p className="leading-relaxed">A modular decoupled architecture makes scaling effortless.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="h-6 w-6 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <Cloud className="h-3.5 w-3.5" />
                  </div>
                  <p className="leading-relaxed">Presigned direct storage eliminates server memory exhaustion.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="h-6 w-6 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <ShieldCheck className="h-3.5 w-3.5" />
                  </div>
                  <p className="leading-relaxed">Security and performance should be built in from day one.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
