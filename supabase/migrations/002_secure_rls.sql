-- =========================================================================
-- GSTradeLink: Security hardening — lock down RLS to admins
--
-- Fixes three privilege-escalation holes that existed because every
-- privileged action runs client-side with the anon key:
--   1. profiles "Service role full access" USING(true) → anyone could
--      read every profile and promote themselves to admin.
--   2. products "Authenticated users can modify products" → any logged-in
--      user (not just admins) could insert/update/delete the catalog.
--   3. storage product-images upload allowed to any authenticated user.
--
-- Strategy: gate all writes on an is_admin() SECURITY DEFINER helper.
-- The function bypasses RLS internally, so a profiles policy can safely
-- ask "is the caller an admin?" without recursing on profiles' own RLS.
-- =========================================================================

-- 1. Admin check helper (bypasses RLS via SECURITY DEFINER) -----------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- =========================================================================
-- PROFILES
-- =========================================================================
DROP POLICY IF EXISTS "Service role full access" ON public.profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;

-- Read: your own profile, or any profile if you are an admin.
CREATE POLICY "profiles_select" ON public.profiles
  FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

-- Insert: admins can create any profile; a normal user may only create
-- their OWN profile and only with role 'user' (blocks self-promotion).
-- The signup trigger (SECURITY DEFINER) and middleware fallback rely on this.
CREATE POLICY "profiles_insert" ON public.profiles
  FOR INSERT
  WITH CHECK (
    public.is_admin()
    OR (auth.uid() = id AND role = 'user')
  );

-- Update: admins only (this is the role-change path in ManageUsersTab).
CREATE POLICY "profiles_update_admin" ON public.profiles
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Delete: admins only.
CREATE POLICY "profiles_delete_admin" ON public.profiles
  FOR DELETE
  USING (public.is_admin());

-- =========================================================================
-- PRODUCTS
-- =========================================================================
DROP POLICY IF EXISTS "Authenticated users can modify products" ON public.products;
-- Keep the existing public read policy ("Public products are viewable by everyone").

-- Writes (insert/update/delete): admins only.
CREATE POLICY "products_write_admin" ON public.products
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- =========================================================================
-- STORAGE: product-images bucket
-- =========================================================================
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
-- Keep "Public Access to Images" (public SELECT) so the site can render images.

-- Insert/update/delete on product-images: admins only.
-- This also fixes the orphaned-image bug — admins can now delete old files.
CREATE POLICY "product_images_admin_write" ON storage.objects
  FOR ALL
  USING (bucket_id = 'product-images' AND public.is_admin())
  WITH CHECK (bucket_id = 'product-images' AND public.is_admin());
