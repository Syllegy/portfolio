import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimateIn } from "@/components/AnimateIn";
import { ProjectsClient } from "./ProjectsClient";
import { PagePlanet } from "@/components/PagePlanet";
import { personal } from "@/data/personal";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Professional Work",
  description: `Client projects and professional work by ${personal.name}.`,
};

export default function ProjectsPage() {
  if (projects.length === 0) {
    return (
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <PagePlanet
          variant="work"
          className="absolute top-8 right-0 sm:right-2 w-28 h-28 sm:w-40 sm:h-40"
        />
        <AnimateIn className="mb-12">
          <SectionHeading
            title="Professional Work"
            subtitle="Client projects and ongoing work."
          />
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <div className="border border-dashed border-border rounded-2xl p-16 text-center">
            <p className="text-2xl font-semibold mb-3">Coming Soon</p>
            <p className="text-foreground/60 max-w-md mx-auto mb-8">
              Case studies are being prepared. In the meantime, feel free to reach out directly to discuss my work.
            </p>
            <Button asChild className="gap-2">
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </AnimateIn>
      </div>
    );
  }

  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <PagePlanet
        variant="work"
        className="absolute top-8 right-0 sm:right-2 w-28 h-28 sm:w-40 sm:h-40"
      />
      <AnimateIn className="mb-12">
        <SectionHeading
          title="Professional Work"
          subtitle="Client projects and ongoing development work."
        />
      </AnimateIn>
      <ProjectsClient projects={projects} />
    </div>
  );
}
