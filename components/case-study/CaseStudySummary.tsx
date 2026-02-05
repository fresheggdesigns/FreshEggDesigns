"use client";

import { ProjectFrontmatter } from "@/lib/projects";
import { useEffect, useState } from "react";

interface CaseStudySummaryProps {
  frontmatter: ProjectFrontmatter;
  role?: string;
  team?: string;
  timeline?: string;
  tools?: string[];
  platforms?: string[];
  outcomes?: string[];
}

export function CaseStudySummary({
  frontmatter,
  role,
  team,
  timeline,
  tools,
  platforms,
  outcomes,
}: CaseStudySummaryProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const summary = document.getElementById("case-study-summary");
      if (summary) {
        const rect = summary.getBoundingClientRect();
        setIsSticky(rect.top <= 20);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const displayRole = role || frontmatter.role;
  const displayTimeline = timeline || frontmatter.timeframe;
  const displayTools = tools || frontmatter.tools || [];

  return (
    <aside
      id="case-study-summary"
      className={`lg:sticky lg:top-6 h-fit transition-all duration-200 ${
        isSticky ? "lg:shadow-lg" : ""
      }`}
    >
      <div className="rounded-lg border border-foreground/10 bg-background/95 backdrop-blur-sm p-6 space-y-6">
        <h2 className="text-lg font-semibold text-foreground">Case Study Summary</h2>
        
        <dl className="space-y-5 text-sm">
          {displayRole && (
            <div>
              <dt className="font-medium text-foreground/70 mb-1">Role</dt>
              <dd className="text-foreground">{displayRole}</dd>
            </div>
          )}

          {team && (
            <div>
              <dt className="font-medium text-foreground/70 mb-1">Team</dt>
              <dd className="text-foreground">{team}</dd>
            </div>
          )}

          {displayTimeline && (
            <div>
              <dt className="font-medium text-foreground/70 mb-1">Timeline</dt>
              <dd className="text-foreground">{displayTimeline}</dd>
            </div>
          )}

          {displayTools.length > 0 && (
            <div>
              <dt className="font-medium text-foreground/70 mb-1">Tools</dt>
              <dd className="text-foreground">
                <ul className="list-disc list-inside space-y-1">
                  {displayTools.map((tool, idx) => (
                    <li key={idx}>{tool}</li>
                  ))}
                </ul>
              </dd>
            </div>
          )}

          {platforms && platforms.length > 0 && (
            <div>
              <dt className="font-medium text-foreground/70 mb-1">Platforms</dt>
              <dd className="text-foreground">
                <ul className="list-disc list-inside space-y-1">
                  {platforms.map((platform, idx) => (
                    <li key={idx}>{platform}</li>
                  ))}
                </ul>
              </dd>
            </div>
          )}

          {outcomes && outcomes.length > 0 && (
            <div>
              <dt className="font-medium text-foreground/70 mb-1">Outcomes</dt>
              <dd className="text-foreground">
                <ul className="list-disc list-inside space-y-1">
                  {outcomes.map((outcome, idx) => (
                    <li key={idx}>{outcome}</li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </aside>
  );
}

