import { PasscodeGate } from "@/components/PasscodeGate";
import { MonthOrderGame } from "@/components/MonthOrderGame";
import { isEventUnlocked } from "@/lib/auth";

const path = "/events/amara-1st-birthday/age-sort";

export const metadata = {
  title: "Amara First Birthday",
  robots: { index: false, follow: false },
};

export default async function AgeSortPage() {
  if (!(await isEventUnlocked())) {
    return <PasscodeGate title="Amara" description="Enter passcode" redirectTo={path} />;
  }

  return <MonthOrderGame />;
}
