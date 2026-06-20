import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  FileText,
  HeartPulse,
  MapPin,
  Microscope,
  ShieldCheck,
} from "lucide-react";
import { publications, posts } from "@/lib/content";

const selectedWork = [
  {
    icon: ShieldCheck,
    title: "Beneficial RL",
    body: "Training models for broadly useful behavior that persists under pressure.",
    meta: "OpenAI · 2026",
  },
  {
    icon: HeartPulse,
    title: "AI for health",
    body: "Exploring how AI can accelerate progress in health, medicine, and scientific discovery.",
    meta: "OpenAI · ongoing",
  },
  {
    icon: BrainCircuit,
    title: "Neural computation",
    body: "Using models to connect neural activity with perception and behavior.",
    meta: "Stanford · Harvard",
  },
  {
    icon: Microscope,
    title: "Vision and models",
    body: "Studying where biological and artificial visual systems align and diverge.",
    meta: "PNAS · CCN",
  },
];

export default function Home() {
  const selectedPublications = publications.filter((publication) => publication.selected).slice(0, 5);
  const selectedPosts = posts.slice(0, 5);

  return (
    <main className="noise">
      <section className="grid gap-8 border-b border-ink/12 px-5 py-8 md:grid-cols-[240px_1fr] md:px-7 md:py-10 lg:gap-12">
        <Image
          src="/images/akshay-headshot.jpg"
          alt="Akshay Jagadeesh"
          width={720}
          height={720}
          priority
          className="aspect-square w-full max-w-[280px] border border-ink/8 object-cover md:max-w-none"
        />
        <div className="flex max-w-3xl flex-col justify-center">
          <h1 className="font-serif text-5xl leading-[1.02] text-ink md:text-6xl">
            Akshay Jagadeesh
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-8 text-ink/86">
            I&apos;m a Research Scientist at OpenAI working on AI alignment, AI for health and
            medicine, and the science of intelligent systems. Previously, I was a computational
            neuroscientist studying how human and primate brains represent visual objects.
          </p>
          <p className="mt-8 inline-flex items-center gap-2 text-sm text-moss">
            <MapPin size={18} aria-hidden />
            OpenAI · San Francisco, CA
          </p>
        </div>
      </section>

      <section className="border-b border-ink/12 px-5 py-8 md:px-7">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="font-serif text-3xl text-ink">Selected work</h2>
          <Link
            href="/publications"
            className="inline-flex items-center gap-2 text-sm text-blue hover:text-ink"
          >
            View all
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {selectedWork.map((item) => (
            <article key={item.title} className="min-h-[138px]">
              <item.icon className="mb-4 text-moss" size={28} strokeWidth={1.6} aria-hidden />
              <h3 className="text-base font-medium text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-5 text-ink/78">{item.body}</p>
              <p className="mt-4 text-sm text-ink/56">{item.meta}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-0 md:grid-cols-2">
        <div className="border-b border-ink/12 px-5 py-7 md:border-b-0 md:border-r md:px-7">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="font-serif text-3xl text-ink">Notes</h2>
            <Link
              href="/writing"
              className="inline-flex items-center gap-2 text-sm text-blue hover:text-ink"
            >
              View all
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
          <div className="space-y-4">
            {selectedPosts.map((post) => (
              <Link key={post.slug} href={`/writing/${post.slug}`} className="grid grid-cols-[18px_1fr] gap-3">
                <FileText size={18} className="mt-0.5 text-moss" strokeWidth={1.5} aria-hidden />
                <span>
                  <span className="block text-sm leading-5 text-ink">{post.title}</span>
                  <span className="block text-sm text-ink/52">{post.date}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="px-5 py-7 md:px-7">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="font-serif text-3xl text-ink">Publications</h2>
            <Link
              href="/publications"
              className="inline-flex items-center gap-2 text-sm text-blue hover:text-ink"
            >
              View all
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
          <div className="space-y-4">
            {selectedPublications.map((publication) => (
              <a
                key={publication.title}
                href={publication.href}
                className="grid grid-cols-[18px_1fr] gap-3"
              >
                <FileText size={18} className="mt-0.5 text-moss" strokeWidth={1.5} aria-hidden />
                <span>
                  <span className="block text-sm leading-5 text-ink">{publication.title}</span>
                  <span className="block text-sm text-ink/52">
                    {publication.venue} · {publication.year}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
