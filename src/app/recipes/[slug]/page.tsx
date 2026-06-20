import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Bookmark, Clock3, UsersRound } from "lucide-react";
import { PasscodeGate } from "@/components/PasscodeGate";
import { getRecipe, recipes } from "@/lib/content";
import { isUnlocked } from "@/lib/auth";

export const metadata = {
  title: "Recipe",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!(await isUnlocked())) {
    return (
      <PasscodeGate
        title="Recipe notebook"
        description="Enter passcode"
        redirectTo={`/recipes/${slug}`}
      />
    );
  }

  const recipe = getRecipe(slug);
  if (!recipe) notFound();

  return (
    <main className="noise flex justify-center px-4 py-8">
      <article className="w-full max-w-[720px] overflow-hidden rounded-[24px] border border-ink/15 bg-paper shadow-soft">
        <header className="flex items-center justify-between border-b border-ink/12 px-5 py-5">
          <Link href="/recipes" className="inline-flex items-center gap-2 text-sm text-ink/72 hover:text-ink">
            <ArrowLeft size={18} aria-hidden />
            Recipes
          </Link>
          <Bookmark size={20} strokeWidth={1.5} aria-hidden />
        </header>

        <div className="grid gap-6 px-5 py-5 md:grid-cols-[0.85fr_1fr] md:p-7">
          <Image
            src={recipe.image}
            alt=""
            width={1200}
            height={900}
            priority
            className="aspect-[4/3] w-full rounded-md border border-ink/10 object-cover"
          />
          <div className="self-center">
            <p className="text-xs uppercase tracking-[0.16em] text-moss">{recipe.cuisine}</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-ink">{recipe.title}</h1>
            <p className="mt-4 text-base leading-7 text-ink/72">{recipe.dek}</p>
            <p className="mt-5 flex flex-wrap items-center gap-4 text-sm text-ink/62">
              <span className="inline-flex items-center gap-1.5">
                <Clock3 size={15} aria-hidden />
                {recipe.time}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <UsersRound size={15} aria-hidden />
                {recipe.servings} servings
              </span>
            </p>
          </div>
        </div>

        <div className="grid gap-0 border-t border-ink/12 md:grid-cols-[0.8fr_1.2fr]">
          <section className="border-b border-ink/12 px-5 py-6 md:border-b-0 md:border-r md:px-7">
            <h2 className="font-serif text-2xl text-ink">Ingredients</h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-ink/76">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient} className="flex gap-2">
                  <span className="mt-2.5 h-1 w-1 flex-none rounded-full bg-moss" aria-hidden />
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="px-5 py-6 md:px-7">
            <h2 className="font-serif text-2xl text-ink">Steps</h2>
            <ol className="mt-4 space-y-3">
              {recipe.steps.map((step, index) => (
                <li key={step} className="grid grid-cols-[24px_1fr] gap-3 text-sm leading-6 text-ink/76">
                  <span className="font-serif text-lg text-moss">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </article>
    </main>
  );
}
