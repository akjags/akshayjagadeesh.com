import { Lock } from "lucide-react";

export function PasscodeGate({
  title = "Event",
  description = "Enter passcode",
  redirectTo,
}: {
  title?: string;
  description?: string;
  redirectTo: string;
}) {
  return (
    <main className="noise flex min-h-[72vh] justify-center px-5 py-10">
      <section className="w-full max-w-[360px] overflow-hidden rounded-[24px] border border-moss/30 bg-[#f7f7ee] shadow-soft">
        <div className="flex items-center justify-between bg-[#242916] px-6 py-5 text-paper">
          <span className="w-5" aria-hidden />
          <h1 className="font-serif text-xl">{title}</h1>
          <Lock size={20} strokeWidth={1.7} aria-hidden />
        </div>
        <div className="flex min-h-[370px] flex-col items-center border-b border-moss/30 px-6 py-8 text-center">
          <div className="leaf-mark mb-8" aria-hidden>
            {Array.from({ length: 9 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>
          <p className="font-serif text-xl text-ink">{description}</p>
          <form action="/api/unlock" method="POST" className="mt-5 w-full">
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <label className="sr-only" htmlFor="passcode">
              Passcode
            </label>
            <input
              id="passcode"
              name="passcode"
              type="password"
              autoComplete="current-password"
              className="mx-auto block w-48 rounded-md border border-moss/40 bg-paper/70 px-4 py-3 text-center text-xl tracking-[0.22em] text-ink outline-none transition focus:border-moss focus:ring-4 focus:ring-moss/15"
              placeholder="••••"
            />
            <button
              type="submit"
              className="mx-auto mt-6 block w-36 rounded-md bg-moss/45 px-4 py-3 text-sm font-medium text-paper transition hover:bg-moss focus:outline-none focus:ring-4 focus:ring-moss/20"
            >
              Enter
            </button>
          </form>
        </div>
        <div className="px-6 py-8 text-center text-sm leading-6 text-ink/74">
          <p>This page is unlisted.</p>
          <p>Please don&apos;t share the link.</p>
        </div>
      </section>
    </main>
  );
}
