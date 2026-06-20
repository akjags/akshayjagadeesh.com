import { NextResponse } from "next/server";
import { configuredPasscode, unlockCookie } from "@/lib/auth";

export async function POST(request: Request) {
  const form = await request.formData();
  const passcode = String(form.get("passcode") || "");
  const redirectTo = String(form.get("redirectTo") || "/");

  if (passcode !== configuredPasscode()) {
    return NextResponse.redirect(new URL(`${redirectTo}?locked=1`, request.url), 303);
  }

  const response = NextResponse.redirect(new URL(redirectTo, request.url), 303);
  response.cookies.set(unlockCookie, "yes", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  return response;
}
