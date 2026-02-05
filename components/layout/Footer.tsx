"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-background">
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} {siteConfig.designerName || siteConfig.name}. All
              rights reserved.
            </p>
          </div>
          <nav>
            <ul className="flex flex-wrap gap-6">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <ul className="flex gap-6">
              {siteConfig.links.twitter && (
                <li>
                  <motion.a
                    href={siteConfig.links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
                    aria-label="Twitter"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Twitter
                  </motion.a>
                </li>
              )}
              {siteConfig.links.github && (
                <li>
                  <motion.a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
                    aria-label="GitHub"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    GitHub
                  </motion.a>
                </li>
              )}
              {siteConfig.links.linkedin && (
                <li>
                  <motion.a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
                    aria-label="LinkedIn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    LinkedIn
                  </motion.a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

