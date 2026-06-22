import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata = {
  title: "About",
  description: "About Akshay Jagadeesh.",
};

export default function AboutPage() {
  return (
    <main className="bg-mist">
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[0.8fr_1.2fr] md:py-24">
        <div>
          <Image
            src="/images/akshay-headshot-transparent.png"
            alt="Akshay Jagadeesh"
            width={2000}
            height={2000}
            className="rounded-lg border border-ink/10 object-cover shadow-soft"
          />
        </div>
        <div>
          <SectionHeading eyebrow="About" title="Research scientist studying intelligent systems" />
          <div className="content text-lg text-ink/72">
            <p>
              I am a scientist working at the intersection of artificial intelligence and
              neuroscience. My early work focused on how the brain supports perception and behavior,
              using computational models to connect neural activity with cognition.
            </p>
            <p>
              After nearly a decade in academic research, including a PhD at Stanford University and a
              postdoctoral fellowship at Harvard Medical School, I moved into industry to apply these
              ideas more broadly. I am now a Research Scientist at OpenAI, where I work on AI
              alignment and AI for health and medicine.
            </p>
            <p>
              My current work has two linked aims: making AI systems more reliable, beneficial, and
              aligned with human values, and exploring how AI can accelerate progress in health,
              medicine, and scientific discovery. I am especially interested in translating lessons
              from neuroscience and modeling into tools that are safe, useful, and genuinely helpful
              to people.
            </p>
            <p>
              Across the work, the underlying question is the same: how do intelligent systems learn,
              represent, and act in the world, and how can we shape those systems responsibly?
            </p>
          </div>
          <div className="mt-8 grid gap-3 text-sm text-ink/70 sm:grid-cols-2">
            <div className="rounded-lg border border-ink/10 bg-paper p-4">
              <p className="font-medium text-ink">Current focus</p>
              <p className="mt-2">AI alignment, AI for health and medicine, reliable model behavior.</p>
            </div>
            <div className="rounded-lg border border-ink/10 bg-paper p-4">
              <p className="font-medium text-ink">Background</p>
              <p className="mt-2">Computational neuroscience, vision science, cognition, and modeling.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
