import Link from "next/link";
import { posts } from "@/lib/content";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata = {
  title: "Writing",
  description: "Short reflections and notes by Akshay Jagadeesh.",
};

export default function WritingPage() {
  return (
    <main className="bg-mist">
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <SectionHeading eyebrow="Writing" title="Notes and reflections">
          <p>Short to medium-length pieces. Some will be polished; some will remain useful sketches.</p>
        </SectionHeading>
        <div className="grid gap-4">
          {posts.map((post) => (
            <Link key={post.slug} href={`/writing/${post.slug}`} className="rounded-lg border border-ink/10 bg-paper p-6 transition hover:border-blue/40 hover:shadow-soft">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-md bg-sage/10 px-2 py-1 text-xs text-moss">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mt-4 font-serif text-3xl text-ink">{post.title}</h2>
              <p className="mt-2 text-sm text-ink/50">{post.date}</p>
              <p className="mt-3 max-w-2xl leading-7 text-ink/68">{post.dek}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
