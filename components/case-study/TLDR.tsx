import { ReactNode } from "react";

interface TLDRProps {
  children: ReactNode;
  impact?: string;
}

export function TLDR({ children, impact }: TLDRProps) {
  return (
    <div className="my-12 rounded-lg border-l-4 border-foreground bg-foreground/5 p-6">
      <h3 className="text-xl font-semibold mb-3">TL;DR / Impact</h3>
      <div className="prose prose-lg max-w-none dark:prose-invert">
        {children}
      </div>
      {impact && (
        <div className="mt-4 pt-4 border-t border-foreground/10">
          <p className="text-sm font-medium text-foreground/70 mb-1">Key Impact</p>
          <p className="text-base text-foreground">{impact}</p>
        </div>
      )}
    </div>
  );
}

