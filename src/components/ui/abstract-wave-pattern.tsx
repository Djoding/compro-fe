import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AbstractWavePatternProps {
  readonly variant?: "flowing" | "organic" | "geometric" | "fluid";
  readonly intensity?: "subtle" | "medium" | "strong";
  readonly className?: string;
  readonly animated?: boolean;
}

// Flowing Pattern Component
const FlowingPattern = ({
  intensity = "medium",
  animated = true
}: {
  readonly intensity?: "subtle" | "medium" | "strong";
  readonly animated?: boolean;
}) => {
  const opacityMap = {
    subtle: "opacity-5",
    medium: "opacity-10",
    strong: "opacity-20"
  };

  return (
    <motion.svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <defs>
        <linearGradient id="flowingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      <motion.path
        d="M0,400 Q200,200 400,350 T800,300 Q1000,250 1200,400 L1200,800 L0,800 Z"
        fill="url(#flowingGradient)"
        className={cn(opacityMap[intensity])}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />

      {animated && (
        <motion.path
          d="M0,500 Q300,300 600,450 T1200,400 L1200,800 L0,800 Z"
          fill="#3b82f6"
          className={cn(opacityMap[intensity])}
          animate={{
            d: [
              "M0,500 Q300,300 600,450 T1200,400 L1200,800 L0,800 Z",
              "M0,450 Q300,250 600,400 T1200,350 L1200,800 L0,800 Z",
              "M0,500 Q300,300 600,450 T1200,400 L1200,800 L0,800 Z"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.svg>
  );
};

// Organic Pattern Component
const OrganicPattern = ({
  intensity = "medium",
  animated = true
}: {
  readonly intensity?: "subtle" | "medium" | "strong";
  readonly animated?: boolean;
}) => {
  const opacityMap = {
    subtle: "opacity-5",
    medium: "opacity-10",
    strong: "opacity-20"
  };

  return (
    <motion.svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="organicGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
        </radialGradient>
      </defs>

      <motion.ellipse
        cx="300"
        cy="200"
        rx="200"
        ry="150"
        fill="url(#organicGradient)"
        className={cn(opacityMap[intensity])}
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: animated ? 360 : 0 }}
        transition={{
          duration: animated ? 20 : 2,
          repeat: animated ? Infinity : 0,
          ease: "linear"
        }}
      />

      <motion.ellipse
        cx="900"
        cy="600"
        rx="250"
        ry="180"
        fill="#3b82f6"
        className={cn(opacityMap[intensity])}
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: animated ? -360 : 0 }}
        transition={{
          duration: animated ? 25 : 2,
          repeat: animated ? Infinity : 0,
          ease: "linear"
        }}
      />
    </motion.svg>
  );
};

// Geometric Pattern Component
const GeometricPattern = ({
  intensity = "medium",
  animated = true
}: {
  readonly intensity?: "subtle" | "medium" | "strong";
  readonly animated?: boolean;
}) => {
  const opacityMap = {
    subtle: "opacity-5",
    medium: "opacity-10",
    strong: "opacity-20"
  };

  return (
    <motion.svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="geometricPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <polygon points="50,10 90,90 10,90" fill="#8b5cf6" className={cn(opacityMap[intensity])} />
        </pattern>
      </defs>

      <motion.rect
        width="100%"
        height="100%"
        fill="url(#geometricPattern)"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
      />

      {animated && (
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "600px 400px" }}
        >
          <motion.polygon
            points="600,100 700,300 500,300"
            fill="#3b82f6"
            className={cn(opacityMap[intensity])}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.g>
      )}
    </motion.svg>
  );
};

