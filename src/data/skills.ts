export interface SkillCategory {
  id: string;
  label: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    skills: ["JavaScript", "TypeScript", "PHP"],
  },
  {
    id: "frameworks",
    label: "Frameworks & Libraries",
    skills: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    id: "backend",
    label: "Backend",
    skills: ["Node.js"],
  },
  {
    id: "platforms",
    label: "Platforms",
    skills: ["Shopify", "WordPress"],
  },
  {
    id: "seo",
    label: "SEO & Analytics",
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
    skills: ["Git", "GitHub", "VS Code", "Cursor", "Vercel"],
  },
];
