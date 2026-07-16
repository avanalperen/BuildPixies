"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { exportMarkdown } from "@/lib/export/markdown";
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

function SectionHeader({
  section,
  regeneratingSection,
  onRegenerate,
}: {
  section: BlueprintSection;
  regeneratingSection?: BlueprintSection | null;
  onRegenerate?: (section: BlueprintSection) => void;
}) {
  const isCurrentSection = regeneratingSection === section;
  const isRegenerating = regeneratingSection != null;
  return (
    <div className="flex justify-end pb-2">
      <Button
        size="sm"
        variant="default"
        disabled={!onRegenerate || isRegenerating}
        onClick={() => onRegenerate?.(section)}
      >
        {isCurrentSection ? "Regenerating..." : "Regenerate"}
      </Button>
    </div>
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
  onRegenerate?: (section: BlueprintSection) => void;
  regeneratingSection?: BlueprintSection | null;
}) {
  const b = blueprint;
  const readmeMarkdown = exportMarkdown(project, blueprint);
  return (
    <Tabs defaultValue="product" className="w-full">
      <TabsList className="w-full justify-start overflow-x-auto">
        <TabsTrigger value="plan">Plan</TabsTrigger>
        <TabsTrigger value="product">Product</TabsTrigger>
        <TabsTrigger value="market">Market</TabsTrigger>
        <TabsTrigger value="scope">Scope</TabsTrigger>
        <TabsTrigger value="ux">UX</TabsTrigger>
        <TabsTrigger value="tech">Tech</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
        <TabsTrigger value="backlog">Backlog</TabsTrigger>
        <TabsTrigger value="tests">Tests</TabsTrigger>
        <TabsTrigger value="sprints">Sprints</TabsTrigger>
        <TabsTrigger value="readme">README</TabsTrigger>
      </TabsList>

      <TabsContent value="plan" className="rounded-xl border bg-card p-5">
        <SectionHeader
          section="orchestrationPlan"
          regeneratingSection={regeneratingSection}
          onRegenerate={onRegenerate}
        />
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
      </TabsContent>

      <TabsContent value="product" className="rounded-xl border bg-card p-5">
        <SectionHeader
          section="productBrief"
          regeneratingSection={regeneratingSection}
          onRegenerate={onRegenerate}
        />
        <Row label="Project name">{b.productBrief.projectName}</Row>
        <Row label="One liner">{b.productBrief.oneLiner}</Row>
        <Row label="Problem">{b.productBrief.problem}</Row>
        <Row label="Target users"><List items={b.productBrief.targetUsers} /></Row>
        <Row label="Value">{b.productBrief.mainValue}</Row>
        <Row label="Use cases"><List items={b.productBrief.useCases} /></Row>
        <Row label="Success metrics"><List items={b.productBrief.successMetrics} /></Row>
      </TabsContent>

      <TabsContent value="market" className="rounded-xl border bg-card p-5">
        <SectionHeader
          section="marketAnalysis"
          regeneratingSection={regeneratingSection}
          onRegenerate={onRegenerate}
        />
        <Row label="Competitors"><List items={b.marketAnalysis.competitors} /></Row>
        <Row label="Positioning">{b.marketAnalysis.positioning}</Row>
        <Row label="Differentiation">
          <List items={b.marketAnalysis.differentiation} />
        </Row>
        <Row label="Market risks"><List items={b.marketAnalysis.marketRisks} /></Row>
      </TabsContent>

      <TabsContent value="scope" className="rounded-xl border bg-card p-5">
        <SectionHeader
          section="mvpScope"
          regeneratingSection={regeneratingSection}
          onRegenerate={onRegenerate}
        />
        <Row label="Must have">
          <List items={b.mvpScope.mustHave.map((f) => `${f.feature} — ${f.why}`)} />
        </Row>
        <Row label="Nice to have">
          <List items={b.mvpScope.niceToHave.map((f) => `${f.feature} — ${f.whyLater}`)} />
        </Row>
        <Row label="Out of scope">
          <List items={b.mvpScope.outOfScope.map((f) => `${f.feature} — ${f.reason}`)} />
        </Row>
      </TabsContent>

      <TabsContent value="ux" className="rounded-xl border bg-card p-5">
        <SectionHeader
          section="uxFlow"
          regeneratingSection={regeneratingSection}
          onRegenerate={onRegenerate}
        />
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
      </TabsContent>

      <TabsContent value="tech" className="rounded-xl border bg-card p-5">
        <SectionHeader
          section="techPlan"
          regeneratingSection={regeneratingSection}
          onRegenerate={onRegenerate}
        />
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
      </TabsContent>

      <TabsContent value="code" className="rounded-xl border bg-card p-5">
        <SectionHeader
          section="codeSkeleton"
          regeneratingSection={regeneratingSection}
          onRegenerate={onRegenerate}
        />
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
      </TabsContent>

      <TabsContent value="backlog" className="rounded-xl border bg-card p-5">
        <SectionHeader
          section="backlog"
          regeneratingSection={regeneratingSection}
          onRegenerate={onRegenerate}
        />
        <div className="flex flex-col gap-2">
          {b.backlog.items.map((item, i) => (
            <div key={i} className="min-w-0 rounded-lg border p-3">
              <div className="flex items-center justify-between">
                <p className="break-words font-medium">{item.title}</p>
                <Badge variant="secondary">{item.priority}</Badge>
              </div>
              <p className="break-words text-sm text-muted-foreground">{item.userStory}</p>
              <p className="text-xs text-muted-foreground">Sprint {item.sprint}</p>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="tests" className="rounded-xl border bg-card p-5">
        <SectionHeader
          section="testPlan"
          regeneratingSection={regeneratingSection}
          onRegenerate={onRegenerate}
        />
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
      </TabsContent>

      <TabsContent value="sprints" className="rounded-xl border bg-card p-5">
        <SectionHeader
          section="sprintPlan"
          regeneratingSection={regeneratingSection}
          onRegenerate={onRegenerate}
        />
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
      </TabsContent>

      <TabsContent value="readme" className="rounded-xl border bg-card p-5">
        <div className="flex justify-end gap-2 pb-3">
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
        <pre className="overflow-auto whitespace-pre-wrap break-words rounded-lg bg-muted p-4 text-xs">
          {readmeMarkdown}
        </pre>
      </TabsContent>
    </Tabs>
  );
}
