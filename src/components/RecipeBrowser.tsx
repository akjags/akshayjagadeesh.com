"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock3, LayoutGrid, Rows3, Search, Sparkles, UsersRound, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { Recipe } from "@/lib/content";

const categoryOrder = [
  "All",
  "Quick",
  "Noodles",
  "Tofu",
  "Tacos",
  "Indian",
  "Thai",
  "Rice",
  "Soups",
  "Pasta",
  "Shortcut",
  "Cookbook",
  "Generated",
];

function matchesCategory(recipe: Recipe, category: string) {
  if (category === "All") return true;
  if (category === "Generated") return recipe.synthesizedByGpt55;
  if (category === "Cookbook") return recipe.source?.toLowerCase().includes("cookbook");

  const needle = category.toLowerCase();
  return (
    recipe.cuisine.toLowerCase().includes(needle) ||
    recipe.tags.some((tag) => tag.toLowerCase().includes(needle))
  );
}

function searchText(recipe: Recipe) {
  return [
    recipe.title,
    recipe.dek,
    recipe.cuisine,
    recipe.tags.join(" "),
    recipe.ingredients.join(" "),
    recipe.steps.join(" "),
    recipe.source ?? "",
  ]
    .join(" ")
    .toLowerCase();
}

export function RecipeBrowser({ recipes }: { recipes: Recipe[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"comfortable" | "compact">("comfortable");

  const filteredRecipes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return recipes.filter((recipe) => {
      const categoryMatch = matchesCategory(recipe, category);
      const queryMatch = !normalizedQuery || searchText(recipe).includes(normalizedQuery);
      return categoryMatch && queryMatch;
    });
  }, [category, query, recipes]);

  const featured = filteredRecipes[0] ?? recipes[0];

  return (
    <main className="noise px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <div className="grid gap-6 border-b border-ink/12 pb-7 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="self-end">
            <p className="text-xs uppercase tracking-[0.18em] text-moss">Private notebook</p>
            <h1 className="mt-3 font-serif text-5xl leading-tight text-ink md:text-6xl">
              Recipes
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/72">
              A searchable, spicy, vegetarian cooking notebook for weeknight staples, family
              favorites, and recipes still being tuned.
            </p>
          </div>

          <Link
            href={`/recipes/${featured.slug}`}
            className="group grid overflow-hidden rounded-lg border border-ink/12 bg-paper shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="relative aspect-[1.65] overflow-hidden">
              <Image
                src={featured.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                priority
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-4 text-paper">
                <p className="text-xs uppercase tracking-[0.16em] text-paper/72">Start here</p>
                <h2 className="mt-1 font-serif text-3xl leading-tight">{featured.title}</h2>
              </div>
            </div>
          </Link>
        </div>

        <div className="sticky top-0 z-10 -mx-4 border-b border-ink/12 bg-paper/88 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-center">
            <label className="relative block md:flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/50"
                size={18}
                aria-hidden
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-11 w-full rounded-md border border-ink/16 bg-paper py-2 pl-10 pr-10 text-sm outline-none transition placeholder:text-ink/45 focus:border-moss focus:ring-4 focus:ring-moss/10"
                placeholder="Search by dish, ingredient, cuisine, or tag"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-ink/55 hover:bg-ink/6 hover:text-ink"
                  aria-label="Clear search"
                >
                  <X size={16} aria-hidden />
                </button>
              ) : null}
            </label>

            <div className="flex gap-2 overflow-x-auto pb-1 md:max-w-[54%]">
              {categoryOrder.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={
                    item === category
                      ? "h-10 flex-none rounded-md bg-moss px-3 text-sm font-medium text-paper"
                      : "h-10 flex-none rounded-md border border-ink/14 bg-paper px-3 text-sm text-ink/72 transition hover:border-moss/45 hover:text-ink"
                  }
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 text-sm text-ink/58 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p>
              Showing {filteredRecipes.length} of {recipes.length} recipes
            </p>
            <p className="hidden sm:block">
              Photos are warm previews; recipes can be tuned after cooking.
            </p>
          </div>

          <div
            className="inline-flex w-fit rounded-lg border border-ink/14 bg-paper p-1"
            aria-label="Recipe card density"
          >
            <button
              type="button"
              onClick={() => setViewMode("comfortable")}
              aria-pressed={viewMode === "comfortable"}
              className={
                viewMode === "comfortable"
                  ? "inline-flex h-9 items-center gap-2 rounded-md bg-moss px-3 text-sm font-medium text-paper"
                  : "inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm text-ink/64 transition hover:bg-ink/6 hover:text-ink"
              }
            >
              <LayoutGrid size={16} aria-hidden />
              <span>Cards</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("compact")}
              aria-pressed={viewMode === "compact"}
              className={
                viewMode === "compact"
                  ? "inline-flex h-9 items-center gap-2 rounded-md bg-moss px-3 text-sm font-medium text-paper"
                  : "inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm text-ink/64 transition hover:bg-ink/6 hover:text-ink"
              }
            >
              <Rows3 size={16} aria-hidden />
              <span>Compact</span>
            </button>
          </div>
        </div>

        <div
          className={
            viewMode === "compact"
              ? "mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6"
              : "mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          }
        >
          {filteredRecipes.map((recipe) => (
            <Link
              key={recipe.slug}
              href={`/recipes/${recipe.slug}`}
              className="group overflow-hidden rounded-lg border border-ink/12 bg-paper shadow-soft transition hover:-translate-y-0.5 hover:border-moss/30 hover:shadow-lg"
            >
              {viewMode === "compact" ? (
                <>
                  <div className="relative aspect-square overflow-hidden border-b border-ink/10">
                    <Image
                      src={recipe.image}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 190px, (min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="px-3 py-2.5">
                    <h2 className="line-clamp-2 min-h-[40px] text-sm font-medium leading-5 text-ink">
                      {recipe.title}
                    </h2>
                  </div>
                </>
              ) : (
                <>
                  <div className="relative aspect-[1.35] overflow-hidden border-b border-ink/10">
                    <Image
                      src={recipe.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                    {recipe.synthesizedByGpt55 ? (
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-paper/90 px-2 py-1 text-xs font-medium text-moss shadow-sm backdrop-blur">
                        <Sparkles size={13} aria-hidden />
                        GPT-5.5 draft
                      </span>
                    ) : null}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-moss">
                        {recipe.cuisine}
                      </p>
                      <p className="text-xs text-ink/52">{recipe.tags[0]}</p>
                    </div>
                    <h2 className="mt-2 font-serif text-2xl leading-tight text-ink">
                      {recipe.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink/68">
                      {recipe.dek}
                    </p>
                    <p className="mt-4 flex flex-wrap items-center gap-4 text-xs text-ink/58">
                      <span className="inline-flex items-center gap-1">
                        <Clock3 size={14} aria-hidden />
                        {recipe.time}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <UsersRound size={14} aria-hidden />
                        {recipe.servings}
                      </span>
                    </p>
                  </div>
                </>
              )}
            </Link>
          ))}
        </div>

        {filteredRecipes.length === 0 ? (
          <div className="mt-10 rounded-lg border border-ink/12 bg-paper px-6 py-10 text-center">
            <h2 className="font-serif text-3xl text-ink">No recipes found</h2>
            <p className="mt-2 text-sm text-ink/64">Try a different ingredient, cuisine, or tag.</p>
          </div>
        ) : null}
      </section>
    </main>
  );
}
