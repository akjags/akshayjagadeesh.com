import { notFound } from "next/navigation";
import { Check, Lock, MapPin, MessageCircle, PanelsTopLeft, PartyPopper } from "lucide-react";
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
        title="Event"
        description="Enter passcode"
        redirectTo={`/events/${slug}`}
      />
    );
  }

  const event = getEvent(slug);
  if (!event) notFound();

  const tools = [
    { icon: PanelsTopLeft, title: "Games", description: event.tools[2]?.description },
    { icon: MessageCircle, title: "RSVP", description: event.tools[0]?.description },
  ];

  return (
    <main className="noise flex justify-center px-5 py-10">
      <section className="w-full max-w-[360px] overflow-hidden rounded-[24px] border border-moss/30 bg-[#f7f7ee] shadow-soft">
        <div className="flex items-center justify-between bg-[#242916] px-6 py-5 text-paper">
          <span className="w-5" aria-hidden />
          <h1 className="font-serif text-xl">Event</h1>
          <Lock size={20} strokeWidth={1.7} aria-hidden />
        </div>

        <div className="flex min-h-[370px] flex-col items-center border-b border-moss/30 px-6 py-8 text-center">
          <div className="leaf-mark mb-8" aria-hidden>
            {Array.from({ length: 9 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>
          <PartyPopper className="mb-4 text-moss" size={26} strokeWidth={1.5} aria-hidden />
          <h2 className="font-serif text-3xl text-ink">{event.title}</h2>
          <p className="mt-2 text-sm text-ink/56">{event.date}</p>
          <p className="mt-5 max-w-[18rem] text-sm leading-6 text-ink/72">{event.dek}</p>
        </div>

        <div className="px-6 py-8">
          <p className="mb-5 flex items-center justify-center gap-2 font-serif text-lg text-ink">
            Unlocked
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-moss text-paper">
              <Check size={13} strokeWidth={2} aria-hidden />
            </span>
          </p>

          <div className="grid grid-cols-2 gap-4">
            {tools.map((tool) => (
              <button
                key={tool.title}
                className="flex min-h-[138px] flex-col items-center justify-center rounded-md border border-moss/30 bg-paper/35 px-3 text-center transition hover:bg-paper"
                type="button"
                title={tool.description}
              >
                <tool.icon className="mb-4 text-moss" size={44} strokeWidth={1.5} aria-hidden />
                <span className="text-base text-ink">{tool.title}</span>
              </button>
            ))}
          </div>

          <button
            className="mt-4 flex min-h-[96px] w-full flex-col items-center justify-center rounded-md border border-moss/30 bg-paper/35 px-4 text-center transition hover:bg-paper"
            type="button"
            title={event.tools[1]?.description}
          >
            <MapPin className="mb-2 text-moss" size={38} strokeWidth={1.5} aria-hidden />
            <span className="text-base text-ink">Details</span>
          </button>

          <p className="mt-6 text-center text-sm leading-6 text-ink/74">
            This page is unlisted.
            <br />
            Please don&apos;t share the link.
          </p>
        </div>
      </section>
    </main>
  );
}
