import Image from "next/image";
import { notFound } from "next/navigation";
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
        description="Enter the shared passcode to view this recipe."
        redirectTo={`/recipes/${slug}`}
      />
    );
  }

  const recipe = getRecipe(slug);
  if (!recipe) notFound();

  return (
    <main className="bg-paper">
      <article className="mx-auto max-w-6xl px-5 py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-[0.95fr_1.05fr]">
          <Image src={recipe.image} alt="" width={1200} height={900} className="rounded-lg border border-ink/10 object-cover shadow-soft" />
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-clay">{recipe.cuisine} · {recipe.time} · {recipe.servings} servings</p>
            <h1 className="font-serif text-5xl leading-tight text-ink">{recipe.title}</h1>
            <p className="mt-5 text-lg leading-8 text-ink/68">{recipe.dek}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-sage/10 px-3 py-1.5 text-sm text-moss">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 grid gap-10 border-t border-ink/10 pt-10 md:grid-cols-[0.8fr_1.2fr]">
          <section>
            <h2 className="font-serif text-3xl text-ink">Ingredients</h2>
            <ul className="mt-5 space-y-3 text-ink/72">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient} className="border-b border-ink/10 pb-3">{ingredient}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-serif text-3xl text-ink">Steps</h2>
            <ol className="mt-5 space-y-4">
              {recipe.steps.map((step, index) => (
                <li key={step} className="grid grid-cols-[36px_1fr] gap-4 text-ink/74">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-flax text-sm text-ink">{index + 1}</span>
                  <span className="leading-7">{step}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </article>
    </main>
  );
}
