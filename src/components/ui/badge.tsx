import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "amber" | "success" | "info" | "danger" | "purple";
  size?: "sm" | "md";
  className?: string;
}

const variantClasses = {
  default: "bg-stone-100 text-stone-600",
  amber: "bg-amber-100 text-amber-700",
  success: "bg-emerald-100 text-emerald-700",
  info: "bg-blue-100 text-blue-700",
  danger: "bg-red-100 text-red-700",
  purple: "bg-purple-100 text-purple-700",
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
};

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
}

interface StageBadgeProps {
  stage: string;
  className?: string;
}

const stageVariants: Record<string, BadgeProps["variant"]> = {
  applied: "info",
  reviewing: "amber",
  shortlisted: "purple",
  interview: "success",
  offer: "success",
  rejected: "danger",
  withdrawn: "default",
};

const stageLabels: Record<string, string> = {
  applied: "Applied",
  reviewing: "Reviewing",
  shortlisted: "Shortlisted",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
};

export function StageBadge({ stage, className }: StageBadgeProps) {
  return (
    <Badge
      variant={stageVariants[stage] || "default"}
      size="md"
      className={className}
    >
      {stageLabels[stage] || stage}
    </Badge>
  );
}
