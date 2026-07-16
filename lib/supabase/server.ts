import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { AuthRequiredError } from "@/lib/errors";
import { getSupabaseConfig } from "@/lib/supabase/config";

export async function createClient() {
  const config = getSupabaseConfig();
  if (!config) return null;
  const cookieStore = await cookies();
  return createServerClient(config.url, config.key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Called from a Server Component — safe to ignore when middleware refreshes sessions.
        }
      },
    },
  });
}

export async function requireUserId(): Promise<string> {
  const supabase = await createClient();
  if (!supabase) {
    throw new AuthRequiredError();
  }

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    throw new AuthRequiredError();
  }

  return data.user.id;
}
