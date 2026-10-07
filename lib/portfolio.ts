import { cache } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { portfolioSeed } from "@/lib/data";
import type { PortfolioData, Project } from "@/lib/types";

export const PORTFOLIO_COLLECTION = "portfolio";
export const PORTFOLIO_DOC = "content";

const PERSONAL_APP_NAMES = new Set(["Fit Hunt", "Kiddu", "Food Ordering App"]);

/** Normalize older Firestore docs that still use a single `projects` + `education` shape. */
function normalize(raw: Record<string, unknown>): PortfolioData {
  const base = { ...portfolioSeed, ...raw } as PortfolioData & {
    education?: unknown;
    projects?: Project[];
    apps?: Project[];
  };

  let projects = Array.isArray(base.projects) ? base.projects : portfolioSeed.projects;
  let apps = Array.isArray(base.apps) ? base.apps : undefined;

  // Legacy: one projects list mixed company + personal
  if (!apps) {
    apps = projects.filter((p) => PERSONAL_APP_NAMES.has(p.name));
    projects = projects.filter((p) => !PERSONAL_APP_NAMES.has(p.name));
    if (projects.length === 0) projects = portfolioSeed.projects;
    if (apps.length === 0) apps = portfolioSeed.apps;
  }

  return {
    site: base.site ?? portfolioSeed.site,
    hero: base.hero ?? portfolioSeed.hero,
    about: base.about ?? portfolioSeed.about,
    skillGroups: base.skillGroups ?? portfolioSeed.skillGroups,
    experience: base.experience ?? portfolioSeed.experience,
    projects,
    apps,
  };
}

/**
 * Loads all portfolio content from Firestore (`portfolio/content`).
 * Falls back to local seed data if the document is missing.
 */
export const getPortfolio = cache(async (): Promise<PortfolioData> => {
  try {
    const snap = await getDoc(doc(db, PORTFOLIO_COLLECTION, PORTFOLIO_DOC));
    if (!snap.exists()) {
      console.warn(
        "[portfolio] Firestore doc portfolio/content not found — using local seed. Run `npm run seed`."
      );
      return portfolioSeed;
    }
    return normalize(snap.data() as Record<string, unknown>);
  } catch (err) {
    console.error("[portfolio] Failed to load from Firestore:", err);
    return portfolioSeed;
  }
});

export async function getSiteConfig() {
  const data = await getPortfolio();
  return data.site;
}
