"use client";

import { useState } from "react";
import { CommandCenter } from "@/components/outputs/command-center";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { exportMarkdown } from "@/lib/export/markdown";
import { sectionLabels } from "@/lib/pixie-progress";
import type { Blueprint, BlueprintSection } from "@/types/output";
import type { Project } from "@/types/project";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0 break-words flex flex-col gap-1 border-b py-3 last:border-0">
      <span className="text-xs font-medium uppercase text-muted-foreground">
        {label}
      </span>
      <div className="text-sm">{children}</div>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-1">
      {items.map((i, idx) => (
        <li key={idx} className="break-words text-sm text-muted-foreground">
          • {i}
        </li>
      ))}
    </ul>
  );
}

/**
 * One blueprint section inside a group: its own heading and regenerate action,
 * so grouping the eleven sections does not hide what can be re-run.
 */
function Section({
  section,
  regeneratingSection,
  onRegenerate,
  children,
}: {
  section: BlueprintSection;
  regeneratingSection?: BlueprintSection | null;
  onRegenerate?: (section: BlueprintSection, instruction?: string) => void;
  children: React.ReactNode;
}) {
  const [refineOpen, setRefineOpen] = useState(false);
  const [instruction, setInstruction] = useState("");
  const isCurrentSection = regeneratingSection === section;
  const isRegenerating = regeneratingSection != null;
  const inputId = `refine-${section}`;

  function submitRefine() {
    const trimmed = instruction.trim();
    if (trimmed.length < 3) return;
    onRegenerate?.(section, trimmed);
    setRefineOpen(false);
    setInstruction("");
  }

  return (
    <section className="min-w-0 rounded-xl border bg-card p-4 md:p-5">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-heading text-base font-semibold">
          {sectionLabels[section]}
        </h3>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={!onRegenerate || isRegenerating}
            aria-expanded={refineOpen}
            aria-controls={inputId}
            onClick={() => setRefineOpen((open) => !open)}
          >
            Refine
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={!onRegenerate || isRegenerating}
            onClick={() => onRegenerate?.(section)}
          >
            {isCurrentSection ? "Regenerating..." : "Regenerate"}
          </Button>
        </div>
      </div>

      {refineOpen && (
        <div className="mb-3 flex flex-col gap-2 rounded-lg border border-primary/25 bg-primary/5 p-3 sm:flex-row sm:items-end">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <label htmlFor={inputId} className="text-xs font-medium text-muted-foreground">
              What should change in {sectionLabels[section]}?
            </label>
            <Input
              id={inputId}
              value={instruction}
              maxLength={300}
              placeholder="Narrow the scope to a two week build"
              onChange={(event) => setInstruction(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  submitRefine();
                }
              }}
            />
          </div>
          <Button
            size="sm"
            disabled={isRegenerating || instruction.trim().length < 3}
            onClick={submitRefine}
          >
            Apply refinement
          </Button>
        </div>
      )}

      {children}
    </section>
  );
}

