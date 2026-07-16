import "server-only";

import { createClient } from "@supabase/supabase-js";
import { ServiceUnavailableError } from "@/lib/errors";
import { getSupabaseAdminConfig } from "@/lib/supabase/config";

export function createAdminClient() {
  const config = getSupabaseAdminConfig();
  if (!config) {
    throw new ServiceUnavailableError(
      "The background worker is not configured",
    );
  }

  return createClient(config.url, config.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}
