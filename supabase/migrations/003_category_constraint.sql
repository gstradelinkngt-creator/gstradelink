-- =========================================================================
-- GSTradeLink: unify product category taxonomy
--
--   1. Merge the stray "Baby Scales" rows into "Personal Health & Bathroom
--      Scales" (the public filter already labels that chip "Health & Baby").
--   2. Enforce the canonical 6-category set with a CHECK constraint so the
--      column can no longer drift. Mirrors lib/categories.ts.
-- =========================================================================

-- 1. Reconcile existing data BEFORE adding the constraint.
UPDATE public.products
SET category = 'Personal Health & Bathroom Scales'
WHERE category = 'Baby Scales';

-- 2. Lock the taxonomy.
ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_category_check;
ALTER TABLE public.products
  ADD CONSTRAINT products_category_check CHECK (
    category IN (
      'Precision & Pocket Mini Scales',
      'Kitchen & Compact Tabletop Scales',
      'Portable & Luggage Scales',
      'Heavy-Duty Hanging & Crane Scales',
      'Personal Health & Bathroom Scales',
      'Packaging & Miscellaneous Equipment'
    )
  );
