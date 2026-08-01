import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseConfig } from "@/lib/supabase/config";

const enableAnonymousAuth =
  process.env.BUILDPIXIES_ENABLE_ANON_AUTH !== "0" &&
  process.env.NEXT_PUBLIC_BUILDPIXIES_ENABLE_ANON_AUTH !== "0";

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/queues/")) {
    return NextResponse.next();
  }

  const config = getSupabaseConfig();
  if (!config) return NextResponse.next();

  let response = NextResponse.next({ request });
  const supabase = createServerClient(config.url, config.key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user && enableAnonymousAuth) {
      await supabase.auth.signInAnonymously();
    }
  } catch {
    // Let the route render its own storage/auth error instead of failing proxy.
  }

  return response;
}

// Only the signed-in surface needs a session. Marketing pages and assets stay
// off this path so a visit does not create an anonymous user or an extra
// round trip to Supabase.
export const config = {
  matcher: ["/dashboard/:path*", "/projects/:path*", "/api/:path*"],
};
