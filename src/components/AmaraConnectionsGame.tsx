"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";

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

type LeaderboardEntry = {
  id: string;
  name: string;
  mistakes: number;
  durationMs: number;
  submittedAt: string;
};

const groups: ConnectionGroup[] = [
  {
    id: "tiny-seeds",
    title: "Fruits that Amara loves to eat",
    words: ["BLUEBERRY", "KIWI", "RASPBERRY", "STRAWBERRY"],
    color: "bg-[#f4df8f]",
  },
  {
    id: "seen-animals",
    title: "Animals Amara has seen",
    words: ["DOG", "CHICKEN", "RABBIT", "TURTLE"],
    color: "bg-[#b8d8a8]",
  },
  {
    id: "water",
    title: "Forms of water that Amara loves",
    words: ["DRINKING", "OCEAN", "POOL", "BATH"],
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
  "DRINKING",
  "PEAR",
  "POOL",
  "KIWI",
  "CHICKEN",
  "PRUNE",
  "TURTLE",
  "OCEAN",
  "RASPBERRY",
  "WALKER",
  "TUMMY TIME",
  "RABBIT",
  "BATH",
  "STRAWBERRY",
];

const leaderboardEndpoint = "/api/amara-connections-leaderboard";
const localLeaderboardKey = "amara-connections-leaderboard";

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

function sortLeaderboard(entries: LeaderboardEntry[]) {
  return [...entries].sort((a, b) => a.mistakes - b.mistakes || a.durationMs - b.durationMs);
}

function formatTime(durationMs: number) {
  const totalSeconds = Math.max(0, Math.floor(durationMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function readLocalLeaderboard() {
  try {
    const stored = window.localStorage.getItem(localLeaderboardKey);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as LeaderboardEntry[];
    return Array.isArray(parsed) ? sortLeaderboard(parsed) : [];
  } catch {
    return [];
  }
}

function writeLocalLeaderboard(entries: LeaderboardEntry[]) {
  window.localStorage.setItem(localLeaderboardKey, JSON.stringify(sortLeaderboard(entries).slice(0, 100)));
}

export function AmaraConnectionsGame() {
  const initialCards = useMemo(() => buildCards(), []);
  const [cards, setCards] = useState(initialCards);
  const [nameInput, setNameInput] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [solvedGroupIds, setSolvedGroupIds] = useState<string[]>([]);
  const [errors, setErrors] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [message, setMessage] = useState("Select four cards and submit your guess.");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [leaderboardStatus, setLeaderboardStatus] = useState("Leaderboard will appear after you solve it.");
  const [hasSubmittedScore, setHasSubmittedScore] = useState(false);

  const solvedGroups = solvedGroupIds
    .map((groupId) => groups.find((group) => group.id === groupId))
    .filter((group): group is ConnectionGroup => Boolean(group));
  const unsolvedCards = cards.filter((card) => !solvedGroupIds.includes(card.groupId));
  const isComplete = solvedGroupIds.length === groups.length;

  useEffect(() => {
    if (!startedAt || isComplete) return;

    const timer = window.setInterval(() => {
      setElapsedMs(Date.now() - startedAt);
    }, 250);

    return () => window.clearInterval(timer);
  }, [isComplete, startedAt]);

  function startGame(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = nameInput.trim();
    if (!trimmedName) return;

    setPlayerName(trimmedName.slice(0, 40));
    setStartedAt(Date.now());
    setElapsedMs(0);
  }

  async function saveScore(completionTime: number, finalMistakesMade: number) {
    const entry: LeaderboardEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: playerName,
      mistakes: finalMistakesMade,
      durationMs: completionTime,
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(leaderboardEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });

      if (response.ok) {
        const payload = (await response.json()) as { entries?: LeaderboardEntry[] };
        setLeaderboard(sortLeaderboard(payload.entries ?? [entry]));
        setLeaderboardStatus("Leaderboard");
        return;
      }
    } catch {
      // Fall back to local storage below.
    }

    const localEntries = sortLeaderboard([...readLocalLeaderboard(), entry]).slice(0, 100);
    writeLocalLeaderboard(localEntries);
    setLeaderboard(localEntries);
    setLeaderboardStatus("Leaderboard for this browser");
  }

  function toggleCard(cardId: string) {
    if (isComplete || isShaking) return;

    setSelectedIds((current) => {
      if (current.includes(cardId)) return current.filter((id) => id !== cardId);
      if (current.length === 4) return current;
      return [...current, cardId];
    });
  }

  function shuffle() {
    if (isComplete || isShaking) return;
    setCards((current) => {
      const solvedCards = current.filter((card) => solvedGroupIds.includes(card.groupId));
      const remainingCards = shuffleCards(current.filter((card) => !solvedGroupIds.includes(card.groupId)));
      return [...solvedCards, ...remainingCards];
    });
    setSelectedIds([]);
    setMessage("Shuffled.");
  }

  function submitGuess() {
    if (selectedIds.length !== 4 || isComplete || isShaking) return;

    const selectedCards = cards.filter((card) => selectedIds.includes(card.id));
    const groupId = selectedCards[0]?.groupId;
    const isCorrect = Boolean(groupId) && selectedCards.every((card) => card.groupId === groupId);

    if (isCorrect && groupId) {
      const group = groups.find((item) => item.id === groupId);
      const nextSolvedGroupIds = [...solvedGroupIds, groupId];
      setSolvedGroupIds(nextSolvedGroupIds);
      setSelectedIds([]);
      setMessage(group ? `Nice! ${group.title}.` : "Correct!");

      if (startedAt && !hasSubmittedScore && nextSolvedGroupIds.length === groups.length) {
        const completionTime = Date.now() - startedAt;
        setElapsedMs(completionTime);
        setHasSubmittedScore(true);
        setLeaderboardStatus("Saving score...");
        void saveScore(completionTime, errors);
      }

      return;
    }

    const nextErrors = errors + 1;
    setErrors(nextErrors);
    setIsShaking(true);
    setMessage("Not quite. Try another group.");
    window.setTimeout(() => setIsShaking(false), 520);
  }

  if (!startedAt) {
    return (
      <main className="noise px-4 py-8 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-xl text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-moss">
            Amara&apos;s first birthday
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Amara Connections
          </h1>
          <p className="mt-4 text-lg leading-8 text-ink/72">
            Enter your name to start the timer and play.
          </p>
          <form onSubmit={startGame} className="mt-8 rounded-lg border border-ink/12 bg-paper p-5 shadow-soft">
            <label className="block text-left">
              <span className="text-sm font-medium text-ink/72">Name</span>
              <input
                value={nameInput}
                onChange={(event) => setNameInput(event.target.value)}
                className="mt-2 h-12 w-full rounded-md border border-ink/16 bg-paper px-4 text-base text-ink outline-none transition placeholder:text-ink/40 focus:border-moss focus:ring-4 focus:ring-moss/10"
                placeholder="Your name"
                autoFocus
              />
            </label>
            <button
              type="submit"
              disabled={!nameInput.trim()}
              className="mt-5 h-12 w-full rounded-md bg-moss px-4 text-base font-medium text-paper transition hover:bg-moss/90 disabled:cursor-not-allowed disabled:bg-moss/35"
            >
              Start
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="noise px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-moss">Amara&apos;s first birthday</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          Create four groups of four!
        </h1>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm text-ink/62">
          <span className="rounded-full border border-ink/12 bg-paper px-4 py-2">
            Player: <span className="font-medium text-ink">{playerName}</span>
          </span>
          <span className="rounded-full border border-ink/12 bg-paper px-4 py-2">
            Time: <span className="font-medium text-ink">{formatTime(elapsedMs)}</span>
          </span>
          <span className="rounded-full border border-ink/12 bg-paper px-4 py-2">
            Errors: <span className="font-medium text-ink">{errors}</span>
          </span>
        </div>

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
                  disabled={isComplete || isShaking}
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
          <span>Errors:</span>
          <span
            className="inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-[#55564d] px-3 font-semibold text-paper"
            aria-label={`${errors} errors`}
          >
            {errors}
          </span>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={shuffle}
            disabled={isComplete || isShaking}
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
            disabled={selectedIds.length === 0 || isComplete || isShaking}
            className="h-14 rounded-full border-2 border-ink/70 bg-paper px-8 text-xl font-semibold text-ink transition hover:border-ink hover:bg-[#eef1df] disabled:cursor-not-allowed disabled:border-ink/20 disabled:bg-paper disabled:text-ink/30"
          >
            Deselect All
          </button>
          <button
            type="button"
            onClick={submitGuess}
            disabled={selectedIds.length !== 4 || isComplete || isShaking}
            className="h-14 rounded-full border-2 border-ink/70 bg-paper px-8 text-xl font-semibold text-ink transition hover:border-ink hover:bg-[#eef1df] disabled:cursor-not-allowed disabled:border-ink/20 disabled:bg-paper disabled:text-ink/30"
          >
            Submit
          </button>
        </div>

        {isComplete ? (
          <p className="mt-7 font-serif text-3xl text-moss">
            You solved it in {formatTime(elapsedMs)} with {errors} {errors === 1 ? "error" : "errors"}!
          </p>
        ) : null}

        {isComplete ? (
          <section className="mt-8 rounded-lg border border-ink/12 bg-paper p-5 text-left shadow-soft">
            <h2 className="font-serif text-3xl text-ink">{leaderboardStatus}</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-ink/12 text-left text-xs uppercase tracking-[0.14em] text-ink/50">
                    <th className="py-3 pr-3">Rank</th>
                    <th className="py-3 pr-3">Name</th>
                    <th className="py-3 pr-3">Errors</th>
                    <th className="py-3 pr-3">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr key={entry.id} className="border-b border-ink/8 last:border-0">
                      <td className="py-3 pr-3 text-ink/52">{index + 1}</td>
                      <td className="py-3 pr-3 font-medium text-ink">{entry.name}</td>
                      <td className="py-3 pr-3 text-ink/72">{entry.mistakes}</td>
                      <td className="py-3 pr-3 text-ink/72">{formatTime(entry.durationMs)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
}
