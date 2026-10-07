import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/portfolio";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getSiteConfig();
  const paths = ["", "/experience", "/projects", "/stack", "/apps", "/contact"];
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}
