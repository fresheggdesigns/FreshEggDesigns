"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";

export function Header() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
    >
      <nav className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
        >
          {siteConfig.designerName || siteConfig.name}
        </Link>
        <ul className="flex items-center gap-8">
          {siteConfig.nav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded px-2 py-1"
                >
                  {item.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                      initial={false}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.header>
  );
}

