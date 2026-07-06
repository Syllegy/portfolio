export interface Service {
  title: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    title: "Custom Website Development",
    description:
      "Building websites from the ground up with clean, maintainable code — whether that's a Next.js app, a Shopify store, or a WordPress site.",
    icon: "Code",
  },
  {
    title: "Website Repairs & Bug Fixes",
    description:
      "Diagnosing and resolving broken functionality, layout issues, and performance problems on existing sites.",
    icon: "Wrench",
  },
  {
    title: "Technical SEO",
    description:
      "Auditing and improving site structure, crawlability, Core Web Vitals, and on-page SEO factors that affect search visibility.",
    icon: "Search",
  },
  {
    title: "Performance Optimization",
    description:
      "Improving load times, Lighthouse scores, and real-world user experience through targeted technical improvements.",
    icon: "Zap",
  },
  {
    title: "Shopify Development",
    description:
      "Theme customization, feature development, and storefront improvements for Shopify stores.",
    icon: "ShoppingBag",
  },
  {
    title: "Website Maintenance",
    description:
      "Ongoing support, updates, and improvements so your site stays fast, secure, and up to date.",
    icon: "Settings",
  },
];
