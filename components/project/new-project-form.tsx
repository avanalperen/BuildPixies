"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Lightbulb,
  MonitorSmartphone,
  Pencil,
  SlidersHorizontal,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { Brand } from "@/components/brand";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { ProjectGoal, ProjectPlatform } from "@/types/project";

const goals: { value: ProjectGoal; label: string }[] = [
  { value: "bootcamp", label: "Bootcamp Project" },
  { value: "startup", label: "Startup MVP" },
  { value: "portfolio", label: "Portfolio" },
  { value: "client", label: "Client Project" },
  { value: "hackathon", label: "Hackathon" },
];

const platforms: { value: ProjectPlatform; label: string }[] = [
  { value: "web", label: "Web App" },
  { value: "mobile", label: "Mobile App" },
  { value: "extension", label: "Browser Extension" },
  { value: "ai-tool", label: "AI Tool" },
  { value: "marketplace", label: "Marketplace" },
  { value: "desktop", label: "Desktop App" },
];

const steps = [
  { label: "Idea", icon: Lightbulb },
  { label: "Goal", icon: Target },
  { label: "Platform", icon: MonitorSmartphone },
  { label: "Constraints", icon: SlidersHorizontal },
] as const;

function ChoiceChip({
  selected,
  children,
  onClick,
}: {
  selected: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-all",
        selected
          ? "border-primary bg-primary-fixed text-primary shadow-sm"
          : "border-outline-variant bg-surface text-muted-foreground hover:border-primary/40 hover:text-primary",
      )}
    >
      {selected && <Check className="size-3.5" />}
      {children}
    </button>
  );
}

