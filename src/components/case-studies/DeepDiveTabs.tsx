"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Cpu, 
  Database, 
  Workflow, 
  Zap, 
  CheckCircle2, 
  Layers, 
  FileCode2, 
  Server, 
  Cloud, 
  User, 
  Send, 
  Sparkles,
  ArrowDown
} from "lucide-react";

interface FlowStep {
  step: string;
  badge: string;
  badgeColor: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
  title: string;
  meta: string;
}

interface TabItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  bullets: string[];
  flowTitle: string;
  flowSteps: FlowStep[];
}

const tabs: TabItem[] = [
  {
    id: "dual-engine",
    label: "Dual Engine Architecture",
    icon: Cpu,
    title: "Dual Engine PDF Rendering",
    description:
      "We engineered a hybrid rendering engine combining client-side canvas reactivity with server-side compilation for heavy operations like PDF export, vector flattening, and compression.",
    bullets: [
      "Client-side: Real-time 60 FPS editing and annotations via Fabric.js canvas",
      "Server-side: Heavy vector compilation and stream replay in isolated workers",
      "Smart fallback: Dynamic engine selection by file complexity and size",
    ],
    flowTitle: "Dual-Engine Execution Flow",
    flowSteps: [
      {
        step: "01",
        badge: "Client Canvas",
        badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
        icon: Layers,
        iconColor: "text-cyan-400",
        iconBg: "bg-cyan-500/10 border-cyan-500/20",
        title: "Fabric.js 7 Viewport Layer",
        meta: "Sub-pixel interactive rendering at sustained 60 FPS",
      },
      {
        step: "02",
        badge: "State Delta",
        badgeColor: "bg-blue-500/10 text-blue-300 border-blue-500/30",
        icon: FileCode2,
        iconColor: "text-blue-400",
        iconBg: "bg-blue-500/10 border-blue-500/20",
        title: "Lightweight Operation Delta",
        meta: "~12 KB compact JSON payload streamed to backend",
      },
      {
        step: "03",
        badge: "Server Compiler",
        badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/30",
        icon: Cpu,
        iconColor: "text-purple-400",
        iconBg: "bg-purple-500/10 border-purple-500/20",
        title: "pdf-lib Vector Replay Engine",
        meta: "Reconstructs vector graphics over original stream",
      },
      {
        step: "04",
        badge: "Final Artifact",
        badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
        icon: CheckCircle2,
        iconColor: "text-emerald-400",
        iconBg: "bg-emerald-500/10 border-emerald-500/20",
        title: "Crisp High-DPI Vector Output",
        meta: "100% font embedding and byte fidelity preserved",
      },
    ],
  },
  {
    id: "backend-data",
    label: "Backend & Data Flow",
    icon: Database,
    title: "Relational Data & Schema Boundaries",
    description:
      "A normalized relational model decouples document ownership from guest sessions while compound index keys guarantee O(1) lookups during user onboarding.",
    bullets: [
      "Compound indexing on guestSessionId ensures O(1) claim lookups",
      "Index-only scans on expiresAt enable automated cron sweeps",
      "Immutable JSON operational delta log isolates UI updates from table schema",
    ],
    flowTitle: "Relational Data Lifecycle",
    flowSteps: [
      {
        step: "01",
        badge: "Anonymous State",
        badgeColor: "bg-blue-500/10 text-blue-300 border-blue-500/30",
        icon: User,
        iconColor: "text-blue-400",
        iconBg: "bg-blue-500/10 border-blue-500/20",
        title: "Guest Session Initialized",
        meta: "Cryptographic token stored in local session storage",
      },
      {
        step: "02",
        badge: "Indexed Record",
        badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
        icon: Database,
        iconColor: "text-cyan-400",
        iconBg: "bg-cyan-500/10 border-cyan-500/20",
        title: "PostgreSQL Compound Index",
        meta: "O(1) lookup via idx_documents_guest_session",
      },
      {
        step: "03",
        badge: "Atomic Transfer",
        badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/30",
        icon: Workflow,
        iconColor: "text-amber-400",
        iconBg: "bg-amber-500/10 border-amber-500/20",
        title: "Serializable Claim Transaction",
        meta: "Atomic document reassignment without race conditions",
      },
      {
        step: "04",
        badge: "Authenticated DB",
        badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
        icon: CheckCircle2,
        iconColor: "text-emerald-400",
        iconBg: "bg-emerald-500/10 border-emerald-500/20",
        title: "Permanent User Workspace",
        meta: "Directly linked to user_id with cascading integrity",
      },
    ],
  },
  {
    id: "queue-worker",
    label: "Worker Queue Engine",
    icon: Zap,
    title: "Asynchronous Compilation Pipeline",
    description:
      "Export requests return an immediate sub-450ms acknowledgment with a tracking token. Background workers stream directly from Cloudflare R2 without blocking API event loops.",
    bullets: [
      "Concurrency throttling: Sandboxed execution limits to prevent server OOM",
      "Automated retries: Exponential backoff with jitter for transient failures",
      "Dead-letter queue: Isolated error telemetry for failed rendering passes",
    ],
    flowTitle: "Asynchronous Job Pipeline",
    flowSteps: [
      {
        step: "01",
        badge: "API Hand-off",
        badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
        icon: Send,
        iconColor: "text-cyan-400",
        iconBg: "bg-cyan-500/10 border-cyan-500/20",
        title: "Non-Blocking Export Dispatch",
        meta: "Immediate < 450ms acknowledgment with jobId",
      },
      {
        step: "02",
        badge: "Task Queue",
        badgeColor: "bg-blue-500/10 text-blue-300 border-blue-500/30",
        icon: Zap,
        iconColor: "text-blue-400",
        iconBg: "bg-blue-500/10 border-blue-500/20",
        title: "Redis 7 + BullMQ Scheduler",
        meta: "Job deduplication & rate limiting enforced",
      },
      {
        step: "03",
        badge: "Worker Pool",
        badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/30",
        icon: Server,
        iconColor: "text-purple-400",
        iconBg: "bg-purple-500/10 border-purple-500/20",
        title: "Isolated Worker Process Pool",
        meta: "Max 5 concurrent compilations per worker core",
      },
      {
        step: "04",
        badge: "Direct Storage",
        badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
        icon: Cloud,
        iconColor: "text-emerald-400",
        iconBg: "bg-emerald-500/10 border-emerald-500/20",
        title: "Cloudflare R2 Presigned Push",
        meta: "0 MB node server memory buffer overhead",
      },
    ],
  },
  {
    id: "guest-claim",
    label: "Guest-to-Paid Flow",
    icon: Workflow,
    title: "Zero-Friction Guest Claim Bridge",
    description:
      "Allows guest visitors to immediately customize documents. Upon registration or login, an atomic database transaction safely reassigns ownership without data loss.",
    bullets: [
      "Cryptographic guest identifier initialized in secure client storage",
      "Continuous vector delta streaming tied to guest session record",
      "Atomic transaction rebinds document records preventing race conditions",
    ],
    flowTitle: "Frictionless Onboarding State Machine",
    flowSteps: [
      {
        step: "01",
        badge: "Zero Friction",
        badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
        icon: Sparkles,
        iconColor: "text-cyan-400",
        iconBg: "bg-cyan-500/10 border-cyan-500/20",
        title: "Instant Drag & Drop Editing",
        meta: "No registration required to test full editor features",
      },
      {
        step: "02",
        badge: "Auto-Save",
        badgeColor: "bg-blue-500/10 text-blue-300 border-blue-500/30",
        icon: Layers,
        iconColor: "text-blue-400",
        iconBg: "bg-blue-500/10 border-blue-500/20",
        title: "Debounced Delta Streaming",
        meta: "Edits recorded in Postgres under guest identifier",
      },
      {
        step: "03",
        badge: "Claim Event",
        badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/30",
        icon: Workflow,
        iconColor: "text-purple-400",
        iconBg: "bg-purple-500/10 border-purple-500/20",
        title: "Auth Webhook / Claim Call",
        meta: "POST /api/documents/claim with user JWT token",
      },
      {
        step: "04",
        badge: "Migration Complete",
        badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
        icon: CheckCircle2,
        iconColor: "text-emerald-400",
        iconBg: "bg-emerald-500/10 border-emerald-500/20",
        title: "100% Zero-Loss Document Access",
        meta: "Immediate workspace population with full editing history",
      },
    ],
  },
];

