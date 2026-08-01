import { NextRequest } from "next/server";
import { exportJson } from "@/lib/export/json";
import { resolveExportProject } from "@/lib/export/resolve";
import { getProject } from "@/lib/projects";
import { checkRateLimit } from "@/lib/api/rate-limit";
import {
  getSafeErrorMessage,
  jsonError,
  parseJsonWithSchema,
} from "@/lib/api/http";
import { exportJsonRequestSchema } from "@/lib/api/schemas";
import { getErrorStatus } from "@/lib/errors";

export async function POST(request: NextRequest) {
  const limited = await checkRateLimit(request, "export:document");
  if (limited) return limited;

  const parsed = await parseJsonWithSchema(
    request,
    exportJsonRequestSchema,
    { maxBytes: 96_000 },
  );
  if (!parsed.ok) return parsed.response;

  try {
    const resolved = await resolveExportProject(parsed.data, getProject);
    if (!resolved.ok) return resolved.response;

    const json = exportJson(resolved.project, resolved.blueprint);
    return Response.json({ json, filename: "blueprint.json" });
  } catch (error) {
    return jsonError(getSafeErrorMessage(error), getErrorStatus(error));
  }
}
