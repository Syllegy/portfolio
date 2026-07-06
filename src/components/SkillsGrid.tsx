import { skillCategories } from "@/data/skills";
import { AnimateIn } from "./AnimateIn";

interface SkillsGridProps {
  preview?: boolean;
}

export function SkillsGrid({ preview = false }: SkillsGridProps) {
  const categories = preview
    ? skillCategories.filter((c) =>
        ["languages", "frameworks", "seo"].includes(c.id)
      )
    : skillCategories;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {categories.map((category, catIdx) => (
        <AnimateIn key={category.id} delay={catIdx * 0.08} direction="up">
          <div className="bg-card border border-border rounded-xl p-5 h-full">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              {category.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-sm font-medium bg-muted rounded-lg border border-border/60 text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </AnimateIn>
      ))}
    </div>
  );
}
