import type { Project } from "@/lib/types";

function StatusTag({ status }: { status: Project["status"] }) {
  const styles: Record<Project["status"], string> = {
    "Live on Play Store": "text-teal border-teal/40",
    Award: "text-amber border-amber/40",
    Project: "text-muted border-line",
    Site: "text-teal border-teal/40",
  };
  return (
    <span className={`rounded-sm border px-2 py-0.5 font-mono text-[11px] ${styles[status]}`}>
      {status}
    </span>
  );
}

export default function ProjectList({
  title,
  intro,
  projects,
  showCompany = false,
}: {
  title: string;
  intro?: string;
  projects: Project[];
  showCompany?: boolean;
}) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-content px-6 md:px-10">
        <h1 className="font-display text-3xl font-medium text-ink md:text-4xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-muted">{intro}</p>}

        <div className="mt-12 space-y-4">
          {projects.map((project, i) => (
            <article
              key={project.name}
              className={`grid grid-cols-1 gap-6 border-t border-line py-8 md:grid-cols-12 ${
                i % 2 === 1 ? "md:text-right" : ""
              }`}
            >
              <div className={`md:col-span-4 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <h2 className="font-display text-2xl text-ink">{project.name}</h2>
                {showCompany && project.company && (
                  <p className="mt-1 font-mono text-xs text-teal">{project.company}</p>
                )}
                <p className="mt-2 text-muted">{project.tagline}</p>
                <div className={`mt-4 flex flex-wrap gap-2 ${i % 2 === 1 ? "md:justify-end" : ""}`}>
                  <StatusTag status={project.status} />
                  {project.platforms.map((p) => (
                    <span
                      key={p}
                      className="rounded-sm border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`md:col-span-8 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <ul className={`flex flex-col space-y-2 ${i % 2 === 1 ? "md:items-end" : ""}`}>
                  {project.bullets.map((bullet) => (
                    <li key={bullet} className="max-w-xl leading-relaxed text-muted">
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className={`mt-4 flex flex-wrap gap-2 ${i % 2 === 1 ? "md:justify-end" : ""}`}>
                  {project.stack.map((tech) => (
                    <span key={tech} className="font-mono text-xs text-muted">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
