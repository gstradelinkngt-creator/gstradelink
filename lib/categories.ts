/**
 * Single source of truth for product categories.
 *
 * Used by:
 *   - the public products filter (app/products/page.tsx)
 *   - the admin add/edit forms (components/admin/*)
 *   - shared types (types/index.ts re-exports ProductCategory)
 *
 * The database enforces this exact set via a CHECK constraint
 * (see supabase/migrations/003_category_constraint.sql). Keep the two in
 * sync — adding a category means updating BOTH this list and the constraint.
 */
export const PRODUCT_CATEGORIES = [
    "Precision & Pocket Mini Scales",
    "Kitchen & Compact Tabletop Scales",
    "Portable & Luggage Scales",
    "Heavy-Duty Hanging & Crane Scales",
    "Personal Health & Bathroom Scales",
    "Packaging & Miscellaneous Equipment",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

/** Short labels for the public filter chips. */
export const CATEGORY_SHORT_LABELS: Record<ProductCategory, string> = {
    "Precision & Pocket Mini Scales": "Precision",
    "Kitchen & Compact Tabletop Scales": "Kitchen",
    "Portable & Luggage Scales": "Luggage",
    "Heavy-Duty Hanging & Crane Scales": "Industrial",
    "Personal Health & Bathroom Scales": "Health & Baby",
    "Packaging & Miscellaneous Equipment": "Packaging",
};

/** Friendlier labels for the admin dropdowns. */
export const CATEGORY_ADMIN_LABELS: Record<ProductCategory, string> = {
    "Precision & Pocket Mini Scales": "Precision Scales",
    "Kitchen & Compact Tabletop Scales": "Kitchen Scales",
    "Portable & Luggage Scales": "Luggage Scales",
    "Heavy-Duty Hanging & Crane Scales": "Industrial Scales",
    "Personal Health & Bathroom Scales": "Health Scales",
    "Packaging & Miscellaneous Equipment": "Packaging Equipment",
};

/** Default selection for the "add product" form. */
export const DEFAULT_CATEGORY: ProductCategory = PRODUCT_CATEGORIES[0];

/** Admin dropdown options as {value,label} pairs. */
export const CATEGORY_OPTIONS = PRODUCT_CATEGORIES.map((value) => ({
    value,
    label: CATEGORY_ADMIN_LABELS[value],
}));
