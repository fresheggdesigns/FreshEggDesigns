import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { siteConfig } from "@/lib/config";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const { frontmatter } = project;
  const title = `${frontmatter.title} | ${siteConfig.name}`;
  const description = frontmatter.summary || frontmatter.problem;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: frontmatter.featured_image
        ? [
            {
              url: frontmatter.featured_image,
              width: 1200,
              height: 630,
              alt: frontmatter.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: frontmatter.featured_image ? [frontmatter.featured_image] : [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { frontmatter, content } = project;

  return (
    <article className="container mx-auto px-4 py-16">
      <ProjectHeader frontmatter={frontmatter} />

      {frontmatter.problem && (
        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-semibold">The Problem</h2>
          <p className="text-lg leading-relaxed text-foreground/80">
            {frontmatter.problem}
          </p>
        </section>
      )}

      <div className="prose prose-lg max-w-none dark:prose-invert">
        <MDXRemote source={content} />
      </div>

      {frontmatter.outcome && (
        <section className="mt-12 space-y-4 rounded-lg border border-foreground/10 bg-foreground/5 p-6">
          <h2 className="text-2xl font-semibold">Outcome</h2>
          <p className="text-lg leading-relaxed text-foreground/80">
            {frontmatter.outcome}
          </p>
        </section>
      )}
    </article>
  );
}

