import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  icon?: LucideIcon;
  value: string | number;
  label: string;
  description?: string;
}

export default function StatCard({ icon: Icon, value, label, description }: StatCardProps) {
  return (
    <Card className="p-6 text-center hover-elevate">
      {Icon && (
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
            <Icon className="h-6 w-6 text-accent" />
          </div>
        </div>
      )}
      <div className="text-4xl md:text-5xl font-bold text-foreground mb-2" data-testid={`stat-value-${label.toLowerCase().replace(/\s+/g, '-')}`}>
        {value}
      </div>
      <div className="text-sm md:text-base uppercase tracking-wider font-semibold text-muted-foreground mb-1">
        {label}
      </div>
      {description && (
        <p className="text-xs text-muted-foreground mt-2">{description}</p>
      )}
    </Card>
  );
}