export function NewProjectForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [rawIdea, setRawIdea] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [goal, setGoal] = useState<ProjectGoal>("bootcamp");
  const [platform, setPlatform] = useState<ProjectPlatform>("web");
  const [timeline, setTimeline] = useState("6 weeks");
  const [teamSize, setTeamSize] = useState("1");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (rawIdea.trim().length < 20 || submitting) {
      setStep(0);
      setError("Tell the pixies a little more — your idea needs at least 20 characters.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawIdea,
          targetAudience: targetAudience.trim() || "builders",
          goal,
          platform,
          constraints: {
            timeline: timeline.trim() || undefined,
            teamSize: Number(teamSize) || undefined,
          },
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Project could not be created");
      if (!data.project?.id) throw new Error("Project could not be created");
      router.push(`/projects/${data.project.id}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Project could not be created");
    } finally {
      setSubmitting(false);
    }
  }

  function handleBack() {
    if (step > 0) setStep((current) => current - 1);
    else router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} aria-busy={submitting} className="relative z-10 flex w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-outline-variant bg-white shadow-[0_10px_30px_rgba(11,28,48,0.06)]">
      <header className="flex items-center justify-between border-b border-outline-variant bg-surface/80 px-6 py-3 backdrop-blur-xl">
        <Brand compact />
        <Link href="/dashboard" aria-label="Close" className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-surface-highest hover:text-primary">
          <X className="size-5" />
        </Link>
      </header>

      <div className="flex flex-col gap-10 p-6 md:p-10">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="mb-3 font-heading text-2xl leading-8 font-semibold tracking-[-0.01em] md:text-[32px] md:leading-10">
            Let&apos;s craft your next masterpiece
          </h1>
          <p className="text-base leading-6 text-muted-foreground md:text-lg md:leading-7">
            Share your vision, and we&apos;ll assemble the perfect magical workspace for you.
          </p>
        </div>

        <div className="flex items-center justify-between px-1 pb-6 md:px-12" aria-label="Project details steps">
          {steps.map((item, index) => {
            const Icon = item.icon;
            const complete = index < step;
            const active = index === step;
            return (
              <div key={item.label} className="contents">
                {index > 0 && (
                  <span className={cn("mx-2 h-0.5 flex-1 rounded-full", complete || active ? "bg-primary" : "bg-outline-variant")} aria-hidden="true" />
                )}
                <button type="button" onClick={() => setStep(index)} className="group relative flex flex-col items-center" aria-current={active ? "step" : undefined}>
                  <span className={cn(
                    "flex size-10 items-center justify-center rounded-full transition-all",
                    active && "bg-[#6063ee] text-white shadow-[0_0_10px_rgba(96,99,238,0.4)]",
                    complete && "bg-primary text-white",
                    !active && !complete && "bg-surface-highest text-muted-foreground group-hover:text-primary",
                  )}>
                    {complete ? <Check className="size-5" /> : <Icon className="size-5" />}
                  </span>
                  <span className={cn("absolute top-12 text-xs font-medium whitespace-nowrap", active ? "text-primary" : "text-muted-foreground opacity-55 group-hover:opacity-100")}>
                    {item.label}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        <div className="min-h-[246px]">
          {step === 0 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="idea" className="flex items-center gap-2 text-sm font-semibold">
                  What are we building?
                  <Sparkles className="size-4 text-secondary" fill="currentColor" />
                </Label>
                <div className="group relative rounded-lg">
                  <Textarea id="idea" value={rawIdea} onChange={(event) => setRawIdea(event.target.value)} placeholder="I want to build a web app for tracking local coffee shop ratings..." rows={5} required minLength={20} className="min-h-32 resize-none bg-surface p-4 pr-11 text-base leading-6 focus-visible:bg-white md:text-lg md:leading-7" />
                  <Pencil className="absolute right-4 bottom-4 size-5 text-primary/30 transition-colors group-focus-within:text-primary" />
                </div>
              </div>
              <fieldset className="flex flex-col gap-3">
                <legend className="mb-3 text-xs font-medium tracking-wider text-muted-foreground uppercase">Quick Select Goal</legend>
                <div className="flex flex-wrap gap-3">
                  {goals.slice(0, 4).map((item) => (
                    <ChoiceChip key={item.value} selected={goal === item.value} onClick={() => setGoal(item.value)}>{item.label}</ChoiceChip>
                  ))}
                </div>
              </fieldset>
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-6">
              <fieldset>
                <legend className="mb-3 text-sm font-semibold">What is the primary goal?</legend>
                <div className="flex flex-wrap gap-3">
                  {goals.map((item) => (
                    <ChoiceChip key={item.value} selected={goal === item.value} onClick={() => setGoal(item.value)}>{item.label}</ChoiceChip>
                  ))}
                </div>
              </fieldset>
              <div className="flex flex-col gap-2">
                <Label htmlFor="audience">Who is it for?</Label>
                <Input id="audience" value={targetAudience} onChange={(event) => setTargetAudience(event.target.value)} placeholder="Students, solo founders, freelancers..." className="h-12 bg-surface px-4" />
              </div>
            </div>
          )}

          {step === 2 && (
            <fieldset>
              <legend className="mb-3 text-sm font-semibold">Where will the product live?</legend>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {platforms.map((item) => (
                  <button key={item.value} type="button" aria-pressed={platform === item.value} onClick={() => setPlatform(item.value)} className={cn("flex min-h-20 items-center justify-center rounded-xl border p-3 text-center text-sm font-semibold transition-all", platform === item.value ? "border-primary bg-primary-fixed text-primary shadow-sm" : "border-outline-variant bg-surface hover:border-primary/40 hover:text-primary")}>
                    {item.label}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {step === 3 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="timeline">Timeline</Label>
                <Input id="timeline" value={timeline} onChange={(event) => setTimeline(event.target.value)} placeholder="6 weeks" className="h-12 bg-surface px-4" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="team-size">Team size</Label>
                <Input id="team-size" type="number" min="1" max="100" value={teamSize} onChange={(event) => setTeamSize(event.target.value)} className="h-12 bg-surface px-4" />
              </div>
              <div className="app-card col-span-full bg-surface p-4 text-sm leading-5 text-muted-foreground">
                The pixies will use these constraints to right-size your scope, backlog and technical plan.
              </div>
            </div>
          )}

          {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
        </div>
      </div>

      <footer className="mt-auto flex items-center justify-between border-t border-outline-variant bg-white p-6">
        <button type="button" onClick={handleBack} className="inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-semibold text-muted-foreground transition-colors hover:bg-surface-highest hover:text-primary">
          <ArrowLeft className="size-[18px]" />
          Back
        </button>
        <button type="submit" disabled={submitting} className="magic-button inline-flex h-12 items-center gap-2 rounded-lg border-t border-white/20 px-6 text-sm font-semibold tracking-[0.02em] transition-all disabled:pointer-events-none disabled:opacity-50">
          {submitting ? "Summoning..." : "Summon the Team"}
          <ArrowRight className="size-[18px]" />
        </button>
      </footer>
    </form>
  );
}
