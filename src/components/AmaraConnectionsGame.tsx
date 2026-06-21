"use client";

import { useMemo, useState } from "react";

type ConnectionGroup = {
  id: string;
  title: string;
  words: string[];
  color: string;
};

type ConnectionCard = {
  id: string;
  word: string;
  groupId: string;
};

const groups: ConnectionGroup[] = [
  {
    id: "tiny-seeds",
    title: "Fruits with tiny edible seeds",
    words: ["BLUEBERRY", "KIWI", "RASPBERRY", "STRAWBERRY"],
    color: "bg-[#f4df8f]",
  },
  {
    id: "pet-animals",
    title: "Animals Amara has pet",
    words: ["DOG", "HORSE", "RABBIT", "TURTLE"],
    color: "bg-[#b8d8a8]",
  },
  {
    id: "party",
    title: "___ party",
    words: ["BIRTHDAY", "POOL", "PIZZA", "TEA"],
    color: "bg-[#a8c8df]",
  },
  {
    id: "moves",
    title: 'Things that help with "movement"',
    words: ["PEAR", "PRUNE", "TUMMY TIME", "WALKER"],
    color: "bg-[#d8b2d6]",
  },
];

const startingOrder = [
  "BLUEBERRY",
  "DOG",
  "BIRTHDAY",
  "PEAR",
  "POOL",
  "KIWI",
  "HORSE",
  "PRUNE",
  "TURTLE",
  "PIZZA",
  "RASPBERRY",
  "WALKER",
  "TUMMY TIME",
  "RABBIT",
  "TEA",
  "STRAWBERRY",
];

function buildCards() {
  const cards = groups.flatMap((group) =>
    group.words.map((word) => ({
      id: `${group.id}-${word.toLowerCase()}`,
      word,
      groupId: group.id,
    })),
  );

  return startingOrder.map((word) => {
    const card = cards.find((item) => item.word === word);
    if (!card) throw new Error(`Missing filler card for ${word}`);
    return card;
  });
}

function shuffleCards(cards: ConnectionCard[]) {
  const next = [...cards];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }
  return next;
}

