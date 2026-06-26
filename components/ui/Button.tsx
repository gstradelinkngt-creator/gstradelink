"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  // Base styles - premium, minimalist, dark-first
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:pointer-events-none disabled:opacity-60 active:scale-[0.97]",
  {
    variants: {
      variant: {
        primary:
          "bg-amber-500 text-slate-900 shadow-sm hover:bg-amber-400 hover:shadow-md active:bg-amber-600",
        secondary:
          "bg-slate-800 text-slate-100 border border-slate-700 shadow-sm hover:bg-slate-700 hover:border-slate-600 active:bg-slate-800",
        outline:
          "border border-slate-600 text-slate-100 hover:bg-slate-800 hover:border-amber-500/60 active:bg-slate-800/70",
        ghost:
          "text-slate-300 hover:bg-slate-800 hover:text-slate-50 active:bg-slate-800/70",
        danger:
          "bg-red-500 text-white shadow-sm hover:bg-red-400 active:bg-red-600",
        success:
          "bg-emerald-500 text-slate-900 shadow-sm hover:bg-emerald-400 active:bg-emerald-600",
        warning:
          "bg-amber-500 text-slate-900 shadow-sm hover:bg-amber-400 active:bg-amber-600",
        link: "text-amber-400 underline-offset-4 hover:underline hover:text-amber-300 focus-visible:ring-amber-500/60",
      },
      size: {
        xs: "px-3 py-1.5 text-xs rounded-lg",
        sm: "px-4 py-2 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-6 py-3 text-sm",
        xl: "px-8 py-3.5 text-base rounded-2xl",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild: _asChild = false,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    void _asChild;
    const isDisabled = disabled || isLoading;

    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {!isLoading && leftIcon && (
          <span className="shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <span className={cn("truncate", fullWidth && "flex-1 text-center")}>
          {isLoading && loadingText ? loadingText : children}
        </span>
        {!isLoading && rightIcon && (
          <span className="shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
