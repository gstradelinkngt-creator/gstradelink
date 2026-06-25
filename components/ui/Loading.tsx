"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Loader2, Scale } from "lucide-react";

// ===== LOADING SPINNER COMPONENT =====
interface LoadingSpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  color?: "primary" | "accent" | "muted" | "white";
}

export function LoadingSpinner({
  size = "md",
  className,
  color = "primary"
}: LoadingSpinnerProps) {
  const sizeClasses = {
    xs: "h-3 w-3",
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  const colorClasses = {
    primary: "text-brand-primary",
    accent: "text-brand-accent",
    muted: "text-brand-muted",
    white: "text-white",
  };

  return (
    <Loader2
      className={cn(
        "animate-spin",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      aria-label="Loading"
    />
  );
}

// ===== LOADING DOTS COMPONENT =====
interface LoadingDotsProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "accent" | "muted";
}

export function LoadingDots({
  className,
  size = "md",
  color = "primary"
}: LoadingDotsProps) {
  const sizeClasses = {
    sm: "h-1 w-1",
    md: "h-2 w-2",
    lg: "h-3 w-3",
  };

  const colorClasses = {
    primary: "bg-brand-primary",
    accent: "bg-brand-accent",
    muted: "bg-brand-muted",
  };

  return (
    <div className={cn("flex items-center space-x-1", className)} aria-label="Loading">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "rounded-full animate-pulse",
            sizeClasses[size],
            colorClasses[color]
          )}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: "1s",
          }}
        />
      ))}
    </div>
  );
}

// ===== LOADING BAR COMPONENT =====
interface LoadingBarProps {
  progress?: number; // 0-100
  className?: string;
  height?: "sm" | "md" | "lg";
  color?: "primary" | "accent" | "success";
  animated?: boolean;
}

export function LoadingBar({
  progress = 0,
  className,
  height = "md",
  color = "primary",
  animated = true
}: LoadingBarProps) {
  const heightClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  const colorClasses = {
    primary: "bg-brand-primary",
    accent: "bg-brand-accent",
    success: "bg-success-500",
  };

  return (
    <div
      className={cn(
        "w-full bg-background-secondary rounded-full overflow-hidden",
        heightClasses[height],
        className
      )}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          "h-full transition-all duration-300 ease-out rounded-full",
          colorClasses[color],
          animated && "animate-pulse"
        )}
        style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
      />
    </div>
  );
}

// ===== SKELETON COMPONENT =====
interface SkeletonProps {
  className?: string;
  variant?: "text" | "rectangular" | "circular";
  width?: string | number;
  height?: string | number;
  animated?: boolean;
}

export function Skeleton({
  className,
  variant = "text",
  width,
  height,
  animated = true
}: SkeletonProps) {
  const variantClasses = {
    text: "rounded",
    rectangular: "rounded-md",
    circular: "rounded-full",
  };

  const defaultSizes = {
    text: { width: "100%", height: "1em" },
    rectangular: { width: "100%", height: "200px" },
    circular: { width: "40px", height: "40px" },
  };

  const style = {
    width: width || defaultSizes[variant].width,
    height: height || defaultSizes[variant].height,
  };

  return (
    <div
      className={cn(
        "bg-background-secondary",
        variantClasses[variant],
        animated && "animate-pulse",
        className
      )}
      style={style}
      aria-label="Loading content"
    />
  );
}

// ===== FULL PAGE LOADING COMPONENT =====
interface FullPageLoadingProps {
  message?: string;
  showLogo?: boolean;
  variant?: "spinner" | "dots" | "scale";
}

