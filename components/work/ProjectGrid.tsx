"use client";

import { Project } from "@/lib/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { motion } from "framer-motion";
import { staggerConfig } from "@/lib/animations";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <motion.div
      variants={staggerConfig.container}
      initial="hidden"
      animate="show"
      className="grid gap-8 md:gap-12 md:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project, index) => (
        <motion.div key={project.slug} variants={staggerConfig.item}>
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  );
}

