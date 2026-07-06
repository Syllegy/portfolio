import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/Hero";
import { ServicesGrid } from "@/components/ServicesGrid";
import { SkillsGrid } from "@/components/SkillsGrid";
import { Timeline } from "@/components/Timeline";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimateIn } from "@/components/AnimateIn";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* What I Do */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimateIn className="mb-12">
            <SectionHeading
              title="What I Do"
              subtitle="Services I offer for clients looking to improve or build their web presence."
            />
          </AnimateIn>
          <ServicesGrid />
        </div>
      </section>

      {/* Skills Preview */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimateIn>
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <SectionHeading
                title="Technologies"
                subtitle="Tools and technologies I work with."
              />
              <Button asChild variant="ghost" className="gap-1.5 shrink-0">
                <Link href="/skills">
                  Full list
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </AnimateIn>
          <SkillsGrid preview />
        </div>
      </section>

      {/* Experience */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimateIn>
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <SectionHeading
                title="Experience"
                subtitle="Where I've worked and what I've been building."
              />
              <Button asChild variant="ghost" className="gap-1.5 shrink-0">
                <Link href="/about">
                  About me
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </AnimateIn>
          <Timeline preview />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimateIn>
            <div className="rounded-2xl border border-border bg-card p-10 sm:p-16 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Have a project in mind?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
                I&apos;m available for website development, repairs, technical SEO, and ongoing maintenance. Let&apos;s talk about what you need.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/contact">
                    Get in Touch
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/projects">View My Work</Link>
                </Button>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
