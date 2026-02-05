"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  delay?: number;
}

export function ImageReveal({
  src,
  alt,
  className = "",
  priority = false,
  delay = 0,
}: ImageRevealProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 1.05 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={`overflow-hidden ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={800}
        className="w-full h-full object-cover"
        priority={priority}
      />
    </motion.div>
  );
}

