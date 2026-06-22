import { NextResponse } from "next/server";
import {
  formatReportDate,
  readVisitCounts,
  recentVisitDates,
  visitsStorageConfigured,
  type VisitCount,
} from "@/lib/visitCounts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET || process.env.ANALYTICS_REPORT_SECRET;
  const url = new URL(request.url);

  if (secret) {
    return (
      request.headers.get("authorization") === `Bearer ${secret}` ||
      url.searchParams.get("secret") === secret
    );
  }

  return (request.headers.get("user-agent") || "").includes("vercel-cron");
}

function reportConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ANALYTICS_REPORT_TO || "akjags@gmail.com";
  const from = process.env.ANALYTICS_REPORT_FROM || "Akshay Website <onboarding@resend.dev>";

  return apiKey ? { apiKey, to, from } : null;
}

function reportHtml(counts: VisitCount[]) {
  const total = counts.reduce((sum, count) => sum + count.visits, 0);
  const maxVisits = Math.max(...counts.map((count) => count.visits), 1);

  const rows = counts
    .map((count) => {
      const width = count.visits === 0 ? 0 : Math.max(4, Math.round((count.visits / maxVisits) * 100));

      return `
        <tr>
          <td style="width: 92px; padding: 8px 12px 8px 0; color: #635f55; font: 14px Arial, sans-serif;">
            ${formatReportDate(count.date)}
          </td>
          <td style="padding: 8px 0;">
            <div style="height: 26px; width: 100%; background: #f6f0e4; border-radius: 4px; overflow: hidden;">
              <div style="height: 26px; width: ${width}%; background: #3f573b;"></div>
            </div>
          </td>
          <td style="width: 56px; padding: 8px 0 8px 12px; color: #121a16; font: 700 14px Arial, sans-serif; text-align: right;">
            ${count.visits}
          </td>
        </tr>
      `;
    })
    .join("");

  return `
    <div style="margin: 0; padding: 28px; background: #f6f0e4; color: #121a16;">
      <div style="max-width: 620px; margin: 0 auto; padding: 28px; background: #fffdf7; border: 1px solid #d9cdb9; border-radius: 10px;">
        <p style="margin: 0 0 8px; color: #8a634b; font: 12px Arial, sans-serif; letter-spacing: 0.12em; text-transform: uppercase;">
          akshayjagadeesh.com
        </p>
        <h1 style="margin: 0; color: #121a16; font: 32px Georgia, serif; font-weight: 400;">
          Weekly visits
        </h1>
        <p style="margin: 12px 0 24px; color: #635f55; font: 16px/1.5 Arial, sans-serif;">
          ${total} daily visits across the past 7 days.
        </p>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
          ${rows}
        </table>
        <p style="margin: 24px 0 0; color: #635f55; font: 13px/1.5 Arial, sans-serif;">
          Counts are approximate: one browser is counted at most once per day, and visitors with JavaScript or storage disabled may not be included.
        </p>
      </div>
    </div>
  `;
}

function reportText(counts: VisitCount[]) {
  const total = counts.reduce((sum, count) => sum + count.visits, 0);
  const lines = counts.map((count) => `${formatReportDate(count.date)}: ${count.visits}`);
  return [`Weekly visits for akshayjagadeesh.com`, `Total: ${total}`, "", ...lines].join("\n");
}

async function sendReport(counts: VisitCount[]) {
  const config = reportConfig();
  if (!config) {
    return { sent: false, reason: "missing RESEND_API_KEY" };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: [config.to],
      subject: "Weekly website visits",
      html: reportHtml(counts),
      text: reportText(counts),
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Email request failed: ${response.status} ${message}`);
  }

  return { sent: true };
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!visitsStorageConfigured()) {
    return NextResponse.json(
      { error: "Visit storage is not configured. Add KV_REST_API_URL and KV_REST_API_TOKEN." },
      { status: 503 },
    );
  }

  const counts = await readVisitCounts(recentVisitDates(7));

  if (new URL(request.url).searchParams.get("dryRun") === "1") {
    return NextResponse.json({ counts, html: reportHtml(counts), text: reportText(counts) });
  }

  const delivery = await sendReport(counts);
  return NextResponse.json({ counts, delivery });
}
