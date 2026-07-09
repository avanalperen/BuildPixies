import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { NewProjectForm } from "@/components/project/new-project-form";
import { Button } from "@/components/ui/button";

export default function NewProjectPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-12">
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm" className="mb-4">
            <Link href="/dashboard">← Back to dashboard</Link>
          </Button>
          <h1 className="font-heading text-3xl font-bold">
            Drop your idea
          </h1>
          <p className="text-muted-foreground">
            Don&apos;t worry about a perfect prompt. Write it messy — the pixies
            will structure it.
          </p>
        </div>
        <div className="rounded-2xl border bg-card p-6">
          <NewProjectForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
