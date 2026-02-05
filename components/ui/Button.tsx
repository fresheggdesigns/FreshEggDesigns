"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  size = "md",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 disabled:pointer-events-none";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variants = {
    primary:
      "bg-foreground text-background hover:bg-foreground/90 hover:scale-105 active:scale-95",
    secondary:
      "bg-gray-100 text-foreground hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 hover:scale-105 active:scale-95",
    outline:
      "border-2 border-foreground text-foreground hover:bg-foreground hover:text-background hover:scale-105 active:scale-95",
    ghost:
      "text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105 active:scale-95",
  };

  const classes = `${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`;

  const buttonContent = (
    <motion.span
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {buttonContent}
    </button>
  );
}

