import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, Package, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORY_SHORT_LABELS } from "@/lib/categories";
import { productEnquiry } from "@/lib/site";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Pick<Product, "id" | "name" | "category" | "image_url"> &
    Partial<Pick<Product, "short_description" | "is_active">>;
  className?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
  /** Eager-load the image (above-the-fold cards). */
  priority?: boolean;
}

export const ProductCard = ({
  product,
  className,
  onEdit,
  onDelete,
  showActions = false,
  priority = false,
}: ProductCardProps) => {
  const label = CATEGORY_SHORT_LABELS[product.category] ?? product.category;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[box-shadow,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift",
        product.is_active === false && "opacity-60",
        className,
      )}
    >
      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-[4/3] overflow-hidden bg-paper-2"
        tabIndex={-1}
        aria-hidden
      >
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            priority={priority}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center">
            <Package size={36} className="text-ink-mute" />
          </span>
        )}
        <span className="absolute left-2 top-2 rounded-md sm:left-3 sm:top-3 bg-white/90 px-2 py-1 font-mono text-[0.62rem] font-medium uppercase tracking-wider text-ink backdrop-blur">
          {label}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <h3 className="font-body text-[0.9rem] font-semibold leading-snug tracking-normal text-ink sm:text-[1rem]">
          <Link href={`/products/${product.id}`} className="after:absolute after:inset-0 after:content-['']">
            {product.name}
          </Link>
        </h3>
        {product.short_description && (
          <p className="mt-1.5 line-clamp-2 hidden text-sm leading-relaxed text-ink-soft sm:block">{product.short_description}</p>
        )}

        {showActions && (onEdit || onDelete) ? (
          <div className="relative z-10 mt-auto grid grid-cols-2 gap-2 pt-4">
            {onEdit && (
              <button type="button" onClick={onEdit} className="btn-line h-9 text-xs">
                <Pencil size={14} /> Edit
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-red-50 text-xs font-semibold text-red-600 hover:bg-red-100"
              >
                <Trash2 size={14} /> Delete
              </button>
            )}
          </div>
        ) : (
          <div className="mt-auto flex items-center justify-between gap-2 pt-3 sm:pt-4">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-ink sm:text-sm">
              Details
              <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
            <a
              href={productEnquiry(product.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex h-9 items-center gap-1.5 rounded-lg bg-wa/10 px-2.5 text-xs font-semibold text-wa-deep transition-colors hover:bg-wa hover:text-white"
              aria-label={`Enquire about ${product.name} on WhatsApp`}
            >
              <MessageCircle size={14} /> <span className="hidden sm:inline">Enquire</span>
            </a>
          </div>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
