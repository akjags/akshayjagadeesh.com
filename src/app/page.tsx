import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Brain, Mail, Sprout } from "lucide-react";
import { publications, posts } from "@/lib/content";
import { SectionHeading } from "@/components/SectionHeading";

export default function Home() {
  const selected = publications.filter((publication) => publication.selected).slice(0, 3);

  return (
    <main>
      <section className="noise border-b border-ink/10">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-24">
          <div className="flex flex-col justify-between gap-12">
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.18em] text-moss">
                Neuroscience · Vision · Models
              </p>
              <h1 className="max-w-3xl font-serif text-5xl leading-[0.96] text-ink md:text-7xl">
                I study how brains and models make sense of visual worlds.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-ink/72">
                I am a postdoctoral research scientist at Harvard Medical School in Margaret
                Livingstone&apos;s lab. My work asks how visual cortex represents sensory structure,
                how attention changes those representations, and where human perception diverges
                from modern computer vision systems.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link className="rounded-md bg-ink px-4 py-3 text-sm font-medium text-white transition hover:bg-moss" href="/publications">
                View publications
              </Link>
              <Link className="rounded-md border border-ink/15 px-4 py-3 text-sm font-medium text-ink transition hover:border-blue hover:text-blue" href="/writing">
                Read notes
              </Link>
            </div>
          </div>
          <div className="self-end">
            <div className="overflow-hidden rounded-lg border border-ink/10 bg-paper shadow-soft">
              <Image
                src="/images/akshay-headshot.jpg"
                alt="Akshay Jagadeesh"
                width={1600}
                height={900}
                priority
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="grid grid-cols-3 border-t border-ink/10 text-sm">
                {[
                  ["Current", "Harvard Medical School"],
                  ["Training", "Stanford PhD"],
                  ["Before", "UC Berkeley"],
                ].map(([label, value]) => (
                  <div key={label} className="border-r border-ink/10 p-4 last:border-r-0">
                    <p className="text-xs uppercase tracking-[0.14em] text-ink/45">{label}</p>
                    <p className="mt-2 leading-5 text-ink/78">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <SectionHeading eyebrow="Selected work" title="Recent questions and papers">
            <p>
              I use psychophysics, fMRI, electrophysiology, and computational modeling to study the
              geometry of visual representations and the computations that make them useful.
            </p>
          </SectionHeading>
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {selected.map((publication) => (
              <a
                key={publication.title}
                href={publication.href}
                className="grid gap-4 py-6 transition hover:bg-mist/70 md:grid-cols-[120px_1fr_100px]"
              >
                <p className="text-sm text-ink/55">{publication.year}</p>
                <div>
                  <h3 className="text-xl font-medium leading-snug text-ink">{publication.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/62">{publication.authors}</p>
                </div>
                <p className="flex items-center gap-2 text-sm text-blue">
                  {publication.venue}
                  <ArrowUpRight size={16} aria-hidden />
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-flax/35">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-3">
          {[
            {
              icon: Brain,
              title: "Visual representations",
              body: "How sensory inputs become usable structure for perception and behavior.",
            },
            {
              icon: Sprout,
              title: "Attention and readout",
              body: "How task demands shape what the brain extracts from visual cortex.",
            },
            {
              icon: BookOpen,
              title: "Human-model gaps",
              body: "How similarities and failures in neural networks can sharpen questions about minds.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-ink/10 bg-paper p-5">
              <item.icon className="mb-5 text-moss" size={24} aria-hidden />
              <h3 className="font-serif text-2xl text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/65">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading eyebrow="Notes" title="Short reflections">
            <p>
              A quieter place for ideas that are too informal for papers but too useful to leave in
              a notebook.
            </p>
          </SectionHeading>
          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/writing/${post.slug}`}
                className="block rounded-lg border border-ink/10 bg-paper p-5 transition hover:border-blue/40 hover:shadow-soft"
              >
                <p className="text-xs uppercase tracking-[0.14em] text-clay">{post.date}</p>
                <h3 className="mt-3 font-serif text-2xl text-ink">{post.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/65">{post.dek}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-14 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-moss">Contact</p>
            <h2 className="mt-3 font-serif text-3xl text-ink">Ideas, papers, collaborations, hello.</h2>
          </div>
          <a
            href="mailto:akjags@gmail.com"
            className="inline-flex w-fit items-center gap-2 rounded-md border border-ink/15 px-4 py-3 text-sm font-medium transition hover:border-blue hover:text-blue"
          >
            <Mail size={16} aria-hidden />
            Send email
          </a>
        </div>
      </section>
    </main>
  );
}
