import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimateIn } from "@/components/AnimateIn";
import { SkillsGrid } from "@/components/SkillsGrid";
import { personal } from "@/data/personal";

export const metadata: Metadata = {
  title: "Skills",
  description: `Technologies and tools used by ${personal.name} — ${personal.title}.`,
};

export default function SkillsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
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
