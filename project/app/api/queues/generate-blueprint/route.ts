import { handleCallback } from "@vercel/queue";
import { z } from "zod";
import type { BlueprintGenerationMessage } from "@/lib/generation-queue";
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

export const POST = handleCallback<BlueprintGenerationMessage>(
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
