import type { AboutContent } from "@/lib/types";

export default function About({
  location,
  about,
}: {
  location: string;
  about: AboutContent;
}) {
  const [first, second, highlight, ...rest] = about.paragraphs;

  return (
    <section className="border-t border-line py-24">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-12 px-6 md:grid-cols-[0.35fr_0.65fr] md:px-10">
        <div>
          <h2 className="font-display text-2xl font-medium text-ink">About</h2>
          <p className="mt-3 font-mono text-sm text-muted">{location}</p>
        </div>
        <div className="space-y-5 text-lg leading-relaxed text-muted">
          {first && <p>{first}</p>}
          {second && <p>{second}</p>}
          {highlight && (
            <p className="border-l-2 border-amber/60 pl-5 text-ink">{highlight}</p>
          )}
          {rest.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
