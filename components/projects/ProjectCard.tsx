"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ProjectFrontmatter } from "@/lib/projects";

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
    <Link href={`/work/${slug}`} className="block h-full group">
      <motion.div
        className="h-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-background transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50"
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {frontmatter.featured_image && (
          <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
            <Image
              src={frontmatter.featured_image}
              alt={frontmatter.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-background/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}
        <div className="p-6 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">
              {frontmatter.title}
            </h3>
            {year && (
              <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {year}
              </span>
            )}
          </div>
          {frontmatter.role && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {frontmatter.role}
            </p>
          )}
          {frontmatter.summary && (
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 line-clamp-2">
              {frontmatter.summary}
            </p>
          )}
          {frontmatter.tools && frontmatter.tools.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {frontmatter.tools.slice(0, 3).map((tool) => (
                <span
                  key={tool}
                  className="rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300"
                >
                  {tool}
                </span>
              ))}
              {frontmatter.tools.length > 3 && (
                <span className="rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                  +{frontmatter.tools.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}

function extractYear(timeframe: string | undefined): number | null {
  if (!timeframe || typeof timeframe !== "string") {
    return null;
  }
  const match = timeframe.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : null;
}

