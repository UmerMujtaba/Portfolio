import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import Experience from "@/components/Experience";
import { getPortfolio, getSiteConfig } from "@/lib/portfolio";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteConfig();
  return {
    title: "Experience",
    description: `Work experience for ${site.name} — roles and companies.`,
  };
}

export default async function ExperiencePage() {
  const data = await getPortfolio();
  return (
    <SiteShell site={data.site}>
      <Experience experience={data.experience} />
    </SiteShell>
  );
}
