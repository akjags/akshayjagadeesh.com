import { NextResponse } from "next/server";

type LeaderboardEntry = {
  id: string;
  name: string;
  mistakes: number;
  durationMs: number;
  submittedAt: string;
};

const leaderboardKey = "amara-connections-leaderboard";
const maxEntries = 100;

function redisConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

function sortEntries(entries: LeaderboardEntry[]) {
  return [...entries].sort((a, b) => a.mistakes - b.mistakes || a.durationMs - b.durationMs);
}

async function redisPipeline(command: (string | number)[]) {
  const config = redisConfig();
  if (!config) return null;

  const response = await fetch(`${config.url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([command]),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Leaderboard storage request failed: ${response.status}`);
  }

  const payload = (await response.json()) as [{ result?: unknown }];
  return payload[0]?.result ?? null;
}

async function readEntries() {
  const result = await redisPipeline(["GET", leaderboardKey]);
  if (typeof result !== "string") return [];

  try {
    const parsed = JSON.parse(result) as LeaderboardEntry[];
    return Array.isArray(parsed) ? sortEntries(parsed) : [];
  } catch {
    return [];
  }
}

async function writeEntries(entries: LeaderboardEntry[]) {
  await redisPipeline(["SET", leaderboardKey, JSON.stringify(sortEntries(entries).slice(0, maxEntries))]);
}

export async function GET() {
  if (!redisConfig()) {
    return NextResponse.json({ entries: [], storage: "unconfigured" });
  }

  const entries = await readEntries();
  return NextResponse.json({ entries, storage: "redis" });
}

export async function POST(request: Request) {
  if (!redisConfig()) {
    return NextResponse.json(
      { error: "Leaderboard storage is not configured.", entries: [], storage: "unconfigured" },
      { status: 503 },
    );
  }

  const body = (await request.json()) as Partial<LeaderboardEntry>;
  const name = String(body.name || "").trim().slice(0, 40);
  const mistakes = Number(body.mistakes);
  const durationMs = Number(body.durationMs);

  if (!name || !Number.isInteger(mistakes) || mistakes < 0 || mistakes > 4) {
    return NextResponse.json({ error: "Invalid leaderboard entry." }, { status: 400 });
  }

  if (!Number.isInteger(durationMs) || durationMs < 1 || durationMs > 60 * 60 * 1000) {
    return NextResponse.json({ error: "Invalid completion time." }, { status: 400 });
  }

  const entry: LeaderboardEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name,
    mistakes,
    durationMs,
    submittedAt: new Date().toISOString(),
  };

  const entries = sortEntries([...(await readEntries()), entry]).slice(0, maxEntries);
  await writeEntries(entries);

  return NextResponse.json({ entry, entries, storage: "redis" });
}
