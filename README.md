# Akshay Jagadeesh Personal Site

Next.js redesign for [akshayjagadeesh.com](https://www.akshayjagadeesh.com).

## Development

```bash
npm install
npm run dev
```

Local preview runs at `http://localhost:3000`.

## Content

Most first-pass content lives in `src/lib/content.ts`:

- `publications`
- `posts`
- `recipes`
- `events`

Recipes support image URLs through the `image` field. Public pages are linked in the main nav; recipes and events are intentionally unlisted.

## Private Pages

Recipes and event pages use a simple passcode. The default is:

```text
garden
```

Override it in production with:

```bash
SITE_PASSCODE=your-passcode
```

Private routes are also excluded from `robots.txt` and the sitemap, but the passcode is the actual lightweight gate.

The Amara Connections leaderboard stores shared scores through Redis-compatible REST env vars:

```bash
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
```

`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are also supported. Without those env vars, the game falls back to a same-browser local leaderboard.

## Private Visit Reports

The site also counts one visit per browser per day and sends a weekly email report through a
Vercel Cron Job. The report uses the same Redis-compatible REST env vars above for daily counts.

Add these Vercel environment variables:

```bash
RESEND_API_KEY=...
ANALYTICS_REPORT_TO=akjags@gmail.com
ANALYTICS_REPORT_FROM="Akshay Website <your-verified-sender@example.com>"
CRON_SECRET=...
```

The weekly cron is configured in `vercel.json`. To test manually after deploy:

```bash
curl "https://www.akshayjagadeesh.com/api/weekly-visits-report?dryRun=1&secret=$CRON_SECRET"
```
