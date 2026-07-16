import type { z } from "zod";
import type { Project } from "@/types/project";
import type { BootcampReport } from "@/types/output";
import { isAIConfigured, runJsonCompletion } from "@/lib/ai/client";
import { bootcampReportPrompt } from "@/lib/ai/prompts";
import {
  bootcampClassificationSchema,
  bootcampReportContentSchema,
  bootcampReportSchema,
} from "@/lib/ai/schemas";

interface GenerateBootcampReportInput {
  project: Project;
  sprintName: string;
  sprintGoal?: string;
  progressNotes: string;
}

type BootcampReportContent = z.infer<typeof bootcampReportContentSchema>;
type BootcampClassification = z.infer<typeof bootcampClassificationSchema>;

interface SourceNote {
  id: string;
  text: string;
}

const blockerPattern =
  /\b(blocked?|blocker|stuck|issue|problem|error|failed?|risk|engel(?:lendim)?|sorun|hata|takıldım)\b/iu;
const nextPattern =
  /\b(next|will|plan(?:ned)?|todo|upcoming|going to|sonraki|yarın|plan(?:lıyorum)?|yapacağım|edeceğim|sırada)\b/iu;
const donePattern =
  /\b(done|complete(?:d)?|created?|built|implemented?|fixed|finished|added|merged|deployed|wrote|released|tamamladım|tamamlandı|oluşturdum|yaptım|ekledim|düzelttim|bitirdim)\b/iu;
const progressPattern =
  /(?:\b(in progress|working|implementing|currently|started?|continuing|geliştiriyorum|başladım|devam ediyor)\b|çalışıyorum)/iu;

function sourceNotes(notes: string): SourceNote[] {
  return notes
    .split(/\r?\n|(?<=[.!?])\s+/)
    .map((line) => line.trim().replace(/^[-*•]\s*/, ""))
    .filter(Boolean)
    .slice(0, 40)
    .map((text, index) => ({ id: `N${index + 1}`, text }));
}

function markdownList(items: string[]): string {
  return items.length > 0
    ? items.map((item) => `- ${item}`).join("\n")
    : "- Not provided in the source notes.";
}

function buildFallbackClassification(
  notes: SourceNote[],
): BootcampClassification {
  const classification: BootcampClassification = {
    completedNoteIds: [],
    inProgressNoteIds: [],
    blockerNoteIds: [],
    nextNoteIds: [],
    unclassifiedNoteIds: [],
  };

  for (const note of notes) {
    if (blockerPattern.test(note.text)) {
      classification.blockerNoteIds.push(note.id);
    } else if (nextPattern.test(note.text)) {
      classification.nextNoteIds.push(note.id);
    } else if (donePattern.test(note.text)) {
      classification.completedNoteIds.push(note.id);
    } else if (progressPattern.test(note.text)) {
      classification.inProgressNoteIds.push(note.id);
    } else {
      classification.unclassifiedNoteIds.push(note.id);
    }
  }

  return classification;
}

function normalizeClassification(
  notes: SourceNote[],
  classification: BootcampClassification,
): BootcampClassification {
  const validIds = new Set(notes.map((note) => note.id));
  const seen = new Set<string>();
  const takeValid = (ids: string[]) => ids.filter((id) => {
    if (!validIds.has(id) || seen.has(id)) return false;
    seen.add(id);
    return true;
  });

  const normalized = {
    completedNoteIds: takeValid(classification.completedNoteIds),
    inProgressNoteIds: takeValid(classification.inProgressNoteIds),
    blockerNoteIds: takeValid(classification.blockerNoteIds),
    nextNoteIds: takeValid(classification.nextNoteIds),
    unclassifiedNoteIds: takeValid(classification.unclassifiedNoteIds),
  };

  for (const note of notes) {
    if (!seen.has(note.id)) normalized.unclassifiedNoteIds.push(note.id);
  }

  return normalized;
}

