import Link from "next/link";
import type { HeroContent, SiteConfig } from "@/lib/types";

function DeviceStack() {
  return (
    <div className="relative mx-auto h-[420px] w-[320px] sm:h-[460px] sm:w-[360px]" aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full text-teal/40"
        viewBox="0 0 360 460"
        fill="none"
      >
        <path
          d="M40 380 C 120 300, 90 160, 190 90 C 250 50, 300 60, 320 40"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="3 7"
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute left-1 top-16 w-64 -rotate-3 rounded-md border border-line bg-panel shadow-2xl shadow-black/40 sm:w-72">
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-muted/40" />
          <span className="h-2 w-2 rounded-full bg-muted/40" />
          <span className="h-2 w-2 rounded-full bg-muted/40" />
          <span className="ml-auto font-mono text-[10px] text-muted">Web</span>
        </div>
        <div className="space-y-2 p-4">
          <div className="h-2 w-3/5 rounded-full bg-ink/15" />
          <div className="h-2 w-4/5 rounded-full bg-ink/10" />
          <div className="mt-3 h-14 rounded-sm bg-teal/10" />
        </div>
      </div>

      <div className="absolute right-2 top-6 w-32 rotate-6 rounded-2xl border border-line bg-panel2 shadow-2xl shadow-black/40 sm:w-36">
        <div className="flex items-center justify-between px-3 pt-2">
          <span className="font-mono text-[9px] text-muted">Android</span>
          <span className="h-1.5 w-1.5 rounded-full bg-amber" />
        </div>
        <div className="mx-auto mt-2 h-2 w-10 rounded-full bg-ink/10" />
        <div className="space-y-1.5 p-3">
          <div className="h-8 rounded-md bg-amber/15" />
          <div className="h-1.5 w-4/5 rounded-full bg-ink/10" />
          <div className="h-1.5 w-3/5 rounded-full bg-ink/10" />
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            <div className="h-6 rounded-sm bg-teal/15" />
            <div className="h-6 rounded-sm bg-ink/10" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-10 w-36 -rotate-6 rounded-[1.6rem] border border-line bg-panel shadow-2xl shadow-black/50 sm:left-14 sm:w-40">
        <div className="mx-auto mt-2 h-4 w-16 rounded-full bg-ink/10" />
        <div className="space-y-2 p-3 pt-4">
          <div className="h-10 rounded-lg bg-teal/20" />
          <div className="h-1.5 w-full rounded-full bg-ink/10" />
          <div className="h-1.5 w-2/3 rounded-full bg-ink/10" />
          <div className="mt-1 flex gap-1">
            <div className="h-5 flex-1 rounded-sm bg-amber/20" />
            <div className="h-5 flex-1 rounded-sm bg-ink/10" />
          </div>
        </div>
        <div className="mx-auto mb-2 mt-1 h-1 w-8 rounded-full bg-ink/20" />
        <span className="absolute -right-1 top-8 rotate-90 font-mono text-[9px] text-muted">
          iOS
        </span>
      </div>
    </div>
  );
}

export default function Hero({
  site,
  hero,
}: {
  site: SiteConfig;
  hero: HeroContent;
}) {
  return (
    <section className="relative overflow-hidden pb-20 pt-12 md:pb-28 md:pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(85,200,184,0.08),transparent_50%),radial-gradient(ellipse_at_90%_20%,rgba(227,163,78,0.07),transparent_45%)]" />
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-16 px-6 md:grid-cols-[1.1fr_0.9fr] md:px-10">
        <div>
          <p className="font-mono text-sm text-teal">{site.shortRole}</p>
          <h1 className="mt-4 text-balance font-display text-4xl font-medium leading-[1.1] text-ink sm:text-5xl md:text-[3.4rem]">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            {hero.supporting}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/projects"
              className="rounded-sm bg-amber px-6 py-3 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
            >
              See projects
            </Link>
            <Link
              href="/contact"
              className="rounded-sm border border-line px-6 py-3 text-sm text-ink transition-colors hover:border-teal hover:text-teal"
            >
              Get in touch
            </Link>
          </div>
          <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6">
            {hero.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-mono text-2xl text-ink">{stat.value}</dt>
                <dd className="mt-1 text-sm text-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <DeviceStack />
      </div>
    </section>
  );
}
