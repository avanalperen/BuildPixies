"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const enableAnonymousAuth =
  process.env.NEXT_PUBLIC_BUILDPIXIES_ENABLE_ANON_AUTH !== "0";

export function SessionBootstrap() {
  useEffect(() => {
    if (!enableAnonymousAuth) return;

    const client = createClient();
    if (!client) return;

    let cancelled = false;

    async function ensureSession(
      supabase: NonNullable<ReturnType<typeof createClient>>,
    ) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user && !cancelled) {
        await supabase.auth.signInAnonymously();
      }
    }

    ensureSession(client).catch(() => {
      // Storage routes still return a visible auth error if anonymous auth is off.
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
