import * as React from "react";
import { cn } from "@/lib/utils";

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, interactive = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "glass-card",
          interactive && "glass-hover cursor-pointer",
          className
        )}
        {...props}
      />
    );
  }
);

GlassCard.displayName = "GlassCard";

