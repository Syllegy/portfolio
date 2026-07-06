export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  problem: string;
  solution: string;
  implementation: string[];
  outcomes: string[];
  category: string;
}

export const projects: Project[] = [];

export const getFeaturedProjects = () => projects.filter((p) => p.featured);
export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
export const getAllTechnologies = () =>
  Array.from(new Set(projects.flatMap((p) => p.technologies))).sort();
export const getAllCategories = () =>
  Array.from(new Set(projects.map((p) => p.category))).sort();
