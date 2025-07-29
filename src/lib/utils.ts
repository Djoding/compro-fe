import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to get full image URL from relative path
export function getImageUrl(imagePath: string): string {
  if (!imagePath) return '/placeholder.png';
  if (imagePath.startsWith('http')) return imagePath;
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
  const baseUrl = API_BASE_URL.replace('/api', '');
  
  return `${baseUrl}${imagePath}`;
}
