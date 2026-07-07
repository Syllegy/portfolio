import { Code, Wrench, Search, Zap, ShoppingBag, Settings } from "lucide-react";
import { services } from "@/data/services";
import { AnimateIn } from "./AnimateIn";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  Wrench,
  Search,
  Zap,
  ShoppingBag,
  Settings,
};

export function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {services.map((service, idx) => {
        const Icon = iconMap[service.icon];
        return (
          <AnimateIn key={service.title} delay={idx * 0.07} direction="up">
            <div className="bg-card rounded-sm p-6 h-full transition-colors duration-200">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                {Icon && <Icon className="w-5 h-5 text-primary" />}
              </div>
              <h3 className="font-semibold text-base mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          </AnimateIn>
        );
      })}
    </div>
  );
}
