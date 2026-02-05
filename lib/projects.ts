import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ProjectFrontmatter {
  slug: string;
  title: string;
  client: string;
  role: string;
  timeframe: string;
  tools: string[];
  summary: string;
  problem: string;
  outcome: string;
  tags: string[];
  featured_image?: string;
}

export interface Project {
  frontmatter: ProjectFrontmatter;
  content: string;
  slug: string;
}

const projectsDirectory = path.join(process.cwd(), "content/projects");

export function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((fileName) => {
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        frontmatter: data as ProjectFrontmatter,
        content,
        slug: data.slug || fileName.replace(/\.mdx$/, ""),
      };
    });

  // Sort by year (extracted from timeframe) or title
  return allProjectsData.sort((a, b) => {
    const yearA = extractYear(a.frontmatter.timeframe);
    const yearB = extractYear(b.frontmatter.timeframe);
    if (yearA && yearB) {
      return yearB - yearA; // Most recent first
    }
    return a.frontmatter.title.localeCompare(b.frontmatter.title);
  });
}

export function getProjectBySlug(slug: string): Project | null {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      frontmatter: data as ProjectFrontmatter,
      content,
      slug: data.slug || slug,
    };
  } catch (error) {
    return null;
  }
}

function extractYear(timeframe: string): number | null {
  const match = timeframe.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : null;
}

export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((fileName) => {
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      return data.slug || fileName.replace(/\.mdx$/, "");
    });
}

