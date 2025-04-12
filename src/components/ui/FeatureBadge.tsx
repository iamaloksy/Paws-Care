
import { cn } from "@/lib/utils";

interface FeatureBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "secondary" | "destructive";
  className?: string;
}

const FeatureBadge = ({
  children,
  variant = "default",
  className,
}: FeatureBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full transition-all duration-200",
        {
          "bg-pawscare-100 text-pawscare-800": variant === "default",
          "bg-transparent border border-pawscare-200 text-pawscare-800": variant === "outline",
          "bg-secondary text-secondary-foreground": variant === "secondary",
          "bg-destructive text-destructive-foreground": variant === "destructive",
        },
        className
      )}
    >
      {children}
    </span>
  );
};

export default FeatureBadge;
