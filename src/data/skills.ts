export interface Skill {
  name: string;
  level: number; // 1-5
  icon?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "React / Next.js", level: 5 },
      { name: "TypeScript", level: 5 },
      { name: "Tailwind CSS", level: 5 },
      { name: "Framer Motion", level: 4 },
      { name: "Vue.js", level: 3 },
      { name: "Web Accessibility (WCAG)", level: 4 },
      { name: "Performance Optimisation", level: 5 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      { name: "Node.js", level: 5 },
      { name: "PostgreSQL", level: 4 },
      { name: "REST APIs", level: 5 },
      { name: "GraphQL", level: 4 },
      { name: "Redis", level: 4 },
      { name: "Prisma / TypeORM", level: 4 },
      { name: "Python", level: 3 },
    ],
  },
  {
    id: "cms",
    label: "CMS",
    skills: [
      { name: "Contentful", level: 5 },
      { name: "Sanity", level: 4 },
      { name: "WordPress (headless)", level: 4 },
      { name: "Strapi", level: 3 },
    ],
  },
  {
    id: "seo",
    label: "SEO",
    skills: [
      { name: "Technical SEO", level: 5 },
      { name: "Core Web Vitals", level: 5 },
      { name: "Structured Data / Schema", level: 4 },
      { name: "Google Search Console", level: 4 },
      { name: "Content Strategy", level: 3 },
    ],
  },
  {
    id: "devops",
    label: "DevOps / Tools",
    skills: [
      { name: "Docker", level: 4 },
      { name: "GitHub Actions", level: 5 },
      { name: "AWS (EC2, S3, Lambda, ECS)", level: 4 },
      { name: "Vercel / Netlify", level: 5 },
      { name: "Terraform", level: 3 },
      { name: "Linux / Bash", level: 4 },
    ],
  },
];
