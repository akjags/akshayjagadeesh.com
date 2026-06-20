import Image from "next/image";
import Link from "next/link";
import { Bookmark, Clock3, Menu, Search, UsersRound } from "lucide-react";
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
        description="Enter passcode"
        redirectTo="/recipes"
      />
    );
  }

  const tags = ["All", ...Array.from(new Set(recipes.flatMap((recipe) => recipe.tags))).slice(0, 4)];
  const featured = recipes[0];

  return (
    <main className="noise flex justify-center px-4 py-8">
      <section className="w-full max-w-[390px] overflow-hidden rounded-[24px] border border-ink/15 bg-paper shadow-soft">
        <header className="flex items-center justify-between border-b border-ink/12 px-5 py-5">
          <Menu size={22} strokeWidth={1.7} aria-label="Menu" />
          <h1 className="font-serif text-lg text-ink">Recipe notebook</h1>
          <Search size={22} strokeWidth={1.7} aria-label="Search" />
        </header>

        <div className="px-5 py-5">
          <label className="relative block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/55" size={17} />
            <input
              className="w-full rounded-md border border-ink/18 bg-paper py-3 pl-10 pr-3 text-sm outline-none transition placeholder:text-ink/48 focus:border-moss focus:ring-4 focus:ring-moss/10"
              placeholder="Search recipes"
            />
          </label>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={tag}
                className={
                  index === 0
                    ? "rounded-md bg-moss px-3 py-1.5 text-xs font-medium text-paper"
                    : "rounded-md border border-ink/14 bg-paper px-3 py-1.5 text-xs text-ink/78"
                }
              >
                {tag}
              </span>
            ))}
          </div>

          <Link href={`/recipes/${featured.slug}`} className="mt-5 block">
            <Image
              src={featured.image}
              alt=""
              width={1200}
              height={800}
              priority
              className="aspect-[1.65] w-full rounded-md border border-ink/10 object-cover"
            />
            <div className="mt-3 flex items-start justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl text-ink">{featured.title}</h2>
                <p className="mt-2 flex items-center gap-4 text-xs text-ink/66">
                  <span className="inline-flex items-center gap-1">
                    <Clock3 size={14} aria-hidden />
                    {featured.time}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <UsersRound size={14} aria-hidden />
                    {featured.servings} servings
                  </span>
                </p>
              </div>
              <Bookmark className="mt-2 text-ink" size={20} strokeWidth={1.5} aria-hidden />
            </div>
          </Link>

          <div className="mt-5 border-t border-ink/12 pt-4">
            <h3 className="font-serif text-xl text-ink">Ingredients</h3>
            <ul className="mt-3 space-y-1.5 text-sm leading-5 text-ink/78">
              {featured.ingredients.slice(0, 7).map((ingredient) => (
                <li key={ingredient} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 flex-none rounded-full bg-moss" aria-hidden />
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 border-t border-ink/12 pt-4">
            <h3 className="font-serif text-xl text-ink">Other recipes</h3>
            <div className="mt-3 space-y-3">
              {recipes.slice(1).map((recipe) => (
                <Link
                  key={recipe.slug}
                  href={`/recipes/${recipe.slug}`}
                  className="grid grid-cols-[56px_1fr] gap-3"
                >
                  <Image
                    src={recipe.image}
                    alt=""
                    width={240}
                    height={240}
                    className="aspect-square rounded-md object-cover"
                  />
                  <span>
                    <span className="block text-sm font-medium text-ink">{recipe.title}</span>
                    <span className="block text-xs leading-5 text-ink/56">{recipe.dek}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
