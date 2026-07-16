import { AuthRequiredError } from "@/lib/errors";
import { getSupabaseUserClient, requiresSupabase } from "@/lib/storage";

type BucketState = {
  count: number;
  resetAt: number;
};

const policies = {
  "ai:generation-jobs": { limit: 5, windowMs: 60_000 },
  "ai:generate": { limit: 5, windowMs: 60_000 },
  "ai:regenerate": { limit: 10, windowMs: 60_000 },
  "projects:create": { limit: 30, windowMs: 60_000 },
} as const;

export type RateLimitBucket = keyof typeof policies;

const globalRateLimitStore = globalThis as unknown as {
  __buildpixiesRateLimit?: Map<string, BucketState>;
};

const store =
  globalRateLimitStore.__buildpixiesRateLimit ?? new Map<string, BucketState>();
globalRateLimitStore.__buildpixiesRateLimit = store;

function clientKey(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0];
  const realIp = request.headers.get("x-real-ip");
  return forwardedFor?.trim() || realIp?.trim() || "local";
}

function tooManyRequests(retryAfter: number): Response {
  return Response.json(
    { error: "Too many requests. Please try again shortly." },
    {
      status: 429,
      headers: { "Retry-After": String(retryAfter) },
    },
  );
}

function checkMemoryRateLimit(
  request: Request,
  options: {
    bucket: string;
    limit: number;
    windowMs: number;
  },
): Response | null {
  const now = Date.now();
  const key = `${options.bucket}:${clientKey(request)}`;
  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + options.windowMs });
    return null;
  }

  if (current.count >= options.limit) {
    const retryAfter = Math.max(1, Math.ceil((current.resetAt - now) / 1000));
    return tooManyRequests(retryAfter);
  }

  current.count += 1;
  store.set(key, current);
  return null;
}

export async function checkRateLimit(
  request: Request,
  bucket: RateLimitBucket,
): Promise<Response | null> {
  const options = { bucket, ...policies[bucket] };
  try {
    const context = await getSupabaseUserClient();
    if (!context) {
      if (requiresSupabase()) {
        return Response.json(
          { error: "Request protection is temporarily unavailable" },
          { status: 503 },
        );
      }
      return checkMemoryRateLimit(request, options);
    }

    const { data, error } = await context.supabase.rpc("consume_rate_limit", {
      p_bucket: bucket,
    });
    if (error) throw error;

    const row = Array.isArray(data) ? data[0] : data;
    if (!row || typeof row.allowed !== "boolean") {
      throw new Error("Invalid rate limit response");
    }
    if (row.allowed) return null;
    return tooManyRequests(
      typeof row.retry_after_seconds === "number"
        ? Math.max(1, row.retry_after_seconds)
        : 1,
    );
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    if (requiresSupabase()) {
      return Response.json(
        { error: "Request protection is temporarily unavailable" },
        { status: 503 },
      );
    }
    return checkMemoryRateLimit(request, options);
  }
}
