import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AnimateIn } from "@/components/AnimateIn";
import { projects, getProjectBySlug } from "@/data/projects";

export const dynamicParams = false;

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
      <AnimateIn className="mb-8">
        <Button asChild variant="ghost" size="sm" className="gap-2 -ml-2">
          <Link href="/projects">
            <ArrowLeft className="w-4 h-4" />
            Professional Work
          </Link>
        </Button>
      </AnimateIn>

      <AnimateIn className="mb-10">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{project.category}</Badge>
            {project.ongoing && (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400/90">
                maintaining
                <span className="inline-block w-[4px] h-[12px] bg-emerald-400/80 animate-pulse translate-y-[1px]" />
              </span>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{project.title}</h1>
          <p className="text-xl text-foreground/75 leading-relaxed">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="text-xs px-2.5 py-1 bg-muted rounded text-foreground/60 font-normal">
                {tech}
              </span>
            ))}
          </div>

          {project.liveUrl && (
            <div>
              <Button asChild size="sm" className="gap-2">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  View Live Site
                </a>
              </Button>
            </div>
          )}
        </div>
      </AnimateIn>

      {project.image && (
        <AnimateIn className="mb-12">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-sm overflow-hidden group"
            aria-label={`Visit ${project.title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={`${project.title} homepage screenshot`}
              className="w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="flex items-center justify-between px-4 py-2.5 bg-muted text-xs text-foreground/60">
              <span className="font-mono truncate">{project.liveUrl}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-2" />
            </div>
          </a>
        </AnimateIn>
      )}

      <Separator className="mb-12" />

      <div className="space-y-14">
        <AnimateIn>
          <section>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-foreground/75 leading-relaxed">{project.longDescription}</p>
          </section>
        </AnimateIn>

        <AnimateIn delay={0.05}>
          <section>
            <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
            <p className="text-foreground/75 leading-relaxed">{project.problem}</p>
          </section>
        </AnimateIn>

        <AnimateIn delay={0.05}>
          <section>
            <h2 className="text-2xl font-bold mb-4">My Approach</h2>
            <p className="text-foreground/75 leading-relaxed">{project.solution}</p>
          </section>
        </AnimateIn>

        <AnimateIn delay={0.05}>
          <section>
            <h2 className="text-2xl font-bold mb-5">Key Contributions</h2>
            <ul className="space-y-3">
              {project.contributions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-foreground/75 leading-relaxed text-sm">{item}</p>
                </li>
              ))}
            </ul>
          </section>
        </AnimateIn>

        <AnimateIn delay={0.05}>
          <section>
            <h2 className="text-2xl font-bold mb-5">Challenges Addressed</h2>
            <ul className="space-y-3">
              {project.challenges.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-foreground/40 shrink-0 mt-0.5" />
                  <p className="text-foreground/75 leading-relaxed text-sm">{item}</p>
                </li>
              ))}
            </ul>
          </section>
        </AnimateIn>

        <AnimateIn delay={0.05}>
          <section>
            <h2 className="text-2xl font-bold mb-5">Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.results.map((result, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-card rounded-sm p-4"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground/75 leading-relaxed">{result}</p>
                </div>
              ))}
            </div>
          </section>
        </AnimateIn>
      </div>

      <Separator className="my-12" />

      <AnimateIn>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg">Interested in working together?</h3>
            <p className="text-foreground/60 text-sm mt-1">
              I&apos;m available for new freelance projects.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Button asChild size="sm">
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href="/projects">All Work</Link>
            </Button>
          </div>
        </div>
      </AnimateIn>
    </div>
  );
}
