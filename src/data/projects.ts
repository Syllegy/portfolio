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
  {
    slug: "find-luxury-rehabs",
    title: "Find Luxury Rehabs",
    description:
      "Ongoing frontend and backend development, technical SEO, and performance optimization for a luxury addiction recovery treatment directory.",
    longDescription:
      "Find Luxury Rehabs is an online directory that connects individuals and families with luxury residential treatment centers specializing in addiction recovery and mental health care. As part of the development team, I contribute to the ongoing maintenance, optimization, and enhancement of the platform through frontend development, backend development, technical SEO, and performance improvements.",
    image: "/images/project-find-luxury-rehabs.png",
    technologies: [
      "Next.js",
      "React",
      "WordPress",
      "SASS",
      "SCSS",
      "GSAP",
      "Swiper.js",
      "Google Analytics",
      "Google Search Console",
      "SEMRush",
    ],
    liveUrl: "https://findluxuryrehabs.com/",
    featured: true,
    ongoing: true,
    category: "Next.js",
    problem:
      "The goal was not to rebuild the platform but to continuously improve an existing production website, identifying opportunities for refinement while maintaining stability across a growing codebase, spanning technical SEO, page performance, responsive consistency, and new feature development that had to align with the existing design system.",
    solution:
      "Working alongside the development team, I developed reusable components to simplify future development, implemented technical SEO improvements throughout the site, optimized frontend assets and rendering performance to improve Core Web Vitals, refined responsive layouts for consistency across devices, and improved accessibility through better semantic HTML.",
    contributions: [
      "Developed reusable React components, including functionality for the quiz experience",
      "Built responsive layouts consistent across desktop, tablet, and mobile devices",
      "Implemented technical SEO improvements across key pages",
      "Optimized Core Web Vitals and overall website performance",
      "Improved accessibility through semantic markup and frontend refinements",
      "Assisted with ongoing maintenance, feature development, and platform improvements",
    ],
    challenges: [
      "Improving technical SEO implementation",
      "Enhancing page performance",
      "Maintaining consistency across responsive layouts",
      "Introducing new features without disrupting existing functionality",
      "Ensuring new components aligned with the existing design system",
    ],
    results: [
      "Stronger technical SEO implementation",
      "Improved Core Web Vitals and page performance",
      "Enhanced accessibility and usability",
      "Faster, more responsive page experiences",
      "Continued rollout of new features and platform enhancements",
      "Better maintainability through reusable component development",
    ],
  },
  {
    slug: "reign-rtc",
    title: "Reign Residential Treatment Center",
    description:
      "Ongoing frontend development, technical SEO, and performance optimization for a behavioral health facility's website.",
    longDescription:
      "Reign Residential Treatment Center is a behavioral health facility providing treatment for individuals seeking support for mental health and substance abuse recovery. The website serves as an informational resource for prospective patients and families while supporting lead generation through clear navigation, educational content, and search engine visibility. As part of the development team, I contribute to the ongoing maintenance, optimization, and expansion of the website through frontend development, technical SEO, performance optimization, and feature implementation.",
    image: "/images/project-reign-rtc.png",
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "WordPress",
      "JavaScript",
      "SCSS",
      "GSAP",
      "Vercel",
      "SEMRush",
    ],
    liveUrl: "https://reignrtc.com/",
    featured: true,
    ongoing: true,
    category: "Next.js",
    problem:
      "Because the website is actively maintained and continuously evolving, the primary challenge was introducing improvements while preserving the stability of the existing production environment, maintaining consistent design across newly developed pages, improving technical SEO without disrupting existing content, and ensuring responsive behavior stayed consistent across devices.",
    solution:
      "I contributed by developing reusable components that simplify future maintenance and feature development, building responsive layouts that integrate seamlessly with the existing design system, applying technical SEO best practices throughout new and existing pages, and optimizing frontend assets and rendering performance to improve Core Web Vitals.",
    contributions: [
      "Developed reusable frontend components to support long-term maintainability",
      "Built responsive layouts for desktop, tablet, and mobile devices",
      "Created new pages that integrate with the existing website architecture",
      "Implemented technical SEO improvements",
      "Optimized Core Web Vitals and frontend performance",
      "Resolved frontend bugs and UI inconsistencies",
      "Supported ongoing maintenance and feature development",
    ],
    challenges: [
      "Maintaining consistent design across newly developed pages",
      "Improving technical SEO without disrupting existing content",
      "Enhancing frontend performance while introducing additional functionality",
      "Ensuring responsive behavior remained consistent across multiple devices and screen sizes",
    ],
    results: [
      "Improved technical SEO implementation",
      "Better Core Web Vitals and frontend performance",
      "Consistent responsive layouts across devices",
      "Expansion of the website through new page development",
      "Improved maintainability through reusable component architecture",
      "Continued delivery of enhancements without disrupting production stability",
    ],
  },
  {
    slug: "sanctuary-mh",
    title: "Sanctuary Mental Health & Wellness",
    description:
      "Ongoing frontend development, technical SEO, and performance optimization for a mental health and substance abuse treatment provider's website.",
    longDescription:
      "Sanctuary Mental Health & Wellness provides comprehensive mental health and substance abuse treatment through evidence-based care and personalized treatment programs. The website serves as an informational resource for prospective patients and families while supporting patient outreach and lead generation. As part of the development team, I contribute to the ongoing maintenance, optimization, and enhancement of the platform through frontend development, technical SEO, and performance improvements.",
    image: "/images/project-sanctuary-mh.png",
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "WordPress",
      "JavaScript",
      "SCSS",
      "GSAP",
      "Vercel",
      "SEMRush",
    ],
    liveUrl: "https://sanctuarymh.com/",
    featured: true,
    ongoing: true,
    category: "Next.js",
    problem:
      "Working on a production healthcare platform required balancing continuous improvements with long-term stability, focusing on technical SEO optimization, responsive design consistency, and frontend performance improvements without disrupting existing functionality on a growing production website.",
    solution:
      "I contributed by developing reusable components to simplify future maintenance, improving responsive layouts across multiple screen sizes, applying technical SEO best practices throughout the website, optimizing frontend assets to improve Core Web Vitals, and refining the user interface through ongoing maintenance and incremental improvements.",
    contributions: [
      "Developed reusable frontend components",
      "Built responsive layouts for desktop, tablet, and mobile devices",
      "Implemented technical SEO improvements across key pages",
      "Optimized Core Web Vitals and frontend performance",
      "Improved accessibility and semantic HTML structure",
      "Resolved frontend bugs and visual inconsistencies",
      "Supported ongoing maintenance and feature development",
    ],
    challenges: [
      "Technical SEO optimization",
      "Responsive design consistency",
      "Frontend performance improvements",
      "Ongoing maintenance of a growing production website",
    ],
    results: [
      "Improved technical SEO implementation",
      "Better Core Web Vitals and page performance",
      "Enhanced accessibility and usability",
      "More consistent responsive layouts",
      "Continued rollout of new features and ongoing website enhancements",
    ],
  },
];

export const getFeaturedProjects = () => projects.filter((p) => p.featured);
export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
export const getAllTechnologies = () =>
  Array.from(new Set(projects.flatMap((p) => p.technologies))).sort();
export const getAllCategories = () =>
  Array.from(new Set(projects.map((p) => p.category))).sort();
