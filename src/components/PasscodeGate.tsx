export function PasscodeGate({
  title = "Private page",
  description = "Enter the passcode to continue.",
  redirectTo,
}: {
  title?: string;
  description?: string;
  redirectTo: string;
}) {
  return (
    <main className="noise min-h-[72vh] px-5 py-24">
      <section className="mx-auto max-w-md rounded-lg border border-ink/10 bg-paper p-6 shadow-soft">
        <p className="mb-2 text-xs uppercase tracking-[0.18em] text-moss">Passcode</p>
        <h1 className="font-serif text-3xl text-ink">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-ink/68">{description}</p>
        <form action="/api/unlock" method="POST" className="mt-6 space-y-4">
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <label className="block text-sm font-medium text-ink" htmlFor="passcode">
            Passcode
          </label>
          <input
            id="passcode"
            name="passcode"
            type="password"
            autoComplete="current-password"
            className="w-full rounded-md border border-ink/15 bg-white px-3 py-3 text-base outline-none transition focus:border-blue focus:ring-4 focus:ring-blue/10"
            placeholder="Enter passcode"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-ink px-4 py-3 text-sm font-medium text-white transition hover:bg-moss focus:outline-none focus:ring-4 focus:ring-moss/20"
          >
            Unlock
          </button>
        </form>
      </section>
    </main>
  );
}
