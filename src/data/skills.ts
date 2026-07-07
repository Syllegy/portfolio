export interface SkillCategory {
  id: string;
  label: string;
  color: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    color: "#6ea8fe",
    skills: ["JavaScript", "TypeScript", "PHP"],
  },
  {
    id: "frameworks",
    label: "Frameworks & Libraries",
    color: "#b39dfb",
    skills: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    id: "backend",
    label: "Backend",
    color: "#4fd8ac",
    skills: ["Node.js"],
  },
  {
    id: "platforms",
    label: "Platforms",
    color: "#f5a94e",
    skills: ["Shopify", "WordPress"],
  },
  {
    id: "seo",
    label: "SEO & Analytics",
    color: "#f477b0",
    skills: [
      "Technical SEO",
      "Google Search Console",
      "Google Analytics",
      "SEMRush",
    ],
  },
  {
    id: "tools",
    label: "Tools",
    color: "#9aa7bd",
    skills: ["Git", "GitHub", "VS Code", "Cursor", "Vercel"],
  },
];
