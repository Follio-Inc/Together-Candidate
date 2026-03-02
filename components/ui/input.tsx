import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, error, id, ...props }, ref) => {
    const inputId = id ?? props.name ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-1.5 text-sm">
        {label ? (
          <label
            htmlFor={inputId}
            className="flex items-center justify-between text-xs font-medium text-slate-800"
          >
            <span>{label}</span>
            {hint && !error ? (
              <span className="text-[11px] font-normal text-slate-500">
                {hint}
              </span>
            ) : null}
          </label>
        ) : null}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "focus-ring w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400",
            "disabled:cursor-not-allowed disabled:bg-slate-100/80",
            error && "border-rose-300/90 bg-rose-50/70",
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-[11px] text-rose-600">{error}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

