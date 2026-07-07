import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimateIn } from "@/components/AnimateIn";
import { SkillsPlanet } from "@/components/SkillsPlanet";
import { skillCategories } from "@/data/skills";
import { personal } from "@/data/personal";

export const metadata: Metadata = {
  title: "Skills",
  description: `Technologies and tools used by ${personal.name} — ${personal.title}.`,
};

export default function SkillsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <AnimateIn className="mb-4">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="Tools and technologies I use across my work — drag the planet to explore."
        />
      </AnimateIn>

      <AnimateIn delay={0.1}>
        <SkillsPlanet />
      </AnimateIn>

      <AnimateIn delay={0.15} className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-6">
        {skillCategories.map((cat) => (
          <div key={cat.id} className="flex items-center gap-2 text-xs font-medium text-foreground/60">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: cat.color }}
            />
            {cat.label}
          </div>
        ))}
      </AnimateIn>
    </div>
  );
}
