export interface TimelineItem {
  year: string;
  title: string;
  company?: string;
  description: string;
  type: "work" | "education" | "project";
}

export const timeline: TimelineItem[] = [
  {
    year: "2024 – Present",
    title: "Freelance Full-Stack Developer",
    description:
      "Building web applications and digital experiences for clients across e-commerce, SaaS, and media. Specialising in performance-first Next.js development and technical SEO.",
    type: "work",
  },
  {
    year: "2022 – 2024",
    title: "Senior Frontend Developer",
    company: "Tech Agency",
    description:
      "Led frontend development on 12+ client projects. Introduced component-driven architecture with Storybook, cutting design-to-code cycle time by 40%.",
    type: "work",
  },
  {
    year: "2020 – 2022",
    title: "Full-Stack Developer",
    company: "Startup",
    description:
      "Joined as the second engineer. Built the core product from scratch using React and Node.js, scaling it to 10,000 monthly active users.",
    type: "work",
  },
  {
    year: "2020",
    title: "BSc Computer Science",
    company: "University",
    description:
      "Graduated with First Class Honours. Dissertation focused on progressive web app performance techniques.",
    type: "education",
  },
  {
    year: "2019",
    title: "Software Engineering Intern",
    company: "Enterprise Co.",
    description:
      "Built internal tooling that automated 3 hours of daily manual work for the operations team.",
    type: "work",
  },
];
