import { AmaraConnectionsGame } from "@/components/AmaraConnectionsGame";
import { PasscodeGate } from "@/components/PasscodeGate";
import { isEventUnlocked } from "@/lib/auth";

const path = "/events/amara-1st-birthday/amara-connections";

export const metadata = {
  title: "Amara Connections",
  robots: { index: false, follow: false },
};

export default async function AmaraConnectionsPage() {
  if (!(await isEventUnlocked())) {
    return <PasscodeGate title="Amara" description="Enter passcode" redirectTo={path} />;
  }

  return <AmaraConnectionsGame />;
}
