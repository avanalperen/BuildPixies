const steps = [
  {
    icon: "💡",
    title: "Drop your idea",
    description: "Write a messy, rough idea. No perfect prompt needed.",
  },
  {
    icon: "✨",
    title: "Pixies analyze it",
    description: "A team of specialized AI agents break it down together.",
  },
  {
    icon: "🚀",
    title: "Get your MVP blueprint",
    description: "Product brief, backlog, UX flow, tech plan and README.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-20">
      <div className="mb-10 text-center">
        <h2 className="font-heading text-3xl font-bold">How it works</h2>
        <p className="mt-2 text-muted-foreground">
          Three steps from chaos to a build-ready plan.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="relative flex flex-col gap-3 rounded-2xl border bg-card p-6"
          >
            <span className="text-xs font-medium text-muted-foreground">
              Step {i + 1}
            </span>
            <span className="text-3xl">{step.icon}</span>
            <h3 className="font-heading text-lg font-semibold">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
