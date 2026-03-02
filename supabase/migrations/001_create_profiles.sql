-- =========================================================================
-- GSTradeLink: profiles table + auto-populate trigger
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- =========================================================================

-- 1. Create the profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email      TEXT,
  role       TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Enable Row-Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Policy: users can read their own profile
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- 4. Policy: service_role / admins can do anything (for middleware checks)
CREATE POLICY "Service role full access"
  ON public.profiles FOR ALL
  USING (true);

-- 5. Auto-create a profile row whenever a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_count INT;
  user_role  TEXT;
BEGIN
  -- First user becomes admin automatically
  SELECT COUNT(*) INTO user_count FROM public.profiles;
  IF user_count = 0 THEN
    user_role := 'admin';
  ELSE
    user_role := 'user';
  END IF;

  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'email', user_role)
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop the trigger first if it exists (idempotent)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. Backfill: create profiles for any existing auth users
-- The very first existing user becomes admin
INSERT INTO public.profiles (id, email, role)
SELECT
  u.id,
  u.raw_user_meta_data ->> 'email',
  CASE
    WHEN ROW_NUMBER() OVER (ORDER BY u.created_at ASC) = 1 THEN 'admin'
    ELSE 'user'
  END
FROM auth.users u
WHERE NOT EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = u.id);
