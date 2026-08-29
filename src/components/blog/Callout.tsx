import React from "react";
import { Info, AlertTriangle, Lightbulb, AlertOctagon } from "lucide-react";
import { cn } from "@/lib/utils";

export type CalloutType = "info" | "warning" | "tip" | "danger";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const calloutConfig = {
  info: {
    icon: Info,
    styles: "border-cyan-500/40 bg-cyan-950/20 text-cyan-200",
    iconStyles: "text-cyan-400",
    titleStyles: "text-cyan-300",
    defaultTitle: "Note",
  },
  tip: {
    icon: Lightbulb,
    styles: "border-emerald-500/40 bg-emerald-950/20 text-emerald-200",
    iconStyles: "text-emerald-400",
    titleStyles: "text-emerald-300",
    defaultTitle: "Pro Tip",
  },
  warning: {
    icon: AlertTriangle,
    styles: "border-amber-500/40 bg-amber-950/20 text-amber-200",
    iconStyles: "text-amber-400",
    titleStyles: "text-amber-300",
    defaultTitle: "Warning",
  },
  danger: {
    icon: AlertOctagon,
    styles: "border-rose-500/40 bg-rose-950/20 text-rose-200",
    iconStyles: "text-rose-400",
    titleStyles: "text-rose-300",
    defaultTitle: "Important",
  },
};

export default function Callout({
  type = "info",
  title,
  children,
  className,
}: CalloutProps) {
  const config = calloutConfig[type] || calloutConfig.info;
  const Icon = config.icon;
  const displayTitle = title || config.defaultTitle;

  return (
    <aside
      role="note"
      className={cn(
        "my-6 flex gap-4 rounded-xl border p-4 sm:p-5 shadow-md backdrop-blur-xs",
        config.styles,
        className
      )}
    >
      <div className="shrink-0 pt-0.5">
        <Icon className={cn("h-5 w-5", config.iconStyles)} />
      </div>
      <div className="flex-1 text-sm leading-relaxed">
        {displayTitle && (
          <h5 className={cn("mb-1 font-semibold tracking-wide", config.titleStyles)}>
            {displayTitle}
          </h5>
        )}
        <div className="prose-p:m-0 space-y-2">{children}</div>
      </div>
    </aside>
  );
}
