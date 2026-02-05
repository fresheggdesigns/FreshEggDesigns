import { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about my background, experience, and design philosophy.",
  openGraph: {
    title: "About",
    description: "Learn more about my background, experience, and design philosophy.",
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold">About</h1>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-lg leading-relaxed text-foreground/80">
            I'm a product designer with a passion for creating meaningful digital
            experiences. With a background in both design and technology, I bring
            a unique perspective to every project.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">My Approach</h2>
          <p className="text-lg leading-relaxed text-foreground/80">
            I believe in user-centered design that balances business goals with
            user needs. My process involves deep research, iterative design, and
            continuous collaboration with cross-functional teams.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">Experience</h2>
          <p className="text-lg leading-relaxed text-foreground/80">
            I've worked with startups and established companies across various
            industries, helping them build products that users love. My
            expertise includes UX/UI design, design systems, prototyping, and
            user research.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">Skills</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg text-foreground/80">
            <li>User Experience Design</li>
            <li>User Interface Design</li>
            <li>Design Systems</li>
            <li>Prototyping & Testing</li>
            <li>User Research</li>
            <li>Front-end Development (React, TypeScript)</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-12 mb-4">Let's Connect</h2>
          <p className="text-lg leading-relaxed text-foreground/80">
            I'm always interested in new opportunities and collaborations. Feel
            free to reach out if you'd like to work together or just chat about
            design.
          </p>
        </div>
      </div>
    </div>
  );
}

