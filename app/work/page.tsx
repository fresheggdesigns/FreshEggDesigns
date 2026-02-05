import { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { TextReveal } from "@/components/animations/TextReveal";
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
    <div className="w-full">
      <AnimatedSection className="py-section-lg">
        <div className="container mx-auto px-6">
          <div className="mb-16 space-y-6 max-w-3xl">
            <TextReveal as="h1" delay={0.1}>
              Work
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
                A collection of product design projects and case studies
                showcasing my process, thinking, and outcomes.
              </p>
            </TextReveal>
          </div>

          {projects.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No projects found.
              </p>
            </div>
          ) : (
            <ProjectGrid projects={projects} />
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}

