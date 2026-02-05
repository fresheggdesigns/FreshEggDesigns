"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";
import { Button } from "@/components/ui/Button";

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Email</h2>
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="text-lg text-gray-700 dark:text-gray-300 hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded inline-block"
        >
          {siteConfig.contact.email}
        </a>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Social</h2>
        <ul className="space-y-3">
          {siteConfig.links.twitter && (
            <li>
              <motion.a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-gray-700 dark:text-gray-300 hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded inline-flex items-center gap-2 group"
                whileHover={{ x: 4 }}
              >
                Twitter
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </motion.a>
            </li>
          )}
          {siteConfig.links.linkedin && (
            <li>
              <motion.a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-gray-700 dark:text-gray-300 hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded inline-flex items-center gap-2 group"
                whileHover={{ x: 4 }}
              >
                LinkedIn
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </motion.a>
            </li>
          )}
          {siteConfig.links.github && (
            <li>
              <motion.a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-gray-700 dark:text-gray-300 hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded inline-flex items-center gap-2 group"
                whileHover={{ x: 4 }}
              >
                GitHub
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </motion.a>
            </li>
          )}
        </ul>
      </div>

      <div className="pt-4">
        <Button
          href={`mailto:${siteConfig.contact.email}`}
          variant="outline"
          size="lg"
        >
          Open Email Client
        </Button>
      </div>
    </div>
  );
}

