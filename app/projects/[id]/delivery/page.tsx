import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { DeliveryPack } from "@/components/project/delivery-pack";
import { getProject } from "@/lib/projects";
import { resourceIdSchema } from "@/lib/api/schemas";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Delivery Pack",
};

export default async function DeliveryPackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!resourceIdSchema.safeParse(id).success) notFound();
  const project = await getProject(id);
  if (!project) notFound();

  return (
    <AppShell active="projects">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-6 md:px-10 md:py-10">
        <nav
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <Link href="/dashboard" className="transition-colors hover:text-primary">
            Dashboard
          </Link>
          <ChevronRight className="size-4" />
          <Link
            href={`/projects/${project.id}`}
            className="max-w-[40vw] truncate transition-colors hover:text-primary"
          >
            {project.title}
          </Link>
          <ChevronRight className="size-4" />
          <span className="text-foreground">Delivery Pack</span>
        </nav>
        <DeliveryPack project={project} />
      </div>
    </AppShell>
  );
}
