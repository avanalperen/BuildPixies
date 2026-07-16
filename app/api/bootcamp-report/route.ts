import { NextRequest } from "next/server";
import { generateBootcampReport } from "@/lib/ai/bootcamp";
import { getSafeErrorMessage, jsonError, parseJsonWithSchema } from "@/lib/api/http";
import { checkRateLimit } from "@/lib/api/rate-limit";
import { bootcampReportRequestSchema } from "@/lib/api/schemas";
import { getErrorStatus } from "@/lib/errors";
import { getProject, saveProjectBootcampReport } from "@/lib/projects";

export const maxDuration = 120;

export async function POST(request: NextRequest) {
  const limited = await checkRateLimit(request, "ai:bootcamp");
  if (limited) return limited;

  const parsed = await parseJsonWithSchema(
    request,
    bootcampReportRequestSchema,
    { maxBytes: 12_288 },
  );
  if (!parsed.ok) return parsed.response;

  try {
    const project = await getProject(parsed.data.projectId);
    if (!project) return jsonError("Project not found", 404);

    const report = await generateBootcampReport({
      project,
      sprintName: parsed.data.sprintName,
      sprintGoal: parsed.data.sprintGoal,
      progressNotes: parsed.data.progressNotes,
    });
    await saveProjectBootcampReport(project.id, report);

    return Response.json({ report });
  } catch (error) {
    return jsonError(getSafeErrorMessage(error), getErrorStatus(error));
  }
}