export function FullPageLoading({
  message = "Loading...",
  showLogo = true,
  variant = "scale"
}: FullPageLoadingProps) {
  const renderLoadingIcon = () => {
    switch (variant) {
      case "spinner":
        return <LoadingSpinner size="xl" color="primary" />;
      case "dots":
        return <LoadingDots size="lg" color="primary" />;
      case "scale":
        return (
          <div className="relative">
            <Scale className="h-16 w-16 text-brand-primary animate-bounce" />
            <div className="absolute inset-0 h-16 w-16 text-brand-accent animate-ping opacity-20">
              <Scale className="h-16 w-16" />
            </div>
          </div>
        );
      default:
        return <LoadingSpinner size="xl" color="primary" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background-secondary">
      <div className="text-center space-y-6">
        {showLogo && (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-brand-accent p-2 rounded-lg">
                <Scale size={32} className="text-brand-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-brand-primary">
                  GSTRADELINK
                </h1>
                <p className="text-sm text-brand-muted uppercase tracking-wide">
                  Bharatpur
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center space-y-4">
          {renderLoadingIcon()}
          <p className="text-brand-muted text-lg font-medium animate-fade-in">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

// ===== LOADING OVERLAY COMPONENT =====
interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  variant?: "spinner" | "dots";
  className?: string;
}

export function LoadingOverlay({
  isVisible,
  message = "Loading...",
  variant = "spinner",
  className
}: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 z-10 flex flex-col items-center justify-center",
        "bg-white/80 backdrop-blur-sm rounded-lg",
        className
      )}
    >
      <div className="text-center space-y-3">
        {variant === "spinner" ? (
          <LoadingSpinner size="lg" color="primary" />
        ) : (
          <LoadingDots size="lg" color="primary" />
        )}
        <p className="text-brand-muted font-medium">{message}</p>
      </div>
    </div>
  );
}

// ===== CARD LOADING SKELETON =====
export function CardLoadingSkeleton() {
  return (
    <div className="bg-background-card rounded-xl p-6 shadow-card animate-pulse">
      <div className="space-y-4">
        <Skeleton variant="rectangular" height="200px" />
        <div className="space-y-2">
          <Skeleton variant="text" height="20px" />
          <Skeleton variant="text" height="16px" width="70%" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton variant="text" height="16px" width="40%" />
          <Skeleton variant="rectangular" height="32px" width="80px" />
        </div>
      </div>
    </div>
  );
}

// ===== PRODUCT GRID LOADING =====
interface ProductGridLoadingProps {
  count?: number;
}

export function ProductGridLoading({ count = 6 }: ProductGridLoadingProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <CardLoadingSkeleton key={i} />
      ))}
    </div>
  );
}

// ===== TABLE LOADING SKELETON =====
interface TableLoadingProps {
  rows?: number;
  columns?: number;
}

export function TableLoading({ rows = 5, columns = 4 }: TableLoadingProps) {
  return (
    <div className="space-y-4">
      {/* Table Header */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {[...Array(columns)].map((_, i) => (
          <Skeleton key={`header-${i}`} variant="text" height="20px" />
        ))}
      </div>

      {/* Table Rows */}
      {[...Array(rows)].map((_, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {[...Array(columns)].map((_, colIndex) => (
            <Skeleton
              key={`cell-${rowIndex}-${colIndex}`}
              variant="text"
              height="16px"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// ===== LOADING STATES FOR FORMS =====
export function FormLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton variant="text" height="16px" width="100px" />
        <Skeleton variant="rectangular" height="40px" />
      </div>
      <div className="space-y-2">
        <Skeleton variant="text" height="16px" width="120px" />
        <Skeleton variant="rectangular" height="40px" />
      </div>
      <div className="space-y-2">
        <Skeleton variant="text" height="16px" width="80px" />
        <Skeleton variant="rectangular" height="100px" />
      </div>
      <div className="flex gap-3">
        <Skeleton variant="rectangular" height="40px" width="100px" />
        <Skeleton variant="rectangular" height="40px" width="80px" />
      </div>
    </div>
  );
}

// ===== LOADING COMPONENT WITH RETRY =====
interface LoadingWithRetryProps {
  isLoading: boolean;
  error?: string | null;
  onRetry?: () => void;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
}

export function LoadingWithRetry({
  isLoading,
  error,
  onRetry,
  children,
  loadingComponent
}: LoadingWithRetryProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        {loadingComponent || <LoadingSpinner size="lg" color="primary" />}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="space-y-4">
          <p className="text-danger-500 font-medium">
            {error}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// ===== EXPORT ALL COMPONENTS =====
export default {
  LoadingSpinner,
  LoadingDots,
  LoadingBar,
  Skeleton,
  FullPageLoading,
  LoadingOverlay,
  CardLoadingSkeleton,
  ProductGridLoading,
  TableLoading,
  FormLoading,
  LoadingWithRetry,
};
