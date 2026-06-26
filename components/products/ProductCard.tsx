"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { MessageCircle, Package, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/types";

const WHATSAPP_BASE = "https://wa.me/9779845541939";

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
            className="object-cover transition-transform duration-500 group-hover:scale-105"
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
        <Link href={`/products/${product.id}`}>
          <h3
            className="line-clamp-2 font-bold text-slate-100 transition-colors group-hover:text-amber-500"
            style={{ fontSize: "1.05rem", lineHeight: 1.4 }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Admin actions */}
        {showActions && (onEdit || onDelete) ? (
          <div className="mt-auto grid grid-cols-2 gap-3 pt-5 border-t border-slate-800 mt-5">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
                className="h-9 text-xs bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-slate-50"
              >
                <Pencil size={14} className="mr-1.5" /> Edit
              </Button>
            )}
            {onDelete && (
              <Button
                variant="danger"
                size="sm"
                onClick={onDelete}
                className="h-9 border-none bg-red-500/10 text-xs font-medium text-red-400 hover:bg-red-500/20 hover:text-red-300"
              >
                <Trash2 size={14} className="mr-1.5" /> Delete
              </Button>
            )}
          </div>
        ) : (
          <div className="mt-auto grid grid-cols-2 gap-3 pt-5">
            <Link
              href={`/products/${product.id}`}
              className="flex items-center justify-center rounded-lg bg-slate-800 border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-700"
            >
              Details
            </Link>
            <a
              href={`${WHATSAPP_BASE}?text=${encodeURIComponent(
                `Hello GSTradeLink! I'm interested in the ${product.name}. Could you please share availability and pricing?`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-sm transition-colors hover:bg-amber-600 active:bg-amber-700"
            >
              <MessageCircle size={15} /> Enquire
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
