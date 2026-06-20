import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.akshayjagadeesh.com"),
  title: {
    default: "Akshay Jagadeesh",
    template: "%s | Akshay Jagadeesh",
  },
  description:
    "Neuroscientist studying visual perception, attention, and computational models of vision.",
  openGraph: {
    title: "Akshay Jagadeesh",
    description:
      "Neuroscientist studying visual perception, attention, and computational models of vision.",
    url: "https://www.akshayjagadeesh.com",
    siteName: "Akshay Jagadeesh",
    images: [{ url: "/images/akshay-headshot.jpg", width: 1600, height: 900 }],
    locale: "en_US",
    type: "website",
  },
};

const nav = [
  { href: "/", label: "Home" },
  { href: "/writing", label: "Writing" },
  { href: "/publications", label: "Publications" },
  { href: "/about", label: "About" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <header className="sticky top-0 z-30 border-b border-ink/10 bg-mist/88 backdrop-blur">
            <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <Link href="/" className="font-serif text-xl leading-tight text-ink">
                Akshay Jagadeesh
              </Link>
              <div className="flex flex-wrap items-center gap-1 text-sm text-ink/70">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-3 py-2 transition hover:bg-ink/5 hover:text-ink focus:outline-none focus:ring-2 focus:ring-blue/40"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </header>
          {children}
          <footer className="border-t border-ink/10 bg-paper">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-ink/65 md:flex-row md:items-center md:justify-between">
              <p>© {new Date().getFullYear()} Akshay Jagadeesh</p>
              <div className="flex gap-4">
                <a href="mailto:akjags@gmail.com" className="hover:text-ink">
                  Email
                </a>
                <a href="https://github.com/akjags" className="hover:text-ink">
                  GitHub
                </a>
                <a href="https://scholar.google.com/citations?user=JbE7DWYAAAAJ" className="hover:text-ink">
                  Scholar
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
