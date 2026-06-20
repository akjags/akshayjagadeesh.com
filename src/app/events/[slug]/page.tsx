import { notFound } from "next/navigation";
import { PasscodeGate } from "@/components/PasscodeGate";
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

  if (!(await isUnlocked())) {
    return (
      <PasscodeGate
        title="Private event"
        description="Enter the passcode for this event page."
        redirectTo={`/events/${slug}`}
      />
    );
  }

  const event = getEvent(slug);
  if (!event) notFound();

  return (
    <main className="noise bg-mist">
      <section className="mx-auto max-w-5xl px-5 py-16 md:py-24">
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-moss">Unlisted event</p>
        <h1 className="font-serif text-6xl leading-tight text-ink">{event.title}</h1>
        <p className="mt-4 text-sm text-ink/55">{event.date}</p>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/70">{event.dek}</p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {event.tools.map((tool) => (
            <div key={tool.title} className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
              <h2 className="font-serif text-2xl text-ink">{tool.title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/64">{tool.description}</p>
              <button className="mt-5 rounded-md border border-ink/15 px-3 py-2 text-sm font-medium text-ink transition hover:border-blue hover:text-blue">
                {tool.cta}
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
