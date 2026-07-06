import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillsGrid } from "@/components/SkillsGrid";
import { Timeline } from "@/components/Timeline";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimateIn } from "@/components/AnimateIn";
import { getFeaturedProjects } from "@/data/projects";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      <Hero />

      {/* Featured Projects */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimateIn>
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <SectionHeading
                title="Featured Projects"
                subtitle="A selection of work I'm proud of."
              />
              <Button asChild variant="ghost" className="gap-1.5 shrink-0">
                <Link href="/projects">
                  All projects
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((project, idx) => (
              <AnimateIn key={project.slug} delay={idx * 0.1} direction="up">
                <ProjectCard project={project} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimateIn>
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <SectionHeading
                title="Core Skills"
                subtitle="Technologies and tools I work with daily."
              />
              <Button asChild variant="ghost" className="gap-1.5 shrink-0">
                <Link href="/skills">
                  All skills
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </AnimateIn>
          <SkillsGrid preview />
        </div>
      </section>

      {/* Timeline Preview */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimateIn>
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <SectionHeading
                title="Career Journey"
                subtitle="Where I've been and what I've built."
              />
              <Button asChild variant="ghost" className="gap-1.5 shrink-0">
                <Link href="/about">
                  Full story
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
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-cyan-500/10 border border-primary/20 p-10 sm:p-16 text-center">
              <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Ready to build something great?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                I&apos;m currently available for freelance projects. Let&apos;s discuss how I can help bring your idea to life.
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
