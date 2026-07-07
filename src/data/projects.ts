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
      "Contributing to the ongoing improvement, optimization, and maintenance of the Bodybuilding.com Shopify storefront, helping deliver a faster, more reliable, and search-engine-friendly shopping experience.",
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
      "A large-scale production Shopify storefront required continuous improvement across technical SEO, Core Web Vitals, mobile responsiveness, and frontend functionality, all while maintaining uninterrupted uptime and shipping new features regularly.",
    solution:
      "As part of the development team, I contribute across multiple areas: technical SEO implementation, responsive bug fixes, structured data, performance optimization, and feature development. Everything is done collaboratively while the storefront remains live.",
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
  {
    slug: "cypress-hemp",
    title: "Cypress Hemp",
    description:
      "Ongoing frontend development, technical SEO, and accessibility improvements for a wellness brand specializing in CBD and THC products.",
    longDescription:
      "Contributing to the ongoing maintenance, optimization, and feature development of the Cypress Hemp Shopify storefront, with a strong focus on technical SEO, accessibility, frontend improvements, and performance.",
    image: "/images/project-cypress-hemp.png",
    technologies: [
      "Shopify",
      "React",
      "SCSS",
      "Google Analytics",
      "Google Search Console",
      "SEMRush",
    ],
    liveUrl: "https://www.cypresshemp.com/",
    featured: true,
    ongoing: true,
    category: "Shopify",
    problem:
      "The storefront had accessibility gaps, visual inconsistencies across desktop and mobile, oversized images affecting load performance, and areas where technical SEO could be significantly strengthened.",
    solution:
      "Working as part of the development team, I addressed these issues through targeted accessibility enhancements, structured data implementation, CSS refactoring for layout consistency, and image optimization to improve loading performance across the site.",
    contributions: [
      "Built reusable React components for improved maintainability",
      "Resolved responsive layout issues across desktop and mobile devices",
      "Implemented technical SEO improvements across key pages",
      "Enhanced website accessibility for a broader range of users",
      "Added structured data (Schema.org markup) to strengthen search visibility",
      "Optimized Core Web Vitals for improved page experience signals",
      "Improved frontend usability and visual consistency",
      "Assisted with ongoing feature development and storefront maintenance",
    ],
    challenges: [
      "Improving overall accessibility across an existing Shopify theme",
      "Resolving visual inconsistencies across desktop and mobile breakpoints",
      "Optimizing oversized images without sacrificing visual quality",
      "Introducing improvements to a live storefront without disrupting the user experience",
    ],
    results: [
      "Improved accessibility and overall usability across the storefront",
      "Better image optimization and faster asset loading",
      "Stronger technical SEO implementation across key pages",
      "Improved Core Web Vitals and page experience scores",
      "Continued refinement through ongoing maintenance and feature development",
    ],
  },
  {
    slug: "igethi",
    title: "IGETHI",
    description:
      "Ongoing maintenance, technical SEO, and frontend development for a Shopify storefront selling non-alcoholic, THC-infused spirits and cocktail mixers.",
    longDescription:
      "IGETHI is a premium wellness brand offering non-alcoholic, THC-infused spirits and cocktail mixers designed as a mindful alternative to traditional alcoholic beverages. As part of the development team, I contribute to the ongoing improvement, optimization, and maintenance of the Shopify storefront, with a focus on technical SEO, frontend development, performance, and user experience.",
    image: "/images/project-igethi.png",
    technologies: [
      "Shopify",
      "Shopify Liquid",
      "JavaScript",
      "HTML",
      "CSS",
      "Google Analytics",
      "Google Search Console",
      "SEMRush",
    ],
    liveUrl: "https://igethi.com/",
    featured: true,
    ongoing: true,
    category: "Shopify",
    problem:
      "The storefront had broken and missing product imagery, large unoptimized images affecting page speed, outdated technical SEO, and an inconsistent heading hierarchy that impacted both accessibility and search visibility.",
    solution:
      "Working alongside the development team, I optimized and properly sized website images, implemented structured data across relevant pages, reorganized heading hierarchy for accessibility and SEO, refactored CSS for layout consistency, and continuously monitored Core Web Vitals.",
    contributions: [
      "Built responsive layouts for desktop and mobile devices",
      "Created reusable Shopify components",
      "Resolved mobile visual bugs and frontend inconsistencies",
      "Implemented technical SEO improvements",
      "Enhanced website accessibility",
      "Added structured data (Schema.org markup)",
      "Optimized Core Web Vitals",
      "Improved heading hierarchy across key pages",
      "Assisted with ongoing feature development and maintenance",
    ],
    challenges: [
      "Broken and missing product imagery",
      "Large, unoptimized images affecting page speed",
      "Outdated technical SEO implementation",
      "Inconsistent heading hierarchy impacting accessibility and SEO",
      "Areas of the storefront requiring frontend refinement",
    ],
    results: [
      "Faster page load times",
      "Improved Google PageSpeed performance",
      "Stronger technical SEO implementation",
      "Enhanced mobile user experience",
      "Improved accessibility and semantic page structure",
      "Continued performance optimization across the storefront",
    ],
  },
];

export const getFeaturedProjects = () => projects.filter((p) => p.featured);
export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
export const getAllTechnologies = () =>
  Array.from(new Set(projects.flatMap((p) => p.technologies))).sort();
export const getAllCategories = () =>
  Array.from(new Set(projects.map((p) => p.category))).sort();
