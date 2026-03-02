import * as React from "react";
import { cn } from "@/lib/utils";

export interface FitScoreBadgeProps {
  score: number;
  size?: "sm" | "md";
  className?: string;
}

export const FitScoreBadge: React.FC<FitScoreBadgeProps> = ({
  score,
  size = "md",
  className
}) => {
  const clamped = Math.max(0, Math.min(100, Math.round(score)));

  const tone =
    clamped >= 75
      ? {
          bg: "from-emerald-500/80 to-emerald-400/80",
          text: "text-emerald-950",
          label: "Strong fit"
        }
      : clamped >= 55
      ? {
          bg: "from-amber-400/80 to-amber-300/80",
          text: "text-amber-950",
          label: "Promising fit"
        }
      : {
          bg: "from-rose-400/80 to-rose-300/80",
          text: "text-rose-950",
          label: "Exploratory"
        };

  const sizeClasses =
    size === "sm"
      ? "px-2.5 py-1 text-[11px]"
      : "px-3 py-1.5 text-xs";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r",
        "shadow-soft-glass border border-white/70",
        tone.bg,
        tone.text,
        sizeClasses,
        className
      )}
    >
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/80 text-[11px] font-semibold text-slate-900 shadow-sm">
        {clamped}
      </span>
      <span className="font-medium leading-none">Fit</span>
      <span className="hidden text-[11px] font-normal opacity-80 sm:inline">
        {tone.label}
      </span>
    </div>
  );
};

