import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GitHubIcon } from "./icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group flex flex-col h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <Link href={`/projects/${project.slug}`}>
              <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {project.title}
              </h3>
            </Link>
            <Badge variant="secondary" className="mt-2 text-xs">
              {project.category}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
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

      <CardFooter className="pt-0 flex items-center gap-2">
        <Button asChild size="sm" variant="default" className="flex-1">
          <Link href={`/projects/${project.slug}`} className="flex items-center gap-1.5">
            Case Study
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Button>
        {project.liveUrl && (
          <Button asChild size="sm" variant="outline" className="w-9 h-9 p-0">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live site">
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        )}
        {project.githubUrl && (
          <Button asChild size="sm" variant="outline" className="w-9 h-9 p-0">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub repository">
              <GitHubIcon className="w-4 h-4" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
