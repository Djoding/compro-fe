import { platformsAPI } from "@/lib/api";
import { useEffect, useState } from "react";

interface Platform {
  id: string;
  name_id: string;
  name_en: string;
  imageUrl: string;
  description_id: string;
  description_en: string;
  createdAt: string;
  name: string;
  description: string;
}

interface UsePlatformsDataReturn {
  platforms: Platform[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const usePlatformsData = (): UsePlatformsDataReturn => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await platformsAPI.getAll();
      setPlatforms((response.data as Platform[]) || []);
    } catch (err) {
      console.error("Error fetching platforms data:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch platforms data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    platforms,
    loading,
    error,
    refetch: fetchData,
  };
};
