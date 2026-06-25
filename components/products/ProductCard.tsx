"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Package, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  className?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Short category labels for cleaner display
const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    "Precision & Pocket Mini Scales": "Precision",
    "Kitchen & Compact Tabletop Scales": "Kitchen",
    "Portable & Luggage Scales": "Luggage",
    "Heavy-Duty Hanging & Crane Scales": "Industrial",
    "Personal Health & Bathroom Scales": "Health",
    "Packaging & Miscellaneous Equipment": "Packaging",
  };
  return labels[category] || category.split(" ")[0];
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
  onEdit,
  onDelete,
  showActions = false,
}) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "glass glass-hover ui-card group rounded-2xl",
        !product.is_active && "opacity-60",
        className,
      )}
    >
      {/* Image */}
      <Link
        href={`/products/${product.id}`}
        className="ui-media ui-media-4-3 block"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Package size={36} style={{ color: "rgba(174,202,233,0.5)" }} />
          </div>
        )}

        {/* Category badge */}
        <span className="glass-subtle absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
          {getCategoryLabel(product.category)}
        </span>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "rgba(8,15,24,0.45)", backdropFilter: "blur(2px)" }}
        >
          <span className="glass-strong flex h-11 w-11 items-center justify-center rounded-full text-white">
            <ArrowRight size={20} />
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="ui-card-body p-4">
        <Link href={`/products/${product.id}`} className="flex-1">
          <h3
            className="mb-1.5 line-clamp-2 font-semibold text-white transition-colors group-hover:text-[#DCA963]"
            style={{ fontSize: "0.9rem", lineHeight: 1.4, letterSpacing: "-0.01em" }}
          >
            {product.name}
          </h3>
          <p className="inline-flex items-center gap-1 text-xs" style={{ color: "#8FA6C2" }}>
            View details
            <ArrowRight
              size={12}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </p>
        </Link>

        {/* Admin actions */}
        {showActions && (onEdit || onDelete) && (
          <div className="relative z-20 mt-4 flex gap-2">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
                className="h-8 flex-1 text-xs"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "#AECAE9" }}
              >
                <Pencil size={13} className="mr-1" /> Edit
              </Button>
            )}
            {onDelete && (
              <Button
                variant="danger"
                size="sm"
                onClick={onDelete}
                className="h-8 flex-1 border-none bg-red-500/15 text-xs text-red-300 hover:bg-red-500/25"
              >
                <Trash2 size={13} className="mr-1" /> Delete
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
