import { testimonialsAPI } from "@/lib/api";
import { useEffect, useState } from "react";

interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  position_id: string;
  position_en: string;
  imageUrl: string | null;
  testimonial_id: string;
  testimonial_en: string;
  createdAt: string;
  updatedAt: string;
  position: string;
  testimonial: string;
}

interface UseTestimonialsDataReturn {
  testimonials: Testimonial[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useTestimonialsData = (): UseTestimonialsDataReturn => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await testimonialsAPI.getAll();
      setTestimonials((response.data as Testimonial[]) || []);
    } catch (err) {
      console.error("Error fetching testimonials data:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch testimonials data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    testimonials,
    loading,
    error,
    refetch: fetchData,
  };
};
