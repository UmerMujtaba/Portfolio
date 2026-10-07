import type { SkillGroup } from "@/lib/types";

export default function Skills({ skillGroups }: { skillGroups: SkillGroup[] }) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-content px-6 md:px-10">
        <h1 className="font-display text-3xl font-medium text-ink md:text-4xl">Stack</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Languages, frameworks, and tools I use to ship mobile and web products.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.label} className="border-t border-line pt-4">
              <h2 className="font-mono text-sm text-teal">{group.label}</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-sm border border-line px-2.5 py-1 text-sm text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
