import { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact",
  description: siteConfig.contact.message,
  openGraph: {
    title: "Contact",
    description: siteConfig.contact.message,
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Get in Touch</h1>
          <p className="text-lg text-foreground/80">
            {siteConfig.contact.message}
          </p>
        </div>

        <div className="space-y-8 rounded-lg border border-foreground/10 bg-foreground/5 p-8">
          <div>
            <h2 className="mb-4 text-2xl font-semibold">Email</h2>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-lg text-foreground/80 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 rounded"
            >
              {siteConfig.contact.email}
            </a>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold">Social</h2>
            <ul className="space-y-2">
              {siteConfig.links.twitter && (
                <li>
                  <a
                    href={siteConfig.links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-foreground/80 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 rounded"
                  >
                    Twitter →
                  </a>
                </li>
              )}
              {siteConfig.links.linkedin && (
                <li>
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-foreground/80 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 rounded"
                  >
                    LinkedIn →
                  </a>
                </li>
              )}
              {siteConfig.links.github && (
                <li>
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-foreground/80 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 rounded"
                  >
                    GitHub →
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div className="pt-4">
            <Button
              href={`mailto:${siteConfig.contact.email}`}
              variant="primary"
            >
              Send Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

