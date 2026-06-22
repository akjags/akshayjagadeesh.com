import { NextResponse } from "next/server";
import { recordVisit, visitsStorageConfigured } from "@/lib/visitCounts";

export const runtime = "nodejs";

export async function POST() {
  if (!visitsStorageConfigured()) {
    return NextResponse.json({ counted: false, storage: "unconfigured" }, { status: 202 });
  }

  try {
    const count = await recordVisit();
    return NextResponse.json({ counted: true, ...count });
  } catch {
    return NextResponse.json({ counted: false }, { status: 202 });
  }
}