export function OutputHub({
  project,
  blueprint,
  onExport,
  onExportJson,
  onCopyMarkdown,
  onRegenerate,
  regeneratingSection,
}: {
  project: Project;
  blueprint: Blueprint;
  onExport?: () => void;
  onExportJson?: () => void;
  onCopyMarkdown?: (markdown: string) => void;
  onRegenerate?: (section: BlueprintSection, instruction?: string) => void;
  regeneratingSection?: BlueprintSection | null;
}) {
  const b = blueprint;
  const readmeMarkdown = exportMarkdown(project, blueprint);
  const sectionProps = { regeneratingSection, onRegenerate };

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="w-full justify-start overflow-x-auto">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="product">Product</TabsTrigger>
        <TabsTrigger value="experience">Experience</TabsTrigger>
        <TabsTrigger value="build">Build</TabsTrigger>
        <TabsTrigger value="delivery">Delivery</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="rounded-xl border bg-card p-4 md:p-5">
        <CommandCenter blueprint={blueprint} onCopy={onCopyMarkdown} />
      </TabsContent>

      <TabsContent value="product" className="flex flex-col gap-4">
        <Section section="productBrief" {...sectionProps}>
          <Row label="Project name">{b.productBrief.projectName}</Row>
          <Row label="One liner">{b.productBrief.oneLiner}</Row>
          <Row label="Problem">{b.productBrief.problem}</Row>
          <Row label="Target users"><List items={b.productBrief.targetUsers} /></Row>
          <Row label="Value">{b.productBrief.mainValue}</Row>
          <Row label="Use cases"><List items={b.productBrief.useCases} /></Row>
          <Row label="Success metrics"><List items={b.productBrief.successMetrics} /></Row>
        </Section>

        <Section section="mvpScope" {...sectionProps}>
          <Row label="Must have">
            <List items={b.mvpScope.mustHave.map((f) => `${f.feature} — ${f.why}`)} />
          </Row>
          <Row label="Nice to have">
            <List items={b.mvpScope.niceToHave.map((f) => `${f.feature} — ${f.whyLater}`)} />
          </Row>
          <Row label="Out of scope">
            <List items={b.mvpScope.outOfScope.map((f) => `${f.feature} — ${f.reason}`)} />
          </Row>
        </Section>

        <Section section="marketAnalysis" {...sectionProps}>
          <Row label="Competitors"><List items={b.marketAnalysis.competitors} /></Row>
          <Row label="Positioning">{b.marketAnalysis.positioning}</Row>
          <Row label="Differentiation">
            <List items={b.marketAnalysis.differentiation} />
          </Row>
          <Row label="Market risks"><List items={b.marketAnalysis.marketRisks} /></Row>
        </Section>

        <Section section="orchestrationPlan" {...sectionProps}>
          <Row label="Summary">{b.orchestrationPlan.summary}</Row>
          <Row label="Missing information">
            <List items={b.orchestrationPlan.missingInformation} />
          </Row>
          <Row label="Recommended sequence">
            <List items={b.orchestrationPlan.recommendedSequence} />
          </Row>
          <Row label="Guardrails">
            <List items={b.orchestrationPlan.guardrails} />
          </Row>
        </Section>
      </TabsContent>

      <TabsContent value="experience" className="flex flex-col gap-4">
        <Section section="uxFlow" {...sectionProps}>
          <Row label="Journey">{b.uxFlow.journey}</Row>
          <Row label="Screens">
            <div className="flex flex-col gap-2">
              {b.uxFlow.screens.map((s, i) => (
                <div key={i} className="rounded-lg border p-3">
                  <p className="font-medium">{s.name}</p>
                  <p className="text-sm text-muted-foreground">{s.purpose}</p>
                  <Badge variant="secondary" className="mt-1">{s.primaryAction}</Badge>
                </div>
              ))}
            </div>
          </Row>
        </Section>
      </TabsContent>

      <TabsContent value="build" className="flex flex-col gap-4">
        <Section section="techPlan" {...sectionProps}>
          <Row label="Architecture">{b.techPlan.architecture}</Row>
          <Row label="Stack">
            <List
              items={Object.entries(b.techPlan.recommendedStack ?? {}).map(
                ([k, v]) => `${k}: ${v}`,
              )}
            />
          </Row>
          <Row label="Database tables"><List items={b.techPlan.databaseTables} /></Row>
          <Row label="API routes"><List items={b.techPlan.apiRoutes} /></Row>
          <Row label="Risks"><List items={b.techPlan.risks} /></Row>
        </Section>

        <Section section="codeSkeleton" {...sectionProps}>
          <Row label="File tree">
            <div className="flex flex-col gap-2">
              {b.codeSkeleton.fileTree.map((file, i) => (
                <div key={i} className="min-w-0 rounded-lg border p-3">
                  <p className="break-words font-mono text-xs font-medium">{file.path}</p>
                  <p className="text-sm text-muted-foreground">{file.purpose}</p>
                </div>
              ))}
            </div>
          </Row>
          <Row label="Starter tasks"><List items={b.codeSkeleton.starterTasks} /></Row>
          <Row label="Conventions"><List items={b.codeSkeleton.conventions} /></Row>
        </Section>

        <Section section="testPlan" {...sectionProps}>
          <Row label="Happy path">
            <List items={b.testPlan.happyPath.map((t) => t.name)} />
          </Row>
          <Row label="Edge cases">
            <List items={b.testPlan.edgeCases.map((t) => t.name)} />
          </Row>
          <Row label="Security risks"><List items={b.testPlan.securityRisks} /></Row>
          <Row label="Demo checklist">
            <List items={b.testPlan.demoChecklist} />
          </Row>
        </Section>
      </TabsContent>

      <TabsContent value="delivery" className="flex flex-col gap-4">
        <Section section="sprintPlan" {...sectionProps}>
          <div className="flex flex-col gap-3">
            {b.sprintPlan.sprints.map((sprint) => (
              <div key={sprint.name} className="min-w-0 rounded-lg border p-3">
                <p className="break-words font-medium">{sprint.name}</p>
                <p className="break-words text-sm text-muted-foreground">
                  {sprint.goal}
                </p>
                <div className="mt-2">
                  <List items={sprint.items} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section section="backlog" {...sectionProps}>
          <div className="flex flex-col gap-2">
            {b.backlog.items.map((item, i) => (
              <div key={i} className="min-w-0 rounded-lg border p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="break-words font-medium">{item.title}</p>
                  <Badge variant="secondary">{item.priority}</Badge>
                </div>
                <p className="break-words text-sm text-muted-foreground">{item.userStory}</p>
                <p className="text-xs text-muted-foreground">Sprint {item.sprint}</p>
              </div>
            ))}
          </div>
        </Section>

        <section className="min-w-0 rounded-xl border bg-card p-4 md:p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-heading text-base font-semibold">README</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onCopyMarkdown?.(readmeMarkdown)}
              >
                Copy Markdown
              </Button>
              <Button size="sm" variant="outline" onClick={onExportJson}>
                Download JSON
              </Button>
              <Button size="sm" variant="outline" onClick={onExport}>
                Download README.md
              </Button>
            </div>
          </div>
          <pre className="max-h-[520px] overflow-auto whitespace-pre-wrap break-words rounded-lg bg-muted p-4 text-xs">
            {readmeMarkdown}
          </pre>
        </section>
      </TabsContent>
    </Tabs>
  );
}
