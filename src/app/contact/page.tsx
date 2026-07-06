import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimateIn } from "@/components/AnimateIn";
import { personal } from "@/data/personal";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${personal.name} for freelance web development projects.`,
};

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <AnimateIn className="mb-12">
        <SectionHeading
          title="Let's Work Together"
          subtitle="Have a project in mind? I'd love to hear about it."
        />
      </AnimateIn>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Contact info */}
        <AnimateIn className="lg:col-span-2 space-y-6" direction="right">
          <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Info</h3>
              <dl className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground mb-0.5">Email</dt>
                    <dd>
                      <a
                        href={`mailto:${personal.email}`}
                        className="font-medium hover:text-primary transition-colors text-sm"
                      >
                        {personal.email}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground mb-0.5">Location</dt>
                    <dd className="font-medium text-sm">{personal.location}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground mb-0.5">Response Time</dt>
                    <dd className="font-medium text-sm">Within 24 hours</dd>
                  </div>
                </div>
              </dl>
            </div>

            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground mb-3">Find me on</p>
              <div className="flex gap-3">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <GitHubIcon className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <LinkedInIcon className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-cyan-500/10 border border-primary/20 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-semibold">{personal.availability}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              I&apos;m taking on new freelance projects. Whether you need a full web app built from scratch or help with an existing codebase, let&apos;s talk.
            </p>
          </div>
        </AnimateIn>

        {/* Form */}
        <AnimateIn className="lg:col-span-3" delay={0.15}>
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
            <h3 className="font-bold text-lg mb-6">Send a Message</h3>
            <ContactForm />
          </div>
        </AnimateIn>
      </div>
    </div>
  );
}
