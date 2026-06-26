"use client";

import React, { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-xl border bg-slate-900 text-slate-100 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-slate-700/50 shadow-sm",
        elevated: "bg-slate-800/80 border-slate-700/50 shadow-lg",
        outlined: "bg-transparent border-2 border-slate-700 shadow-none",
        ghost: "border-transparent shadow-none bg-transparent",
        gradient: "border-slate-700/50 shadow-sm bg-gradient-to-br from-slate-800/80 to-slate-900",
      },
      size: {
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
      },
      hover: {
        none: "",
        lift: "hover:shadow-lg hover:-translate-y-1 hover:border-slate-600/60",
        glow: "hover:shadow-lg hover:shadow-amber-500/10 hover:border-amber-500/30",
        scale: "hover:scale-[1.02]",
        subtle: "hover:bg-slate-800/60",
      },
      interactive: {
        true: "cursor-pointer focus-within:ring-2 focus-within:ring-amber-500/60 focus-within:ring-offset-2 focus-within:ring-offset-slate-900",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      hover: "none",
      interactive: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, hover, interactive, asChild = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, size, hover, interactive }), className)}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

// ===== CARD HEADER COMPONENT =====
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "centered" | "spaced";
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col space-y-1.5",
          variant === "centered" && "text-center items-center",
          variant === "spaced" && "flex-row justify-between items-start space-y-0",
          className
        )}
        {...props}
      />
    );
  }
);
CardHeader.displayName = "CardHeader";

// ===== CARD TITLE COMPONENT =====
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "sm" | "md" | "lg" | "xl";
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Comp = "h3", size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "text-sm font-semibold",
      md: "text-base font-semibold",
      lg: "text-lg font-semibold",
      xl: "text-xl font-bold",
    };

    return (
      <Comp
        ref={ref}
        className={cn(
          "leading-none tracking-tight text-foreground-primary",
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);
CardTitle.displayName = "CardTitle";

// ===== CARD DESCRIPTION COMPONENT =====
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "default" | "muted" | "accent";
  size?: "sm" | "md";
}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, variant = "default", size = "sm", ...props }, ref) => {
    const variantClasses = {
      default: "text-foreground-secondary",
      muted: "text-foreground-muted",
      accent: "text-accent-500",
    };

    const sizeClasses = {
      sm: "text-sm",
      md: "text-base",
    };

    return (
      <p
        ref={ref}
        className={cn(
          "leading-relaxed",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);
CardDescription.displayName = "CardDescription";

// ===== CARD CONTENT COMPONENT =====
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: "none" | "sm" | "md" | "lg";
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, spacing = "md", ...props }, ref) => {
    const spacingClasses = {
      none: "",
      sm: "space-y-2",
      md: "space-y-4",
      lg: "space-y-6",
    };

    return (
      <div
        ref={ref}
        className={cn(spacingClasses[spacing], className)}
        {...props}
      />
    );
  }
);
CardContent.displayName = "CardContent";

// ===== CARD FOOTER COMPONENT =====
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "centered" | "spaced" | "stacked";
  spacing?: "sm" | "md" | "lg";
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, variant = "default", spacing = "md", ...props }, ref) => {
    const variantClasses = {
      default: "flex items-center",
      centered: "flex items-center justify-center",
      spaced: "flex items-center justify-between",
      stacked: "flex flex-col items-start",
    };

    const spacingClasses = {
      sm: variant === "stacked" ? "space-y-2" : "gap-2",
      md: variant === "stacked" ? "space-y-3" : "gap-3",
      lg: variant === "stacked" ? "space-y-4" : "gap-4",
    };

    return (
      <div
        ref={ref}
        className={cn(
          variantClasses[variant],
          spacingClasses[spacing],
          "pt-3 border-t border-slate-700/50",
          className
        )}
        {...props}
      />
    );
  }
);
CardFooter.displayName = "CardFooter";

// ===== SPECIALIZED CARD COMPONENTS =====

// Product Card Component
export interface ProductCardProps extends CardProps {
  imageUrl?: string;
  imageAlt?: string;
  title: string;
  description?: string;
  category?: string;
  price?: string;
  isActive?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  loading?: boolean;
}

