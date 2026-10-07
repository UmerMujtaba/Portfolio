import type { PortfolioData } from "@/lib/types";
import seed from "../scripts/seed-payload.json";

/** Local seed / fallback. Live site reads from Firestore (`portfolio/content`). */
export const portfolioSeed = seed as PortfolioData;

export type {
  Platform,
  SkillGroup,
  ExperienceItem,
  Project,
  SiteConfig,
  PortfolioData,
} from "@/lib/types";
