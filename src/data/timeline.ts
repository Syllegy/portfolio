export interface TimelineItem {
  year: string;
  title: string;
  company?: string;
  description: string;
  tags?: string[];
  type: "work" | "education";
}

export const timeline: TimelineItem[] = [
  {
    year: "2025 – Present",
    title: "Web Developer & Technical SEO Specialist",
    company: "Skyline Agency",
    description:
      "Working across Shopify and WordPress projects, handling everything from frontend development and UI improvements to technical SEO, performance optimization, and ongoing website maintenance.",
    tags: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Shopify",
      "WordPress",
      "Tailwind CSS",
      "Google Analytics",
      "Google Search Console",
      "SEMRush",
    ],
    type: "work",
  },
  {
    year: "2024 – Present",
    title: "Self-Taught Developer",
    description:
      "Continuously expanding my knowledge through hands-on development, real client work, and modern development tools. Building projects to deepen expertise across the full stack.",
    type: "education",
  },
];
