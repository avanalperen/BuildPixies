import Link from "next/link";
import {
  ArrowUp,
  CheckCircle2,
  FileText,
  GitBranch,
  Paperclip,
  Sparkles,
  Terminal,
  WandSparkles,
} from "lucide-react";

const statusItems = [
  { label: "Product Brief", progress: 85, icon: FileText, tone: "primary", done: true },
  { label: "UX Flow", progress: 45, icon: GitBranch, tone: "secondary", done: false },
  { label: "Tech Plan", progress: 0, icon: Terminal, tone: "muted", done: false },
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-32 md:px-10">
      <div className="pointer-events-none absolute -top-36 -left-36 -z-10 size-[620px] rounded-full bg-primary/6 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-180px] bottom-[-180px] -z-10 size-[620px] rounded-full bg-secondary/6 blur-[120px]" />
      <div className="mx-auto flex min-h-[716px] w-full max-w-[1360px] flex-col items-center gap-12 py-8 lg:flex-row lg:gap-6">
        <div className="z-10 flex flex-1 flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="size-4" fill="currentColor" />
            The Magic of AI
          </span>
          <h1 className="max-w-2xl font-heading text-[40px] leading-[1.14] font-semibold tracking-[-0.02em] text-foreground md:text-5xl md:leading-[56px]">
            Turn messy ideas into <br className="hidden md:block" />
            <span className="gradient-text">build-ready MVPs.</span>
          </h1>
          <p className="max-w-xl text-lg leading-7 text-muted-foreground">
            BuildPixies gives you a tiny AI product team that transforms your rough idea into a product brief, UX flow, backlog, tech plan and launch-ready documentation.
          </p>
          <div className="mt-4 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Link href="/projects/new" className="magic-button inline-flex h-14 items-center justify-center gap-2 rounded-full px-8 text-sm font-semibold tracking-[0.02em] transition-all">
              <WandSparkles className="size-5" fill="currentColor" />
              Summon your pixies
            </Link>
            <Link href="/#features" className="glass-panel inline-flex h-14 items-center justify-center rounded-full px-8 text-sm font-semibold tracking-[0.02em] text-foreground transition-colors hover:bg-surface-low">
              View Demo
            </Link>
          </div>
          <div className="mt-6 flex items-center gap-4 text-xs font-medium text-muted-foreground">
            <span className="flex -space-x-3" aria-hidden="true">
              {[
                ["MK", "bg-primary-fixed text-primary"],
                ["AZ", "bg-secondary-fixed text-secondary"],
                ["EL", "bg-surface-high text-tertiary"],
              ].map(([name, className]) => (
                <span key={name} className={`flex size-8 items-center justify-center rounded-full border-2 border-surface text-[9px] font-bold ${className}`}>
                  {name}
                </span>
              ))}
            </span>
            Loved by 1,000+ creators
          </div>
        </div>

        <div className="relative z-10 w-full max-w-2xl flex-1">
          <div className="glass-panel flex w-full flex-col gap-6 rounded-2xl p-4 shadow-2xl md:flex-row md:p-6">
            <div className="flex flex-1 flex-col gap-4">
              <div className="mb-2 flex items-center gap-2" aria-hidden="true">
                <span className="size-3 rounded-full bg-destructive/80" />
                <span className="size-3 rounded-full bg-[#ffb95f]/80" />
                <span className="size-3 rounded-full bg-[#ffb0cd]/80" />
              </div>
              <div className="flex min-h-[200px] flex-1 flex-col rounded-xl border border-outline-variant/30 bg-white p-4">
                <span className="mb-2 text-xs font-medium text-muted-foreground">Your Idea</span>
                <p className="text-sm leading-5 text-foreground">
                  “I want an app for dog walkers where they can track their routes and get paid automatically...”
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-outline-variant/20 pt-3">
                  <Paperclip className="size-[18px] text-outline" />
                  <span className="flex size-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <ArrowUp className="size-3.5" />
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-[1.5] flex-col gap-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="size-5 animate-pulse text-primary" fill="currentColor" />
                Pixies Working
              </div>
              {statusItems.map((item) => {
                const Icon = item.icon;
                const isMuted = item.tone === "muted";
                const isSecondary = item.tone === "secondary";
                return (
                  <div key={item.label} className={`flex items-center gap-3 rounded-xl border border-outline-variant/30 bg-white p-3 ${isMuted ? "opacity-60" : ""}`}>
                    <span className={`flex size-8 items-center justify-center rounded-full ${isSecondary ? "bg-secondary/10 text-secondary" : isMuted ? "bg-outline/10 text-outline" : "bg-primary/10 text-primary"}`}>
                      <Icon className="size-4" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-xs font-medium">{item.label}</span>
                      <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-surface-highest">
                        <span className={`block h-full rounded-full ${isSecondary ? "bg-secondary" : "bg-primary"}`} style={{ width: `${item.progress}%` }} />
                      </span>
                    </span>
                    {item.done ? (
                      <CheckCircle2 className="size-4 text-outline" />
                    ) : isSecondary ? (
                      <span className="size-2 animate-pulse rounded-full bg-secondary shadow-[0_0_12px_rgba(180,19,109,0.55)]" />
                    ) : (
                      <span className="size-4 rounded-full border border-outline-variant" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
