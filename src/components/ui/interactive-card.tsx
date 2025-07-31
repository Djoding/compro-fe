import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Eye, Heart, Share2, Star } from "lucide-react";
import React, { useState } from "react";

interface InteractiveCardProps {
  readonly title: string;
  readonly description: string;
  readonly image?: string;
  readonly icon?: React.ReactNode;
  readonly price?: string;
  readonly rating?: number;
  readonly category?: string;
  readonly features?: string[];
  readonly onAction?: () => void;
  readonly actionLabel?: string;
  readonly className?: string;
  readonly size?: "sm" | "md" | "lg";
}

export function InteractiveCard({
  title,
  description,
  image,
  icon,
  price,
  rating,
  category,
  features,
  onAction,
  actionLabel = "Learn More",
  className,
  size = "md",
}: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [viewCount, setViewCount] = useState(
    Math.floor(Math.random() * 1000) + 100
  );

  const sizeClasses = {
    sm: "h-80",
    md: "h-96",
    lg: "h-[28rem]",
  };

  const handleView = () => {
    setViewCount((prev) => prev + 1);
    onAction?.();
  };

  const cardVariants = {
    rest: {
      scale: 1,
      rotateY: 0,
      z: 0,
    },
    hover: {
      scale: 1.02,
      rotateY: 5,
      z: 50,
    },
  };

  const contentVariants = {
    rest: { opacity: 1, y: 0 },
    hover: { opacity: 1, y: -5 },
  };

  const overlayVariants = {
    rest: { opacity: 0, scale: 0.8 },
    hover: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      className={cn(
        "group relative perspective-1000",
        sizeClasses[size],
        className
      )}
      initial="rest"
      whileHover="hover"
      animate={isHovered ? "hover" : "rest"}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        variants={cardVariants}
        className="h-full w-full transform-gpu"
      >
        <Card className="h-full flex flex-col overflow-hidden border-0 shadow-lg bg-gradient-to-br from-card/80 to-card backdrop-blur-sm relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-transparent to-accent" />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 80%, hsl(var(--primary)) 0%, transparent 50%), 
                               radial-gradient(circle at 80% 20%, hsl(var(--accent)) 0%, transparent 50%)`,
              }}
            />
          </div>

          {/* Interactive Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                variants={overlayVariants}
                initial="rest"
                animate="hover"
                exit="rest"
                className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none z-10"
              />
            )}
          </AnimatePresence>

          {/* Header with Image/Icon */}
          <CardHeader className="relative z-20 pb-3">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                {category && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge
                      variant="secondary"
                      className="mb-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all duration-300"
                    >
                      {category}
                    </Badge>
                  </motion.div>
                )}

                {/* Icon or Image */}
                <div className="w-14 h-14 mb-4 relative">
                  {image ? (
                    <motion.div
                      className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      className="w-full h-full rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xl"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                    >
                      {icon}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className={cn(
                    "p-2 rounded-full transition-all duration-300",
                    isLiked
                      ? "bg-red-100 text-red-500"
                      : "bg-muted/50 text-muted-foreground hover:bg-red-100 hover:text-red-500"
                  )}
                >
                  <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300"
                >
                  <Share2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Title */}
            <motion.h3
              variants={contentVariants}
              className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2"
            >
              {title}
            </motion.h3>

            {/* Rating */}
            {rating && (
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={`star-${rating}-${i}`}
                      className={cn(
                        "w-4 h-4",
                        i < rating
                          ? "text-yellow-400 fill-current"
                          : "text-muted-foreground"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({rating}/5)
                </span>
              </div>
            )}
          </CardHeader>

          {/* Content */}
          <CardContent className="flex-grow relative z-20 pb-4">
            <motion.p
              variants={contentVariants}
              className="text-muted-foreground leading-relaxed mb-4 line-clamp-3"
            >
              {description}
            </motion.p>

            {/* Features */}
            {features && features.length > 0 && (
              <motion.div variants={contentVariants} className="space-y-2">
                {features.slice(0, 3).map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center text-sm text-muted-foreground"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                    {feature}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </CardContent>

          {/* Footer */}
          <CardFooter className="relative z-20 pt-4 flex flex-col gap-3">
            {/* Price and Stats */}
            <div className="flex items-center justify-between w-full text-sm">
              {price && (
                <motion.span
                  className="font-bold text-primary text-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  {price}
                </motion.span>
              )}
            </div>

            {/* Action Button */}
            <motion.div
              className="w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleView}
                className="w-full group/btn bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300"
                size="lg"
              >
                <span className="mr-2">{actionLabel}</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
          </CardFooter>

          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
            animate={
              isHovered ? { translateX: "200%" } : { translateX: "-100%" }
            }
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ transform: "skewX(-25deg)" }}
          />
        </Card>
      </motion.div>
    </motion.div>
  );
}

// Grid Container untuk konsistensi ukuran
export function InteractiveCardGrid({
  children,
  columns = 3,
  gap = 8,
  className,
}: {
  readonly children: React.ReactNode;
  readonly columns?: 1 | 2 | 3 | 4;
  readonly gap?: number;
  readonly className?: string;
}) {
  const gridClasses = {
    1: "grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div className={cn("grid", gridClasses[columns], `gap-${gap}`, className)}>
      {children}
    </div>
  );
}
