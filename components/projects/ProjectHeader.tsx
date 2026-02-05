import Image from "next/image";
import { ProjectFrontmatter } from "@/lib/projects";

interface ProjectHeaderProps {
  frontmatter: ProjectFrontmatter;
}

export function ProjectHeader({ frontmatter }: ProjectHeaderProps) {
  return (
    <header className="mb-12 space-y-6">
      {frontmatter.featured_image && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={frontmatter.featured_image}
            alt={frontmatter.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">{frontmatter.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-foreground/60">
          {frontmatter.client && (
            <div>
              <span className="font-medium">Client:</span> {frontmatter.client}
            </div>
          )}
          {frontmatter.role && (
            <div>
              <span className="font-medium">Role:</span> {frontmatter.role}
            </div>
          )}
          {frontmatter.timeframe && (
            <div>
              <span className="font-medium">Timeframe:</span>{" "}
              {frontmatter.timeframe}
            </div>
          )}
        </div>
        {frontmatter.summary && (
          <p className="text-lg leading-relaxed text-foreground/80">
            {frontmatter.summary}
          </p>
        )}
        {frontmatter.tools && frontmatter.tools.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {frontmatter.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full bg-foreground/10 px-4 py-2 text-sm font-medium"
              >
                {tool}
              </span>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

