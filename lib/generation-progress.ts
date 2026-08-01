import "server-only";

import { getPipelineSteps, type OrchestratorEvent } from "@/lib/ai/orchestrator";
import { partialBlueprintSchema } from "@/lib/schemas/generation-job";
import type {
  GenerationProgress,
  GenerationStep,
  PartialBlueprint,
} from "@/types/generation-job";

export function createInitialProgress(): GenerationProgress {
  return {
    steps: getPipelineSteps().map((step) => ({ ...step, status: "pending" })),
    updatedAt: new Date().toISOString(),
  };
}

export interface GenerationProgressState {
  progress: GenerationProgress;
  partialBlueprint: PartialBlueprint;
}

export interface GenerationProgressTracker {
  onEvent: (event: OrchestratorEvent) => void;
  snapshot: () => GenerationProgressState;
  flush: () => Promise<void>;
}

/**
 * Tracks real pipeline events and persists them without blocking generation.
 * Writes are coalesced: one write at a time, with a trailing write for the
 * events that arrived while the previous write was in flight.
 */
export function createGenerationProgressTracker(
  persist: (state: GenerationProgressState) => Promise<void>,
): GenerationProgressTracker {
  const steps: GenerationStep[] = createInitialProgress().steps;
  const sections: Record<string, unknown> = {};
  let inFlight: Promise<void> | null = null;
  let dirty = false;

  const snapshot = (): GenerationProgressState => ({
    progress: {
      steps: steps.map((step) => ({ ...step })),
      updatedAt: new Date().toISOString(),
    },
    // Anything that fails this parse simply is not published as partial.
    partialBlueprint: partialBlueprintSchema.safeParse(sections).data ?? {},
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
      if (event.status === "done" && event.output !== undefined) {
        sections[event.section] = event.output;
      }
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
