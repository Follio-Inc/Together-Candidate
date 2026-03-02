import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, hint, id, children, ...props }, ref) => {
    const selectId = id ?? props.name ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-1.5 text-sm">
        {label ? (
          <label
            htmlFor={selectId}
            className="flex items-center justify-between text-xs font-medium text-slate-800"
          >
            <span>{label}</span>
            {hint ? (
              <span className="text-[11px] font-normal text-slate-500">
                {hint}
              </span>
            ) : null}
          </label>
        ) : null}
        <select
          id={selectId}
          ref={ref}
          className={cn(
            "focus-ring w-full appearance-none rounded-xl border border-white/70 bg-white/70 px-3 py-2 pr-8 text-sm text-slate-900 shadow-sm",
            "bg-[url(\"data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394a3b8' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")] bg-no-repeat bg-[right_0.75rem_center]",
            className
          )}
          {...props}
        >
          {children}
        </select>
      </div>
    );
  }
);

Select.displayName = "Select";

