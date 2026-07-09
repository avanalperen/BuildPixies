type BucketState = {
  count: number;
  resetAt: number;
};

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

export function checkRateLimit(
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
    return Response.json(
      { error: "Too many requests. Please try again shortly." },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfter) },
      },
    );
  }

  current.count += 1;
  store.set(key, current);
  return null;
}
