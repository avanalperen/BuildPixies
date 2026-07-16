import type { ReactNode } from "react";
import Link from "next/link";
import {
  Bell,
  CircleHelp,
  FolderOpen,
  LayoutDashboard,
  Settings,
  WandSparkles,
} from "lucide-react";
import { Brand } from "@/components/brand";
import { cn } from "@/lib/utils";

type ActiveItem = "dashboard" | "projects" | "settings";

const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, key: "dashboard" },
  { label: "Projects", href: "/dashboard", icon: FolderOpen, key: "projects" },
] as const;

function NavigationLink({
  item,
  active,
}: {
  item: (typeof navigation)[number];
  active: ActiveItem;
}) {
  const Icon = item.icon;
  const isActive = item.key === active;

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-all",
        isActive
          ? "scale-[0.98] border-r-4 border-primary bg-surface-low text-primary"
          : "text-muted-foreground hover:bg-surface-low hover:text-primary",
      )}
    >
      <Icon className="size-5" fill={isActive ? "currentColor" : "none"} />
      {item.label}
    </Link>
  );
}

export function AppShell({
  children,
  active = "dashboard",
}: {
  children: ReactNode;
  active?: ActiveItem;
}) {
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[280px] flex-col border-r border-outline-variant/20 bg-surface px-4 py-10 shadow-[0_10px_30px_rgba(11,28,48,0.04)] lg:flex">
        <Brand className="mb-12 px-2" />
        <nav className="flex flex-1 flex-col gap-2" aria-label="Primary navigation">
          {navigation.map((item) => (
            <NavigationLink key={item.key} item={item} active={active} />
          ))}
          <Link
            href="/dashboard"
            className="mt-auto flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-surface-low hover:text-primary"
          >
            <Settings className="size-5" />
            Settings
          </Link>
        </nav>
      </aside>

      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-outline-variant/55 bg-surface/80 px-4 backdrop-blur-xl lg:left-[280px] lg:px-10">
        <Brand compact className="lg:hidden" />
        <span className="hidden lg:block" />
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/projects/new"
            aria-label="Summon new team"
            className="magic-button inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-all sm:px-5"
          >
            <WandSparkles className="size-4" />
            <span className="hidden sm:inline">Summon</span>
          </Link>
          <button
            type="button"
            className="hidden size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-surface-low hover:text-primary sm:flex"
            aria-label="Notifications"
          >
            <Bell className="size-5" />
          </button>
          <button
            type="button"
            className="hidden size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-surface-low hover:text-primary sm:flex"
            aria-label="Help"
          >
            <CircleHelp className="size-5" />
          </button>
          <span className="flex size-8 items-center justify-center rounded-full border border-outline-variant/50 bg-primary-fixed text-xs font-bold text-primary">
            BP
          </span>
        </div>
      </header>

      <main className="min-h-screen pt-16 pb-20 lg:ml-[280px] lg:pb-0">
        {children}
      </main>

      <nav className="fixed inset-x-4 bottom-4 z-50 grid grid-cols-3 rounded-2xl border border-white/60 bg-white/85 p-1.5 shadow-xl backdrop-blur-xl lg:hidden" aria-label="Mobile navigation">
        <Link href="/dashboard" className={cn("flex flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-semibold", active === "dashboard" ? "bg-surface-low text-primary" : "text-muted-foreground") }>
          <LayoutDashboard className="size-4" />Dashboard
        </Link>
        <Link href="/dashboard" className={cn("flex flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-semibold", active === "projects" ? "bg-surface-low text-primary" : "text-muted-foreground") }>
          <FolderOpen className="size-4" />Projects
        </Link>
        <Link href="/projects/new" className="flex flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-semibold text-muted-foreground">
          <WandSparkles className="size-4" />Summon
        </Link>
      </nav>
    </div>
  );
}
