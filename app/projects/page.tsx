import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import ProjectList from "@/components/ProjectList";
import { getPortfolio, getSiteConfig } from "@/lib/portfolio";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteConfig();
  return {
    title: "Projects",
    description: `Company projects by ${site.name} — Buzzmi, Storybirds, and more.`,
  };
}

export default async function ProjectsPage() {
  const data = await getPortfolio();
  return (
    <SiteShell site={data.site}>
      <ProjectList
        title="Projects"
        intro="Products shipped under company roles — client and team work."
        projects={data.projects}
        showCompany
      />
    </SiteShell>
  );
}
