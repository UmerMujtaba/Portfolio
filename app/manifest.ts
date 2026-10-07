import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/portfolio";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const site = await getSiteConfig();
  const parts = site.name.split(" ");
  return {
    name: site.name,
    short_name: parts.length >= 2 ? `${parts[0]} ${parts[1]}` : site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#10151C",
    theme_color: "#10151C",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
