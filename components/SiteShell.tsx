import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { SiteConfig } from "@/lib/types";

export default function SiteShell({
  site,
  children,
}: {
  site: SiteConfig;
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav email={site.email} />
      <main className="min-h-screen pt-16">{children}</main>
      <Footer site={site} />
    </>
  );
}
