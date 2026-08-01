import { NextRequest } from "next/server";
import { exportMarkdown } from "@/lib/export/markdown";
import { resolveExportProject } from "@/lib/export/resolve";
import { getProject } from "@/lib/projects";
import { checkRateLimit } from "@/lib/api/rate-limit";
import { getSafeErrorMessage, jsonError, parseJsonWithSchema } from "@/lib/api/http";
import { exportReadmeRequestSchema } from "@/lib/api/schemas";
import { getErrorStatus } from "@/lib/errors";

export async function POST(request: NextRequest) {
  const limited = await checkRateLimit(request, "export:document");
  if (limited) return limited;

  const parsed = await parseJsonWithSchema(
    request,
    exportReadmeRequestSchema,
    { maxBytes: 96_000 },
  );
  if (!parsed.ok) return parsed.response;

  try {
    const resolved = await resolveExportProject(parsed.data, getProject);
    if (!resolved.ok) return resolved.response;

    const markdown = exportMarkdown(resolved.project, resolved.blueprint);
    return Response.json({ markdown, filename: "README.md" });
  } catch (error) {
    return jsonError(getSafeErrorMessage(error), getErrorStatus(error));
  }
}
