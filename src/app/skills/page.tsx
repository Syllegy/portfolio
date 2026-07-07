import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimateIn } from "@/components/AnimateIn";
import { SkillsGrid } from "@/components/SkillsGrid";
import { PagePlanet } from "@/components/PagePlanet";
import { personal } from "@/data/personal";

export const metadata: Metadata = {
  title: "Skills",
  description: `Technologies and tools used by ${personal.name} — ${personal.title}.`,
};

export default function SkillsPage() {
  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <PagePlanet
        variant="skills"
        className="absolute -top-6 right-2 sm:right-8 w-28 h-28 sm:w-44 sm:h-44"
      />
      <AnimateIn className="mb-12">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="Tools and technologies I use across my work."
        />
      </AnimateIn>
      <SkillsGrid />
    </div>
  );
}
