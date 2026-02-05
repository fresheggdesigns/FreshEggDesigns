"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
  hover?: boolean;
}

export function Card({
  children,
  className = "",
  as: Component = "div",
  hover = true,
}: CardProps) {
  const baseStyles =
    "rounded-xl border border-gray-200 dark:border-gray-800 bg-background p-6 transition-all duration-300";

  const hoverStyles = hover
    ? "hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 hover:-translate-y-1"
    : "";

  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <Component className={`${baseStyles} ${hoverStyles} ${className}`}>
          {children}
        </Component>
      </motion.div>
    );
  }

  return (
    <Component className={`${baseStyles} ${className}`}>{children}</Component>
  );
}

