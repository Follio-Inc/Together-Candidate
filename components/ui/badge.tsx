import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "subtle" | "outline" | "amber";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "subtle", ...props }, ref) => {
    const base =
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium";
    const styles =
      variant === "amber"
        ? "border-amber-200/80 bg-amber-50/70 text-amber-800"
        : variant === "outline"
        ? "border-slate-200/80 bg-transparent text-slate-700"
        : "border-white/80 bg-white/70 text-slate-700";

    return (
      <span ref={ref} className={cn(base, styles, className)} {...props} />
    );
  }
);

Badge.displayName = "Badge";

