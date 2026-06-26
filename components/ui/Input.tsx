"use client";

import React, { forwardRef, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, AlertCircle, CheckCircle, Info } from "lucide-react";

const inputVariants = cva(
  "flex w-full rounded-lg border bg-slate-800/50 text-slate-100 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 focus-visible:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500/50",
        error: "border-red-500 bg-red-500/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/40 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/40",
        success: "border-emerald-500 bg-emerald-500/10 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40 focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500/40",
        warning: "border-amber-500 bg-amber-500/10 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/40 focus-visible:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500/40",
      },
      size: {
        sm: "px-3 py-2 text-sm",
        md: "px-3.5 py-2.5 text-sm",
        lg: "px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-slate-200",
        error: "text-red-400",
        success: "text-emerald-400",
        warning: "text-amber-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
  warning?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  hintClassName?: string;
  errorClassName?: string;
  required?: boolean;
  loading?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      labelClassName,
      hintClassName,
      errorClassName,
      variant,
      size,
      type = "text",
      label,
      hint,
      error,
      success,
      warning,
      leftIcon,
      rightIcon,
      showPasswordToggle = false,
      required = false,
      loading = false,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // Determine the current variant based on validation state
    const currentVariant = error
      ? "error"
      : success
      ? "success"
      : warning
      ? "warning"
      : variant || "default";

    // Determine input type (handle password visibility)
    const inputType = showPasswordToggle && type === "password"
      ? (showPassword ? "text" : "password")
      : type;

    // Generate unique ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    // Handle password visibility toggle
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    // Determine if we should show right icon
    const shouldShowRightIcon = rightIcon ||
      (showPasswordToggle && type === "password") ||
      error || success || warning;

    const getRightIcon = () => {
      if (loading) {
        return (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-500"></div>
        );
      }

      if (showPasswordToggle && type === "password") {
        return (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="text-slate-400 hover:text-slate-100 transition-colors focus:outline-none focus:text-slate-100"
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        );
      }

      if (error) {
        return <AlertCircle size={16} className="text-danger-500" aria-hidden="true" />;
      }

      if (success) {
        return <CheckCircle size={16} className="text-success-500" aria-hidden="true" />;
      }

      if (warning) {
        return <Info size={16} className="text-warning-500" aria-hidden="true" />;
      }

      return rightIcon;
    };

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              labelVariants({ variant: currentVariant }),
              labelClassName
            )}
          >
            {label}
            {required && (
              <span className="text-danger-500 ml-1" aria-label="Required">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            type={inputType}
            className={cn(
              inputVariants({ variant: currentVariant, size }),
              leftIcon && "pl-10",
              shouldShowRightIcon && "pr-10",
              className
            )}
            ref={ref}
            id={inputId}
            disabled={disabled || loading}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${inputId}-error`
                : success
                ? `${inputId}-success`
                : warning
                ? `${inputId}-warning`
                : hint
                ? `${inputId}-hint`
                : undefined
            }
            {...props}
          />

          {shouldShowRightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {getRightIcon()}
            </div>
          )}

          {/* Focus ring indicator for better mobile accessibility */}
          {isFocused && (
            <div
              className={cn(
                "absolute inset-0 rounded-lg pointer-events-none border-2",
                currentVariant === "error" && "border-red-500/30",
                currentVariant === "success" && "border-emerald-500/30",
                currentVariant === "warning" && "border-amber-500/30",
                currentVariant === "default" && "border-amber-500/30"
              )}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Helper text */}
        {hint && !error && !success && !warning && (
          <p
            id={`${inputId}-hint`}
            className={cn("text-xs text-slate-400", hintClassName)}
          >
            {hint}
          </p>
        )}

        {/* Error message */}
        {error && (
          <p
            id={`${inputId}-error`}
            className={cn(
              "text-xs text-danger-500 flex items-center gap-1",
              errorClassName
            )}
            role="alert"
            aria-live="polite"
          >
            <AlertCircle size={12} aria-hidden="true" />
            {error}
          </p>
        )}

        {/* Success message */}
        {success && (
          <p
            id={`${inputId}-success`}
            className="text-xs text-success-500 flex items-center gap-1"
            role="status"
            aria-live="polite"
          >
            <CheckCircle size={12} aria-hidden="true" />
            {success}
          </p>
        )}

        {/* Warning message */}
        {warning && (
          <p
            id={`${inputId}-warning`}
            className="text-xs text-warning-500 flex items-center gap-1"
            role="alert"
            aria-live="polite"
          >
            <Info size={12} aria-hidden="true" />
            {warning}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// ===== TEXTAREA COMPONENT =====
export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
  warning?: string;
  containerClassName?: string;
  labelClassName?: string;
  hintClassName?: string;
  errorClassName?: string;
  required?: boolean;
  loading?: boolean;
  resize?: boolean;
  minRows?: number;
  maxRows?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      containerClassName,
      labelClassName,
      hintClassName,
      errorClassName,
      variant,
      label,
      hint,
      error,
      success,
      warning,
      required = false,
      loading = false,
      disabled,
      resize = true,
      minRows = 3,
      maxRows = 10,
      id,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    // Determine the current variant based on validation state
    const currentVariant = error
      ? "error"
      : success
      ? "success"
      : warning
      ? "warning"
      : variant || "default";

    // Generate unique ID if not provided
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              labelVariants({ variant: currentVariant }),
              labelClassName
            )}
          >
            {label}
            {required && (
              <span className="text-danger-500 ml-1" aria-label="Required">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          <textarea
            className={cn(
              inputVariants({ variant: currentVariant }),
              "min-h-[80px]",
              !resize && "resize-none",
              resize && "resize-y",
              className
            )}
            ref={ref}
            id={textareaId}
            disabled={disabled || loading}
            rows={minRows}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${textareaId}-error`
                : success
                ? `${textareaId}-success`
                : warning
                ? `${textareaId}-warning`
                : hint
                ? `${textareaId}-hint`
                : undefined
            }
            style={{
              maxHeight: maxRows ? `${maxRows * 1.5}rem` : undefined,
            }}
            {...props}
          />

          {/* Focus ring indicator */}
          {isFocused && (
            <div
              className={cn(
                "absolute inset-0 rounded-lg pointer-events-none border-2",
                currentVariant === "error" && "border-red-500/30",
                currentVariant === "success" && "border-emerald-500/30",
                currentVariant === "warning" && "border-amber-500/30",
                currentVariant === "default" && "border-amber-500/30"
              )}
              aria-hidden="true"
            />
          )}

          {loading && (
            <div className="absolute right-3 top-3">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-500"></div>
            </div>
          )}
        </div>

        {/* Helper text */}
        {hint && !error && !success && !warning && (
          <p
            id={`${textareaId}-hint`}
            className={cn("text-xs text-slate-400", hintClassName)}
          >
            {hint}
          </p>
        )}

        {/* Error message */}
        {error && (
          <p
            id={`${textareaId}-error`}
            className={cn(
              "text-xs text-danger-500 flex items-center gap-1",
              errorClassName
            )}
            role="alert"
            aria-live="polite"
          >
            <AlertCircle size={12} aria-hidden="true" />
            {error}
          </p>
        )}

        {/* Success message */}
        {success && (
          <p
            id={`${textareaId}-success`}
            className="text-xs text-success-500 flex items-center gap-1"
            role="status"
            aria-live="polite"
          >
            <CheckCircle size={12} aria-hidden="true" />
            {success}
          </p>
        )}

        {/* Warning message */}
        {warning && (
          <p
            id={`${textareaId}-warning`}
            className="text-xs text-warning-500 flex items-center gap-1"
            role="alert"
            aria-live="polite"
          >
            <Info size={12} aria-hidden="true" />
            {warning}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Input, Textarea, inputVariants, labelVariants };
