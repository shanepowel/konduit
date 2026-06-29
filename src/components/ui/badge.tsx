import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "default" && "bg-blue-light text-blue",
        variant === "success" && "bg-green/10 text-green",
        variant === "warning" && "bg-amber/10 text-amber",
        variant === "outline" && "border border-gray-200 text-gray-600",
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
