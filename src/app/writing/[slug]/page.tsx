import { notFound } from "next/navigation";
import { getPost, posts } from "@/lib/content";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return {
    title: post?.title || "Writing",
    description: post?.dek,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="bg-paper">
      <article className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <p className="mb-4 text-xs uppercase tracking-[0.18em] text-clay">{post.date}</p>
        <h1 className="font-serif text-5xl leading-tight text-ink">{post.title}</h1>
        <p className="mt-5 text-xl leading-8 text-ink/65">{post.dek}</p>
        <div className="content mt-10 border-t border-ink/10 pt-10 text-lg text-ink/75">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
