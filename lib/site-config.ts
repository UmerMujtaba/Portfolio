// Back-compat shim. Prefer getSiteConfig() / getPortfolio() from @/lib/portfolio.
import { portfolioSeed } from "@/lib/data";

export const siteConfig = portfolioSeed.site;
export type { SiteConfig } from "@/lib/types";
