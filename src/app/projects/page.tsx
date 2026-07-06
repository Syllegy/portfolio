import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimateIn } from "@/components/AnimateIn";
import { personal } from "@/data/personal";
import { projects } from "@/data/projects";
import { ProjectsClient } from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects",
  description: `Web development projects by ${personal.name}.`,
};

export default function ProjectsPage() {
  if (projects.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <AnimateIn className="mb-12">
          <SectionHeading
            title="Projects"
            subtitle="A portfolio of client work and personal projects."
          />
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="border border-dashed border-border rounded-2xl p-16 text-center">
            <p className="text-2xl font-semibold mb-3">Coming Soon</p>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Case studies and project details are being prepared. In the meantime, feel free to reach out directly to discuss my work.
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <AnimateIn className="mb-12">
        <SectionHeading
          title="Projects"
          subtitle="A collection of client work and personal projects."
        />
      </AnimateIn>
      <ProjectsClient projects={projects} />
    </div>
  );
}
