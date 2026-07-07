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

// Simple Icons CDN slugs — white (#ffffff) variant
const SKILL_ICONS: Record<string, string> = {
  "JavaScript":            "javascript",
  "TypeScript":            "typescript",
  "PHP":                   "php",
  "React":                 "react",
  "Next.js":               "nextdotjs",
  "Tailwind CSS":          "tailwindcss",
  "Node.js":               "nodedotjs",
  "Shopify":               "shopify",
  "WordPress":             "wordpress",
  "Google Analytics":      "googleanalytics",
  "Google Search Console": "googlesearchconsole",
  "SEMRush":               "semrush",
  "Git":                   "git",
  "GitHub":                "github",
  "VS Code":               "visualstudiocode",
  "Vercel":                "vercel",
  "SCSS":                  "sass",
  "HTML":                  "html5",
};

function iconUrl(slug: string) {
  return `https://cdn.simpleicons.org/${slug}/ffffff`;
}

interface SkillTagProps {
  name: string;
  index: number;
}

function SkillTag({ name, index }: SkillTagProps) {
  const slug = SKILL_ICONS[name];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.22, delay: index * 0.04 }}
      whileHover={{ y: -3, scale: 1.04 }}
      className="flex flex-col items-center justify-center gap-2 px-3 py-4 text-xs font-medium cursor-default select-none bg-muted/70 rounded-sm text-foreground/70 hover:text-foreground hover:bg-muted transition-colors duration-150"
    >
      {slug ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={iconUrl(slug)}
          alt={name}
          width={22}
          height={22}
          className="opacity-80 group-hover:opacity-100"
        />
      ) : (
        <span className="w-5 h-5" />
      )}
      <span className="text-center leading-tight">{name}</span>
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
              <div className="flex items-center gap-3 px-6 pt-5 pb-4 border-b border-border/40">
                {Icon && (
                  <div className="w-8 h-8 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                )}
                <p className="text-xs font-semibold uppercase tracking-widest text-foreground/60">
                  {category.label}
                </p>
                <span className="ml-auto text-xs font-mono text-foreground/30">
                  {category.skills.length}
                </span>
              </div>

              <div className="p-4 grid grid-cols-3 gap-2">
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
