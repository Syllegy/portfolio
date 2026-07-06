import type { MetadataRoute } from "next";
import { personal } from "@/data/personal";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${personal.domain}/sitemap.xml`,
  };
}
