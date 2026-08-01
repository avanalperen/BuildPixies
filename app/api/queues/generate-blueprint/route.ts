import { QueueClient } from "@vercel/queue";
import { z } from "zod";
import {
  getGenerationQueueRegion,
  shouldUseDurableGenerationQueue,
  type BlueprintGenerationMessage,
} from "@/lib/generation-queue";
import {
  failDurableGenerationJob,
  GenerationAttemptError,
  GenerationLeaseBusyError,
  runDurableGenerationJob,
} from "@/lib/generation-worker";

export const runtime = "nodejs";
export const maxDuration = 300;

const queueMessageSchema = z.object({ jobId: z.string().uuid() }).strict();

class InvalidQueueMessageError extends Error {
  constructor() {
    super("Invalid queue message");
    this.name = "InvalidQueueMessageError";
  }
}

const queue = new QueueClient({ region: getGenerationQueueRegion() });

/**
 * The queue SDK parses the CloudEvent but does not authenticate the caller, so
 * this route is closed unless the durable queue is actually in use, and can be
 * pinned to a shared secret when one is configured.
 */
function rejectUnauthorizedCallback(request: Request): Response | null {
  if (!shouldUseDurableGenerationQueue()) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const secret = process.env.BUILDPIXIES_QUEUE_SECRET?.trim();
  if (secret && request.headers.get("x-buildpixies-queue-secret") !== secret) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}

const handleQueueCallback = queue.handleCallback<BlueprintGenerationMessage>(
  async (message) => {
    const parsed = queueMessageSchema.safeParse(message);
    if (!parsed.success) throw new InvalidQueueMessageError();

    try {
      await runDurableGenerationJob(parsed.data.jobId);
    } catch (error) {
      if (error instanceof GenerationAttemptError && error.attemptCount >= 5) {
        await failDurableGenerationJob(error.jobId, error.message);
        return;
      }
      throw error;
    }
  },
  {
    visibilityTimeoutSeconds: 600,
    retry: (error, metadata) => {
      if (error instanceof InvalidQueueMessageError) {
        return { acknowledge: true };
      }
      const baseSeconds =
        error instanceof GenerationLeaseBusyError ? 30 : 10;
      return {
        afterSeconds: Math.min(
          300,
          baseSeconds * 2 ** Math.min(metadata.deliveryCount - 1, 5),
        ),
      };
    },
  },
);

export async function POST(request: Request): Promise<Response> {
  const rejected = rejectUnauthorizedCallback(request);
  if (rejected) return rejected;
  return handleQueueCallback(request);
}
