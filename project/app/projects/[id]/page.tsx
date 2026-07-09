import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Workspace } from "@/components/project/workspace";
import { Button } from "@/components/ui/button";
import { getProject } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
        <Button asChild variant="ghost" size="sm" className="mb-4">
          <Link href="/dashboard">← Back to dashboard</Link>
        </Button>
        <Workspace project={project} />
      </main>
      <Footer />
    </>
  );
}
