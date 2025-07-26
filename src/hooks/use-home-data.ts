"use client";

import { useState, useEffect } from "react";
import { homeAPI } from "@/lib/api";

interface Testimonial {
  id: string | number;
  name: string;
  position?: string;
  company?: string;
  content: string;
  rating?: number;
  image?: string;
}

interface Service {
  id: string | number;
  title: string;
  description?: string;
  icon?: string;
  image?: string;
  features?: string[];
}

interface Project {
  id: string | number;
  title: string;
  description?: string;
  image?: string;
  url?: string;
  technologies?: string[];
  category?: string;
  status?: string;
}

interface CompanyProfile {
  name?: string;
  description?: string;
  vision?: string;
  phone?: string;
  address?: string;
}

interface HomeData {
  testimonials: Testimonial[];
  companyProfile: CompanyProfile;
  services: Service[];
  projects: Project[];
}

export function useHomeData() {
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch data from backend - akan otomatis menggunakan language header
      const [testimonials, companyProfile, services, projects] =
        await Promise.all([
          homeAPI.getTestimonials(),
          homeAPI.getCompanyProfile(),
          homeAPI.getServices(),
          homeAPI.getProjects(),
        ]);

      setData({
        testimonials: Array.isArray(testimonials.data) ? testimonials.data : [],
        companyProfile: companyProfile.data || {},
        services: Array.isArray(services.data) ? services.data : [],
        projects: Array.isArray(projects.data) ? projects.data : [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
      console.error("Error fetching home data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}
