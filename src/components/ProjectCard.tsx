import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group flex flex-col h-full overflow-hidden bg-card rounded-sm transition-all duration-200 hover:-translate-y-1">
      {/* Image */}
      <Link
        href={`/projects/${project.slug}`}
        // Matches the ~1.9:1 aspect ratio of the actual screenshots (rather than a
        // fixed pixel height), so object-cover doesn't have to crop more off the
        // sides than the source images than intended at different card widths.
        className="relative aspect-[1024/535] overflow-hidden bg-muted shrink-0 block"
        aria-label={`View ${project.title} case study`}
      >
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-foreground/60/30 text-sm font-medium">
              {project.title}
            </span>
          </div>
        )}
        {project.ongoing && (
          <span className="absolute top-3 left-3 text-[11px] font-semibold px-2 py-1 rounded bg-emerald-500/90 text-white">
            Ongoing
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <Link href={`/projects/${project.slug}`}>
            <h3 className="font-bold text-base leading-snug group-hover:text-primary transition-colors">
              {project.title}
            </h3>
          </Link>
          <Badge variant="secondary" className="text-xs shrink-0">
            {project.category}
          </Badge>
        </div>

        <p className="text-sm text-foreground/75 leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((tech) => (
            <span key={tech} className="text-xs px-2 py-0.5 bg-muted rounded text-foreground/60">
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="text-xs px-2 py-0.5 bg-muted rounded text-foreground/60">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        <div className="mt-5 flex items-center gap-2">
          <Button asChild size="sm" className="flex-1 gap-1.5">
            <Link href={`/projects/${project.slug}`}>
              Case Study
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
          {project.liveUrl && (
            <Button asChild size="sm" variant="ghost" className="w-9 h-9 p-0">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="View live site">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
