"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { AnimateIn } from "./AnimateIn";
import { cn } from "@/lib/utils";

interface SkillTagProps {
  name: string;
  index: number;
}

function SkillTag({ name, index }: SkillTagProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      whileHover={{ y: -3, scale: 1.04 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={cn(
        "relative flex items-center justify-center px-4 py-3 text-sm font-medium cursor-default select-none",
        "border rounded-sm transition-colors duration-150",
        hovered
          ? "bg-primary/10 border-primary/50 text-foreground"
          : "bg-muted/60 border-border/60 text-muted-foreground"
      )}
    >
      {/* Corner accent on hover */}
      <span
        className={cn(
          "absolute top-0 left-0 w-1.5 h-1.5 bg-primary transition-opacity duration-150",
          hovered ? "opacity-100" : "opacity-0"
        )}
      />
      {name}
    </motion.div>
  );
}

interface SkillCategoryCardProps {
  id: string;
  label: string;
  skills: string[];
  delay: number;
}

function SkillCategoryCard({ id, label, skills, delay }: SkillCategoryCardProps) {
  return (
    <AnimateIn delay={delay} direction="up">
      <div className="bg-card border border-border rounded-sm p-6 h-full hover:border-border/80 transition-colors duration-200">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
          {label}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {skills.map((skill, idx) => (
            <SkillTag key={skill} name={skill} index={idx} />
          ))}
        </div>
      </div>
    </AnimateIn>
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
      {categories.map((category, idx) => (
        <SkillCategoryCard
          key={category.id}
          id={category.id}
          label={category.label}
          skills={category.skills}
          delay={idx * 0.08}
        />
      ))}
    </div>
  );
}
