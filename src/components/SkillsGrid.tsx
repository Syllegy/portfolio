"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { cn } from "@/lib/utils";
import { AnimateIn } from "./AnimateIn";

interface SkillBarProps {
  name: string;
  level: number;
  delay?: number;
}

function SkillBar({ name, level, delay = 0 }: SkillBarProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground text-xs">
          {["", "Beginner", "Basic", "Intermediate", "Advanced", "Expert"][level]}
        </span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${level * 20}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

interface SkillsGridProps {
  preview?: boolean;
}

export function SkillsGrid({ preview = false }: SkillsGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const displayCategories =
    activeCategory === "all"
      ? skillCategories
      : skillCategories.filter((c) => c.id === activeCategory);

  const categories = preview ? skillCategories.slice(0, 3) : displayCategories;

  return (
    <div>
      {!preview && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory("all")}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
              activeCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            All
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      <div className={cn("grid gap-8", preview ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")}>
        {categories.map((category, catIdx) => (
          <AnimateIn key={category.id} delay={catIdx * 0.1} direction="up">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-bold text-base mb-5 text-primary">{category.label}</h3>
              <div className="space-y-4">
                {category.skills.map((skill, idx) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={catIdx * 0.1 + idx * 0.05}
                  />
                ))}
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>
    </div>
  );
}
