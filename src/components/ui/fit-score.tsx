"use client";

import { cn, fitScoreColor, fitScoreRingColor } from "@/lib/utils";

interface FitScoreRingProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: { dimension: 48, strokeWidth: 4, radius: 18, fontSize: "text-xs" },
  md: { dimension: 72, strokeWidth: 5, radius: 28, fontSize: "text-lg" },
  lg: { dimension: 104, strokeWidth: 6, radius: 42, fontSize: "text-2xl" },
};

export function FitScoreRing({
  score,
  size = "md",
  showLabel = true,
  className,
}: FitScoreRingProps) {
  const config = sizeConfig[size];
  const circumference = 2 * Math.PI * config.radius;
  const offset = circumference - (score / 100) * circumference;
  const center = config.dimension / 2;

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <div className="relative" style={{ width: config.dimension, height: config.dimension }}>
        <svg
          width={config.dimension}
          height={config.dimension}
          className="-rotate-90"
        >
          <circle
            cx={center}
            cy={center}
            r={config.radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={config.strokeWidth}
            className="text-stone-200"
          />
          <circle
            cx={center}
            cy={center}
            r={config.radius}
            fill="none"
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={cn("transition-all duration-1000 ease-out", fitScoreRingColor(score))}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("font-semibold", config.fontSize, fitScoreColor(score))}>
            {score}
          </span>
        </div>
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-stone-500">Fit Score</span>
      )}
    </div>
  );
}

interface FitScoreBarProps {
  score: number;
  label: string;
  className?: string;
}

export function FitScoreBar({ score, label, className }: FitScoreBarProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex justify-between items-center">
        <span className="text-sm text-stone-600">{label}</span>
        <span className={cn("text-sm font-medium", fitScoreColor(score))}>
          {score}%
        </span>
      </div>
      <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-out",
            score >= 75 ? "bg-emerald-500" : score >= 50 ? "bg-amber-500" : "bg-stone-300"
          )}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
