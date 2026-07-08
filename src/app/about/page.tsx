import type { Metadata } from "next";
import { MapPin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Timeline } from "@/components/Timeline";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimateIn } from "@/components/AnimateIn";
import { GitHubIcon } from "@/components/icons";
import { PagePlanet } from "@/components/PagePlanet";
import { personal } from "@/data/personal";

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${personal.name}, a ${personal.title}.`,
};

export default function AboutPage() {
  return (
    <div className="relative">
      {/* Margin accent planet — only shown once there's real space beside the content column, so it never overlaps text. */}
      <PagePlanet
        variant="aboutAccent"
        seed={2}
        className="hidden xl:block absolute top-48 left-6 w-16 h-16 opacity-90"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <PagePlanet
          variant="about"
          className="absolute -top-4 right-2 sm:right-16 w-24 h-24 sm:w-36 sm:h-36"
        />
        <AnimateIn className="mb-16">
          <SectionHeading
            title="About Me"
            subtitle="The story behind the work."
          />
        </AnimateIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
        <AnimateIn className="lg:col-span-2 space-y-5" direction="right">
          {personal.bio.split("\n\n").map((para, idx) => (
            <p key={idx} className="text-foreground/60 leading-relaxed">
              {para}
            </p>
          ))}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild className="gap-2">
              <a href={`mailto:${personal.email}`}>
                <Mail className="w-4 h-4" />
                Get in Touch
              </a>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <a href={personal.github} target="_blank" rel="noopener noreferrer">
                <GitHubIcon className="w-4 h-4" />
                GitHub
              </a>
            </Button>
          </div>
        </AnimateIn>

        <AnimateIn direction="left" delay={0.15}>
          <div className="bg-card rounded-sm p-6 space-y-5">
            <h3 className="font-semibold text-base">Quick Info</h3>
            <Separator />
            <dl className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <dt className="text-foreground/60 text-xs uppercase tracking-wide mb-0.5">Location</dt>
                  <dd className="font-medium">{personal.location}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <dt className="text-foreground/60 text-xs uppercase tracking-wide mb-0.5">Email</dt>
                  <dd>
                    <a
                      href={`mailto:${personal.email}`}
                      className="font-medium hover:text-primary transition-colors break-all"
                    >
                      {personal.email}
                    </a>
                  </dd>
                </div>
              </div>
            </dl>

            <Separator />
            <div>
              <h4 className="text-xs uppercase tracking-wide text-foreground/60 mb-3">Focus Areas</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Web Development",
                  "Technical SEO",
                  "Shopify",
                  "WordPress",
                  "Performance",
                  "Bug Fixes",
                  "Frontend",
                  "Maintenance",
                ].map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>

        <AnimateIn className="mb-10">
          <SectionHeading title="Experience" />
        </AnimateIn>
        <Timeline />
      </div>
    </div>
  );
}
