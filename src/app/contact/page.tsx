import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimateIn } from "@/components/AnimateIn";
import { personal } from "@/data/personal";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${personal.name} for freelance web development and technical SEO.`,
};

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <AnimateIn className="mb-12">
        <SectionHeading
          title="Get in Touch"
          subtitle="Have a project you'd like to discuss? I'd love to hear about it."
        />
      </AnimateIn>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <AnimateIn className="lg:col-span-2 space-y-6" direction="right">
          <h3 className="font-semibold text-base">Contact Info</h3>
          <dl className="space-y-5">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <dt className="text-xs text-muted-foreground mb-0.5">Email</dt>
                <dd>
                  <a
                    href={`mailto:${personal.email}`}
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    {personal.email}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <dt className="text-xs text-muted-foreground mb-0.5">Location</dt>
                <dd className="text-sm font-medium">{personal.location}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <dt className="text-xs text-muted-foreground mb-0.5">Response Time</dt>
                <dd className="text-sm font-medium">Within 24 hours</dd>
              </div>
            </div>
          </dl>

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-3">Also on</p>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <GitHubIcon className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </AnimateIn>

        <AnimateIn className="lg:col-span-3" delay={0.15}>
          <div className="bg-card border border-border rounded-sm p-6 sm:p-8">
            <h3 className="font-semibold text-base mb-6">Send a Message</h3>
            <ContactForm />
          </div>
        </AnimateIn>
      </div>
    </div>
  );
}
