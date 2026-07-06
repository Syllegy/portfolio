import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AnimateIn } from "@/components/AnimateIn";
import { projects, getProjectBySlug } from "@/data/projects";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
      {/* Back */}
      <AnimateIn className="mb-8">
        <Button asChild variant="ghost" size="sm" className="gap-2 -ml-2">
          <Link href="/projects">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </Button>
      </AnimateIn>

      {/* Header */}
      <AnimateIn className="mb-10">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{project.category}</Badge>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{project.title}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">{project.description}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {project.liveUrl && (
              <Button asChild size="sm" className="gap-2">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  Live Site
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild size="sm" variant="outline" className="gap-2">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <GitHubIcon className="w-4 h-4" />
                  View Code
                </a>
              </Button>
            )}
          </div>
        </div>
      </AnimateIn>

      <Separator className="mb-10" />

      {/* Case study sections */}
      <div className="space-y-14">
        <AnimateIn>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">The Problem</h2>
            <p className="text-muted-foreground leading-relaxed text-base">{project.problem}</p>
          </section>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">The Solution</h2>
            <p className="text-muted-foreground leading-relaxed text-base">{project.solution}</p>
          </section>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <section>
            <h2 className="text-2xl font-bold mb-5 text-primary">Implementation</h2>
            <ul className="space-y-3">
              {project.implementation.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-muted-foreground leading-relaxed">{step}</p>
                </li>
              ))}
            </ul>
          </section>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <section>
            <h2 className="text-2xl font-bold mb-5 text-primary">Outcomes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.outcomes.map((outcome, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-card border border-border rounded-xl p-4"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed">{outcome}</p>
                </div>
              ))}
            </div>
          </section>
        </AnimateIn>
      </div>

      <Separator className="my-12" />

      {/* Other projects */}
      <AnimateIn>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg">Interested in working together?</h3>
            <p className="text-muted-foreground text-sm mt-1">I&apos;m currently available for new projects.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Button asChild size="sm">
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href="/projects">More Projects</Link>
            </Button>
          </div>
        </div>
      </AnimateIn>
    </div>
  );
}
