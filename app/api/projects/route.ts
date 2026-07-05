import { NextRequest } from "next/server";
import { createProject, listProjects } from "@/lib/projects";
import { checkRateLimit } from "@/lib/api/rate-limit";
import { getSafeErrorMessage, jsonError, parseJsonWithSchema } from "@/lib/api/http";
import { createProjectRequestSchema } from "@/lib/api/schemas";
import { getErrorStatus } from "@/lib/errors";

export async function GET() {
  try {
    const projects = await listProjects();
    return Response.json({ projects });
  } catch (error) {
    return jsonError(getSafeErrorMessage(error), getErrorStatus(error));
  }
}

export async function POST(request: NextRequest) {
  const limited = checkRateLimit(request, {
    bucket: "projects:create",
    limit: 30,
    windowMs: 60_000,
  });
  if (limited) return limited;

  const parsed = await parseJsonWithSchema(
    request,
    createProjectRequestSchema,
    { maxBytes: 8_192 },
  );
  if (!parsed.ok) return parsed.response;

  try {
    const project = await createProject(parsed.data);
    return Response.json({ project }, { status: 201 });
  } catch (error) {
    return jsonError(getSafeErrorMessage(error), getErrorStatus(error));
  }
}
