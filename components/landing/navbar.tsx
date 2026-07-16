import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-heading text-lg font-semibold">
          <span aria-hidden>✨</span> BuildPixies
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link href="/#how" className="hover:text-foreground">How it works</Link>
          <Link href="/#pixies" className="hover:text-foreground">Pixies</Link>
          <Link href="/#outputs" className="hover:text-foreground">Outputs</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/projects/new">Summon your pixies</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
