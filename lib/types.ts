export type Platform = "iOS" | "Android" | "Web";

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  current?: boolean;
  summary?: string;
  work: {
    project: string;
    stack: string;
    platforms: Platform[];
    bullets: string[];
  }[];
}

export interface Project {
  name: string;
  tagline: string;
  stack: string[];
  platforms: Platform[];
  bullets: string[];
  link?: string;
  /** Company the work was done under (Projects page). */
  company?: string;
  status: "Live on Play Store" | "Project" | "Award" | "Site";
}

export interface SiteConfig {
  name: string;
  role: string;
  shortRole: string;
  url: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  social: {
    github: string;
    linkedin: string;
  };
  keywords: string[];
  ogImage: string;
}

export interface HeroContent {
  headline: string;
  supporting: string;
  stats: { value: string; label: string }[];
}

export interface AboutContent {
  paragraphs: string[];
}

/** Single Firestore document shape: portfolio/content */
export interface PortfolioData {
  site: SiteConfig;
  hero: HeroContent;
  about: AboutContent;
  skillGroups: SkillGroup[];
  experience: ExperienceItem[];
  /** Company / client work (Buzzmi, Storybirds, …) */
  projects: Project[];
  /** Personal apps & sites (Fit Hunt, Kiddu, …) */
  apps: Project[];
}
