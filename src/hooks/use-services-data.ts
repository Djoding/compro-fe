import { servicesAPI } from "@/lib/api";
import { useEffect, useState } from "react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
  features?: string[];
  price?: string;
  category?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UseServicesDataReturn {
  services: Service[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useServicesData = (): UseServicesDataReturn => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await servicesAPI.getAll();
      setServices((response.data as Service[]) || []);
    } catch (err) {
      console.error("Error fetching services data:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch services data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    services,
    loading,
    error,
    refetch: fetchData,
  };
};
