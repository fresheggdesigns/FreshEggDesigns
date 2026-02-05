import { ReactNode, createElement } from "react";

interface CaseStudySectionProps {
  title: string;
  children: ReactNode;
  level?: 2 | 3;
}

export function CaseStudySection({
  title,
  children,
  level = 2,
}: CaseStudySectionProps) {
  const HeadingTag = `h${level}` as "h2" | "h3";
  const headingClasses = {
    2: "text-3xl font-bold mb-6 mt-12 first:mt-0",
    3: "text-2xl font-semibold mb-4 mt-8",
  };

  return (
    <section className="my-8">
      {createElement(HeadingTag, { className: headingClasses[level] }, title)}
      <div className="prose prose-lg max-w-none dark:prose-invert">
        {children}
      </div>
    </section>
  );
}

