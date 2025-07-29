"use client";

import { useState, useEffect } from "react";
import { faqAPI } from "@/lib/api";

interface FAQ {
  id?: string | number;
  question_id?: string;
  question_en?: string;
  answer_id?: string;
  answer_en?: string;
  category?: string;
  is_active?: boolean;
  order_position?: number;
}

export function useFAQData() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await faqAPI.getAll();
      setFaqs(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error fetching FAQ data:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch FAQ data");
      setFaqs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    faqs,
    loading,
    error,
    refetch: fetchData
  };
}
