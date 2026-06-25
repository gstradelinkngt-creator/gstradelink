-- =========================================================================
-- GSTradeLink: products table + product-images storage bucket (baseline)
--
-- This captures schema that originally existed only in the Supabase cloud
-- (created via the dashboard) so the repo is reproducible. It is written to
-- be idempotent and SECURE BY DEFAULT — only a public read policy is created
-- here; all write access is granted to admins in 002_secure_rls.sql.
--
-- Ordered as 000_ so it runs before 001 (profiles) and 002 (rls hardening).
-- =========================================================================

-- Required for uuid_generate_v4()
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. products table --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  name              TEXT NOT NULL,
  short_description TEXT,
  category          TEXT NOT NULL,
  image_url         TEXT,
  is_active         BOOLEAN DEFAULT true
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Public read (matches the live "Public products are viewable by everyone").
DROP POLICY IF EXISTS "Public products are viewable by everyone" ON public.products;
CREATE POLICY "Public products are viewable by everyone" ON public.products
  FOR SELECT
  USING (true);

-- NOTE: write policies intentionally omitted here — see 002_secure_rls.sql.

-- 2. product-images storage bucket (public, image-only, 5 MB cap) ----------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  5242880, -- 5 MB
  ARRAY['image/png', 'image/jpeg', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Public read of objects in the bucket (matches live "Public Access to Images").
DROP POLICY IF EXISTS "Public Access to Images" ON storage.objects;
CREATE POLICY "Public Access to Images" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'product-images');

-- NOTE: write policy for the bucket is admin-gated in 002_secure_rls.sql.
