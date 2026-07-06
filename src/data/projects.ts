export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
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

export const projects: Project[] = [
  {
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with real-time inventory, Stripe payments, and an admin dashboard.",
    longDescription:
      "Built a scalable e-commerce platform from the ground up with a focus on performance and user experience. The platform handles thousands of concurrent users and integrates seamlessly with third-party logistics providers.",
    image: "/images/project-ecommerce.svg",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Redis", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    category: "Full-Stack",
    problem:
      "A retail client needed to migrate from a legacy WooCommerce setup that struggled with traffic spikes during sales events, resulting in lost revenue and poor customer experience.",
    solution:
      "Designed and implemented a modern Next.js application with server-side rendering for SEO, edge caching via Redis, and a decoupled admin dashboard that gave the client full control over inventory.",
    implementation: [
      "Architected a PostgreSQL schema optimized for product variants and inventory tracking",
      "Integrated Stripe for secure payment processing with webhook handlers for order fulfillment",
      "Built a Redis caching layer that reduced database load by 70% during peak traffic",
      "Implemented real-time stock updates using Server-Sent Events",
      "Created a custom CMS-like admin panel with role-based access control",
    ],
    outcomes: [
      "300% increase in page load speed compared to the legacy platform",
      "Zero downtime during a Black Friday sale with 5× normal traffic",
      "35% increase in conversion rate attributed to faster checkout flow",
      "Client reduced infrastructure costs by 40% by eliminating unused plugins",
    ],
  },
  {
    slug: "saas-dashboard",
    title: "SaaS Analytics Dashboard",
    description:
      "A data-rich analytics dashboard for a SaaS startup, featuring interactive charts and real-time KPI tracking.",
    longDescription:
      "Developed a comprehensive analytics platform that aggregates data from multiple sources, presenting it in clear, actionable visualisations for non-technical stakeholders.",
    image: "/images/project-saas.svg",
    technologies: ["React", "TypeScript", "Node.js", "Chart.js", "Prisma", "AWS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    category: "Frontend",
    problem:
      "A B2B SaaS startup had data spread across five different tools and no unified view of their business metrics, leading to slow decision-making and missed opportunities.",
    solution:
      "Built a centralised dashboard that pulls data from their CRM, billing platform, and analytics tools into a single pane of glass, with automated weekly reports delivered by email.",
    implementation: [
      "Designed a Node.js data-aggregation service with scheduled sync jobs using AWS Lambda",
      "Built interactive chart components using Chart.js with drill-down capabilities",
      "Implemented a caching strategy with stale-while-revalidate patterns for smooth UX",
      "Created a custom date-range picker with preset quick-select options",
      "Added CSV and PDF export functionality for stakeholder reporting",
    ],
    outcomes: [
      "Reduced weekly reporting time from 4 hours to 15 minutes",
      "Executive team adopted the dashboard as the primary decision-making tool",
      "Identified a $12k/month cost saving through unused seat analysis",
      "NPS score increased from 32 to 61 within 3 months of launch",
    ],
  },
  {
    slug: "headless-cms-blog",
    title: "Headless CMS Blog",
    description:
      "A blazing-fast editorial platform using a headless CMS with a custom Next.js frontend and perfect Lighthouse scores.",
    longDescription:
      "Migrated a high-traffic editorial website from WordPress to a modern headless architecture, dramatically improving performance, SEO rankings, and editor experience.",
    image: "/images/project-blog.svg",
    technologies: ["Next.js", "Contentful", "TypeScript", "Tailwind CSS", "Vercel"],
    liveUrl: "https://example.com",
    featured: true,
    category: "Frontend",
    problem:
      "A media company's WordPress site was scoring 35–45 on Lighthouse and losing organic traffic due to Core Web Vitals failures. Editors also struggled with the aging admin interface.",
    solution:
      "Rebuilt the frontend as a static-generated Next.js site backed by Contentful, with ISR for instant content updates without full rebuilds.",
    implementation: [
      "Configured Contentful content models to match the editorial team's workflow",
      "Used Next.js ISR to regenerate pages on content publish with a 60-second stale window",
      "Built a custom rich-text renderer for Contentful's document format",
      "Implemented automated image optimisation with BlurHash placeholders",
      "Added structured data (Article, BreadcrumbList) for enhanced search results",
    ],
    outcomes: [
      "Lighthouse performance score improved from 38 to 97",
      "Organic search traffic increased by 55% within 60 days",
      "Core Web Vitals passed across all pages for the first time",
      "Editorial team reported a 4× improvement in content publishing speed",
    ],
  },
  {
    slug: "devops-pipeline",
    title: "CI/CD Pipeline Automation",
    description:
      "End-to-end CI/CD pipeline with Docker, GitHub Actions, and automated testing for a microservices architecture.",
    longDescription:
      "Designed and implemented a comprehensive DevOps pipeline that automated testing, security scanning, and deployment across staging and production environments.",
    image: "/images/project-devops.svg",
    technologies: ["Docker", "GitHub Actions", "AWS ECS", "Terraform", "Jest", "Playwright"],
    githubUrl: "https://github.com",
    featured: false,
    category: "DevOps",
    problem:
      "A development team was spending 20% of their sprint capacity on manual deployments and environment inconsistencies between staging and production were causing hard-to-reproduce bugs.",
    solution:
      "Containerised the entire application stack with Docker, provisioned infrastructure as code with Terraform, and automated the full release process with GitHub Actions.",
    implementation: [
      "Wrote multi-stage Dockerfiles optimised for minimal image size and layer caching",
      "Provisioned AWS ECS clusters and RDS instances using Terraform modules",
      "Built GitHub Actions workflows for lint, test, build, security scan, and deploy",
      "Configured blue-green deployments to eliminate downtime during releases",
      "Set up Slack notifications for deployment status and test failures",
    ],
    outcomes: [
      "Deployment time reduced from 45 minutes to 8 minutes",
      "Zero environment-related bugs reported in the 6 months post-launch",
      "Development team recovered 20% of sprint capacity previously spent on ops",
      "Mean time to recovery (MTTR) dropped from 2 hours to 12 minutes",
    ],
  },
  {
    slug: "seo-audit-tool",
    title: "SEO Audit Tool",
    description:
      "An automated SEO audit web app that crawls sites, identifies issues, and generates prioritised action plans.",
    longDescription:
      "Built a white-label SEO audit tool used by a digital marketing agency to onboard new clients, crawl their sites, and generate professional reports.",
    image: "/images/project-seo.svg",
    technologies: ["Node.js", "Puppeteer", "React", "PostgreSQL", "Bull Queue"],
    liveUrl: "https://example.com",
    featured: false,
    category: "Full-Stack",
    problem:
      "A marketing agency was manually auditing client websites using a combination of spreadsheets and 6 different paid tools, taking 2 days per client audit.",
    solution:
      "Developed a custom audit platform that automates crawling, analysis, and report generation, reducing audit time to under an hour while producing more comprehensive results.",
    implementation: [
      "Built a Puppeteer-based crawler with configurable depth and rate limiting",
      "Implemented 80+ SEO checks covering technical, on-page, and content factors",
      "Used Bull Queue with Redis to handle concurrent crawl jobs without blocking the UI",
      "Generated branded PDF reports using Puppeteer's print functionality",
      "Integrated Google Search Console API for real keyword performance data",
    ],
    outcomes: [
      "Audit time reduced from 2 days to under 1 hour per client",
      "Agency increased client onboarding capacity by 5×",
      "Reports were cited by clients as a key differentiator in sales calls",
      "Tool identified a critical indexing issue on a major client site, recovering $30k/month in organic revenue",
    ],
  },
];

export const getFeaturedProjects = () => projects.filter((p) => p.featured);
export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
export const getAllTechnologies = () =>
  Array.from(new Set(projects.flatMap((p) => p.technologies))).sort();
export const getAllCategories = () =>
  Array.from(new Set(projects.map((p) => p.category))).sort();
