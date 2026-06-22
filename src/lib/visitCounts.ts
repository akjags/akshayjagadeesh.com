export type VisitCount = {
  date: string;
  visits: number;
};

const visitKeyPrefix = "site:visits";
const reportTimeZone = "America/Los_Angeles";

function redisConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

function redisKey(date: string) {
  return `${visitKeyPrefix}:${date}`;
}

async function redisPipeline(commands: (string | number)[][]) {
  const config = redisConfig();
  if (!config) return null;

  const response = await fetch(`${config.url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Visit counter storage request failed: ${response.status}`);
  }

  return (await response.json()) as { result?: unknown }[];
}

export function visitsStorageConfigured() {
  return Boolean(redisConfig());
}

export function localDateString(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: reportTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) {
    return date.toISOString().slice(0, 10);
  }

  return `${year}-${month}-${day}`;
}

function addDays(dateString: string, offset: number) {
  const date = new Date(`${dateString}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + offset);
  return date.toISOString().slice(0, 10);
}

export function recentVisitDates(days = 7, endDate = localDateString()) {
  return Array.from({ length: days }, (_, index) => addDays(endDate, index - days + 1));
}

export async function recordVisit() {
  const date = localDateString();
  const result = await redisPipeline([
    ["INCR", redisKey(date)],
    ["EXPIRE", redisKey(date), 60 * 60 * 24 * 120],
  ]);

  const visits = Number(result?.[0]?.result ?? 0);
  return { date, visits };
}

export async function readVisitCounts(dates: string[]): Promise<VisitCount[]> {
  const result = await redisPipeline(dates.map((date) => ["GET", redisKey(date)]));

  return dates.map((date, index) => {
    const rawValue = result?.[index]?.result;
    return { date, visits: typeof rawValue === "string" ? Number(rawValue) || 0 : 0 };
  });
}

export function formatReportDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date(`${dateString}T12:00:00Z`));
}
