import { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Work",
  description: "A collection of product design projects and case studies.",
  openGraph: {
    title: "Work",
    description: "A collection of product design projects and case studies.",
  },
};

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">Work</h1>
        <p className="text-lg text-foreground/80 max-w-2xl">
          A collection of product design projects and case studies showcasing
          my process, thinking, and outcomes.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-foreground/60">No projects found.</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

