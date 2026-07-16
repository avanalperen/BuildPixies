import path from "node:path";
import { AuthRequiredError, StorageUnavailableError } from "@/lib/errors";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient as createServerClient } from "@/lib/supabase/server";

export function requiresSupabase(): boolean {
  return (
    process.env.VERCEL === "1" ||
    process.env.BUILDPIXIES_REQUIRE_SUPABASE === "1"
  );
}

export function canUseLocalFileStore(): boolean {
  return !requiresSupabase() && process.env.BUILDPIXIES_DISABLE_FILE_STORE !== "1";
}

export function localStorePath(filename: string): string {
  const namespace = process.env.BUILDPIXIES_LOCAL_STORE_NAMESPACE?.trim();
  if (namespace && /^[a-z0-9_-]+$/i.test(namespace)) {
    return path.join(process.cwd(), ".local", namespace, filename);
  }
  return path.join(process.cwd(), ".local", filename);
}

export function assertStorageAvailable() {
  if (!isSupabaseConfigured() && !canUseLocalFileStore()) {
    throw new StorageUnavailableError();
  }
}

export async function getSupabaseUserClient() {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    throw new AuthRequiredError();
  }

  return { supabase, userId: data.user.id };
}
