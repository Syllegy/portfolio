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
    <div className="relative">
      {/* Margin accent planet — only shown once there's real space beside the content column, so it never overlaps text. */}
      <PagePlanet
        variant="skillsAccent"
        seed={2}
        className="hidden xl:block absolute top-56 right-6 w-16 h-16 opacity-90"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20">
        {/* Kept to the right — the heading below is always left-aligned. */}
        <PagePlanet
          variant="skills"
          className="absolute -top-4 right-2 sm:right-16 w-24 h-24 sm:w-36 sm:h-36"
        />
        <AnimateIn className="mb-12">
          <SectionHeading
            title="Skills & Technologies"
            subtitle="Tools and technologies I use across my work."
          />
        </AnimateIn>
        <SkillsGrid />
      </div>
    </div>
  );
}
