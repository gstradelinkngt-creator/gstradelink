/**
 * Backward-compatible re-export.
 *
 * Client components that `import { supabase } from "@/lib/supabase"`
 * continue to work. New code should import from:
 *   - `@/lib/supabase/client` for browser components ("use client")
 *   - `@/lib/supabase/server` for Server Components / Route Handlers
 */
import { createClient } from "./supabase/client";

export const supabase = createClient();
