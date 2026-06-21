import Link from "next/link";
import { ArrowRight, CalendarHeart, Grid3X3, Images } from "lucide-react";
import { PasscodeGate } from "@/components/PasscodeGate";
import { isEventUnlocked } from "@/lib/auth";

const path = "/events/amara-1st-birthday";

const games = [
  {
    href: "/events/amara-1st-birthday/amara-connections",
    title: "Amara Connections",
    dek: "Make four groups of four in a birthday-themed Connections puzzle.",
    icon: Grid3X3,
  },
  {
    href: "/events/amara-1st-birthday/age-sort",
    title: "Age sorter",
    dek: "Put twelve photos in order from newborn to eleven months.",
    icon: Images,
  },
];

export const metadata = {
  title: "Amara First Birthday",
  robots: { index: false, follow: false },
};

export default async function AmaraBirthdayPage() {
  if (!(await isEventUnlocked())) {
    return <PasscodeGate title="Amara" description="Enter passcode" redirectTo={path} />;
  }

  return (
    <main className="noise px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl">
        <div className="border-b border-ink/12 pb-8 text-center">
          <CalendarHeart className="mx-auto text-moss" size={34} strokeWidth={1.5} aria-hidden />
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-moss">
            Amara&apos;s first birthday
          </p>
          <h1 className="mt-3 font-serif text-5xl leading-tight text-ink md:text-6xl">
            Choose a game
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-ink/72">
            Two tiny party games for celebrating one very excellent year.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {games.map((game) => (
            <Link
              key={game.href}
              href={game.href}
              className="group flex min-h-[220px] flex-col justify-between rounded-lg border border-ink/12 bg-paper p-6 shadow-soft transition hover:-translate-y-0.5 hover:border-moss/35 hover:shadow-lg"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-[#eef1df] text-moss">
                <game.icon size={30} strokeWidth={1.5} aria-hidden />
              </span>
              <span>
                <span className="block font-serif text-3xl text-ink">{game.title}</span>
                <span className="mt-3 block text-base leading-7 text-ink/68">{game.dek}</span>
              </span>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-blue group-hover:text-ink">
                Play
                <ArrowRight size={16} aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
