import Link from "next/link";
import { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { Hero } from "@/components/home/Hero";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Home",
  description: siteConfig.description,
};

export default function HomePage() {
  const allProjects = getAllProjects();
  const featuredProjects = allProjects.slice(0, 6);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <Hero />

      {/* Featured Work */}
      {featuredProjects.length > 0 && (
        <AnimatedSection className="py-section-lg border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-6">
            <div className="mb-16 flex items-baseline justify-between">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Featured Work
              </h2>
              <Link
                href="/work"
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded flex items-center gap-2 group"
              >
                View All
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </div>
            <ProjectGrid projects={featuredProjects} />
          </div>
        </AnimatedSection>
      )}

      {/* Brief Intro / CTA */}
      <AnimatedSection
        className="py-section-lg border-t border-gray-200 dark:border-gray-800"
        delay={0.2}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Let's work together
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              {siteConfig.contact.message}
            </p>
            <div className="flex justify-center gap-4">
              <Button href="/work" variant="primary" size="lg">
                View Work
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}

