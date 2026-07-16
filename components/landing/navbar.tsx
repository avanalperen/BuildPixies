import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-20 border-b border-outline-variant/30 bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-4 md:px-10">
        <Link href="/" className="flex items-center gap-2 font-heading text-2xl font-bold text-primary">
          <Sparkles className="size-6" fill="currentColor" aria-hidden="true" />
          BuildPixies
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Landing navigation">
          <Link href="/#features" className="text-sm font-semibold tracking-[0.02em] text-muted-foreground transition-colors hover:text-primary">
            Features
          </Link>
          <Link href="/#how-it-works" className="text-sm font-semibold tracking-[0.02em] text-muted-foreground transition-colors hover:text-primary">
            How it Works
          </Link>
        </nav>
        <Link
          href="/dashboard"
          className="inline-flex h-10 items-center rounded-full bg-primary px-6 text-sm font-semibold tracking-[0.02em] text-primary-foreground shadow-[0_4px_14px_rgba(70,72,212,0.39)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(70,72,212,0.25)]"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
}
