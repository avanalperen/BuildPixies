export class AuthRequiredError extends Error {
  status = 401;

  constructor(message = "Authentication required") {
    super(message);
    this.name = "AuthRequiredError";
  }
}

export class StorageUnavailableError extends Error {
  status = 500;

  constructor(
    message = "Persistent storage is not configured. Set Supabase env vars or enable local file store for development.",
  ) {
    super(message);
    this.name = "StorageUnavailableError";
  }
}

export class ServiceUnavailableError extends Error {
  status = 503;

  constructor(message = "Service temporarily unavailable") {
    super(message);
    this.name = "ServiceUnavailableError";
  }
}

export function getErrorStatus(error: unknown): number {
  if (
    error instanceof AuthRequiredError ||
    error instanceof StorageUnavailableError ||
    error instanceof ServiceUnavailableError
  ) {
    return error.status;
  }
  return 500;
}
