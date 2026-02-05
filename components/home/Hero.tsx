"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/components/animations/TextReveal";
import { siteConfig } from "@/lib/config";

export function Hero() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-6xl w-full space-y-8 md:space-y-12">
        <div className="space-y-6">
          <TextReveal as="h1" delay={0.1}>
            {siteConfig.designerName}
          </TextReveal>
          <TextReveal delay={0.2}>
            <p className="text-2xl md:text-3xl lg:text-4xl text-gray-600 dark:text-gray-400 font-light max-w-3xl">
              {siteConfig.positioning}
            </p>
          </TextReveal>
        </div>

        <motion.ul
          className="flex flex-wrap gap-6 text-lg md:text-xl text-gray-700 dark:text-gray-300"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
              },
            },
          }}
        >
          {siteConfig.specialties.map((specialty, idx) => (
            <motion.li
              key={idx}
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0 },
              }}
              className="flex items-center group cursor-default"
            >
              <span className="mr-3 text-accent group-hover:scale-125 transition-transform">
                •
              </span>
              <span className="group-hover:text-foreground transition-colors">
                {specialty}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

