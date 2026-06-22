"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, GripVertical, RotateCcw, Send, Trophy } from "lucide-react";
import { useMemo, useState } from "react";

type GameImage = {
  id: number;
  src: string;
};

const images: GameImage[] = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  src: `/images/events/month-game/month-${String(index).padStart(2, "0")}.jpg`,
}));

const ageLabels = [
  "Newborn",
  "1 month",
  "2 months",
  "3 months",
  "4 months",
  "5 months",
  "6 months",
  "7 months",
  "8 months",
  "9 months",
  "10 months",
  "11 months",
];

const startingOrder = [4, 9, 1, 7, 11, 2, 6, 0, 10, 3, 8, 5];

function moveItem(list: GameImage[], from: number, to: number) {
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export function MonthOrderGame() {
  const initialImages = useMemo(() => startingOrder.map((id) => images[id]), []);
  const [name, setName] = useState("");
  const [orderedImages, setOrderedImages] = useState(initialImages);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const score = orderedImages.filter((image, index) => image.id === index).length;
  const displayName = name.trim() || "You";

  function move(from: number, to: number) {
    if (to < 0 || to >= orderedImages.length || from === to) return;
    setOrderedImages((current) => moveItem(current, from, to));
    setSelectedIndex(null);
    setSubmitted(false);
  }

  function selectOrMove(index: number) {
    if (selectedIndex === null) {
      setSelectedIndex(index);
      return;
    }

    if (selectedIndex === index) {
      setSelectedIndex(null);
      return;
    }

    move(selectedIndex, index);
  }

  function resetGame() {
    setOrderedImages(initialImages);
    setSubmitted(false);
    setDragIndex(null);
    setSelectedIndex(null);
  }

  return (
    <main className="noise px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="border-b border-ink/12 pb-7">
          <p className="text-xs uppercase tracking-[0.18em] text-moss">Private event game</p>
          <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <h1 className="font-serif text-5xl leading-tight text-ink md:text-6xl">
                Put the photos in order
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/72">
                Enter your name, drag the 12 photos into age order, then submit your guess.
              </p>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-ink/72">Your name</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 h-12 w-full rounded-md border border-ink/16 bg-paper px-4 text-base text-ink outline-none transition placeholder:text-ink/40 focus:border-moss focus:ring-4 focus:ring-moss/10"
                placeholder="Name"
              />
            </label>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink/58">
            On phones, tap one photo, then tap the age slot where it belongs. You can also drag
            photos or use the arrows.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={resetGame}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-ink/14 bg-paper px-3 text-sm text-ink/72 transition hover:border-moss/35 hover:text-ink"
            >
              <RotateCcw size={16} aria-hidden />
              Reset
            </button>
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="inline-flex h-10 items-center gap-2 rounded-md bg-moss px-4 text-sm font-medium text-paper transition hover:bg-moss/90"
            >
              <Send size={16} aria-hidden />
              Submit
            </button>
          </div>
        </div>

        {submitted ? (
          <div className="mt-5 rounded-lg border border-moss/25 bg-[#eef1df] px-5 py-4 text-ink shadow-soft">
            <p className="inline-flex items-center gap-2 font-serif text-2xl leading-tight">
              <Trophy className="text-moss" size={24} strokeWidth={1.6} aria-hidden />
              {score === orderedImages.length
                ? `${displayName} placed all 12 images in the correct position. You win!`
                : `${displayName} placed ${score} out of 12 images in the correct position. Try again!`}
            </p>
            {score < orderedImages.length ? (
              <p className="mt-2 text-sm text-ink/68">
                Green cards are correct. Red cards are in the wrong age slot.
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
          {orderedImages.map((image, index) => {
            const isCorrect = submitted && image.id === index;
            const isWrong = submitted && image.id !== index;
            const isSelected = selectedIndex === index;

            return (
              <article
                key={image.id}
                draggable
                onDragStart={() => {
                  setDragIndex(index);
                  setSelectedIndex(null);
                }}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => {
                  if (dragIndex !== null) move(dragIndex, index);
                  setDragIndex(null);
                }}
                onDragEnd={() => setDragIndex(null)}
                className={
                  isCorrect
                    ? "group overflow-hidden rounded-lg border border-moss/60 bg-paper shadow-soft"
                    : isWrong
                      ? "group overflow-hidden rounded-lg border border-[#b66b5f] bg-[#fff7f3] shadow-soft"
                    : isSelected
                      ? "group overflow-hidden rounded-lg border border-blue/45 bg-paper shadow-soft ring-4 ring-blue/12"
                      : "group overflow-hidden rounded-lg border border-ink/12 bg-paper shadow-soft transition hover:-translate-y-0.5 hover:border-moss/30 hover:shadow-lg"
                }
              >
                <button
                  type="button"
                  onClick={() => selectOrMove(index)}
                  className="relative block aspect-[4/5] w-full overflow-hidden border-b border-ink/10 text-left"
                  aria-label={
                    isSelected
                      ? `${ageLabels[index]} selected`
                      : `Select photo in ${ageLabels[index]} slot`
                  }
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 16vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    priority={index < 6}
                  />
                </button>

                <div className="px-2 py-2">
                  <div className="flex min-h-7 items-center justify-between gap-2">
                    <span className="text-sm font-medium text-ink">{ageLabels[index]}</span>
                    {submitted ? (
                      <span
                        className={
                          isCorrect
                            ? "rounded-md bg-moss/12 px-2 py-1 text-xs font-medium text-moss"
                            : "rounded-md bg-[#9f4f45]/10 px-2 py-1 text-xs font-medium text-[#9f4f45]"
                        }
                      >
                        {isCorrect ? "Correct" : "Wrong"}
                      </span>
                    ) : isSelected ? (
                      <span className="rounded-md bg-blue/10 px-2 py-1 text-xs font-medium text-blue">
                        Selected
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => move(index, index - 1)}
                      disabled={index === 0}
                      className="grid h-9 w-9 place-items-center rounded-md border border-ink/12 text-ink/64 transition hover:border-moss/30 hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
                      aria-label={`Move ${ageLabels[index]} slot left`}
                    >
                      <ArrowLeft size={15} aria-hidden />
                    </button>
                    <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.1em] text-ink/45">
                      <GripVertical size={14} aria-hidden />
                      Drag
                    </span>
                    <button
                      type="button"
                      onClick={() => move(index, index + 1)}
                      disabled={index === orderedImages.length - 1}
                      className="grid h-9 w-9 place-items-center rounded-md border border-ink/12 text-ink/64 transition hover:border-moss/30 hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
                      aria-label={`Move ${ageLabels[index]} slot right`}
                    >
                      <ArrowRight size={15} aria-hidden />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
