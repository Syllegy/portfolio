import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group flex flex-col h-full overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-border/80">
      {/* Image / preview area */}
      <div className="relative aspect-video overflow-hidden bg-muted border-b border-border">
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-muted-foreground/30 text-sm font-medium">
              {project.title}
            </span>
          </div>
        )}
        {project.ongoing && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-xs font-semibold bg-background/90 backdrop-blur-sm text-green-500 border border-green-500/30 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Ongoing
          </span>
        )}
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/projects/${project.slug}`}>
            <h3 className="font-bold text-base leading-snug group-hover:text-primary transition-colors">
              {project.title}
            </h3>
          </Link>
          <Badge variant="secondary" className="text-xs shrink-0">
            {project.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pt-0">
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs font-normal">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 5 && (
            <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
              +{project.technologies.length - 5}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-4 flex items-center gap-2">
        <Button asChild size="sm" className="flex-1 gap-1.5">
          <Link href={`/projects/${project.slug}`}>
            Case Study
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Button>
        {project.liveUrl && (
          <Button asChild size="sm" variant="outline" className="w-9 h-9 p-0">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="View live site">
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
