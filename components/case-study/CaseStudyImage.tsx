"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface CaseStudyImageProps {
  src: string;
  alt: string;
  caption?: string;
  zoomable?: boolean;
  priority?: boolean;
}

export function CaseStudyImage({
  src,
  alt,
  caption,
  zoomable = false,
  priority = false,
}: CaseStudyImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (isZoomed) {
      document.body.style.overflow = "hidden";
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsZoomed(false);
        }
      };
      window.addEventListener("keydown", handleEscape);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isZoomed]);

  const handleClick = () => {
    if (zoomable) {
      setIsZoomed(true);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(false);
  };

  return (
    <>
      <figure className="my-8">
        <div
          className={`relative overflow-hidden rounded-lg border border-foreground/10 bg-foreground/5 transition-all ${
            zoomable ? "cursor-zoom-in hover:border-foreground/20" : ""
          }`}
          onClick={handleClick}
        >
          <div className="relative aspect-video w-full">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain transition-transform hover:scale-[1.02]"
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        </div>
        {caption && (
          <figcaption className="mt-3 text-sm text-foreground/60 text-center italic">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Zoom overlay */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={src}
              alt={alt}
              width={1920}
              height={1080}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 rounded-full bg-foreground/10 p-2 hover:bg-foreground/20 transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
              aria-label="Close zoom"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

