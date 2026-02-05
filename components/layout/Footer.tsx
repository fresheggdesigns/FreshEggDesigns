import Link from "next/link";
import { siteConfig } from "@/lib/config";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/10 bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-foreground/60">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
          </div>
          <nav>
            <ul className="flex flex-wrap gap-6">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/60 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 rounded"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <ul className="flex gap-4">
              {siteConfig.links.twitter && (
                <li>
                  <a
                    href={siteConfig.links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/60 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 rounded"
                    aria-label="Twitter"
                  >
                    Twitter
                  </a>
                </li>
              )}
              {siteConfig.links.github && (
                <li>
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/60 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 rounded"
                    aria-label="GitHub"
                  >
                    GitHub
                  </a>
                </li>
              )}
              {siteConfig.links.linkedin && (
                <li>
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/60 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 rounded"
                    aria-label="LinkedIn"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

