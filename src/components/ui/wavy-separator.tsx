import { cn } from "@/lib/utils";

interface WavySeparatorProps {
  className?: string;
  rotated?: boolean;
  variant?: "default" | "subtle" | "bold";
  height?: "sm" | "md" | "lg" | "xl";
}

export function WavySeparator({
  className,
  rotated = false,
  variant = "default",
  height = "md",
}: WavySeparatorProps) {
  const heightClasses = {
    sm: "h-16 md:h-20",
    md: "h-24 md:h-32",
    lg: "h-32 md:h-40",
    xl: "h-40 md:h-48",
  };

  const variantClasses = {
    default: "fill-muted/20",
    subtle: "fill-muted/10",
    bold: "fill-muted/30",
  };

  return (
    <div
      className={cn(
        "w-full overflow-hidden relative",
        heightClasses[height],
        rotated && "transform rotate-180"
      )}
    >
      <svg
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-full h-full", variantClasses[variant], className)}
        preserveAspectRatio="none"
      >
        <path d="M0,160L48,181.3C96,203,192,245,288,240C384,235,480,181,576,149.3C672,117,768,107,864,128C960,149,1056,203,1152,208C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </div>
  );
}

// Komponen WavySeparator dengan variasi path yang berbeda
export function WavySeparatorSmooth({
  className,
  rotated = false,
  variant = "default",
  height = "md",
}: WavySeparatorProps) {
  const heightClasses = {
    sm: "h-16 md:h-20",
    md: "h-24 md:h-32",
    lg: "h-32 md:h-40",
    xl: "h-40 md:h-48",
  };

  const variantClasses = {
    default: "fill-muted/20",
    subtle: "fill-muted/10",
    bold: "fill-muted/30",
  };

  return (
    <div
      className={cn(
        "w-full overflow-hidden relative",
        heightClasses[height],
        rotated && "transform rotate-180"
      )}
    >
      <svg
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-full h-full", variantClasses[variant], className)}
        preserveAspectRatio="none"
      >
        <path d="M0,192L60,202.7C120,213,240,235,360,229.3C480,224,600,192,720,181.3C840,171,960,181,1080,197.3C1200,213,1320,235,1380,245.3L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
      </svg>
    </div>
  );
}

// Komponen WavySeparator dengan gelombang lebih dinamis
export function WavySeparatorDynamic({
  className,
  rotated = false,
  variant = "default",
  height = "md",
}: WavySeparatorProps) {
  const heightClasses = {
    sm: "h-16 md:h-20",
    md: "h-24 md:h-32",
    lg: "h-32 md:h-40",
    xl: "h-40 md:h-48",
  };

  const variantClasses = {
    default: "fill-muted/20",
    subtle: "fill-muted/10",
    bold: "fill-muted/30",
  };

  return (
    <div
      className={cn(
        "w-full overflow-hidden relative",
        heightClasses[height],
        rotated && "transform rotate-180"
      )}
    >
      <svg
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-full h-full", variantClasses[variant], className)}
        preserveAspectRatio="none"
      >
        <path d="M0,96L40,117.3C80,139,160,181,240,192C320,203,400,181,480,154.7C560,128,640,96,720,106.7C800,117,880,171,960,170.7C1040,171,1120,117,1200,122.7C1280,128,1360,192,1400,224L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
      </svg>
    </div>
  );
}
