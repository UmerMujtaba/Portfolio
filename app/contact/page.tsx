import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import Contact from "@/components/Contact";
import { getPortfolio, getSiteConfig } from "@/lib/portfolio";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteConfig();
  return {
    title: "Contact",
    description: `Get in touch with ${site.name}.`,
  };
}

export default async function ContactPage() {
  const data = await getPortfolio();
  return (
    <SiteShell site={data.site}>
      <div className="py-8 md:py-12">
        <Contact site={data.site} />
      </div>
    </SiteShell>
  );
}