const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  ({
    imageUrl,
    imageAlt,
    title,
    description,
    category,
    price,
    isActive = true,
    onEdit,
    onDelete,
    loading = false,
    className,
    ...props
  }, ref) => {
    return (
      <Card
        ref={ref}
        variant="default"
        hover="lift"
        interactive
        className={cn(
          "overflow-hidden group",
          !isActive && "opacity-60",
          loading && "animate-pulse",
          className
        )}
        {...props}
      >
        {/* Image Section */}
        <div className="relative aspect-video bg-background-secondary rounded-lg mb-4 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt || title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-background-secondary to-background-primary">
              <div className="text-foreground-muted text-sm">No Image</div>
            </div>
          )}

          {/* Status Indicator */}
          <div className="absolute top-2 right-2">
            <div
              className={cn(
                "w-3 h-3 rounded-full",
                isActive ? "bg-success-500" : "bg-danger-500"
              )}
              title={isActive ? "Active" : "Inactive"}
            />
          </div>
        </div>

        {/* Content Section */}
        <CardContent spacing="sm">
          <div className="space-y-2">
            <CardTitle size="md" className="line-clamp-1">
              {title}
            </CardTitle>

            {category && (
              <div className="text-xs text-accent-500 font-medium bg-accent-500/10 px-2 py-1 rounded-full inline-block">
                {category}
              </div>
            )}

            {description && (
              <CardDescription className="line-clamp-2">
                {description}
              </CardDescription>
            )}
          </div>
        </CardContent>

        {/* Footer Section */}
        <CardFooter variant="spaced" className="pt-4">
          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                onClick={onEdit}
                className="text-xs bg-primary-600 text-white px-3 py-1 rounded-md hover:bg-primary-700 transition-colors"
                disabled={loading}
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="text-xs bg-danger-500 text-white px-3 py-1 rounded-md hover:bg-danger-600 transition-colors"
                disabled={loading}
              >
                Delete
              </button>
            )}
          </div>

          {price && (
            <div className="text-sm font-semibold text-accent-500">
              {price}
            </div>
          )}
        </CardFooter>
      </Card>
    );
  }
);
ProductCard.displayName = "ProductCard";

// Stats Card Component
export interface StatsCardProps extends CardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  loading?: boolean;
}

const StatsCard = forwardRef<HTMLDivElement, StatsCardProps>(
  ({
    title,
    value,
    description,
    icon,
    trend,
    loading = false,
    className,
    ...props
  }, ref) => {
    return (
      <Card
        ref={ref}
        variant="default"
        hover="subtle"
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        <CardContent spacing="sm">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardDescription size="sm" className="uppercase tracking-wide">
                {title}
              </CardDescription>
              <div className="text-2xl font-bold text-foreground-primary">
                {loading ? (
                  <div className="h-8 w-20 bg-background-secondary rounded animate-pulse" />
                ) : (
                  value
                )}
              </div>
              {description && !loading && (
                <CardDescription size="sm">
                  {description}
                </CardDescription>
              )}
            </div>

            {icon && (
              <div className="text-accent-500 opacity-80">
                {icon}
              </div>
            )}
          </div>

          {trend && !loading && (
            <div className="flex items-center gap-1 mt-3">
              <span
                className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-success-600" : "text-danger-600"
                )}
              >
                {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-foreground-muted">vs last period</span>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
);
StatsCard.displayName = "StatsCard";

// Feature Card Component
export interface FeatureCardProps extends CardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  features?: string[];
}

const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ icon, title, description, features, className, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="default"
        hover="lift"
        className={cn("text-center", className)}
        {...props}
      >
        <CardContent spacing="md">
          {icon && (
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent-500/10 flex items-center justify-center text-accent-500">
                {icon}
              </div>
            </div>
          )}

          <CardTitle size="lg" className="mb-2">
            {title}
          </CardTitle>

          <CardDescription className="mb-4">
            {description}
          </CardDescription>

          {features && features.length > 0 && (
            <ul className="text-sm text-foreground-secondary space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center justify-center gap-2">
                  <div className="w-1.5 h-1.5 bg-accent-400 rounded-full flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    );
  }
);
FeatureCard.displayName = "FeatureCard";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  ProductCard,
  StatsCard,
  FeatureCard,
  cardVariants,
};
