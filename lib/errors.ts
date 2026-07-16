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

export function getErrorStatus(error: unknown): number {
  if (
    error instanceof AuthRequiredError ||
    error instanceof StorageUnavailableError
  ) {
    return error.status;
  }
  return 500;
}
