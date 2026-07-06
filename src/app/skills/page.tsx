import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimateIn } from "@/components/AnimateIn";
import { SkillsGrid } from "@/components/SkillsGrid";
import { personal } from "@/data/personal";

export const metadata: Metadata = {
  title: "Skills",
  description: `Technical skills and expertise of ${personal.name} — ${personal.title}.`,
};

export default function SkillsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <AnimateIn className="mb-12">
        <SectionHeading
          title="Skills & Expertise"
          subtitle="Tools, technologies, and practices I use to deliver great results."
        />
      </AnimateIn>
      <SkillsGrid />
    </div>
  );
}
