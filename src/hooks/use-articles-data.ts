import { articlesAPI } from "@/lib/api";
import { useEffect, useState } from "react";

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  image?: string;
  category?: string;
  tags?: string[];
  author?: string;
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface UseArticlesDataReturn {
  articles: Article[];
  featuredArticles: Article[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useArticlesData = (): UseArticlesDataReturn => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [allResponse, featuredResponse] = await Promise.all([
        articlesAPI.getAll(),
        articlesAPI.getFeatured(),
      ]);

      setArticles((allResponse.data as Article[]) || []);
      setFeaturedArticles((featuredResponse.data as Article[]) || []);
    } catch (err) {
      console.error("Error fetching articles data:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch articles data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    articles,
    featuredArticles,
    loading,
    error,
    refetch: fetchData,
  };
};
