"use client";

import { useEffect, useSyncExternalStore } from "react";

type Palette = {
  id: string;
  name: string;
  swatches: string[];
};

const palettes: Palette[] = [
  {
    id: "warm-herbarium",
    name: "Warm Herbarium",
    swatches: ["#F7F3EA", "#FFFDF7", "#687A45", "#A8B49A", "#C78F67"],
  },
  {
    id: "bluegrass-editorial",
    name: "Bluegrass Editorial",
    swatches: ["#F4F7F3", "#FEFCF5", "#496E82", "#6D7F59", "#D7C6A5"],
  },
  {
    id: "tea-slate",
    name: "Tea + Slate",
    swatches: ["#F3F1E8", "#FCFAF2", "#405D66", "#6F7544", "#B99B6B"],
  },
  {
    id: "misty-coast",
    name: "Misty Coast",
    swatches: ["#F1F6F5", "#FBFCF8", "#517488", "#6D8B7B", "#BBC7A3"],
  },
  {
    id: "black-tea",
    name: "Black Tea",
    swatches: ["#F6F0E4", "#FFFDF7", "#3F573B", "#8A634B", "#3F6473"],
  },
];

const storageKey = "akshay-site-palette-v2";
const defaultPalette = "black-tea";

function isPaletteId(value: string | null): value is string {
  return palettes.some((palette) => palette.id === value);
}

function applyPalette(id: string) {
  document.documentElement.dataset.palette = id;
}

function getSnapshot() {
  const savedPalette = window.localStorage.getItem(storageKey);
  return isPaletteId(savedPalette) ? savedPalette : defaultPalette;
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("palettechange", onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("palettechange", onStoreChange);
  };
}

export function PaletteSwitcher() {
  const selectedPalette = useSyncExternalStore(subscribe, getSnapshot, () => defaultPalette);

  useEffect(() => {
    applyPalette(selectedPalette);
  }, [selectedPalette]);

  function selectPalette(id: string) {
    applyPalette(id);
    window.localStorage.setItem(storageKey, id);
    window.dispatchEvent(new Event("palettechange"));
  }

  return (
    <section className="border-t border-ink/10 px-5 py-5 md:px-7" aria-label="Color palette">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="font-serif text-xl text-ink">Palette</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {palettes.map((palette) => {
            const isSelected = selectedPalette === palette.id;

            return (
              <button
                key={palette.id}
                type="button"
                onClick={() => selectPalette(palette.id)}
                className={`rounded-md border px-3 py-2 text-left transition focus:outline-none focus:ring-2 focus:ring-blue/35 ${
                  isSelected
                    ? "border-moss bg-moss/10 text-ink"
                    : "border-ink/12 bg-paper/68 text-ink/68 hover:border-moss/35 hover:text-ink"
                }`}
                aria-pressed={isSelected}
              >
                <span className="block text-sm font-medium">{palette.name}</span>
                <span className="mt-2 grid grid-cols-5 overflow-hidden rounded-sm border border-ink/10">
                  {palette.swatches.map((swatch) => (
                    <span
                      key={swatch}
                      className="h-5"
                      style={{ backgroundColor: swatch }}
                      aria-hidden
                    />
                  ))}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
