import { notFound, redirect } from "next/navigation";
import { events, getEvent } from "@/lib/content";

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

  redirect("/events/amara-1st-birthday/age-sort");
}
