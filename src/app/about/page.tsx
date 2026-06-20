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
            src="/images/akshay-headshot.jpg"
            alt="Akshay Jagadeesh"
            width={1600}
            height={900}
            className="rounded-lg border border-ink/10 object-cover shadow-soft"
          />
        </div>
        <div>
          <SectionHeading eyebrow="About" title="Neuroscientist studying perception and behavior" />
          <div className="content text-lg text-ink/72">
            <p>
              I am a postdoctoral research scientist studying neuroscience at Harvard Medical School,
              in the lab of Dr. Marge Livingstone. My research focuses on understanding human visual
              perception: how the brain transforms sensory inputs into the rich perceptual experience
              that guides behavior.
            </p>
            <p>
              A central goal of my work is to characterize the geometry of sensory representations in
              visual cortex and model the cortical computations involved in using those representations
              for goal-driven behavior. I am especially interested in attention as a mechanism for
              flexibly extracting and modulating sensory representations through task-dependent readouts.
            </p>
            <p>
              I completed my PhD in Psychology and Computational Cognitive Neuroscience at Stanford,
              advised by Justin Gardner. Before that, I studied Computer Science and Cognitive Science
              at UC Berkeley and worked in Mark D&apos;Esposito&apos;s lab.
            </p>
          </div>
          <div className="mt-8 grid gap-3 text-sm text-ink/70 sm:grid-cols-2">
            <div className="rounded-lg border border-ink/10 bg-paper p-4">
              <p className="font-medium text-ink">Interests</p>
              <p className="mt-2">Computational neuroscience, vision science, attention, texture perception.</p>
            </div>
            <div className="rounded-lg border border-ink/10 bg-paper p-4">
              <p className="font-medium text-ink">Teaching</p>
              <p className="mt-2">Courses in cognitive neuroscience, perception, foundations of cognition, and AI.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
