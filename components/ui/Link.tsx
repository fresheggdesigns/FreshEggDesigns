import NextLink from "next/link";
import { ReactNode } from "react";

interface LinkProps {
  children: ReactNode;
  href: string;
  className?: string;
  external?: boolean;
}

export function Link({ children, href, className = "", external = false }: LinkProps) {
  const baseStyles =
    "text-foreground underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 rounded";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseStyles} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={`${baseStyles} ${className}`}>
      {children}
    </NextLink>
  );
}

