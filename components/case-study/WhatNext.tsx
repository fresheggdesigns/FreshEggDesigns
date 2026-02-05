import { ReactNode } from "react";

interface WhatNextProps {
  children: ReactNode;
}

export function WhatNext({ children }: WhatNextProps) {
  return (
    <section className="my-12 rounded-lg border border-foreground/20 bg-foreground/5 p-8">
      <h2 className="text-2xl font-semibold mb-4">What I'd Do Next</h2>
      <div className="prose prose-lg max-w-none dark:prose-invert">
        {children}
      </div>
    </section>
  );
}

