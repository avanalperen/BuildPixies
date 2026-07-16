import { NextRequest } from "next/server";
import { getGenerationJob } from "@/lib/generation-jobs";
import { getSafeErrorMessage, jsonError } from "@/lib/api/http";
import { getErrorStatus } from "@/lib/errors";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    const job = await getGenerationJob(id);
    if (!job) {
      return jsonError("Generation job not found", 404);
    }
    return Response.json({ job });
  } catch (error) {
    return jsonError(getSafeErrorMessage(error), getErrorStatus(error));
  }
}
