import { ArrowUpRight } from "lucide-react";
import { publications } from "@/lib/content";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata = {
  title: "Publications",
  description: "Selected publications and presentations by Akshay Jagadeesh.",
};

export default function PublicationsPage() {
  return (
    <main className="bg-paper">
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <SectionHeading eyebrow="Publications" title="Papers, proceedings, and presentations">
          <p>
            Work on visual perception, representational geometry, attention, texture, and comparisons
            between biological and artificial vision systems.
          </p>
        </SectionHeading>
        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {publications.map((publication) => (
            <a
              key={publication.title}
              href={publication.href}
              className="grid gap-4 py-6 transition hover:bg-mist md:grid-cols-[120px_1fr_130px]"
            >
              <p className="text-sm text-ink/55">{publication.year}</p>
              <div>
                <h2 className="text-xl font-medium leading-snug text-ink">{publication.title}</h2>
                <p className="mt-2 text-sm leading-6 text-ink/62">{publication.authors}</p>
              </div>
              <p className="flex items-center gap-2 text-sm text-blue">
                {publication.venue}
                <ArrowUpRight size={16} aria-hidden />
              </p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
