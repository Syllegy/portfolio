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
  ongoing: boolean;
  problem: string;
  solution: string;
  contributions: string[];
  challenges: string[];
  results: string[];
  category: string;
}

export const projects: Project[] = [
  {
    slug: "bodybuilding-com-shop",
    title: "Bodybuilding.com Shop",
    description:
      "Ongoing development, technical SEO, and maintenance for one of the leading online sports nutrition and fitness retailers.",
    longDescription:
      "Contributing to the ongoing improvement, optimization, and maintenance of the Bodybuilding.com Shopify storefront — helping deliver a faster, more reliable, and search-engine-friendly shopping experience.",
    image: "/images/project-bodybuilding.png",
    technologies: [
      "Shopify",
      "JavaScript",
      "HTML",
      "SCSS",
      "Google Analytics",
      "Google Search Console",
    ],
    liveUrl: "https://shop.bodybuilding.com/",
    featured: true,
    ongoing: true,
    category: "Shopify",
    problem:
      "A large-scale production Shopify storefront required continuous improvement across technical SEO, Core Web Vitals, mobile responsiveness, and frontend functionality — all while maintaining uninterrupted uptime and shipping new features regularly.",
    solution:
      "As part of the development team, I contribute across multiple areas: technical SEO implementation, responsive bug fixes, structured data, performance optimization, and feature development — working collaboratively to improve the storefront while it remains live.",
    contributions: [
      "Fixing responsive layout issues across desktop and mobile devices",
      "Building and enhancing storefront pages and components",
      "Implementing new features and storefront functionality",
      "Improving technical SEO across existing and new pages",
      "Optimizing Core Web Vitals for better page experience signals",
      "Adding structured data markup (Schema.org) for enhanced search results",
      "Improving site search functionality and product discoverability",
      "Resolving frontend bugs and UI inconsistencies",
      "Supporting ongoing maintenance and feature releases",
    ],
    challenges: [
      "Improving technical SEO across a large catalogue of existing pages without disrupting live traffic",
      "Resolving mobile responsiveness issues across a complex Shopify theme",
      "Implementing missing structured data at scale",
      "Maintaining and iterating on a high-traffic production storefront with continuous deployments",
    ],
    results: [
      "Increased organic search visibility across targeted pages",
      "Growth in organic traffic through sustained SEO improvements",
      "Higher click-through rates from search engine results pages",
      "Improved Core Web Vitals and overall page experience scores",
      "Continuous delivery of new features and usability improvements",
    ],
  },
];

export const getFeaturedProjects = () => projects.filter((p) => p.featured);
export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
export const getAllTechnologies = () =>
  Array.from(new Set(projects.flatMap((p) => p.technologies))).sort();
export const getAllCategories = () =>
  Array.from(new Set(projects.map((p) => p.category))).sort();
