import Link from "next/link";
import { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Home",
  description: siteConfig.description,
};

export default function HomePage() {
  const projects = getAllProjects().slice(0, 3); // Show 3 featured projects

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="mb-24 space-y-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Product Designer
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-foreground/80">
          {siteConfig.description}
        </p>
        <div className="flex justify-center gap-4">
          <Button href="/work" variant="primary">
            View Work
          </Button>
          <Button href="/contact" variant="outline">
            Get in Touch
          </Button>
        </div>
      </section>

      {/* Featured Projects */}
      {projects.length > 0 && (
        <section className="mb-24">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-3xl md:text-4xl font-bold">Featured Work</h2>
            <Link
              href="/work"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 rounded"
            >
              View All →
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* About Preview */}
      <section className="mb-24 rounded-lg border border-foreground/10 bg-foreground/5 p-12 text-center">
        <h2 className="mb-4 text-3xl font-bold">About</h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-foreground/80">
          I'm a product designer passionate about creating beautiful, functional,
          and user-centered digital experiences. I work at the intersection of
          design, technology, and business to deliver meaningful solutions.
        </p>
        <Button href="/about" variant="secondary">
          Learn More
        </Button>
      </section>
    </div>
  );
}

