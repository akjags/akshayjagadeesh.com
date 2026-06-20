import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { PasscodeGate } from "@/components/PasscodeGate";
import { recipes } from "@/lib/content";
import { isUnlocked } from "@/lib/auth";

export const metadata = {
  title: "Recipe Notebook",
  description: "Private recipe notebook.",
  robots: { index: false, follow: false },
};

export default async function RecipesPage() {
  if (!(await isUnlocked())) {
    return (
      <PasscodeGate
        title="Recipe notebook"
        description="Recipes are unlisted and lightly protected for family use."
        redirectTo="/recipes"
      />
    );
  }

  const tags = Array.from(new Set(recipes.flatMap((recipe) => recipe.tags))).sort();

  return (
    <main className="bg-mist">
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-moss">Private</p>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-serif text-5xl text-ink">Recipe notebook</h1>
            <p className="mt-4 max-w-2xl leading-7 text-ink/68">
              A searchable, image-friendly recipe index. For now, add recipes by editing
              <span className="font-mono text-sm"> src/lib/content.ts</span>; this can later grow
              into a private editor.
            </p>
          </div>
          <label className="relative block max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/35" size={18} />
            <input
              className="w-full rounded-md border border-ink/12 bg-paper py-3 pl-10 pr-3 text-sm outline-none focus:border-blue focus:ring-4 focus:ring-blue/10"
              placeholder="Search recipes"
            />
          </label>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded-md bg-sage/10 px-3 py-1.5 text-sm text-moss">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {recipes.map((recipe) => (
            <Link key={recipe.slug} href={`/recipes/${recipe.slug}`} className="overflow-hidden rounded-lg border border-ink/10 bg-paper transition hover:border-blue/40 hover:shadow-soft">
              <Image src={recipe.image} alt="" width={1200} height={800} className="aspect-[4/3] w-full object-cover" />
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.14em] text-clay">{recipe.cuisine} · {recipe.time}</p>
                <h2 className="mt-3 font-serif text-2xl text-ink">{recipe.title}</h2>
                <p className="mt-2 text-sm leading-6 text-ink/65">{recipe.dek}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