function buildReportContent(
  input: GenerateBootcampReportInput,
  notes: SourceNote[],
  rawClassification: BootcampClassification,
): BootcampReportContent {
  const classification = normalizeClassification(notes, rawClassification);
  const noteById = new Map(notes.map((note) => [note.id, note.text]));
  const resolve = (ids: string[]) => ids.flatMap((id) => {
    const note = noteById.get(id);
    return note ? [note] : [];
  });

  const completed = resolve(classification.completedNoteIds);
  const inProgress = resolve(classification.inProgressNoteIds);
  const blockers = resolve(classification.blockerNoteIds);
  const next = resolve(classification.nextNoteIds);
  const unclassified = resolve(classification.unclassifiedNoteIds);

  const missingInformation = [
    ...(!input.sprintGoal ? ["Sprint goal was not provided."] : []),
    ...(blockers.length === 0
      ? ["The notes do not explicitly state whether blockers exist."]
      : []),
    ...(completed.length === 0
      ? ["The notes do not identify any work as completed."]
      : []),
    ...(next.length === 0
      ? ["The notes do not identify the next planned work."]
      : []),
    ...(unclassified.length > 0
      ? [`${unclassified.length} source note${unclassified.length === 1 ? " could" : "s could"} not be mapped to a Scrum status.`]
      : []),
    "Sprint review participants and external feedback were not provided.",
  ];

  const productStatus = completed.length > 0
    ? `${completed.length} update${completed.length === 1 ? " is" : "s are"} explicitly marked as completed in the source notes. ${inProgress.length} update${inProgress.length === 1 ? " is" : "s are"} still in progress.`
    : `The source notes contain ${inProgress.length} progress update${inProgress.length === 1 ? "" : "s"}, but do not explicitly confirm completed work.`;

  return {
    dailyScrum: { completed, inProgress, blockers, next },
    sprintReview: {
      summary: `${input.sprintName}: ${productStatus}`,
      completed,
      evidence: completed.map((item) => `Source note: ${item}`),
      notCompleted: [...inProgress, ...next],
    },
    sprintRetrospective: {
      wentWell: completed,
      challenges: blockers,
      actions: next,
    },
    readmeSprintSection: `## ${input.sprintName}

### Sprint Goal
${input.sprintGoal ?? "Not provided in the source notes."}

### Product Status
${productStatus}

### Daily Scrum

#### Completed
${markdownList(completed)}

#### In Progress
${markdownList(inProgress)}

#### Blockers
${markdownList(blockers)}

#### Next
${markdownList(next)}

### Backlog Update
Work is classified only from the supplied progress notes; unmentioned backlog items remain unverified.

### Sprint Review
${completed.length > 0 ? `${completed.length} completed update(s) are supported by the supplied notes.` : "No completed work is explicitly supported by the supplied notes."}

### Sprint Retrospective
The draft reflects only the supplied progress notes and should be reviewed by the team before publication.`,
    productStatus,
    backlogUpdate: {
      done: completed,
      inProgress,
      carriedOver: next,
      explanation:
        "Items are classified only from the supplied progress notes. Planned or unmentioned backlog work is not treated as completed.",
    },
    missingInformation,
  };
}

export async function generateBootcampReport(
  input: GenerateBootcampReportInput,
): Promise<BootcampReport> {
  const notes = sourceNotes(input.progressNotes);
  let classification: BootcampClassification;

  if (isAIConfigured()) {
    const { system, user } = bootcampReportPrompt({
      project: {
        title: input.project.title,
        rawIdea: input.project.rawIdea,
        blueprint: input.project.blueprint
          ? {
              productBrief: input.project.blueprint.productBrief,
              backlog: input.project.blueprint.backlog,
              sprintPlan: input.project.blueprint.sprintPlan,
            }
          : undefined,
      },
      sprintName: input.sprintName,
      sprintGoal: input.sprintGoal,
      progressNotes: notes,
    });
    classification = bootcampClassificationSchema.parse(
      await runJsonCompletion(system, user),
    );
  } else {
    classification = buildFallbackClassification(notes);
  }

  const content = buildReportContent(input, notes, classification);

  return bootcampReportSchema.parse({
    ...content,
    sprintName: input.sprintName,
    sprintGoal: input.sprintGoal,
    sourceNotes: input.progressNotes,
    generatedAt: new Date().toISOString(),
  });
}
