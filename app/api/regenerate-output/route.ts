import { NextRequest } from "next/server";
import { regenerateSection } from "@/lib/ai/orchestrator";
import { checkRateLimit } from "@/lib/api/rate-limit";
import { getSafeErrorMessage, jsonError, parseJsonWithSchema } from "@/lib/api/http";
import { regenerateOutputRequestSchema } from "@/lib/api/schemas";
import { getErrorStatus } from "@/lib/errors";

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  const limited = checkRateLimit(request, {
    bucket: "ai:regenerate",
    limit: 10,
    windowMs: 60_000,
  });
  if (limited) return limited;

  const parsed = await parseJsonWithSchema(
    request,
    regenerateOutputRequestSchema,
    { maxBytes: 24_576 },
  );
  if (!parsed.ok) return parsed.response;

  try {
    const output = await regenerateSection(
      parsed.data.input,
      parsed.data.section,
      parsed.data.previousOutputs,
    );
    return Response.json({ section: parsed.data.section, output });
  } catch (error) {
    return jsonError(getSafeErrorMessage(error), getErrorStatus(error));
  }
}
