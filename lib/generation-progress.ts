import "server-only";

import { getPipelineSteps, type OrchestratorEvent } from "@/lib/ai/orchestrator";
import type {
  GenerationProgress,
  GenerationStep,
} from "@/types/generation-job";

export function createInitialProgress(): GenerationProgress {
  return {
    steps: getPipelineSteps().map((step) => ({ ...step, status: "pending" })),
    updatedAt: new Date().toISOString(),
  };
}

export interface GenerationProgressTracker {
  onEvent: (event: OrchestratorEvent) => void;
  snapshot: () => GenerationProgress;
  flush: () => Promise<void>;
}

/**
 * Tracks real pipeline events and persists them without blocking generation.
 * Writes are coalesced: one write at a time, with a trailing write for the
 * events that arrived while the previous write was in flight.
 */
export function createGenerationProgressTracker(
  persist: (progress: GenerationProgress) => Promise<void>,
): GenerationProgressTracker {
  const steps: GenerationStep[] = createInitialProgress().steps;
  let inFlight: Promise<void> | null = null;
  let dirty = false;

  const snapshot = (): GenerationProgress => ({
    steps: steps.map((step) => ({ ...step })),
    updatedAt: new Date().toISOString(),
  });

  function schedule(): Promise<void> {
    if (inFlight) {
      dirty = true;
      return inFlight;
    }
    inFlight = (async () => {
      try {
        await persist(snapshot());
      } catch {
        // Progress is a display aid; never fail generation because of it.
      }
      inFlight = null;
      if (dirty) {
        dirty = false;
        await schedule();
      }
    })();
    return inFlight;
  }

  return {
    onEvent(event) {
      const step = steps.find((item) => item.section === event.section);
      if (!step) return;
      step.status = event.status;
      void schedule();
    },
    snapshot,
    async flush() {
      while (inFlight) await inFlight;
      if (dirty) {
        dirty = false;
        await schedule();
      }
    },
  };
}
