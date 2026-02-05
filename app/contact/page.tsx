import { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { ContactForm } from "@/components/contact/ContactForm";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/components/ui/Button";
import { ContactInfo } from "@/components/contact/ContactInfo";

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
    <div className="w-full">
      <AnimatedSection className="py-section-lg">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 space-y-6 text-center max-w-2xl mx-auto">
              <TextReveal as="h1" delay={0.1}>
                Get in Touch
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  {siteConfig.contact.message}
                </p>
              </TextReveal>
            </div>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Form */}
              <AnimatedSection delay={0.3}>
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
                  <ContactForm />
                </div>
              </AnimatedSection>

              {/* Contact Info */}
              <AnimatedSection delay={0.4}>
                <ContactInfo />
              </AnimatedSection>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}

