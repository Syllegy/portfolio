import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimateIn } from "@/components/AnimateIn";
import { ProjectsClient } from "./ProjectsClient";
import { personal } from "@/data/personal";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: `Portfolio of work by ${personal.name} — full-stack web development projects.`,
};

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <AnimateIn className="mb-12">
        <SectionHeading
          title="Projects"
          subtitle="A collection of work ranging from e-commerce platforms to developer tooling."
        />
      </AnimateIn>
      <ProjectsClient projects={projects} />
    </div>
  );
}
