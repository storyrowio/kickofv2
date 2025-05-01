import * as React from "react"

import { cn } from "@/lib/utils"
import {cva} from "class-variance-authority";

function Input({
  className,
  type,
    error,
    prefix,
    suffix,
    size,
  ...props
}) {
    const inputVariants = cva(
        "flex items-center rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        {
            variants: {
                size: {
                    default: "h-10 px-3",
                    sm: "h-8 px-2 text-sm",
                    lg: "h-12 px-4 text-base",
                },
            },
            defaultVariants: {
                size: "default",
            },
        }
    )

    return (
      <div
          className={cn(
              // inputVariants({ size }),
              "relative w-full",

              className
          )}>
          {prefix && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                  {prefix}
              </div>
          )}
        <input
            type={type}
            data-slot="input"
            className={cn(
                "text-sm file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                className,
                prefix && "pl-10",
                suffix && "pr-10",
                error ? 'border-error' : ''
            )}
            {...props} />
        {error  && <span>{error}</span>}
      </div>
  );
}

export {Input}
