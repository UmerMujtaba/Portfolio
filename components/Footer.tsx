import type { SiteConfig } from "@/lib/types";

export default function Footer({ site }: { site: SiteConfig }) {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-content flex-col items-center gap-3 px-6 text-center md:flex-row md:justify-between md:px-10 md:text-left">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {site.name}.
        </p>
        <div className="flex gap-5 font-mono text-sm text-muted">
          <a href={site.social.github} className="hover:text-ink" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={site.social.linkedin} className="hover:text-ink" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${site.email}`} className="hover:text-ink">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
