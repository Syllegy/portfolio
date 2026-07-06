import { Briefcase, GraduationCap, FolderOpen } from "lucide-react";
import { timeline, type TimelineItem } from "@/data/timeline";
import { cn } from "@/lib/utils";
import { AnimateIn } from "./AnimateIn";

const icons = {
  work: Briefcase,
  education: GraduationCap,
  project: FolderOpen,
};

const colors = {
  work: "text-primary bg-primary/10 border-primary/20",
  education: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
  project: "text-purple-500 bg-purple-500/10 border-purple-500/20",
};

interface TimelineProps {
  preview?: boolean;
}

export function Timeline({ preview = false }: TimelineProps) {
  const items: TimelineItem[] = preview ? timeline.slice(0, 3) : timeline;

  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden sm:block" />

      <div className="space-y-8">
        {items.map((item, idx) => {
          const Icon = icons[item.type];

          return (
            <AnimateIn key={idx} delay={idx * 0.1} direction="left">
              <div className="sm:pl-16 relative">
                <div className={cn(
                  "absolute left-0 top-1 w-12 h-12 rounded-xl border flex items-center justify-center hidden sm:flex",
                  colors[item.type]
                )}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="bg-card border border-border rounded-xl p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-bold text-base">{item.title}</h3>
                      {item.company && (
                        <p className="text-sm text-primary font-medium">{item.company}</p>
                      )}
                    </div>
                    <span className="text-xs font-mono text-muted-foreground bg-muted px-2.5 py-1 rounded-full whitespace-nowrap">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </AnimateIn>
          );
        })}
      </div>
    </div>
  );
}
