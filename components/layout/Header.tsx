import Link from "next/link";
import { siteConfig } from "@/lib/config";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-foreground/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 rounded"
        >
          {siteConfig.name}
        </Link>
        <ul className="flex items-center gap-6">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 rounded"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