export default function DeepDiveTabs() {
  const [activeTabId, setActiveTabId] = useState<string>("dual-engine");
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  return (
    <div className="space-y-6">
      {/* Tab Navigation Buttons */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              type="button"
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer",
                isActive
                  ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10"
                  : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200"
              )}
            >
              <Icon className={cn("h-4 w-4", isActive ? "text-cyan-400" : "text-slate-500")} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-7 backdrop-blur-md items-center">
        {/* Left: Overview & Bullets */}
        <div className="lg:col-span-5 space-y-5">
          <div className="space-y-2.5">
            <h4 className="text-lg sm:text-xl font-bold text-slate-100">{activeTab.title}</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeTab.description}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {activeTab.bullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{bullet}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Visual Architecture Flow Pipeline */}
        <div className="lg:col-span-7">
          <div className="rounded-xl border border-slate-800/90 bg-slate-950/80 p-5 space-y-4 backdrop-blur-md shadow-xl">
            {/* Pipeline Header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                  {activeTab.flowTitle}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                Active Pipeline
              </span>
            </div>

            {/* Stepper Pipeline Flow */}
            <div className="space-y-2 relative">
              {activeTab.flowSteps.map((step, idx) => {
                const StepIcon = step.icon;
                const isLast = idx === activeTab.flowSteps.length - 1;
                return (
                  <div key={idx} className="relative">
                    <div className="flex items-start gap-3 rounded-lg border border-slate-800/60 bg-slate-900/50 p-3 transition-colors hover:border-slate-700/80">
                      {/* Step Icon */}
                      <div className={`h-8 w-8 rounded-lg border flex items-center justify-center shrink-0 ${step.iconBg} ${step.iconColor}`}>
                        <StepIcon className="h-4 w-4" />
                      </div>

                      {/* Step Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <span className="text-xs font-bold text-slate-100 leading-snug">
                            {step.title}
                          </span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border shrink-0 ${step.badgeColor}`}>
                            {step.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {step.meta}
                        </p>
                      </div>
                    </div>

                    {/* Connecting Arrow between steps */}
                    {!isLast && (
                      <div className="flex justify-center py-1 text-slate-600">
                        <ArrowDown className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
