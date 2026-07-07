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
  "Cursor": "cursor",
  "Vercel": "vercel",
};

// Simple Icons permanently removed the VS Code icon (Microsoft trademark
// dispute — see simple-icons/simple-icons#10019), so no CDN built on that
// library can serve it. Self-hosted here instead so it can't go 404 again.
const LOCAL_ICONS: Record<string, string> = {
  "VS Code": "/skill-icons/vscode.svg",
};

export function skillIconUrl(name: string): string | undefined {
  if (LOCAL_ICONS[name]) return LOCAL_ICONS[name];
  const slug = SKILL_ICON_SLUGS[name];
  return slug ? `https://cdn.simpleicons.org/${slug}` : undefined;
}
