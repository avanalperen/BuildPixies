import { Badge } from "@/components/ui/badge";

const outputs = [
  {
    title: "Product Brief",
    badge: "Pria",
    lines: ["Problem", "Target users", "Value proposition", "Success metrics"],
  },
  {
    title: "Backlog",
    badge: "Sprinta",
    lines: ["User stories", "Priority (P0/P1/P2)", "Sprint mapping", "Acceptance criteria"],
  },
  {
    title: "Tech Plan",
    badge: "Tinker",
    lines: ["Recommended stack", "Database tables", "API routes", "Risks"],
  },
];

export function OutputPreview() {
  return (
    <section id="outputs" className="mx-auto max-w-6xl px-4 py-20">
      <div className="mb-10 text-center">
        <h2 className="font-heading text-3xl font-bold">Structured outputs</h2>
        <p className="mt-2 text-muted-foreground">
          Not paragraphs. Build-ready, structured blueprints you can export.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {outputs.map((output) => (
          <div
            key={output.title}
            className="flex flex-col gap-3 rounded-2xl border bg-card p-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-semibold">{output.title}</h3>
              <Badge variant="secondary">{output.badge}</Badge>
            </div>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              {output.lines.map((line) => (
                <li key={line} className="flex items-center gap-2">
                  <span aria-hidden className="text-primary">▹</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
