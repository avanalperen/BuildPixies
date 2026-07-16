import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-24 text-center">
        <span className="rounded-full border bg-accent/60 px-3 py-1 text-xs font-medium text-accent-foreground">
          Your tiny AI product team
        </span>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Turn messy ideas into build-ready MVPs
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          BuildPixies gives you a tiny AI product team that transforms your rough
          idea into a product brief, UX flow, backlog, tech plan and launch-ready
          documentation.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="pixie-glow">
            <Link href="/projects/new">Summon your pixies</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/#how">See how it works</Link>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          No sign-up needed to try. Built for bootcamp teams, hackathons and solo
          founders.
        </p>
      </div>
    </section>
  );
}
