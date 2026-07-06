import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export function SectionHeading({ title, subtitle, className, centered = false }: SectionHeadingProps) {
  return (
    <div className={cn(centered && "text-center", className)}>
      <div className={cn("flex items-center gap-3 mb-4", centered && "justify-center")}>
        <span className="block w-8 h-0.5 bg-primary rounded-full" />
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          {title}
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-muted-foreground text-lg max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
