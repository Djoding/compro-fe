"use client";

import { useState, useEffect } from "react";
import { certificatesAPI } from "@/lib/api";

interface Certificate {
  id?: string | number;
  title_id?: string;
  title_en?: string;
  description_id?: string;
  description_en?: string;
  issuer?: string;
  issue_date?: string;
  certificate_type?: string;
  certificate_number?: string;
  image?: string;
  certificate_url?: string;
  is_active?: boolean;
  order_position?: number;
}

export function useCertificatesData() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await certificatesAPI.getAll();
      setCertificates(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error fetching certificates data:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch certificates data");
      setCertificates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    certificates,
    loading,
    error,
    refetch: fetchData
  };
}
