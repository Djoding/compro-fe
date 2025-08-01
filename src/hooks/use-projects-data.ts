import { projectsAPI } from "@/lib/api";
import { useEffect, useState } from "react";

interface Project {
  id: string;
  title_id: string;
  title_en: string;
  serviceCategory: string;
  imageUrl: string;
  shortDescription_id: string;
  shortDescription_en: string;
  elaboration_id: string;
  elaboration_en: string;
  languages: string[];
  features: string[];
  createdAt: string;
  updatedAt: string;
  title: string;
  shortDescription: string;
  elaboration: string;
}

interface UseProjectsDataReturn {
  projects: Project[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useProjectsData = (): UseProjectsDataReturn => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await projectsAPI.getAll();
      setProjects((response.data as Project[]) || []);
    } catch (err) {
      console.error("Error fetching projects data:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch projects data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    projects,
    loading,
    error,
    refetch: fetchData,
  };
};
