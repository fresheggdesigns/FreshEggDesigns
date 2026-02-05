import { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Resume",
  description: "Download my resume in PDF format.",
  openGraph: {
    title: "Resume",
    description: "Download my resume in PDF format.",
  },
};

export default function ResumePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl space-y-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Resume</h1>
        <p className="text-lg text-foreground/80">
          Download my resume to learn more about my experience, skills, and
          background.
        </p>
        <div className="pt-8">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground bg-foreground text-background hover:bg-foreground/90 px-6 py-3"
          >
            Download PDF
          </a>
        </div>
        <div className="pt-8">
          <iframe
            src="/resume.pdf"
            className="h-[600px] w-full rounded-lg border border-foreground/10"
            title="Resume PDF"
          />
        </div>
      </div>
    </div>
  );
}

