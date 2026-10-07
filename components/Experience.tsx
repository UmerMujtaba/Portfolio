import type { ExperienceItem } from "@/lib/types";

export default function Experience({ experience }: { experience: ExperienceItem[] }) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-content px-6 md:px-10">
        <h1 className="font-display text-3xl font-medium text-ink md:text-4xl">Experience</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Roles and companies. Product work shipped under these teams lives on the Projects page.
        </p>

        <div className="mt-12 space-y-10">
          {experience.map((job) => (
            <div
              key={job.company}
              className="grid grid-cols-1 gap-4 border-t border-line pt-8 md:grid-cols-[0.35fr_0.65fr]"
            >
              <div>
                <h2 className="font-display text-xl text-ink">{job.company}</h2>
                <p className="mt-1 text-muted">{job.role}</p>
                <p className="mt-3 font-mono text-xs text-muted">
                  {job.start} – {job.current ? "Present" : job.end}
                </p>
                <p className="font-mono text-xs text-muted">{job.location}</p>
              </div>
              <div className="space-y-4">
                {job.summary && <p className="leading-relaxed text-muted">{job.summary}</p>}
                {job.work?.length > 0 && (
                  <ul className="space-y-3">
                    {job.work.map((item) => (
                      <li key={item.project}>
                        <p className="font-medium text-ink">{item.project}</p>
                        <p className="mt-1 font-mono text-xs text-teal">{item.stack}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
