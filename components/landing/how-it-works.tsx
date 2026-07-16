import { AlertTriangle, Braces, Code2, KanbanSquare, Rocket, Sparkles, UsersRound } from "lucide-react";

export function HowItWorks() {
  return (
    <section id="features" className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-4 pb-24 pt-12 md:px-10">
      <div id="how-it-works" className="mx-auto flex max-w-2xl scroll-mt-28 flex-col gap-4 text-center">
        <h2 className="font-heading text-2xl leading-8 font-semibold tracking-[-0.01em] md:text-[32px] md:leading-10">
          Magical capabilities, grounded results.
        </h2>
        <p className="text-base leading-6 text-muted-foreground">
          Stop staring at a blank page. Our specialized AI agents work in parallel to define your product&apos;s foundation.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <article className="app-card group relative col-span-1 flex flex-col gap-4 overflow-hidden p-8 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl md:col-span-2">
          <div className="pointer-events-none absolute top-0 right-0 size-64 rounded-full bg-primary/5 blur-[60px] transition-colors group-hover:bg-primary/10" />
          <span className="z-10 flex size-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
            <UsersRound className="size-6" />
          </span>
          <h3 className="z-10 font-heading text-2xl leading-8 font-medium">Multi-Agent Planning</h3>
          <p className="z-10 max-w-md text-sm leading-5 text-muted-foreground">
            Instead of one general AI struggling to do it all, we dispatch specialized &apos;Pixies&apos;—a Product Manager, UX Designer, and Tech Lead—who collaborate to build a cohesive plan.
          </p>
          <div className="z-10 mt-4 flex gap-4 overflow-hidden rounded-xl border border-outline-variant/20 bg-surface p-4">
            {[
              [Sparkles, "PM Agent", "text-primary"],
              [Braces, "UX Agent", "text-secondary"],
              [Code2, "Dev Agent", "text-tertiary"],
            ].map(([Icon, label, tone]) => (
              <span key={label as string} className="flex flex-1 flex-col items-center rounded-lg border border-outline-variant/10 bg-white p-3 text-center">
                <Icon className={`mb-1 size-5 ${tone}`} />
                <span className="text-[10px] font-medium text-muted-foreground">{label as string}</span>
              </span>
            ))}
          </div>
        </article>

        <article className="app-card group relative col-span-1 flex flex-col gap-4 overflow-hidden p-8 transition-all hover:-translate-y-1 hover:border-secondary/30 hover:shadow-xl">
          <div className="pointer-events-none absolute right-0 bottom-0 size-48 rounded-full bg-secondary/5 blur-[50px] transition-colors group-hover:bg-secondary/10" />
          <span className="z-10 flex size-12 items-center justify-center rounded-xl border border-secondary/20 bg-secondary/10 text-secondary">
            <KanbanSquare className="size-6" />
          </span>
          <h3 className="z-10 font-heading text-2xl leading-8 font-medium">Structured Outputs</h3>
          <p className="z-10 text-sm leading-5 text-muted-foreground">
            No more walls of text. Get organized Markdown, JSON, and Mermaid diagrams ready for Jira or Notion.
          </p>
          <div className="z-10 mt-auto flex flex-col gap-2 rounded-xl border border-outline-variant/20 bg-white p-3">
            <span className="h-2 w-3/4 rounded-full bg-surface-highest" />
            <span className="h-2 w-full rounded-full bg-surface-highest" />
            <span className="h-2 w-5/6 rounded-full bg-surface-highest" />
          </div>
        </article>

        <article className="app-card group relative col-span-1 overflow-hidden p-8 transition-all hover:-translate-y-1 hover:shadow-xl md:col-span-3">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row">
            <div className="flex flex-1 flex-col items-start gap-4">
              <span className="flex size-12 items-center justify-center rounded-xl border border-tertiary-container/20 bg-tertiary-container/10 text-tertiary-container">
                <Rocket className="size-6" />
              </span>
              <h3 className="font-heading text-2xl leading-8 font-medium">Bootcamp Mode</h3>
              <p className="text-sm leading-5 text-muted-foreground">
                Need tough love? Bootcamp Mode challenges your assumptions, asking hard questions about market fit and technical feasibility before a single line of code is written.
              </p>
            </div>
            <div className="flex flex-1 gap-3 rounded-xl border border-outline-variant/30 bg-surface p-6">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-tertiary-container/20 text-tertiary-container">
                <AlertTriangle className="size-4" />
              </span>
              <p className="rounded-lg rounded-tl-none border border-outline-variant/10 bg-white p-3 text-xs font-medium leading-5">
                “You mentioned recurring billing, but haven&apos;t defined the pricing tiers. How will you handle failed payments?”
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
