// Simple Icons CDN slugs. Omitting the /color suffix serves each icon in its
// official brand color (rather than forcing a flat single color).
const SKILL_ICON_SLUGS: Record<string, string> = {
  "JavaScript": "javascript",
  "TypeScript": "typescript",
  "PHP": "php",
  "React": "react",
  "Next.js": "nextdotjs",
  "Tailwind CSS": "tailwindcss",
  "Node.js": "nodedotjs",
  "Shopify": "shopify",
  "WordPress": "wordpress",
  "Google Analytics": "googleanalytics",
  "Google Search Console": "googlesearchconsole",
  "SEMRush": "semrush",
  "Git": "git",
  "GitHub": "github",
  "VS Code": "visualstudiocode",
  "Cursor": "cursor",
  "Vercel": "vercel",
};

export function skillIconUrl(name: string): string | undefined {
  const slug = SKILL_ICON_SLUGS[name];
  return slug ? `https://cdn.simpleicons.org/${slug}` : undefined;
}
