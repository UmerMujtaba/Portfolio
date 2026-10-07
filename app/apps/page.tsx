import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import ProjectList from "@/components/ProjectList";
import { getPortfolio, getSiteConfig } from "@/lib/portfolio";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteConfig();
  return {
    title: "Apps & Sites",
    description: `Personal apps and sites built by ${site.name}.`,
  };
}

export default async function AppsPage() {
  const data = await getPortfolio();
  return (
    <SiteShell site={data.site}>
      <ProjectList
        title="Apps & sites"
        intro="Things I built myself — apps, experiments, and side projects."
        projects={data.apps}
      />
    </SiteShell>
  );
}
