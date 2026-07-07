"use client";

import { motion } from "framer-motion";
import { Code2, Layers, Server, ShoppingBag, SearchCheck, Wrench } from "lucide-react";
import { skillCategories } from "@/data/skills";
import { AnimateIn } from "./AnimateIn";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  languages: Code2,
  frameworks: Layers,
  backend: Server,
  platforms: ShoppingBag,
  seo: SearchCheck,
  tools: Wrench,
};

interface SkillTagProps {
  name: string;
  index: number;
}

function SkillTag({ name, index }: SkillTagProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.22, delay: index * 0.04 }}
      whileHover={{ y: -3, scale: 1.04 }}
      className="flex items-center justify-center px-4 py-3 text-sm font-medium cursor-default select-none bg-muted/70 rounded-sm text-foreground/70 hover:text-foreground hover:bg-muted transition-colors duration-150"
    >
      {name}
    </motion.div>
  );
}

interface SkillsGridProps {
  preview?: boolean;
}

export function SkillsGrid({ preview = false }: SkillsGridProps) {
  const categories = preview
    ? skillCategories.filter((c) => ["languages", "frameworks", "seo"].includes(c.id))
    : skillCategories;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {categories.map((category, idx) => {
        const Icon = categoryIcons[category.id];
        return (
          <AnimateIn key={category.id} delay={idx * 0.08} direction="up">
            <div className="bg-card rounded-sm h-full overflow-hidden">
              {/* Card header with icon */}
              <div className="flex items-center gap-3 px-6 pt-5 pb-4 border-b border-border/40">
                {Icon && (
                  <div className="w-8 h-8 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                )}
                <p className="text-xs font-semibold uppercase tracking-widest text-foreground/60">
                  {category.label}
                </p>
                <span className="ml-auto text-xs font-mono text-foreground/60/50">
                  {category.skills.length}
                </span>
              </div>

              {/* Tags grid */}
              <div className="p-4 grid grid-cols-2 gap-2">
                {category.skills.map((skill, skillIdx) => (
                  <SkillTag key={skill} name={skill} index={skillIdx} />
                ))}
              </div>
            </div>
          </AnimateIn>
        );
      })}
    </div>
  );
}
