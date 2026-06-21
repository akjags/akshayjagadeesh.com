import { notFound } from "next/navigation";
import { PasscodeGate } from "@/components/PasscodeGate";
import { MonthOrderGame } from "@/components/MonthOrderGame";
import { events, getEvent } from "@/lib/content";
import { isUnlocked } from "@/lib/auth";

export const metadata = {
  title: "Event",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  if (!(await isUnlocked())) {
    return (
      <PasscodeGate
        title="Event"
        description="Enter passcode"
        redirectTo={`/events/${slug}`}
      />
    );
  }

  return <MonthOrderGame />;
}
