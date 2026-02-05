import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
}

export function Card({ children, className = "", as: Component = "div" }: CardProps) {
  return (
    <Component
      className={`rounded-lg border border-foreground/10 bg-background p-6 shadow-sm transition-shadow hover:shadow-md ${className}`}
    >
      {children}
    </Component>
  );
}