export function AmaraConnectionsGame() {
  const initialCards = useMemo(() => buildCards(), []);
  const [cards, setCards] = useState(initialCards);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [solvedGroupIds, setSolvedGroupIds] = useState<string[]>([]);
  const [mistakesRemaining, setMistakesRemaining] = useState(4);
  const [isShaking, setIsShaking] = useState(false);
  const [message, setMessage] = useState("Select four cards and submit your guess.");

  const solvedGroups = solvedGroupIds
    .map((groupId) => groups.find((group) => group.id === groupId))
    .filter((group): group is ConnectionGroup => Boolean(group));
  const unsolvedCards = cards.filter((card) => !solvedGroupIds.includes(card.groupId));
  const isComplete = solvedGroupIds.length === groups.length;
  const isGameOver = mistakesRemaining === 0 && !isComplete;

  function toggleCard(cardId: string) {
    if (isComplete || isGameOver || isShaking) return;

    setSelectedIds((current) => {
      if (current.includes(cardId)) return current.filter((id) => id !== cardId);
      if (current.length === 4) return current;
      return [...current, cardId];
    });
  }

  function shuffle() {
    if (isComplete || isGameOver || isShaking) return;
    setCards((current) => {
      const solvedCards = current.filter((card) => solvedGroupIds.includes(card.groupId));
      const remainingCards = shuffleCards(current.filter((card) => !solvedGroupIds.includes(card.groupId)));
      return [...solvedCards, ...remainingCards];
    });
    setSelectedIds([]);
    setMessage("Shuffled.");
  }

  function submitGuess() {
    if (selectedIds.length !== 4 || isComplete || isGameOver || isShaking) return;

    const selectedCards = cards.filter((card) => selectedIds.includes(card.id));
    const groupId = selectedCards[0]?.groupId;
    const isCorrect = Boolean(groupId) && selectedCards.every((card) => card.groupId === groupId);

    if (isCorrect && groupId) {
      const group = groups.find((item) => item.id === groupId);
      setSolvedGroupIds((current) => [...current, groupId]);
      setSelectedIds([]);
      setMessage(group ? `Nice! ${group.title}.` : "Correct!");
      return;
    }

    const nextMistakes = Math.max(0, mistakesRemaining - 1);
    setMistakesRemaining(nextMistakes);
    setIsShaking(true);
    setMessage(nextMistakes === 0 ? "No mistakes remaining." : "Not quite. Try another group.");
    window.setTimeout(() => setIsShaking(false), 520);
  }

  return (
    <main className="noise px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-moss">Amara&apos;s first birthday</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          Create four groups of four!
        </h1>

        <div className="mt-8 grid gap-3">
          {solvedGroups.map((group) => (
            <div
              key={group.id}
              className={`${group.color} rounded-lg px-4 py-4 text-center text-ink shadow-soft`}
            >
              <h2 className="text-sm font-black uppercase tracking-[0.14em]">{group.title}</h2>
              <p className="mt-1 text-lg font-semibold">{group.words.join(", ")}</p>
            </div>
          ))}

          <div className={isShaking ? "connections-shake grid grid-cols-4 gap-3" : "grid grid-cols-4 gap-3"}>
            {unsolvedCards.map((card) => {
              const isSelected = selectedIds.includes(card.id);

              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => toggleCard(card.id)}
                  disabled={isComplete || isGameOver || isShaking}
                  className={
                    isSelected
                      ? "flex aspect-[1.75] items-center justify-center rounded-lg bg-[#5f6156] px-2 text-center text-sm font-black uppercase leading-none text-paper transition sm:text-xl md:text-2xl"
                      : "flex aspect-[1.75] items-center justify-center rounded-lg bg-[#e9e9df] px-2 text-center text-sm font-black uppercase leading-none text-ink transition hover:bg-[#deded2] sm:text-xl md:text-2xl"
                  }
                >
                  {card.word}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-6 min-h-6 text-sm text-ink/62">{message}</p>

        <div className="mt-4 flex items-center justify-center gap-3 text-xl text-[#55564d]">
          <span>Mistakes Remaining:</span>
          <span className="flex gap-3" aria-label={`${mistakesRemaining} mistakes remaining`}>
            {Array.from({ length: 4 }).map((_, index) => (
              <span
                key={index}
                className={
                  index < mistakesRemaining
                    ? "h-7 w-7 rounded-full bg-[#55564d]"
                    : "h-7 w-7 rounded-full border border-[#55564d]/35"
                }
                aria-hidden
              />
            ))}
          </span>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={shuffle}
            disabled={isComplete || isGameOver || isShaking}
            className="h-14 rounded-full border-2 border-ink bg-paper px-8 text-xl font-semibold text-ink transition hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:border-ink/20 disabled:text-ink/35 disabled:hover:bg-paper"
          >
            Shuffle
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedIds([]);
              setMessage("Selection cleared.");
            }}
            disabled={selectedIds.length === 0 || isComplete || isGameOver || isShaking}
            className="h-14 rounded-full border-2 border-ink/35 bg-paper px-8 text-xl font-semibold text-ink/55 transition hover:border-ink hover:text-ink disabled:cursor-not-allowed disabled:border-ink/20 disabled:text-ink/30"
          >
            Deselect All
          </button>
          <button
            type="button"
            onClick={submitGuess}
            disabled={selectedIds.length !== 4 || isComplete || isGameOver || isShaking}
            className="h-14 rounded-full border-2 border-ink/35 bg-paper px-8 text-xl font-semibold text-ink/55 transition hover:border-ink hover:text-ink disabled:cursor-not-allowed disabled:border-ink/20 disabled:text-ink/30"
          >
            Submit
          </button>
        </div>

        {isComplete ? (
          <p className="mt-7 font-serif text-3xl text-moss">You solved it!</p>
        ) : null}
        {isGameOver ? (
          <p className="mt-7 font-serif text-3xl text-[#9f4f45]">Game over. Ask Akshay for a hint.</p>
        ) : null}
      </section>
    </main>
  );
}
