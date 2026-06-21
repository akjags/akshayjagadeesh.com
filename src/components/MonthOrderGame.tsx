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
  const [submitted, setSubmitted] = useState(false);

  const score = orderedImages.filter((image, index) => image.id === index).length;
  const displayName = name.trim() || "You";

  function move(from: number, to: number) {
    if (to < 0 || to >= orderedImages.length || from === to) return;
    setOrderedImages((current) => moveItem(current, from, to));
    setSubmitted(false);
  }

  function resetGame() {
    setOrderedImages(initialImages);
    setSubmitted(false);
    setDragIndex(null);
  }

  return (
    <main className="noise px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <div className="border-b border-ink/12 pb-7">
          <p className="text-xs uppercase tracking-[0.18em] text-moss">Private event game</p>
          <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <h1 className="font-serif text-5xl leading-tight text-ink md:text-6xl">
                Put the photos in order
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/72">
                Enter your name, drag the 12 images into the order you think is correct, then
                submit your guess.
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
            Drag a photo onto another slot to move it there. The number marks its current slot.
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
            <p className="inline-flex items-center gap-2 font-serif text-2xl">
              <Trophy className="text-moss" size={24} strokeWidth={1.6} aria-hidden />
              {displayName} placed {score} {score === 1 ? "image" : "images"} in the correct
              position!
            </p>
          </div>
        ) : null}

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {orderedImages.map((image, index) => {
            const isCorrect = submitted && image.id === index;

            return (
              <article
                key={image.id}
                draggable
                onDragStart={() => setDragIndex(index)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => {
                  if (dragIndex !== null) move(dragIndex, index);
                  setDragIndex(null);
                }}
                onDragEnd={() => setDragIndex(null)}
                className={
                  isCorrect
                    ? "group overflow-hidden rounded-lg border border-moss/60 bg-paper shadow-soft"
                    : "group overflow-hidden rounded-lg border border-ink/12 bg-paper shadow-soft transition hover:-translate-y-0.5 hover:border-moss/30 hover:shadow-lg"
                }
              >
                <div className="relative aspect-[4/5] overflow-hidden border-b border-ink/10">
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    priority={index < 4}
                  />
                  <div className="absolute left-2 top-2 inline-flex h-9 min-w-9 items-center justify-center rounded-md bg-paper/90 px-2 font-serif text-lg text-ink shadow-sm backdrop-blur">
                    {index + 1}
                  </div>
                  <div className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-md bg-paper/90 text-moss shadow-sm backdrop-blur">
                    <GripVertical size={18} aria-hidden />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 px-3 py-2.5">
                  <button
                    type="button"
                    onClick={() => move(index, index - 1)}
                    disabled={index === 0}
                    className="grid h-8 w-8 place-items-center rounded-md border border-ink/12 text-ink/64 transition hover:border-moss/30 hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label={`Move slot ${index + 1} left`}
                  >
                    <ArrowLeft size={16} aria-hidden />
                  </button>
                  <span className="text-xs uppercase tracking-[0.14em] text-ink/50">
                    Slot {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => move(index, index + 1)}
                    disabled={index === orderedImages.length - 1}
                    className="grid h-8 w-8 place-items-center rounded-md border border-ink/12 text-ink/64 transition hover:border-moss/30 hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label={`Move slot ${index + 1} right`}
                  >
                    <ArrowRight size={16} aria-hidden />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
