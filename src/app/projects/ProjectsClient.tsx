"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { AnimateIn } from "@/components/AnimateIn";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectsClientProps {
  projects: Project[];
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTech, setActiveTech] = useState("");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category))).sort()],
    [projects]
  );
  const technologies = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.technologies))).sort(),
    [projects]
  );

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.technologies.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesTech = !activeTech || p.technologies.includes(activeTech);
      return matchesSearch && matchesCategory && matchesTech;
    });
  }, [projects, search, activeCategory, activeTech]);

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("All");
    setActiveTech("");
  };

  const hasFilters = search || activeCategory !== "All" || activeTech;

  return (
    <div>
      {/* Filters */}
      <div className="space-y-4 mb-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search projects or technologies…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-9"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-muted-foreground mr-1">Filter by tech:</span>
          {technologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setActiveTech((v) => (v === tech ? "" : tech))}
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-medium border transition-colors",
                activeTech === tech
                  ? "border-primary text-primary bg-primary/10"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {tech}
            </button>
          ))}
        </div>

        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1.5 text-muted-foreground">
            <X className="w-3.5 h-3.5" />
            Clear filters
          </Button>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-6">
        Showing {filtered.length} of {projects.length} projects
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg font-medium">No projects found</p>
          <p className="text-sm mt-2">Try adjusting your filters</p>
          <Button variant="ghost" className="mt-4" onClick={clearFilters}>
            Clear all filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, idx) => (
            <AnimateIn key={project.slug} delay={idx * 0.05} direction="up">
              <ProjectCard project={project} />
            </AnimateIn>
          ))}
        </div>
      )}
    </div>
  );
}
