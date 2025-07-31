# Design System Implementation Guide

## WavySeparator Component

### Basic Usage

```tsx
import { WavySeparator, WavySeparatorSmooth, WavySeparatorDynamic } from "@/components/ui/wavy-separator";

// Basic wavy separator
<WavySeparator />

// With custom styling
<WavySeparator className="fill-primary/20" height="lg" />

// Rotated (for inverted effect)
<WavySeparator rotated className="fill-muted/10" />

// Different variants
<WavySeparatorSmooth variant="subtle" height="md" />
<WavySeparatorDynamic variant="bold" height="xl" />
```

### Props

- `className?: string` - Additional CSS classes
- `rotated?: boolean` - Rotates the separator 180 degrees
- `variant?: "default" | "subtle" | "bold"` - Controls opacity
- `height?: "sm" | "md" | "lg" | "xl"` - Controls separator height

### Example Implementation Between Sections

```tsx
export function HomePage() {
  return (
    <>
      {/* Section 1 */}
      <section className="bg-background py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1>Hero Section</h1>
        </div>
      </section>

      {/* Wavy Separator */}
      <WavySeparator className="fill-muted/20" />

      {/* Section 2 */}
      <section className="bg-muted/20 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2>Services Section</h2>
        </div>
      </section>

      {/* Rotated Wavy Separator */}
      <WavySeparatorSmooth rotated className="fill-primary/10" />

      {/* Section 3 */}
      <section className="bg-gradient-to-r from-primary to-accent py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2>CTA Section</h2>
        </div>
      </section>
    </>
  );
}
```

## Consistent Card Heights

### Grid Implementation

```tsx
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

function ServicesGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service) => (
        <Card key={service.id} className="h-full flex flex-col group">
          <CardHeader>
            <CardTitle className="group-hover:text-primary transition-colors">
              {service.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-grow">
            <CardDescription>{service.description}</CardDescription>
          </CardContent>

          <CardFooter>
            <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              Learn More
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
```

### Key CSS Classes for Consistent Heights

1. **Grid Container**: `grid md:grid-cols-2 lg:grid-cols-3 gap-8`
2. **Card**: `h-full flex flex-col`
   - `h-full`: Makes card fill the full height of grid cell
   - `flex flex-col`: Enables vertical flex layout
3. **Content**: `flex-grow`
   - Pushes footer to bottom when content varies
4. **Hover Effects**: `group` on Card, `group-hover:` on children

## Enhanced Card Hover Effects

The Card component now includes these modern hover effects:

```css
/* Built into Card component */
hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out
```

### Additional Hover Classes for Specific Use Cases

```tsx
// For service cards
<Card className="group hover:border-primary/50 hover:bg-card/80 backdrop-blur-sm">

// For team member cards
<Card className="group hover:scale-105 hover:shadow-2xl hover:shadow-primary/10">

// For portfolio cards
<Card className="group overflow-hidden hover:shadow-xl hover:-translate-y-2">
```

## Color System Usage

Always use CSS variables instead of hardcoded colors:

```tsx
// ✅ Correct - Using CSS variables
<div className="bg-primary text-primary-foreground">
<div className="bg-muted/20 text-muted-foreground">
<div className="border-border bg-card">

// ❌ Incorrect - Hardcoded colors
<div className="bg-purple-500 text-white">
<div className="bg-gray-100 text-gray-600">
```

## Typography System

```tsx
// Headings - Use font-heading (Manrope)
<h1 className="text-4xl lg:text-6xl font-heading font-bold">
<h2 className="text-3xl lg:text-4xl font-heading font-semibold">

// Body text - Use font-sans (Inter) - default
<p className="text-lg text-muted-foreground">
<span className="text-sm text-foreground">
```

## Responsive Breakpoints

```tsx
// Mobile first approach
<div className="text-lg md:text-xl lg:text-2xl">
<div className="p-4 md:p-6 lg:p-8">
<div className="grid md:grid-cols-2 lg:grid-cols-3">
```

## Animation Best Practices

```tsx
// Smooth transitions
<div className="transition-all duration-300 ease-in-out">

// Hover transforms
<div className="hover:-translate-y-1 hover:scale-105">

// Group hover effects
<div className="group">
  <span className="group-hover:text-primary transition-colors">
</div>
```
