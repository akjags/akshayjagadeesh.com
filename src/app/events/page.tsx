import { PasscodeGate } from "@/components/PasscodeGate";
import { MonthOrderGame } from "@/components/MonthOrderGame";
import { isUnlocked } from "@/lib/auth";

export const metadata = {
  title: "Event",
  robots: { index: false, follow: false },
};

export default async function EventsPage() {
  if (!(await isUnlocked())) {
    return <PasscodeGate title="Event" description="Enter passcode" redirectTo="/events" />;
  }

  return <MonthOrderGame />;
}
