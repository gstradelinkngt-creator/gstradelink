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
        "bg-slate-900 border border-slate-800 transition-colors hover:border-slate-700 group rounded-2xl flex flex-col overflow-hidden shadow-sm hover:shadow-md",
        !product.is_active && "opacity-60",
        className,
      )}
    >
      {/* Image */}
      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-[4/3] bg-slate-800 overflow-hidden shrink-0"
      >
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Package size={40} className="text-slate-600" />
          </div>
        )}

        {/* Category badge */}
        <span className="absolute left-3 top-3 rounded-md bg-slate-900/90 backdrop-blur-sm border border-slate-700 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-300">
          {getCategoryLabel(product.category)}
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <Link href={`/products/${product.id}`} className="flex flex-col flex-1">
          <h3
            className="mb-2 line-clamp-2 font-bold text-slate-100 transition-colors group-hover:text-amber-500"
            style={{ fontSize: "1.05rem", lineHeight: 1.4 }}
          >
            {product.name}
          </h3>
          <div className="mt-auto pt-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 group-hover:text-slate-200 transition-colors">
              View details
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </span>
          </div>
        </Link>

        {/* Admin actions */}
        {showActions && (onEdit || onDelete) && (
          <div className="mt-4 flex gap-2 pt-4 border-t border-slate-800">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
                className="h-9 flex-1 text-xs bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-slate-50"
              >
                <Pencil size={14} className="mr-1.5" /> Edit
              </Button>
            )}
            {onDelete && (
              <Button
                variant="danger"
                size="sm"
                onClick={onDelete}
                className="h-9 flex-1 border-none bg-red-500/10 text-xs font-medium text-red-400 hover:bg-red-500/20 hover:text-red-300"
              >
                <Trash2 size={14} className="mr-1.5" /> Delete
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
