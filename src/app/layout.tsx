import type { Metadata } from "next";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.akshayjagadeesh.com"),
  title: {
    default: "Akshay Jagadeesh",
    template: "%s | Akshay Jagadeesh",
  },
  description:
    "Research Scientist at OpenAI working on AI alignment, AI for health and medicine, and the science of intelligent systems.",
  openGraph: {
    title: "Akshay Jagadeesh",
    description:
      "Research Scientist at OpenAI working on AI alignment, AI for health and medicine, and the science of intelligent systems.",
    url: "https://www.akshayjagadeesh.com",
    siteName: "Akshay Jagadeesh",
    images: [{ url: "/images/akshay-headshot-transparent.png", width: 2000, height: 2000 }],
    locale: "en_US",
    type: "website",
  },
};

const nav = [
  { href: "/publications", label: "Publications" },
  { href: "/writing", label: "Notes" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen px-3 py-3 sm:px-5 sm:py-4">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[18px] border border-ink/15 bg-paper/90 shadow-soft backdrop-blur">
          <header className="border-b border-ink/12">
            <nav className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-7">
              <Link href="/" className="font-serif text-2xl leading-tight text-ink">
                Akshay Jagadeesh
              </Link>
              <div className="flex flex-wrap items-center gap-6 text-sm text-ink/78">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="transition hover:text-moss focus:outline-none focus:ring-2 focus:ring-blue/35"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </header>
          {children}
          <footer className="border-t border-ink/12">
            <div className="flex flex-col gap-4 px-5 py-8 text-sm text-ink/68 md:flex-row md:items-center md:justify-between md:px-7">
              <div className="flex flex-wrap gap-7">
                <a href="mailto:akjags@gmail.com" className="inline-flex items-center gap-2 hover:text-ink">
                  <Mail size={18} aria-hidden />
                  Email
                </a>
                <a href="https://github.com/akjags" className="inline-flex items-center gap-2 hover:text-ink">
                  <Github size={18} aria-hidden />
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/akshayjagadeesh" className="inline-flex items-center gap-2 hover:text-ink">
                  <Linkedin size={18} aria-hidden />
                  LinkedIn
                </a>
              </div>
              <p>© {new Date().getFullYear()} Akshay Jagadeesh</p>
            </div>
          </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
