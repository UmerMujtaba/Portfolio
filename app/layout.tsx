import type { Metadata, Viewport } from "next";
import { getSiteConfig } from "@/lib/portfolio";

// Self-hosted font files (no runtime dependency on Google's font CDN).
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteConfig();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${site.role}`,
      template: `%s — ${site.name}`,
    },
    description: site.description,
    keywords: site.keywords,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    alternates: {
      canonical: site.url,
    },
    openGraph: {
      type: "website",
      url: site.url,
      title: `${site.name} — ${site.role}`,
      description: site.description,
      siteName: site.name,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} — ${site.role}`,
      description: site.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#10151C",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSiteConfig();
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    url: site.url,
    email: `mailto:${site.email}`,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressCountry: "PK",
    },
    sameAs: [site.social.github, site.social.linkedin],
    knowsAbout: [
      "React Native",
      "Flutter",
      "Next.js",
      "TypeScript",
      "Firebase",
      "Mobile App Development",
    ],
  };

  return (
    <html lang="en">
      <body className="font-body bg-bg text-ink antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
