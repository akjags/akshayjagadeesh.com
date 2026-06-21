import { cookies } from "next/headers";

export const defaultPasscode = "garden";
export const unlockCookie = "akshay-site-unlocked";
export const eventUnlockCookie = "akshay-event-unlocked";

export function configuredPasscode() {
  return process.env.SITE_PASSCODE || defaultPasscode;
}

export async function isUnlocked() {
  const store = await cookies();
  return store.get(unlockCookie)?.value === "yes";
}

export async function isEventUnlocked() {
  const store = await cookies();
  return store.get(eventUnlockCookie)?.value === "yes";
}
