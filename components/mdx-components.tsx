import { CaseStudyImage } from "@/components/case-study/CaseStudyImage";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { TLDR } from "@/components/case-study/TLDR";
import { WhatNext } from "@/components/case-study/WhatNext";

/**
 * MDX components available in case study MDX files
 * Usage in MDX:
 * 
 * <CaseStudyImage src="/images/example.jpg" alt="Example" caption="Example image" zoomable />
 * <CaseStudySection title="Context">Content here</CaseStudySection>
 * <TLDR>Quick summary</TLDR>
 * <WhatNext>Future plans</WhatNext>
 */
export const mdxComponents = {
  CaseStudyImage,
  CaseStudySection,
  TLDR,
  WhatNext,
  // Allow standard HTML elements
  img: CaseStudyImage,
};

