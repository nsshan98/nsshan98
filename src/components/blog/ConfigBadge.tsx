import React from "react";
import { cn } from "@/lib/utils";

export type ConfigLevel =
  | "MUST HAVE"
  | "RECOMMENDED"
  | "SECURITY HARDENING"
  | "OPTIONAL";

interface ConfigBadgeProps {
  level: ConfigLevel;
  className?: string;
}

const levelStyles: Record<ConfigLevel, string> = {
  "MUST HAVE": "bg-rose-500/15 text-rose-400 border-rose-500/30",
  "RECOMMENDED": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "SECURITY HARDENING": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  "OPTIONAL": "bg-slate-800/80 text-slate-300 border-slate-700/60",
};

export default function ConfigBadge({ level, className }: ConfigBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider font-mono shadow-xs",
        levelStyles[level],
        className
      )}
    >
      {level}
    </span>
  );
}

