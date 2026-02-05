import Link from "next/link";
import Image from "next/image";
import { ProjectFrontmatter } from "@/lib/projects";
import { Card } from "@/components/ui/Card";

interface ProjectCardProps {
  project: {
    frontmatter: ProjectFrontmatter;
    slug: string;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { frontmatter, slug } = project;
  const year = extractYear(frontmatter.timeframe);

  return (
    <Link href={`/work/${slug}`} className="block h-full">
      <Card className="h-full transition-transform hover:scale-[1.02]">
        {frontmatter.featured_image && (
          <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-md">
            <Image
              src={frontmatter.featured_image}
              alt={frontmatter.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-semibold">{frontmatter.title}</h3>
            {year && (
              <span className="text-sm text-foreground/60 whitespace-nowrap">
                {year}
              </span>
            )}
          </div>
          <p className="text-sm text-foreground/60">{frontmatter.role}</p>
          <p className="text-sm leading-relaxed">{frontmatter.summary}</p>
          {frontmatter.tools && frontmatter.tools.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {frontmatter.tools.slice(0, 4).map((tool) => (
                <span
                  key={tool}
                  className="rounded-full bg-foreground/10 px-3 py-1 text-xs font-medium"
                >
                  {tool}
                </span>
              ))}
              {frontmatter.tools.length > 4 && (
                <span className="rounded-full bg-foreground/10 px-3 py-1 text-xs font-medium">
                  +{frontmatter.tools.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}

function extractYear(timeframe: string): number | null {
  const match = timeframe.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : null;
}