// Fluid Pattern Component
const FluidPattern = ({
  intensity = "medium",
  animated = true
}: {
  readonly intensity?: "subtle" | "medium" | "strong";
  readonly animated?: boolean;
}) => {
  const opacityMap = {
    subtle: "opacity-5",
    medium: "opacity-10",
    strong: "opacity-20"
  };

  return (
    <motion.svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="fluidFilter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
        </filter>
      </defs>

      <motion.circle
        cx="200"
        cy="150"
        r="100"
        fill="#8b5cf6"
        className={cn(opacityMap[intensity])}
        filter="url(#fluidFilter)"
        animate={
          animated
            ? {
                cx: [200, 400, 200],
                cy: [150, 300, 150],
                r: [100, 150, 100]
              }
            : {}
        }
        transition={{
          duration: 6,
          repeat: animated ? Infinity : 0,
          ease: "easeInOut"
        }}
      />

      <motion.circle
        cx="1000"
        cy="650"
        r="120"
        fill="#3b82f6"
        className={cn(opacityMap[intensity])}
        filter="url(#fluidFilter)"
        animate={
          animated
            ? {
                cx: [1000, 800, 1000],
                cy: [650, 450, 650],
                r: [120, 80, 120]
              }
            : {}
        }
        transition={{
          duration: 8,
          repeat: animated ? Infinity : 0,
          ease: "easeInOut"
        }}
      />
    </motion.svg>
  );
};

// Main Component
export function AbstractWavePattern({
  variant = "flowing",
  intensity = "medium",
  className,
  animated = true
}: AbstractWavePatternProps) {
  const PatternComponent = {
    flowing: FlowingPattern,
    organic: OrganicPattern,
    geometric: GeometricPattern,
    fluid: FluidPattern
  }[variant];

  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
      <PatternComponent intensity={intensity} animated={animated} />
    </div>
  );
}

// Connected Flowing Pattern for full page coverage
export function ConnectedFlowingPattern({
  animated = true,
  className
}: {
  readonly animated?: boolean;
  readonly className?: string;
}) {
  return (
    <div className={cn("fixed inset-0 pointer-events-none overflow-hidden z-0", className)}>
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
      >
        <defs>
          <linearGradient id="connectedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
            <stop offset="25%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="75%" stopColor="#8b5cf6" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
          </linearGradient>

          <filter id="connectedBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
        </defs>

        {/* Main flowing path */}
        <motion.path
          d="M0,0 Q300,200 600,100 T1200,150 L1200,0 Z"
          fill="url(#connectedGradient)"
          filter="url(#connectedBlur)"
          animate={
            animated
              ? {
                  d: [
                    "M0,0 Q300,200 600,100 T1200,150 L1200,0 Z",
                    "M0,0 Q300,100 600,200 T1200,100 L1200,0 Z",
                    "M0,0 Q300,150 600,50 T1200,200 L1200,0 Z",
                    "M0,0 Q300,200 600,100 T1200,150 L1200,0 Z"
                  ]
                }
              : {}
          }
          transition={{
            duration: 15,
            repeat: animated ? Infinity : 0,
            ease: "easeInOut"
          }}
        />

        {/* Secondary flowing path */}
        <motion.path
          d="M0,800 Q300,600 600,700 T1200,650 L1200,800 Z"
          fill="url(#connectedGradient)"
          filter="url(#connectedBlur)"
          animate={
            animated
              ? {
                  d: [
                    "M0,800 Q300,600 600,700 T1200,650 L1200,800 Z",
                    "M0,800 Q300,700 600,600 T1200,700 L1200,800 Z",
                    "M0,800 Q300,650 600,750 T1200,600 L1200,800 Z",
                    "M0,800 Q300,600 600,700 T1200,650 L1200,800 Z"
                  ]
                }
              : {}
          }
          transition={{
            duration: 18,
            repeat: animated ? Infinity : 0,
            ease: "easeInOut"
          }}
        />

        {/* Diagonal connecting elements */}
        <motion.path
          d="M0,300 Q400,100 800,400 L800,500 Q400,200 0,400 Z"
          fill="#3b82f6"
          opacity="0.05"
          filter="url(#connectedBlur)"
          animate={
            animated
              ? {
                  d: [
                    "M0,300 Q400,100 800,400 L800,500 Q400,200 0,400 Z",
                    "M0,350 Q400,150 800,350 L800,450 Q400,250 0,450 Z",
                    "M0,300 Q400,100 800,400 L800,500 Q400,200 0,400 Z"
                  ]
                }
              : {}
          }
          transition={{
            duration: 12,
            repeat: animated ? Infinity : 0,
            ease: "easeInOut"
          }}
        />
      </motion.svg>
    </div>
  );
}
