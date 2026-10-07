import Hero from "@/components/Hero";
import About from "@/components/About";
import SiteShell from "@/components/SiteShell";
import { getPortfolio } from "@/lib/portfolio";

export const revalidate = 60;

export default async function Home() {
  const data = await getPortfolio();

  return (
    <SiteShell site={data.site}>
      <Hero site={data.site} hero={data.hero} />
      <About location={data.site.location} about={data.about} />
    </SiteShell>
  );
}
