import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import Skills from "@/components/Skills";
import { getPortfolio, getSiteConfig } from "@/lib/portfolio";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteConfig();
  return {
    title: "Stack",
    description: `Tools and technologies used by ${site.name}.`,
  };
}

export default async function StackPage() {
  const data = await getPortfolio();
  return (
    <SiteShell site={data.site}>
      <Skills skillGroups={data.skillGroups} />
    </SiteShell>
  );
}
